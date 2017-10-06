var dings = document.getElementsByClassName("ding");
var numdings = 1;
var dingdong = function(x, y, xInc, yInc, index) {
    var width = document.body.offsetWidth;
    var height = document.body.offsetHeight;
    var ding = document.getElementsByClassName("ding")[index];
    var dPos = ding.getBoundingClientRect();
    ding.style.position = "absolute";
    if (dPos.top + dPos.height > height || dPos.top < 0) {
        yInc *= -1;
        var snd1 = new Audio();
        var src1 = document.createElement("source");
        src1.type = "audio/mpeg";
        src1.src = "ding_d__g.mp3";
        snd1.appendChild(src1);
        snd1.play();
    }
    if (dPos.left + dPos.width > width || dPos.left < 0) {
        xInc *= -1;
        var snd1 = new Audio();
        var src1 = document.createElement("source");
        src1.type = "audio/mpeg";
        src1.src = "ding_d__g.mp3";
        snd1.appendChild(src1);
        snd1.play();
    }
    y += yInc;
    x += xInc;
    ding.style.top = y + "px";
    ding.style.left = x + "px";
    setTimeout(function() {
        dingdong(x, y, xInc, yInc, index)
    }, 30);
};
dingdong(0, 0, Math.random() * 30, Math.random() * 30, 0);
document.body.addEventListener("click", function(event) {
    var snd1 = new Audio();
    var src1 = document.createElement("source");
    src1.type = "audio/mpeg";
    src1.src = "ding_d__g.mp3";
    snd1.appendChild(src1);
    snd1.play();
    var xInc = Math.random() * 30;
    var yInc = Math.random() * 30;
    document.body.innerHTML += "<h1 class = 'ding'>DIIINNNNGGG DDODOOOONNNGGGG</h1>";
    dingdong(event.clientX - xInc, event.clientY - yInc, xInc, yInc, numdings);
    numdings++;
    var dong = document.getElementById("dong");
    document.getElementById("container").addEventListener("mousemove", function(event) {
        dong.style.position = "absolute";
        dong.style.top = event.clientY + "px";
        dong.style.left = event.clientX + "px";
    })
})
var dong = document.getElementById("dong");
document.getElementById("container").addEventListener("mousemove", function(event) {
    dong.style.position = "absolute";
    dong.style.top = event.clientY + "px";
    dong.style.left = event.clientX + "px";
})