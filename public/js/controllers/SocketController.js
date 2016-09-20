var app = angular.module('SocketController', []);

app.controller('socketController', function($scope, $socket) {
	$scope.message = '';
	$scope.messages = [];
	$scope.user = '';
	$scope.participants = [];

	$('#userModal').modal('show');

	$scope.enterChat = function() {
		$socket.emit('new user', $scope.user);
		$('#userModal').modal('hide');
	}

	$scope.sendMessage = function() {
		let messageStruct = {
			message: $scope.message,
			sender: $scope.user
		}

		$socket.emit('chat message', messageStruct);
		$scope.message = '';
	}

	$socket.on('new user', function(msg) {
		console.log('new user' + msg);
		checkAndAddParticipant(msg);
	});

	$socket.on('chat message', function(msg) {
		$scope.messages.push(msg);
	});

	$socket.on('load participants', function(data) {
		for (var i = 0; i < data.length; i++) {
			checkAndAddParticipant(data[i].name);
		}
	});

	function checkAndAddParticipant(name) {
		if($scope.participants.indexOf(name) === -1){
			$scope.participants.push(name);
		}
	}
});