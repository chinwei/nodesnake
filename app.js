//An array to store the existing rooms 
var rooms = [];
function room(roomSocket, roomId){
  this.roomSocket = roomSocket;  //Stores the socket for the desktop connection
  this.roomId = roomId;          //The room id/name. A unique string that links desktop to mobile
  this.mobileSockets = [];       //A list of all the mobile connections
};