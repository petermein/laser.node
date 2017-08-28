let app = require('express')();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let serialport = require('serialport');

//sass,browserfy,pug
require('./expressjs/init')(app);

//custom express
require('./expressjs')(app);

//custom socketio
require('./websocket')(io, serialport);

//start
let port = 3000;
server.listen(port,() => {
  console.log(`service started at port ${port}`)
});

