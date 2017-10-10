letters = [1, 2, 1, 1, 1, 1, 1, 1, 1];
spelling = "KAEPJJANG"
spelling = spelling.split("");
var temp = 9;
var lps = 0;
var lpc = 1;
var state = false;
var playSound = function(file) {
    var snd1 = new Audio();
    var src1 = document.createElement("source");
    src1.type = "audio/mpeg";
    src1.src = file;
    snd1.appendChild(src1);
    snd1.play();
}
var getLetters = function() {
    num = 0;
    for (var i = 0; i < letters.length; i++) {
        num += letters[i];
    }
    return num;
}
var setLetters = function() {
    document.getElementById("score").innerHTML = getLetters();
};
var getSpeed = function() {
    speed = (getLetters() - temp) * 2;
    temp = getLetters();
    return speed;
};
var addLetters = function(num) {
    for (var i = 0; i < num; i++) {
        if(state){
            letters[Math.floor(Math.random() * (4))] += 1;
            state = false;
        }else{
            letters[Math.floor(Math.random() * (5))+4] += 1;
            state = true;
        }
        
    }
};
var removeLetters = function(num) {
    for (var i = 0; i < num; i++) {
        if(state){
            index = Math.floor(Math.random() * (4));
            while(letters[index] < 1){
                index = Math.floor(Math.random() * (4));
            }
            letters[index] -= 1;
            state = false;
        }else{
            index = Math.floor(Math.random() * (5))+4;
            while(letters[index] < 1){
                index = Math.floor(Math.random() * (5))+4;
            }
            letters[index] -= 1;
            state = true;
        }
        
    }
}
var update = function() {
    string = "";
    for (var i = 0; i < spelling.length; i++) {
        string += spelling[i].repeat(letters[i]);
        if (i === 3) {
            string += "<br>";
        }
    }
    document.getElementById("kaep").innerHTML = string;
    setLetters();
    window.scrollTo(document.getElementById("kaep").offsetWidth, 0);
}
var canBuy = function(cost){
    return getLetters() > cost;
}
var buy = function(cost, type, up){
    if(canBuy(cost)){
        if(type === "speed"){
            lps += up;
        }else if(type === "click"){
            lpc += up;
        }
        removeLetters(cost);
        update();
    }else{
        alert("Your KAEP JJANG isn't long enough to earn this upgrade.")
    }
};
var upgrade = function(type,name,up,cost,desc){
    if(type === "speed"){
        document.getElementById("speed-ups").innerHTML+="<div title = '"+desc+"' class = 'upgrade' onclick = 'buy("+cost+",\"speed\","+up+")'><h1>"+name+"</h1><b>Cost: <span class = 'cost'>"+cost+"</span></b><p>+"+up+"lps</p></div>"
    }else if(type === "click"){
        document.getElementById("click-ups").innerHTML+="<div title = '"+desc+"' class = 'upgrade' onclick = 'buy("+cost+",\"click\","+up+")'><h1>"+name+"</h1><b>Cost: <span class = 'cost'>"+cost+"</span></b><p>+"+up+"lps</p></div>"
    }
}

upgrade("speed","MIN YOONGI",5,50,"Get a Min Yoongi to shout for you")
upgrade("click","Amplifier",1,50,"Get more out of each shout")

var upgrades = document.getElementsByClassName("upgrade");
for(var i = 0; i < upgrades.length; i++){
    upgrades[i].setAttribute("data-rippleEffect","button");
    upgrades[i].setAttribute("data-rippleEffectZIndex", "5");
}
document.getElementById("wrapper").addEventListener("click", function() {
    addLetters(lpc);
    update();
});
setInterval(function() {
    document.getElementById("speed").innerHTML = getSpeed();
    addLetters(lps/2);
    update();
    window.scrollTo(document.getElementById("kaep").offsetWidth, 0);
}, 500);
playSound("kaep.mp3");
setInterval(function(){
    playSound("kaep.mp3");
},18000)
{
// Get all the elements that requiere the effect
var rippleButton = document.querySelectorAll('[data-rippleEffect="button"]');

// The animation function
function rippleEffect(event) {

    // Getting the div that the effect is relative to
    var box = this.lastElementChild,

        // Creating the effect's div
        create = document.createElement('div'),

        // Getting the button's size, distance to top and left
        boxWidth = box.offsetWidth,
        boxHeight = box.offsetHeight,
        boxY = box.getBoundingClientRect().top,
        boxX = box.getBoundingClientRect().left,

        // Getting the mouse position
        mouseX = event.clientX,
        mouseY = event.clientY,

        // Mouse position relative to the box
        rippleX = mouseX - boxX,
        rippleY = mouseY - boxY,

        // Calculate which is the farthest corner
        rippleWidth = boxWidth / 2 < rippleX ?
        rippleX :
        boxWidth - rippleX,
        rippleHeight = boxHeight / 2 < rippleY ?
        rippleY :
        boxHeight - rippleY,

        // Distance to the farest corner
        boxSize = Math.sqrt(Math.pow(rippleWidth, 2) +
            Math.pow(rippleHeight, 2)),

        // Getting the custom background value
        color = this.getAttribute('data-rippleEffectColor'),

        // Getting the custom Z-Index value
        zIndex = this.getAttribute('data-rippleEffectZIndex'),

        // Getting the button computed style
        thisStyle = window.getComputedStyle(this);

    // Creating and moving the effect div inside the button
    box.appendChild(create);

    // Ripple style (size, position, color and border-radius)
    create.setAttribute('data-rippleEffect', 'effect');
    create.style.height = 2 * boxSize + 'px';
    create.style.width = 2 * boxSize + 'px';
    create.style.top = mouseY - boxY - boxSize + 'px';
    create.style.left = mouseX - boxX - boxSize + 'px';
    create.style.backgroundColor = color;
    box.style.borderTopLeftRadius =
        thisStyle.getPropertyValue('border-top-left-radius');
    box.style.borderTopRightRadius =
        thisStyle.getPropertyValue('border-top-right-radius');
    box.style.borderBottomLeftRadius =
        thisStyle.getPropertyValue('border-bottom-left-radius');
    box.style.borderBottomRightRadius =
        thisStyle.getPropertyValue('border-bottom-right-radius');
    box.style.zIndex = zIndex;

    // Delete  div after animation finished
    setTimeout(function() {
        box.removeChild(create);
    }, 800);
}

window.onload = function() {
    // Adding to all the elements the necesary div and the event listener to run
    // the animation
    for (i = 0; i < rippleButton.length; i++) {
        var create = document.createElement('div');

        // Adding the listener to run the effect
        rippleButton[i].addEventListener('mousedown', rippleEffect);


        // Creating a div inside the mask-div to be the reference for the ripple
        // position
        rippleButton[i].appendChild(create);
        create.setAttribute('data-rippleEffect', 'box');
    }
}
}