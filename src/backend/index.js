'use strict'

var Server = require('./server.js').Server;
var server = Server('8080');

server.listen(function(){
  console.log('server started listening on port:', server.options.port);
});
