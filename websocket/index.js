/**
 * socket.io
 */

module.exports = function(io, SerialPort){


  //Spin up serial connection
    const port = new SerialPort('/dev/ttyACM1', {baudRate: 115200 });
    const Readline = SerialPort.parsers.Readline;
    const parser = port.pipe(new Readline({ delimiter: '\n' }));


    port.on('error', function(err) {
        console.log('Error: ', err.message);
    });

    // Switches the port into "flowing mode"

  io.on('connection', function(socket){

      parser.on('data', function (data) {
          console.log(data);
          io.emit('chat message', data);
      });

    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
      port.write(msg);
    });
  });
};