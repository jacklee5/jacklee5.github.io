var newSound = function(file) {
    var snd1 = new Audio();
    var src1 = document.createElement("source");
    src1.type = "audio/mpeg";
    src1.src = file;
    snd1.appendChild(src1);
    return snd1;
};
var id = function(id){
    return document.getElementById(id);
}

var newMessage = function(message,delay){
    setTimeout(function(){
        id("caption").innerHTML = message;
    },delay * 1000)
}
var story = newSound("story.mp3");
story.play();
var d = new Date();
var year = d.getFullYear();
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var month = months[d.getMonth()];
var day = d.getDay();
// year month day. Jin's log
newMessage(year+" "+month+" "+day+", Jin's log",2);
newMessage("Uhhh ... today something terrible happened.",6);
newMessage("I was eating my food...",9)
newMessage("When my food disappeared - suddenly - without a trace - nothing",13);
newMessage("Uhhh ... I was really hungry",21);
newMessage("So I tried to go look for it",24);
newMessage("I looked all over ... seriously",27);
newMessage("I even called the police...but they didn't answer",32);
newMessage("I was really hungry then",40);
newMessage("Uhhh ... soon after, I ... thought I saw something in the sky...",43)
newMessage("And I realized it was my food, stolen by the universe",52);
newMessage("So of course...",60);
newMessage("I had to follow...",62);

var notToday = newSound("nottoday.mp3");
setTimeout(function(){
    id("caption").innerHTML = "";
    id("play").innerHTML = "Click to play";
},63000);

var showInstructions = function(){
    id("instructions").style.display="block";
    id("title").style.display = "none";
    id("caption").style.display = "none";
    document.body.onclick = startGame;
};

var startGame = function(){    
    //Play music
    notToday.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    notToday.play();
    id("instructions").style.display = "none";
    id("game").style.display = "block";
    story.pause();
    
    //Key handler
    keys = {};
    document.body.addEventListener("keydown", function(e) {
            keys[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function(e) {
        keys[e.keyCode] = false;
    });
    //Game stuff
    var SPEED = 5;
    var UP = 40;
    var DOWN = 38;
    var RIGHT = 39;
    var LEFT = 37;
    var constrain = function(num,min,max){
        if(num >= min && num <= max){
            return num;
        }else if(num > max){
            return max;
        }else{
            return min;
        }
    }
    var width = document.body.offsetWidth;
    var playerWidth = id("player").offsetWidth;
    var height = document.body.offsetHeight;
    var playerHeight = id("player").offsetHeight;
    var draw = function(){
        var player = id("player");
        if(keys[UP]){
            player.style.position = "absolute";
            player.style.top = constrain((player.offsetTop + SPEED), 0, height - playerHeight) + "px";
        }
        if(keys[DOWN]){
            player.style.position = "absolute";
            player.style.top = constrain((player.offsetTop - SPEED), 0, height - playerHeight) + "px";
        }
        if(keys[LEFT]){
            player.style.position = "absolute";
            player.style.left = constrain((player.offsetLeft - SPEED), 0, width - playerWidth) + "px";
        }
        if(keys[RIGHT]){
            player.style.position = "absolute";
            player.style.left = constrain((player.offsetLeft + SPEED), 0, width - playerWidth) + "px";
        }
        requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
};
document.body.onclick = showInstructions;