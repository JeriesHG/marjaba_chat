'use strict';
const bower_components_path = 'app/client/bower_components';
module.exports = {
  client: {
    lib: {
      css: [
        bower_components_path + '/bootstrap/dist/css/bootstrap.css',
        bower_components_path + '/bootstrap/dist/css/bootstrap-theme.css'
      ],
      js: [
        bower_components_path + '/jquery/dist/jquery.min.js',
        bower_components_path + '/angular/angular.min.js',
        bower_components_path + '/bootstrap/dist/js/bootstrap.min.js',
        bower_components_path + '/angular-scroll-glue/src/scrollglue.js',
        bower_components_path + '/angular-socket-io/socket.min.js'
      ]
    },
    css: [
      'modules/*/client/css/*.css'
    ],
    sass: [
      'modules/*/client/scss/*.scss'
    ]
    // js: [
    //   'modules/core/client/app/config.js',
    //   'modules/core/client/app/init.js',
    //   'modules/*/client/*.js',
    //   'modules/*/client/**/*.js'
    // ],
    // views: ['modules/*/client/views/**/*.html']
  }
};