var socket = io.connect('http://localhost:8888');
var snakeId;

socket.on('client_connected', function(data) {
  
window.addEventListener('keydown', function(e){
    
  snakeProp = {
    id: data,
    keystroke: e.keyCode,
    dir: ''
  };

  socket.emit('handleKeyDown', snakeProp);

})

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



