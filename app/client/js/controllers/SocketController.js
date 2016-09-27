'use strict'
angular.module('chatApp').controller('socketController', ['$scope', 'socketFactory', function($scope, socketFactory) {
	const $socket = new socketFactory();
	$scope.message = '';
	$scope.messages = [];
	$scope.user;
	$scope.participants = [];
	$scope.wSocketId = '';

	$('#userModal').modal('show');

	$scope.enterChat = function() {
		var names = $scope.participants.map(function(o) { return o.name; });
		var found = names.lastIndexOf($scope.user)  != -1;

		// TODO: Add a boostrap alert
		if (found) {
			alert("Name taken!");
		} else {
			$socket.emit('new user', $scope.user);
			$('#userModal').modal('hide');
			
		}
	}

	$scope.sendMessage = function() {
		let messageStruct = {
			message: $scope.message,
			sender: $scope.user,
			wSocketId: $scope.wSocketId,
			date: new Date()
		}

		$socket.emit('chat message', messageStruct);
	}

	$scope.sendPrivateMessage = function($event, socketId) {
		$scope.wSocketId = socketId;
		$socket.emit('get user', socketId);
	}

	$socket.on('get user', function(id) {
		$scope.message = '/w ' + id.name + ' ';		
		$("[name='message']").focus();
	});

	$socket.on('new user', function(data) {
		checkAndAddParticipant(data);
	});

	$socket.on('chat message', function(msg) {
		$scope.messages.push(msg);
		$scope.message = '';
		$scope.wSocketId = '';
	});

	$socket.on('load participants', function(data) {
		for (let i = 0; i < data.length; i++) {
			checkAndAddParticipant(data[i]);
		}
	});

	$socket.on('exit chat', function(socketId) {
		for (let i = $scope.participants.length - 1; i >= 0; i -= 1) {
			if ($scope.participants[i].socketId === socketId) {
				$scope.participants.splice(i, 1);
			}
		}
	});

	function checkAndAddParticipant(data) {
		var names = $scope.participants.map(function(o) { return o.name; });
		var found = names.lastIndexOf(data.name)  != -1;

		return ( !found && $scope.participants.push(data) );
	}

}]);
