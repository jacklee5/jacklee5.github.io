var playSound = function(file) {
    var snd1 = new Audio();
    var src1 = document.createElement("source");
    src1.type = "audio/mpeg";
    src1.src = file;
    snd1.appendChild(src1);
    snd1.play();
};
var randInt = function(min,max){
    return Math.floor(Math.random()*((max-min)+1)+min);
}
var MINSPEED = 1;
var MAXSPEED = 5;
var collider = function(id,src,ssrc,w,x,y){
    var xvel = randInt(MINSPEED,MAXSPEED);
    var yvel = randInt(MINSPEED,MAXSPEED);
    document.body.innerHTML += "<img src = '"+src+"' width = '"+w+"' id = '"+id+"' style = 'position:absolute;left:"+x+"px;top:"+y+"px;'>";
    setInterval(function(){
        el  = document.getElementById(id);
        x += xvel;
        y += yvel;
        el.style.top = y + "px";
        el.style.left = x + "px";
        if(x + el.offsetWidth > document.body.offsetWidth){
            xvel = -1*Math.abs(xvel);
            playSound(ssrc);
        }else if(x < 0){
            xvel = Math.abs(xvel);
            playSound(ssrc);
        }
        if(y + el.offsetHeight > document.body.offsetHeight){
            yvel = -1*Math.abs(yvel);
            playSound(ssrc);
        }else if(y < 0){
            yvel = Math.abs(yvel);
            playSound(ssrc);
        }
    },30)
};
var colliders = [["ding dong.jpg","ding_d__g.mp3",100],["infires.gif","infires.mp3",100],["jams.gif","you_got_no_jams.mp3",100],["jhope.gif","jhope.mp3",100],["stob.gif","stob.mp3",100],["power.gif","power.mp3",100],["water.gif","water.mp3",100],["playboy.gif","playboy.mp3",100]];
var id = 0;
var newCollider = function(index,x,y){
    id += 1;
    collider("c"+id,colliders[index][0],colliders[index][1],colliders[index][2],x,y);
}
t = 0;
name = prompt("Welcome to Boris++! Here's what you can do here:\n 1. Enter your name below in case you end up wasting the most time here.\n 2. Click to add a thingy. If you don't do anything, your time won't be saved. \n 3. Have fun I guess?")
window.onbeforeunload = function(e){
    return "null";
};
window.onunload = function(){
    firebase.database().ref("highscore").set({
        name:name,
        time:t
    });
}
firebase.database().ref("views").once("value",function(snapshot){
    firebase.database().ref("views").set(snapshot.val()+1);
});
firebase.database().ref("highscore").once("value",function(snapshot){
    document.getElementById("hightime").innerHTML = snapshot.val().time;
    document.getElementById("highname").innerHTML = snapshot.val().name;
})
document.body.addEventListener("click",function(e){
    newCollider(randInt(1,colliders.length)-1,e.clientX,e.clientY);
})
var updateTime = function(){
    time = document.getElementById("time");
    time.innerHTML = t+1+"s";
    t+=1;
    setTimeout(function(){
        updateTime();
    },1000)
}
setTimeout(function(){
    updateTime();
},1000)