
var socket = require('socket.io'),
express = require('express'),
https = require('https'),
http = require('http'),
logger = require('winston');

var port = 3001;

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console,{ colorize: true, timestamp: true});
logger.info('SocketIO > listening on port 3001');

var app = express();                            
var http_server = http.createServer(app).listen(process.env.PORT || 5022);

var owners = [];
var peers = [];

function update(http_server){

	var io = socket.listen(http_server);
	
	io.sockets.on('connection',function(socket){
		
		socket.on('disconnect', function(){
			
			peers.splice(socket.id, 1);
		
			for(var i = 0; i < owners.length; i++){
				
				const obj = owners[i];
				
				if(obj.id == socket.id){
					
					io.emit('hostLeave');
					
					owners.splice(indexOf(i), 1)
				}
			}	
			
		})
		
		socket.on("join", function(id,room){
			
			socket.join(room);
			
			io.emit("join", id, room);
		
			var counter;
			
			for(var i = 0; i < owners.length; i++){
				
				const obj = owners[i];
				
				if(obj.room == room){
					
					counter++;
				}
			}
			
			if(counter == 0 || counter === undefined){
				
				const owner = new Object();
			
				owner.id = socket.id;
				owner.room = room;
			
				owners.push(owner);
			}
		
			
			peers[socket.id] = id;
			
		})
		
		socket.on('getUsers', function(room){
			
			io.of('/').in(room).clients((err,clients) => {
				
				var cli = [];
				
				clients.forEach(function(client){
					
					cli.push(peers[client]);
				})
				
				io.emit("sendUsers", cli);
			})
		})
		
		socket.on("reset", function(room){
			
			io.emit("reset", room);
			
		})
		
		socket.on('reqCatchUp', function(userId,room){

			io.emit('reqCatchUp', userId, room);
		})

		socket.on('catchUp',  function(userId, time, video, pause, started, room){

			io.emit('catchUp', userId, time, video, pause, started, room);
		})

		socket.on('reqFinishLoad', function(userId, room){

			io.emit('reqFinishLoad', userId, room);
		})

		socket.on('finishLoad', function(userId, time, room){
			
			io.emit('finishLoad', userId, time, room);
		})

		socket.on('addQueue', function(data){
			
			console.log(data);
			io.emit('addQueue', data);
		})

		socket.on('sendQueue', function(videos){

			io.emit('sendQueue', videos);
		})
		
		socket.on('playbackCheck', function(paused,room){
			
			io.emit('playbackCheck', paused,room);
		})

		socket.on('vote', function(videoId, dowmVote, room){

			io.emit('vote', videoId, dowmVote, room);
		})

		socket.on("update",function(time,date,userId,room){
			
			io.emit("update", time,date,userId,room); 
		})


		socket.on("pause",function(pause,room){
			
			io.emit("pause", pause,room); 
		})

		socket.on("changeVideo",function(data){
			console.log(data);
			io.emit("changeVideo", data); 
		})

	});
}

update(http_server); 

