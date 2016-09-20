var app = angular.module('SocketController', []);

app.controller('socketController', function ($scope, $socket) {
  	$scope.message = '';
  	$scope.messages = [];

  	$scope.sendMessage = function(){
  		console.log('message: ' + $scope.message);
  		$socket.emit('chat message', $scope.message);
  		// $scope.messages.push($scope.message);

  		$scope.message = '';
  	}

  	$socket.on('chat message', function(msg){
  		$scope.messages.push(msg);
  	});
});