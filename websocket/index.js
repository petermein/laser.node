/**
 * socket.io
 */

module.exports = function(io, SerialPort){


  //Spin up serial connection
    let port = new SerialPort('/dev/pts/2', {
        baudRate: 9600
    });

    port.on('error', function(err) {
        console.log('Error: ', err.message);
    });

    // Switches the port into "flowing mode"



  io.on('connection', function(socket){

      port.on('data', function (data) {
          console.log(ab2str(data));
          io.emit('chat message', ab2str(data));
      });

    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
      port.write(msg);
    });

  });
};

function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}
function str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}