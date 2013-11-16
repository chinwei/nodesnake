/*








*/








var cw = $(window).width(),
ch = $(window).height(),
canvasWidth = 600,
canvasHeight = 400,
snakes = [],
snakesPos = [],
posX = 0,
posY = 0;
var socket = io.connect('http://chins-air.westell.com:8888');
$(document).ready(function(){
var paper = Raphael(0, 0, cw, ch);
var background = paper.rect(0,0,cw,ch);




socket.on('create_snake', function(data) {
  
  
  for (var i = data.length - 1; i >= 0; i--) {
    var snakeProp = {
      id: data[i].id,
      posX: data[i].x,
      posY: data[i].y,
      fill: 'red',
      hue: random(1, 359)/360
    };
    
    var snake = paper.rect(snakeProp.posX,snakeProp.posY,20,20);

    snake.attr("fill", 'hsl('+snakeProp.hue+',0.3,0.7)');

    snake.node.id = snakeProp.id;
  };
  console.log($('#'+data[0].id)[0]);



 
})

socket.on('remove_snake', function(data) {
  
  console.log(data);
  
  // console.log($('#'+data)[0]);
  // $('#'+data).remove();
  // for (var i = data.length - 1; i >= 0; i--) {
  // }; 
})

socket.on('move_snake', function(data) {
  
  

  posX = $('#'+data).attr('x');
  posX++;
  $('#'+data).attr('x', posX);
// TweenLite.to($('#'+data), 2, {raphael:{x:100, y:100}});
// smallCircle.data('id',data).attr({opacity:0.5});

  
  
})

// socket.on('client_connected', function(data) {
  
//   var snakeObj = {
//       id: data,
//       posX: random(0,cw),
//       posY: random(0,ch),
//       fill: 'red'
//     };
    
    // var snake = paper.rect(snakeObj.posX,snakeObj.posY,20,20);
    // snake.attr("fill", snakeObj.fill);
    // snake.node.id = snakeObj.id;
//     console.log(snakeObj, 'connected!');
//     socket.emit('create_snake', snakeObj);
// })

// socket.on('client_disconnected', function(data) {
//   console.log(data);
//   // $('#'+data).hide();


// })




for (var i = snakes.length - 1; i >= 0; i--) {
  snakes[i].attr("fill", "#f00");
  snakes[i].attr("stroke", "#fff");
};

})





























if (window.DeviceOrientationEvent) {
  // document.getElementById("doEvent").innerHTML = "DeviceOrientation";
  // Listen for the deviceorientation event and handle the raw data
  window.addEventListener('deviceorientation', function(eventData) {
    // gamma is the left-to-right tilt in degrees, where right is positive
    var tiltLR = eventData.gamma;
    // beta is the front-to-back tilt in degrees, where front is positive
    var tiltFB = eventData.beta;
    // alpha is the compass direction the device is facing in degrees
    var dir = eventData.alpha
    var prop = [tiltLR, tiltFB, dir];
    socket.emit('my other event', prop);
    // call our orientation event handler
    // deviceOrientationHandler(tiltLR, tiltFB, dir);
  }, false);
} else {
  // document.getElementById("doEvent").innerHTML = "Not supported."
}


function random(min, max) {
  return Math.floor(Math.random()*(max-min));
}



