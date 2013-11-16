/*








*/








var cw = $(window).width(),
ch = $(window).height(),
canvasWidth = 600,
canvasHeight = 400,
snakes = [],
snake = [],
snakesPos = [],
posX = 0,
posY = 0;
var socket = io.connect('http://128.237.134.196:8888');
$(document).ready(function(){
var paper = Raphael(0, 0, cw, ch);
var background = paper.rect(0,0,cw,ch);
var snake_step = 10;



socket.on('create_snake', function(data) {
  
  snake_init(data);
  // console.log('lala');

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
  // console.log($('#'+data[0].id)[0]);



 
})

socket.on('remove_snake', function(data) {
  console.log('remove snake');
  // console.log($('.'+data));
  
  // console.log($('#'+data)[0]);
  $('.'+data).remove();
  // for (var i = data.length - 1; i >= 0; i--) {
  // }; 
})

socket.on('move_snake', function(data) {
  
  snake_move(data);

  

 


  
  
})

function snake_init(data) {



    for (var i = data.length - 1; i >= 0; i--) {

       var snakeProp = {
          id: data[i].id,
          posX: data[i].x,
          posY: data[i].y,
          fill: 'red',
          hue: random(1, 359)/360
        };

        // console.log(da.posX);

      for( i=0; i<6; i++ ) {
        snake[i] = {}
        snake[i].pos = {x:snake_step*i+snakeProp.posX,y:snakeProp.posY};
        snake[i].node = paper.circle( snake[i].pos.x, snake[i].pos.y, 10 );
        
        if( i==0 )
          snake[i].node.attr({stroke:"black",fill:"red"});
          snake[i].node.node.setAttribute("class",snakeProp.id);
          // snake[i].node.attr({'class', snakeProp.id});

          
          // console.log('id is: '+snakeProp.id);
          // console.log(snake[i].node);
      }


  }

    
  }




function snake_move(data) {

  console.log('snake is moving');

  switch (data.keystroke) {
    case 37: data.dir = 'left'; break;
    case 39: data.dir = 'right'; break;
    case 38: data.dir = 'up'; break;
    case 40: data.dir = 'down'; break;
  }

  function get_next_coords( dir ) {
    if( data.dir == "up" ) return { x:0, y:-snake_step };
    if( data.dir == "down" ) return { x:0, y:snake_step };
    if( data.dir == "left" ) return { x:-snake_step, y:0 };
    if( data.dir == "right" ) return { x:snake_step, y:0 };
  }

  var $head = $('.'+data.id).eq(0);
   posX = parseInt($head.attr('cx'));
  posY = parseInt($head.attr('cy'));

  posX += get_next_coords(data.dir).x;
  posY += get_next_coords(data.dir).y;

  $head.attr('cx', posX);
  $head.attr('cy', posY);

  // console.log(get_next_coords(data.dir).x);

  // console.log($('.'+data.id).eq(0).attr('cx'));

  // console.log($('.'+data.id).eq(0));

  for (var i = snake.length - 1; i > 0; i--) {
      $('.'+data.id).eq(i).attr('cx', $('.'+data.id).eq(i-1).attr('cx'));
      $('.'+data.id).eq(i).attr('cy', $('.'+data.id).eq(i-1).attr('cy'));
  };


  // console.log(tx);
    // console.log( "Dir = " + direc );
    // for( i=snake.length-1; i>0; i-- ) {
      // var tx = snake[i-1].pos.x - snake[i].pos.x;
      // var ty = snake[i-1].pos.y - snake[i].pos.y;
    //   snake[i].pos.x = snake[i-1].pos.x;
    //   snake[i].pos.y = snake[i-1].pos.y;
    //   snake[i].node.translate( tx, ty );
    // }
    // step = get_next_coords( direc );
    // snake[0].pos.x += step.x;
    // snake[0].pos.y += step.y;
    // snake[0].node.translate( step.x, step.y );
  }


//Give it some rest
  function snake_loop() {

      snake_move();

      setTimeout( snake_loop, 60 );

  }


snake_loop()



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



