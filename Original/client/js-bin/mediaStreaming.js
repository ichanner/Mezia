var socket = io.connect("https://blooming-scrubland-35115.herokuapp.com/");

var peer = new Peer({host: "0.peerjs.com"})
var croom = localStorage.getItem("room");
var owner = localStorage.getItem("owner");


var video = document.getElementById("videoStream");

var player2 = videojs('streamer');

var userId;

var cameraSettings = {
    
    video:true,
    audio:true
}

var videoSettings = {
    
      width: 1920,
      height: 1080,
      frameRate: 60,
      latency: 0.003
}; //TODO: Adjust Settings

const screenSharingOptions = {
	
	video: videoSettings,
	audio:true
}

peer.on('open', id=>{

   	userId = id;
    socket.emit('join', id, localStorage.getItem("room"));    
})

function vc(stream){
       
	socket.on("join", function(id, room){
        
        if(localStorage.getItem("room") == room){
	       
	       console.log(id + " Joined");
	       
	       peer.call(id, stream); 
	       
        }
	})
    
    socket.emit('getUsers', localStorage.getItem("room"));

	socket.on('sendUsers', function(data){
   
	    for(var i = 0; i < data.cli.length; i++){
         
			if(data.cli[i] == userId){

				continue;
			}
			
			console.log(data.room);
			
			if(data.room == localStorage.getItem("room")){
                
                console.log(data.cli[i] + " called");
                
		        peer.call(data.cli[i], stream);
		  
			}
		}
	})
    
}

function mediaCallback(stream){
    
    stopStream(player2);
    
    socket.emit("reset", localStorage.getItem("room"));
    
    addVideo(player2, stream);
    
    
    const tracks = stream.getTracks();
    
    tracks.forEach(function(track){
        
         track.addEventListener("ended", () =>{
              
              toggleVideo(false);
              socket.emit("toggle", false, localStorage.getItem("room"));
         })
    })
		
	socket.on("join", function(id, room){
        
        if(localStorage.getItem("room") == room && owner){
	       
	       console.log(id + " Joined");
	       
	       peer.call(id, stream); 
	       
        }
	})
    
        
    socket.emit('getUsers', localStorage.getItem("room"));
    

	socket.on('sendUsers', function(data){
   
	    for(var i = 0; i < data.cli.length; i++){
         
			if(data.cli[i] == userId){

				continue;
			}
			
			console.log(data.room);
			
			if(owner && data.room == localStorage.getItem("room")){
                
                console.log(data.cli[i] + " called");
                
		        peer.call(data.cli[i], stream);
		  
			}
		}
	})
}

function stopSharing(){
    
    stopStream(player2);
    toggleVideo(false);
    socket.emit("toggle", false, localStorage.getItem("room"));
}

function shareCamera(){
    
   toggleVideo(true);
   socket.emit("toggle", true, localStorage.getItem("room"));
    
   localStorage.setItem('live', true);
    
   // navigator.mediaDevices.getUserMedia(cameraSettings).then(stream =>{
        
        var stream = video.captureSream();  
        mediaCallback(stream);
    //})
}

function shareScreen(){
    
   toggleVideo(true);
   socket.emit("toggle", true, localStorage.getItem("room"));
   
   localStorage.setItem('live', true);
    
	navigator.mediaDevices.getDisplayMedia(screenSharingOptions).then(stream => { 
        
         mediaCallback(stream);

	})
}

peer.on('call', function(call){

	call.answer('');
	
	call.on('stream', function(remoteStream){
        
        var p = document.createElement("AUDIO");
        addCaller(p,remoteStream);    
        addVideo(player2, remoteStream);    

	})
})

function addCaller(p, stream){
    
    p.srcObject = stream;
    
    p.addEventListener("loadedmetadata", () => {
        
		p.play();
	}) 
}

function stopStream(video){
    
    var vid = video.tech().el();

    const stream = vid.srcObject;
    
    if(stream != null){
    
        const tracks = stream.getTracks();
    
        tracks.forEach(function(track){
        
            track.stop();
        })
    
        vid.srcObject = null;

    }
    
}

function joinCall(){
    
    //navigator.mediaDevices.getUserMedia({video: false, audio:true}).then(stream =>{
        var stream = video.captureStream();  
        vc(stream);
    //})
}

function addVideo(video, stream){
    
    var vid = video.tech().el();
    vid.srcObject = stream;

	video.on("loadedmetadata", () => {
        
		video.play();
	})      

}

