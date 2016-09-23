'use strict'
var app = angular.module('chatApp', ['btford.socket-io', 'SocketController', 'luegg.directives']);

app.factory('$socket', function (socketFactory) {
  return socketFactory();
});

