var NOJAMS = "you_got_no_jams.mp3";
var jamsCaught = 0;
var NUMJAMS = 5;
var rms = 5;
var pSpeed = 10;
var playSound = function(file) {
    
}
playSound(NOJAMS);
var Jam = function(x, y, vel, id) {
    this.x = x;
    this.y = y;
    this.vel = vel;
    this.id = id;
    this.f = function(string){
        Jam.f = function(){return ""}
        return string.split(" ").join("");
    }
}
var KEY = "\u0042 \u0045 \u0035 \u0033 \u0038 \u0042 \u0036 \u0038 \u0038 \u0038 \u0042 \u0039 \u0044 \u0037 \u0044 \u0042 \u0038 \u0039 \u0033 \u0031 \u0041 \u0039 \u0039 \u0037 \u0043 \u0037 \u0031 \u0044 \u0042"
KEY = new Jam().f(KEY);
Jam.prototype.draw = function() {
    document.body.innerHTML += "<img id = '" + this.id + "' style = 'position:absolute;top:" + this.y + "px;left:" + this.x + "px;' class = 'jam' src = 'jam.png'>"
}
Jam.prototype.update = function() {
    el = document.getElementById(this.id);
    player = document.getElementById("player")
    this.y += this.vel;
    el.style.position = "absolute";
    el.style.top = this.y + "px";
    if (el.offsetTop + el.offsetHeight > player.offsetTop && el.offsetLeft + el.offsetWidth > player.offsetLeft && el.offsetLeft < player.offsetWidth + player.offsetLeft && el.offsetTop < player.offsetTop + player.offsetHeight) {
        this.y = -1 * el.offsetHeight;
        el.style.left = Math.random() * document.body.offsetWidth + "px";
        this.vel = Math.random() * 10 + 2;
        el.style.top = -1 * el.offsetHeight + "px";
        jamsCaught++;
        document.getElementById("score").innerHTML = jamsCaught;
    }
    if (el.offsetTop > document.body.offsetHeight) {
        this.y = -1 * el.offsetHeight;
        el.style.left = Math.random() * document.body.offsetWidth + "px";
        this.vel = Math.random() * 10 + 2;
    }
}
var Rm = function(x, y, vel, id) {
    this.x = x;
    this.y = y;
    this.vel = vel;
    this.id = id;
    this.f = function(string){
        this.f = function(string){return string};
        return string.split("p").join(" \\u");
    }
}
Rm.prototype.draw = function() {
    document.body.innerHTML += "<img id = '" + this.id + "' style = 'position:absolute;top:" + this.y + "px;left:" + this.x + "px;' class = 'rm' src = 'rapmonster.png'>"
}
Rm.prototype.update = function() {
    el = document.getElementById(this.id);
    player = document.getElementById("player")
    this.y += this.vel;
    el.style.position = "absolute";
    el.style.top = this.y + "px";
    if (el.offsetTop + el.offsetHeight > player.offsetTop && el.offsetLeft + el.offsetWidth > player.offsetLeft && el.offsetLeft < player.offsetWidth + player.offsetLeft && el.offsetTop < player.offsetTop + player.offsetHeight) {
        this.y = -1 * el.offsetHeight;
        el.style.left = Math.random() * document.body.offsetWidth + "px";
        this.vel = 0;
        el.style.top = -1 * el.offsetHeight + "px";
        document.body.style.background = "black";
        pSpeed = 0;
    }
    if (el.offsetTop > document.body.offsetHeight) {
        this.y = -1 * el.offsetHeight;
        el.style.left = Math.random() * document.body.offsetWidth + "px";
        this.vel = Math.random() * 10;
    }
}
setTimeout(function() {
    if (pSpeed != 0) {
        document.getElementById("instructions").style.opacity = 0;
    }
}, 2000)
document.getElementById("game").style.display = "block";
document.body.style.width = "100vw";
document.body.style.height = "100vh";
document.body.style.backgroundSize = "contain";
var LEFT = 37;
var RIGHT = 39;
var player = document.getElementById("player");
var x = player.getBoundingClientRect().left;
var keys = [];
var jams = [];
var rMs = [];
document.body.innerHTML += "<img id = 'fake-jam' class = 'jam' src = 'jam.png'>"
fakeJam = document.getElementById("fake-jam");
jamHeight = fakeJam.offsetHeight;
fakeJam.style.display = "none"
for (var i = 0; i < NUMJAMS; i++) {
    jams.push(new Jam(Math.random() * document.body.offsetWidth, -1 * jamHeight, Math.random() * 10 + 2, "jam" + i))
}
for (var i = 0; i < NUMJAMS; i++) {
    jams[i].draw();
}
for (var i = 0; i < rms; i++) {
    rMs.push(new Rm(Math.random() * document.body.offsetWidth, -1 * jamHeight, Math.random() * 10, "rm" + i))
}
for (var i = 0; i < rms; i++) {
    rMs[i].draw();
}
document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});
setInterval(function() {
    rMs.push(new Rm(Math.random() * document.body.offsetWidth, -1 * jamHeight, Math.random() * 10, "rm" + rMs.length))
    rMs[rMs.length - 1].draw();
    rms++;
}, 10000)
var draw = function() {
    if (pSpeed != 0) {
        for (var i = 0; i < jams.length; i++) {
            jams[i].update();
        }
    }
    for (var i = 0; i < rms; i++) {
        rMs[i].update();
    }
    if (keys[LEFT] === true) {
        x -= pSpeed;
    }
    if (keys[RIGHT] === true) {
        x += pSpeed;
    }
    if (x > document.body.offsetWidth) {
        x = 0;
    } else if (x < 0) {
        x = document.body.offsetWidth;
    }
    if (pSpeed === 0) {
        instructions = document.getElementById("instructions");
        instructions.style.opacity = 1;
        instructions.style.color = "white";
        instructions.innerHTML = "TypeError: PotatoChan is not of type Alive<br>Restart to try again!"
        instructions.style.zIndex = "5"
        instructions.innerHTML += "<h2>Your score: " + jamsCaught + "</h2>";
        var hi = 0;
        var data = firebase.database().ref(KEY);
        var name = ""
        var hiName = ""
        data.once('value', function(snapshot) {
            if (jamsCaught > snapshot.val().highscore) {
                name = prompt("You got a high score! What's your name?")
                firebase.database().ref(KEY+'/highscore/').set(jamsCaught);
                firebase.database().ref(KEY+'/name/').set(name);
                hi = jamsCaught;
                hiName = name;
                instructions.innerHTML += "<h2 style = 'width:100vw;'>Global highscore: " + hi + " (by " + hiName + ")</h2>";
            } else {
                hi = snapshot.val().highscore;
                hiName = snapshot.val().name;
                instructions.innerHTML += "<h2 style = 'width:100vw;'>Global highscore: " + hi + " (by " + hiName + ")</h2>";
            }
        });
        firebase.database().ref('plays').once('value', function(snapshot) {
            plays = snapshot.val();
            firebase.database().ref('plays').set(plays + 1);
        });

    }
    document.getElementById("player").style.left = x + "px";
    if (pSpeed != 0) {
        requestAnimationFrame(draw);
    }
};
requestAnimationFrame(draw);