const _ = require('lodash');
const gulp = require('gulp');
const sass = require('gulp-sass');
const livereload = require('gulp-livereload');
const server = require('gulp-develop-server');
const browserify = require('browserify');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');
const defaultAssets = require('./config/assets/default');
const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins({
	rename: {
		'gulp-angular-templatecache': 'templateCache'
	}
});

const paths = {};
paths.src = {};
paths.build = {};
paths.entryScript = 'server';
//===================================================================================
//==================================== Asset Paths ==================================
//===================================================================================
const src = 'app/client/';
paths.src.scripts = src + 'js/';
paths.src.sass = src + 'sass/';
paths.src.images = src + 'images/';
paths.src.fonts = src + 'fonts/';
paths.src.html = src;

const dist = 'app/client/';
paths.build.scripts = dist + 'js/';
paths.build.sass = dist + 'css/';
paths.build.images = dist + 'images/';
paths.build.fonts = dist + 'fonts/';

//===================================================================================
//==================================== TASKS ==================================
//===================================================================================

gulp.task('scripts', () => {
	console.log('Src Scripts : ' + paths.src.scripts);
	console.log('Dist Scripts : ' + paths.build.scripts);


	return browserify({
			debug: true,
			entries: [paths.src.scripts + '/app.js']
		})
		.transform("babelify", {
			presets: ["es2015", "react"]
		})
		.bundle()
		.pipe(source('app.js'))
		.pipe(streamify(uglify()))
		.pipe(streamify(rename({
			suffix: ".min"
		})))
		.pipe(gulp.dest(paths.build.scripts));
});

// JS minifying task
gulp.task('uglify', function() {
	var assets = _.union(
		defaultAssets.client.lib.js
	);

	return gulp.src(assets)
		.pipe(plugins.ngAnnotate())
		.pipe(plugins.uglify({
			mangle: false
		}))
		.pipe(plugins.concat('libs.min.js'))
		.pipe(gulp.dest(paths.build.scripts));
});

gulp.task('sass', function() {
	return gulp.src(paths.src.sass + 'style.scss')
		.pipe(sass()) // Converts Sass to CSS with gulp-sass
		.pipe(gulp.dest(paths.build.sass)
			.pipe(livereload()));
});

gulp.task('images', () => {
	return gulp.src(paths.src.images + '**/*')
		.pipe(gulp.dest(paths.build.images))
		.pipe(livereload());
});

gulp.task('server:start', () => {
	server.listen({
		path: paths.entryScript
	});
});
gulp.task('server:restart', server.restart);

//===================================================================================
//==================================== WATCHERS ==================================
//===================================================================================

gulp.task('watch', () => {
	livereload.listen();
	// Watch .js files
	gulp.watch(paths.src.scripts + '**/*.js', ['scripts']);
	// Watch .scss files
	gulp.watch(paths.src.sass + '**/*.scss', ['sass']);
	// Watch image files
	gulp.watch(paths.src.images + '**/*', ['images']);
	//server restart
	gulp.watch(['./app.js'], ['server:restart']);
	gulp.watch(['./app/client/**/*.js'], ['server:restart']);
});

//Tasks
gulp.task('default', ['scripts', 'uglify', 'sass', 'images', 'server:start', 'watch']);