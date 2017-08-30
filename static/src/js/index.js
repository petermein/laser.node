/**
 * index.js for browser
 */
let socket = require('socket.io-client')();
let $ = require('jquery');

$('form').submit(function(){
  let msg = $('#m').val();
  let userid = $('#userid').val();
  socket.emit('chat message', `${msg}`);
  $('#m').val('');
  return false;
});
socket.on('connected',()=>{
  console.log('connected')
});
socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});