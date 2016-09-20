var app = angular.module('chatApp', ['btford.socket-io', 'SocketController']);

app.factory('$socket', function (socketFactory) {
  return socketFactory();
});

