var myInterval;
var $item, ledsX, ledsY, sensorsX, sensorsY, ledPerSensorX, ledPerSensorY, xCenter, yCenter;
var dataHolderArray = [];
var charSearch = '*';
var charDivide = ',';
var ctx;
var menuPage = false;
var refreshTime = 17;
var startBtn;
var firstTime = true;
var sensorDiv = 8;
var text, parser, xmlDoc;



function setObjects() {
    startBtn = {
        x: canvas.width/3 - 6,
        y: ( (canvas.height) - (canvas.height/3)) + 27,
        w: canvas.width / 3- 10,
        h: canvas.height/6 + 10,
        bx: (canvas.width / 3) - 10,
        by: (canvas.height) - (canvas.height/3) + 10,
        bw: canvas.width / 3,
        bh: canvas.height / 8,
        text: 'Step'
    },
    playBtn = {
        x: canvas.width - ctx.measureText("Play").width - 50,
        y: canvas.height - 12,
        w: ctx.measureText("Play").width,
        h: startBtn.h,
        bx: canvas.width - ctx.measureText("Play").width - 55,
        by: canvas.height - 30,
        bw: ctx.measureText("Play").width + 50,
        bh: startBtn.bh,
        text: 'Play'
    },
    rightArrow = {
        x: 0,
        y: canvas.height / 4,
        w: canvas.width / 4,
        h: startBtn.h     
    },
    leftArrow = {
        x: canvas.width - (canvas.width / 4),
        y: canvas.height / 4,
        w: canvas.width / 4,
        h: canvas.height / 4
    };
}

function drawBoard(dataArr){
  
    if(firstTime){
        initCanvas();
        setObjects();
        setLinks();
        firstTime = false;
        drawStartPage();
        console.log("first time")
    }
    if(!menuPage){
        checkForStart(dataArr);
    }
    else{
        drawMenu(dataArr);
    } 
}

function drawStartPage(){

    ctx.fillStyle = 'black';
    ctx.font = '24px Courier';
    ctx.strokeStyle = 'black';
    ctx.fillText('Welcome to', ((canvas.width / 2) - (ctx.measureText('Welcome to').width / 2)), 50);
    ctx.fillText('ATCS', ((canvas.width / 2) - (ctx.measureText('ATCS').width / 2)), 80);

    ctx.fillText(startBtn.text,startBtn.x,startBtn.y);
    ctx.strokeRect(startBtn.bx, startBtn.by, startBtn.bw, startBtn.bh)
    
}

function checkForStart(dataArr){
    
    for(var i = 0; i < dataArr.length; i++){
        for(var j = 0; j < dataArr[i].length;j++){
            if(dataArr[i][j] === "*"){
                if(i > Math.floor(startBtn.by/sensorDiv) && i < Math.floor( (startBtn.by + startBtn.bh) / sensorDiv)){
                    if(j > Math.floor(startBtn.bx / sensorDiv) && j < Math.floor( ( startBtn.bx + startBtn.bw) / sensorDiv ) ){
                        menuPage = true;
                        ctx.clearRect(0,0,canvas.width,canvas.height);
                        initMenu();
                    }
                }

            }
        }
    }
}






