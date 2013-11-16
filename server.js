// JavaScript Document

var snakesArray = [];

var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

io.set('log level', 1);

app.listen(8888);

function handler (req, res) {
fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });  
}





io.sockets.on('connection', function (socket) {

  console.log(socket.id, 'connected');
  

  var snakeProp = {
    id: socket.id,
    x: random(200,400),
    y: random(200,400)
  }
  snakesArray.push(snakeProp);

  // setTimeout(function(){
    
  // },1000)
  io.sockets.emit('create_snake', snakesArray);
  socket.emit('client_connected', socket.id);
  
  
  socket.on('disconnect', function (){
        for (var i = snakesArray.length - 1; i >= 0; i--) {
      if (socket.id == snakesArray[i].id) {
        snakesArray.splice(i,i);
      }
    };
    snakesArray.pop(snakeProp);
    io.sockets.emit('remove_snake', socket.id);
  })

  socket.on('handleKeyDown', function (data){
      // console.log(data);
      io.sockets.emit('move_snake', data);
  })


});






function random(min, max) {
  return Math.floor(Math.random()*(max-min));
}



// io.sockets.on('connection', function (socket) {
//   console.log('connected snake position is...:')
//   console.log(snakesPos);
//  socket.broadcast.emit('client_connected', socket.id);
// socket.on('disconnect', function (){
  // for (var i = snakesPos.length - 1; i >= 0; i--) {
  //   if (socket.id == snakesPos[i].id) {
  //     snakesPos.splice(i,i);
  //   }
  // };
//   console.log('disconnected snake position is...:')
//   console.log(snakesPos);
//    // console.log(socket.id + 'closed');



//    socket.broadcast.emit('client_disconnected', socket.id);
// })


//   socket.on('create_snake', function (data) {
//     snakesPos.push(data)
//     socket.broadcast.emit('snake_created', snakesPos);
//     // console.log(snakesPos);
//   });
// });