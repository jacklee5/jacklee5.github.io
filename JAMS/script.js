var NOJAMS = "you_got_no_jams.mp3";
var jamsCaught = 0;
var NUMJAMS = 5;
var rms = 5;
var pSpeed = 10;
var playSound = function(file) {
    var snd1 = new Audio();
    var src1 = document.createElement("source");
    src1.type = "audio/mpeg";
    src1.src = file;
    snd1.appendChild(src1);
    snd1.play();
}
playSound(NOJAMS);
var Jam = function(x, y, vel, id) {
    this.x = x;
    this.y = y;
    this.vel = vel;
    this.id = id;
}
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
    document.body.style.background = "black";
    document.body.innerHTML += "<img id = 'jimin' src = 'jimin.jpg'>"
    document.getElementById("jimin").style.animation = "shake .5s infinite"
    playSound("triggered.mp3");
    setTimeout(function() {
        setTimeout(function() {
            if (pSpeed != 0) {
                document.getElementById("instructions").style.opacity = 0;
            }
        }, 2000)
        document.getElementById("jimin").style.opacity = 0;
        document.getElementById("game").style.display = "block";
        document.body.style.background = "url('background.png')"
        document.body.style.width = "100vw";
        document.body.style.height = "100vh";
        document.body.style.backgroundSize = "contain";
        document.getElementById("jimin").style.display = "none";
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
                instructions.innerHTML = "<h1>You lost!</h1>Oops Rapmonster got your jams again.<br> Well at least you collected " + jamsCaught + " jams<br> before they got stolen again.<br> Reload to try again."
                instructions.style.zIndex = "5"
                instructions.innerHTML += "<h2>Your score: " + jamsCaught + "</h2>";
                var hi = 0;
                var data = firebase.database().ref('data');
                var name = ""
                var hiName = ""
                data.once('value', function(snapshot) {
                    if (jamsCaught > snapshot.val().highscore) {
                        name = prompt("You got a high score! What's your name?")
                        firebase.database().ref('data/highscore/').set(jamsCaught);
                        firebase.database().ref('data/name/').set(name);
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
    }, 2000)
}, 3500)