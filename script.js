var cw = $(window).width(),
ch = $(window).height(),
canvasWidth = 600,
canvasHeight = 400,
snake,
posX = 0;








$(document).ready(function(){



// Creates canvas 320 × 200 at 10, 50
var paper = Raphael(0, 0, cw, ch);




var background = paper.rect(0,0,cw,ch);


snake = paper.rect(0,0,20,20);
// Sets the fill attribute of the circle to red (#f00)
snake.attr("fill", "#f00");

// Sets the stroke attribute of the circle to white
snake.attr("stroke", "#fff");


move();


})

function move () {
	posX++
	snake.attr('x', posX)
	setTimeout(move, 30);
}


// (function anim() {
// 	for (i = 0; i<items; i++ ) {
// 		 newX = Math.random() * width;
// 		 newY = Math.random() * height;
// 		 star[i].animate({cx: newX, cy: newY}, 1000);
// 	}
// 	setTimeout(anim, 1000);
// })();



var socket = io.connect('http://192.168.1.108:8888');

socket.emit('my other event', 'dsfsd');

if (window.DeviceMotionEvent) {
  console.log("DeviceMotionEvent supported");
} else {
	socket.emit('my other event', 'dsfsd');

}
 
setInterval(function(){
	// socket.emit('my other event', 'kaka');
},100)



