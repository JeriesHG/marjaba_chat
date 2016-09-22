var app = angular.module('SocketController', []);

app.controller('socketController', function($scope, $socket) {
	$scope.message = '';
	$scope.messages = [];
	$scope.user;
	$scope.participants = [];
	$scope.wSocketId = '';

	$('#userModal').modal('show');

	$scope.enterChat = function() {
		var found = false;
		for (var i = 0; i < $scope.participants.length; i++) {
			if ($scope.participants[i].name == $scope.user) {
				found = true;
				break;
			}
		}
		if (!found) {
			$socket.emit('new user', $scope.user);
			$('#userModal').modal('hide');
		} else {
			alert("Name taken!");
		}

	}

	$scope.sendMessage = function() {
		let messageStruct = {
			message: $scope.message,
			sender: $scope.user,
			wSocketId: $scope.wSocketId
		}

		$socket.emit('chat message', messageStruct);
		$scope.message = '';
		$scope.wSocketId = '';
	}

	$scope.sendPrivateMessage = function($event, socketId) {
		let a = angular.element($event.currentTarget);
		$scope.message = '/w ' + a[0].childNodes[3].innerHTML + ' ';
		$scope.wSocketId = socketId;
		$("[name='message']").focus();
	}

	$socket.on('new user', function(data) {
		checkAndAddParticipant(data);
	});

	$socket.on('chat message', function(msg) {
		$scope.messages.push(msg);
	});

	$socket.on('load participants', function(data) {
		for (var i = 0; i < data.length; i++) {
			checkAndAddParticipant(data[i]);
		}
	});

	$socket.on('exit chat', function(socketId) {
		for (i = $scope.participants.length - 1; i >= 0; i -= 1) {
			if ($scope.participants[i].socketId === socketId) {
				$scope.participants.splice(i, 1);
			}
		}
	});

	function checkAndAddParticipant(data) {
		var found = false;
		for (var i = 0; i < $scope.participants.length; i++) {
			if ($scope.participants[i].name == data.name) {
				found = true;
				break;
			}
		}

		if (!found) {
			$scope.participants.push(data);
		}
	}
});