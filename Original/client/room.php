
<!DOCTYPE html>
<html>
<head>

  <link href="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.1.0/video-js.css" rel="stylesheet">

</head>

<body>

  
  <video  muted id="player" preload src="https://vjs.zencdn.net/v/oceans.mp4"  res='1440' class="video-js" controls width="640" height="264">
  
        <source id="mp4" src="https://vjs.zencdn.net/v/oceans.mp4" type='video/mp4'>
      
 </video>
 
  <video muted id="streamer" res='1080' class="video-js" controls width="640" height="264">
       <source id="mp4" src="https://vjs.zencdn.net/v/oceans.mp4" type='video/mp4'>
 </video>
 
 <video controls id="videoStream" src="https://vjs.zencdn.net/v/oceans.mp4"></video>
 
 

  <script src="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.1.0/video.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/videojs-youtube/2.6.1/Youtube.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/videojs-youtube/2.6.1/Youtube.js"></script>
  <script src="/dist/videojs-vimeo.js"></script>

</body>
</html>


<?php



//error_reporting(0);
include("vendor/autoload.php");

use ElephantIO\Client;
use ElephantIO\Engine\SocketIO\Version2X;

session_start();

$_SESSION['id'] = uniqid();

if($_SESSION['room'] != $_GET['id']){

  unset($_SESSION['owner']);
}
else{

  $_SESSION['owner'] = true;
}

$url = '';
$owner = $_SESSION['owner'];
$currentRoom = $_GET['id'];
$id = $_SESSION['id'];

$version = new Version2X("https://blooming-scrubland-35115.herokuapp.com/");
$client = new Client($version);
$client->initialize();


function insertVideo(){
    
    
}

function generateDirName(){
    
    return uniqid();
}


if(isset($_POST['submit'])){

  $url =  $_POST['url'];
  
  $vid = parse_url($url);
  
  
  if($vid['host'] == "www.vimeo.com"){
      
        ?>
        
              <script type="text/javascript">
              
                document.getElementById("player").setAttribute('data-setup', '{ "techOrder": ["vimeo"]');
                videojs("player").src([{type: "video/vimeo", src: <?php echo json_encode($url) ?>, res: 1440}]);
              
              </script>
      
        <?php
        
        $client->emit("changeVideo", array("Video" => $url, "Room"=> $currentRoom));
  }


  if($vid['host'] == "www.youtube.com"){

  ?>
      <script type="text/javascript">
        
        document.getElementById("player").setAttribute('data-setup', '{  "techOrder": ["youtube"]');

        videojs("player").src([{type: "video/youtube", src: <?php echo json_encode($url) ?>, res: 1440}]);

      </script>

      <?php


      $client->emit("changeVideo", array("Video" => $url, "Room"=> $currentRoom));
  }
  
  else{

  ?>
      <script type="text/javascript">
        
        document.getElementById("player").setAttribute('data-setup', '{ "controls": true, "autoplay": false, "preload": "auto" }');
        document.getElementById("mp4").setAttribute("src", <?php echo json_encode($url) ?>);

      </script>

      <?php


      $client->emit("changeVideo", array("Video" => $url, "Room"=> $currentRoom));
  }
  

}


?>


<style>
  
.vjs-tech {
  pointer-events: none;
}



</style>

<html>
    
<body>

<form id="myForm" method="post">

<input type="text" name="url" required placeholder="Enter URL">

<input type="submit" name="submit"  value="Change Video">

</form>

<div id="container">
  <span id="pickfiles">[Upload files]</span>
</div>

<div id="filelist">Your browser doesn't support HTML5 upload.</div>
    
<script type="text/javascript" src="https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js"></script> 

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/plupload/3.1.2/plupload.full.min.js"></script>

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js"></script>

<script src="js-bin/mediaStreaming.js"></script>


<script src="https://cdnjs.cloudflare.com/ajax/libs/videojs-resolution-switcher/0.4.2/videojs-resolution-switcher.min.js" integrity="sha512-EuEgpjZ307chaYi/ZWSMqoYbBFtlxY76b8q0UX8HAMThmGNrQ43y09w5DQE9q97FWjDSx2TISsIQcz6utqolRw==" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/videojs-resolution-switcher/0.4.2/videojs-resolution-switcher.css" integrity="sha512-eNi58fWX0irIyO5I5CgiimkK92f9B0wAbAx1R4j7h2RbE7/CvoQzmIoiqFvxTPsyE2qT2SP5MWHQEAYE28eIQQ==" crossorigin="anonymous" />

<script type="application/javascript">
  (function(b,o,n,g,s,r,c){if(b[s])return;b[s]={};b[s].scriptToken="XzE1Mjk2MjY4MTY";b[s].callsQueue=[];b[s].api=function(){b[s].callsQueue.push(arguments);};r=o.createElement(n);c=o.getElementsByTagName(n)[0];r.async=1;r.src=g;r.id=s+n;c.parentNode.insertBefore(r,c);})(window,document,"script","https://cdn.oribi.io/XzE1Mjk2MjY4MTY/oribi.js","ORIBI");
</script>
    
<button id="screen" onclick="shareScreen()">Share Screen</button>
<button id="camera" onclick="shareCamera()">Share Camera</button>
<button id="stop" onclick="stopSharing()">Stop Sharing</button>


 <p><b>UPDATES (Version 1.3) ~ 12/28/20</b></p>
 <ul>
     <li>Introducing Live Share(BETA)! Share your screen/application or camera with the room!</li>
     <li>Improved and Patched video uploading </li>
 </ul>


<script>


var currentRoom = <?php echo json_encode($currentRoom) ?>;
var owner = <?php echo json_encode($owner) ?>;
var id = <?php echo json_encode($id) ?>;
var paused = true;
var started = false;
var ready = false;
var socket = io.connect("https://blooming-scrubland-35115.herokuapp.com/");

console.log("Connected to room: " + currentRoom);

localStorage.setItem('owner', owner);
localStorage.setItem('live', false);
localStorage.setItem('room', currentRoom);


socket.on("connect", () => {

    socket.emit('reqCatchUp', id, currentRoom);
  
});

window.onbeforeunload = function () {
  if(owner){
      stopSharing();
  }
};

var dirName;



window.addEventListener("load", function () {
  
  var uploader = new plupload.Uploader({
    runtimes: 'html5,html4',
    browse_button: 'pickfiles',
    url: '../videos/upload.php',
    chunk_size: '10mb',
    rename:true,
    unique_names:true,
    init: {
      PostInit: function () {
        document.getElementById('filelist').innerHTML = '';
      },

      FilesAdded: function (up, files) {

       dirName = Date.now() + Math.floor(Math.random());
       
       uploader.settings.multipart_params["dir"] = dirName;
          
        plupload.each(files, function (file) {
          document.getElementById('filelist').innerHTML += `<div id="${file.id}">${file.name} (${plupload.formatSize(file.size)}) <strong></strong></div>`;
          
        });
    
        uploader.start();
      },
      UploadProgress: function (up, file) {
        document.querySelector(`#${file.id} strong`).innerHTML = `<span>${file.percent}%`;
        
      },
      FileUploaded: function(up, file, response) {
        
            console.log("Video Uploaded");
            
            document.querySelector(`#${file.id} strong`).innerHTML = `<span>${file.percent}% (Finalizing...)`;
            
            setTimeout(function(){
                
                var url = "https://mezia.net/videos/"+dirName+"/"+file.name;
            
                if(owner){
                
                    socket.emit("changeVideo", {Video: url, Room: currentRoom});
                    
                    videojs('player').src([{type: "video/mp4", src: url, res: 1440}]);
                    
                    document.querySelector(`#${file.id} strong`).innerHTML = `<span>Uploaded!</span>`;
                
                }
                
            },2000)                                                            
      },
      Error: function (up, err) {
        console.log(err);
      }
    }
  });
  uploader.init();

});

function toggleVideo(live){
    
    if(live == true){
 
       videojs('player').hide();
       videojs('streamer').show();
    }
    else{
        
        videojs('player').show();
        videojs('streamer').hide();
    }
}   

videojs('player').ready(function() {
            
var player = this;   
   
   
  player2.controlBar.playToggle.hide();

if(owner){

    socket.emit("changeVideo", {Video:  player.src(), Room: currentRoom});
}
else{
 
  player.controlBar.playToggle.disable();
  player.controlBar.progressControl.disable();
  player.bigPlayButton.disable();
  player.controlBar.playToggle.removeClass('vjs-ended');

  document.getElementById("myForm").style.display = "none";
  document.getElementById("pickfiles").style.display = "none";
  document.getElementById("camera").style.display = "none";
  document.getElementById("screen").style.display = "none";
  document.getElementById("stop").style.display = "none";
}


function isVimeo(){
    
    const url = new URL(player.src());
    var hostname = url.hostname;
    
    if(hostname=="www.vimeo.com"){
        
        return true;
    }
    
    return false;
}


function isYt(){
    
    const url = new URL(player.src());
    var hostname = url.hostname;
    
    if(hostname=="www.youtube.com"){
        
        return true;
    }
    
    return false;
}
    player.controlBar.playToggle.on('mouseup', function(event){
        
        if(owner && paused){
          
         
          socket.emit("pause", false, currentRoom);


        }
        else if(owner && !paused){
           
          socket.emit("pause", true, currentRoom);

        }
    });
    
    player.bigPlayButton.on('mouseup', function(event){
        
        if(owner){
          
          started = true;
          socket.emit("pause", false, currentRoom);
        }
    });
    
    
    player.controlBar.progressControl.seekBar.on('mousedown', function(event) {
         
        if(owner){ 
            
            if(isYt() || isVimeo()){
            
            setTimeout(function(){
            
                socket.emit("update", player.currentTime(), Date.now(),"ALL", currentRoom);
            
            },1000)
            
            }
            else{
                
                socket.emit("update", player.currentTime(), Date.now(),"ALL", currentRoom);
            }
        }
    });
    
    player.controlBar.progressControl.on('mouseup', function(event) {
        
        if(owner){ 
            
            if(isYt() || isVimeo()){
            
            setTimeout(function(){
            
                socket.emit("update", player.currentTime(), Date.now(), "ALL", currentRoom);
            
            },1000)
            
            }
            else{
                
                socket.emit("update", player.currentTime(), Date.now(),"ALL", currentRoom);
            }
        }
    });
    
    
    player.on("pause", function(){
        
        paused = true;
    });

    player.on("play", function(){
      
      paused = false;
      started = true;
   
    });

    player.on("ended", function(){

      player.currentTime(0);
        
      socket.emit("update", 0, Date.now(), "ALL", currentRoom);
      socket.emit("pause", true, currentRoom);

      player.pause();

    });

    
    setInterval(function(){
    
      if(player.readyState() == 1){

          ready = false;
      }
      if(player.readyState() == 4 && !ready){

        console.log("Video Loaded!");
        
        if(owner){
            
            socket.emit('reqFinishLoad', "OWNER", currentRoom);
        }
        else{
            socket.emit('reqFinishLoad', id, currentRoom);
        }
        
        ready = true;   
      }
      
    },1000);



  socket.on('changeVideo', function(data){
    
    if(data.Room == currentRoom && !owner){

        const url = new URL(data.Video);

        var hostname = url.hostname;
        
        
        if(hostname == "www.vimeo.com"){

            document.getElementById("player").setAttribute('data-setup', '{ "techOrder": ["vimeo"]');

            player.src([{type: "video/vimeo", src: data.Video, res: 1440}]);

            player.pause(); //Best Solution so far a bit iffy tho
        }

        if(hostname == "www.youtube.com"){

            document.getElementById("player").setAttribute('data-setup', '{ "techOrder": ["youtube"]');

            player.src([{type: "video/youtube", src: data.Video, res: 1440}]);

            player.pause(); //Best Solution so far a bit iffy tho
        }
        else{

          document.getElementById("player").setAttribute('data-setup', '{ "controls": true, "autoplay": false, "preload": "auto" }');

          player.src([{type: "video/mp4", src: data.Video, res: 1440}]);

        }
      }
      if(owner && data.Room == currentRoom ){
          
         stopStream(player2); 
          
         localStorage.setItem('live', false);
         toggleVideo(false);
          
         socket.emit("toggle", false, currentRoom);
         socket.emit("pause", true, currentRoom);
      }
   })

   socket.on('reqFinishLoad', function(userId, room){
      
      if(room == currentRoom && owner){ 
        
        var live =  localStorage.getItem('live');
        socket.emit('finishLoad',userId, player.currentTime(), live,  currentRoom);
     
      }
   })

   socket.on('reqCatchUp', function(userId,room){

    if(room == currentRoom && owner){

      url = player.src();
      
      socket.emit('catchUp', userId, player.currentTime(), url, paused, started,  localStorage.getItem("live"), currentRoom);
    }

  })
    
  socket.on("toggle", function(live,room){
      
      if(!owner && room == currentRoom){
     
         toggleVideo(live);
      }
  })  
  
  
  socket.on("reset", function(room){ 
      
      if(room == currentRoom){
          
         player.src([{type: "video/mp4", src: "https://vjs.zencdn.net/v/oceans.mp4", res: 1440}]);
      }
  })
   

  socket.on('finishLoad', function(userId, time, live, room){

       if(userId == id && room == currentRoom && !owner){
            
          player.currentTime(time);

          ready = true;
          
          //toggleVideo(live);
       }

       if(owner){ 
        
        setTimeout(function(){

          if(started){
              
            if(userId == "OWNER"){
                console.log("OWNER UPDATE");
                socket.emit("update", player.currentTime(), Date.now(), "ALL", currentRoom);
            }
            else{
                console.log("USER UPDATE");
                socket.emit("update", player.currentTime(), Date.now(), userId, currentRoom);
            }

          }         

        }, 1000); 
      }

  })


  socket.on('catchUp', function(userId, time, video, pause, started, live, room){
    
    if(userId == id && room == currentRoom && !owner){
        
        
        if(live == "true"){
            
            toggleVideo(true);
        }
        else{
            
            toggleVideo(false);
        }
        //bruh
        
        const url = new URL(video);

        var hostname = url.hostname;
        
        if(hostname == "www.vimeo.com"){
               
          player.src([

            {type: "video/vimeo", src: video, res: 1440}
        
          ]); 
        }

        if(hostname == "www.youtube.com"){
               
          player.src([

            {type: "video/youtube", src: video, res: 1440}
        
          ]); 
        }
        else{
       
          player.src([

            {type: "video/mp4", src: video, res: 1440}
        
          ]); 
        }

        player.currentTime(time);

        if(started){
          
          if(pause){
             
           player.pause();
          }
          else{
              
            player.play();  
          }
 
        }
      }
      
      if(owner){ 
        
        setTimeout(function(){

          if(started){
            
            socket.emit("update", player.currentTime(), Date.now(), userId, currentRoom);
          }
          
        }, 1000); 
      }
  })

  socket.on("pause", function(pause,room){

    if(room == currentRoom){ 
        
        if(!owner){
      
          if(pause){

            player.pause();
          }
          else{
            
            player.play();
          }
        }
     }  
     
    if(owner){  
      
        setTimeout(function(){

            socket.emit("update", player.currentTime(), Date.now(),"ALL",currentRoom);
        
        }, 1000);
    
    }
    
  })

  socket.on('update', function(time,date,userId,room){

      if(room == currentRoom){

        if(!owner){
            
        if(userId == id || userId == "ALL"){    
                
            var diff = (Date.now() - date)/1000;
            
            console.log("Response time of: " + diff);

            player.currentTime(time);
         }
         else{
             
             if(!paused && (userId == id || userId == "ALL")){
                 
                
                 player.pause();
                 socket.emit("pause", true, currentRoom);
                 
                 setTimeout(function(){
                     
                     player.play();
                     socket.emit("play", true, currentRoom);
                     
                },100)
                
                
                 
            }
        
         }
         
         
        }
      }
  })

});


</script>

</body>

</html>