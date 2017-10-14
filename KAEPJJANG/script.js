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
//SPEED UPGRADES
upgrade("speed","MIN YOONGI",5,50,"Get a Min Yoongi to shout for you");
upgrade("speed","JUNG HOSEOK",11,100,"Give your Min Yoongi some more enthusiasm");
upgrade("speed","수웩",16,150,"Proudly KAEP JJANGing since January 25, 2017 with suweg");
upgrade("speed","짱짱만뿡뿡",23,200,"JJANG JJANG MAN BBOONG BBOONG");
upgrade("speed","3 dolla",29,250,"Bribe for some KAEP JJANG");
upgrade("speed","INFIRES",500,1000,"Set the world on fire with KAEP JJANG");
//CLICK UPGRADES
upgrade("click","Amplifier",1,100,"Get more out of each shout");
upgrade("click","Broken recorder",2,175,"Get more out of each shout");
upgrade("click","Merch",3,250,"Lure some ARMY's to shout for you");
upgrade("click","INFIRES NATION",10,800,"SO MUCH POWER");
kaep = document.getElementById("kaep");
kaep.style.position="absolute";
kaep.style.top = document.getElementById("menu").offsetHeight+32+"px";
kaep.style.height = document.offsetHeight - (document.getElementById("menu").offsetHeight+64);
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
setInterval(function(){
    document.getElementById("time").innerHTML = parseInt(document.getElementById("time").innerHTML)-1;
}, 1000)
playSound("kaep.mp3");
setInterval(function(){
    playSound("kaep.mp3");
},18000)
//End the game
setTimeout(function(){
    lps = 0;
    lpc = 0;
    document.getElementById("end").style.display="block";
    document.getElementById("darken").style.display="block";
    document.body.style.overflowX = "hidden";
    document.getElementById("final-letters").innerHTML = document.getElementById("kaep").innerHTML;
    document.getElementById("final-score").innerHTML = getLetters();
    scores = firebase.database().ref("scores");
    score = scores.push({
        name: prompt("To save your score, please enter your name: "),
        score: getLetters()
    });
    firebase.database().ref('scores').once('value', function(snapshot) {
        data = [];
        for(var i in snapshot.val()){
            data.push(snapshot.val()[i]);
        }
        data = data.sort(function(a,b){return b["score"] - a["score"] });
        console.log(data);
        for(var i = 0; i < 5; i ++){
            document.getElementById("leaderboard").innerHTML+="<tr><td>"+(i+1)+"</td><td>"+data[i].name+"</td><td>"+data[i].score+"</td></tr>";
        }
    })
    firebase.database().ref('plays').once('value', function(snapshot) {
        plays = snapshot.val();
        firebase.database().ref('plays').set(plays + 1);
    });
},60000)
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