/*jslint browser: true*/
/*global $, jQuery*/
var myInterval;
var $item, ledsX, ledsY, sensorsX, sensorsY, ledPerSensorX, ledPerSensorY, xCenter, yCenter;
var dataHolderArray = [];
var charSearch = '*';
var charDivide = ',';
var canvas, context2D;
var refreshTime = 80;
var firstTime=true;
canType=true;

// function Restart(){
//     doneBool=true;
// }

function refresh(){
    if(active == false){
        console.log("refresh");
        // var a = document.createElement('a');
        // a.id="restart";
        // a.title = "Restart";
        // a.href = "snake.html";
        // document.body.appendChild(a);
        //
        //
        // document.getElementById('restart').click();firstTime=true;
        canType=true;

        score = 0,
        level = 0,
        direction = 0,
        snake = new Array(3),
        active = true,
        speed = 400;
        highscore=false;
        started=false;
        started=true;
        active=true;
        setTimeout(1000,startGame());
    }
}

function initCanvas(arr) {
    'use strict';

    if (firstTime){
        startCanvas();
        startGame();
        firstTime=false;
    }

    var up=0;
    var down=0;
    var left=0;
    var right=0;
    var middle=0;

    var letterCounts=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var letter;

    for (var i=0;i<arr.length;i++){
        for (var j=0;j<arr[i].length;j++){

            if (arr[i][j]==="*"){
                var tmp=hit(j,i);
                if(tmp!=-1){ //highscore
                    letterCounts[tmp]++;
                }





                if (i>=8 && i<=15 && j>=8 && j<=15) middle++;

                if (i>=0 && i<=7){
                    if (j>=8 && j<=15) up++;

                    if (j>=0 && j<=7 && j>i) up++;
                    if (j>=0 && j<=7 && j<i) left++;

                    if (j>=16 && j<=23 && i+j<23) up++;
                    if (j>=16 && j<=23 && i+j>23) right++;
                }
                else if (i>=8 && i<=15){
                    if (j>=0 && j<=7) left++;
                    else if (j>=16 && j<=23) right++;
                }

                else if(i>=16 && i<=23){
                    if (j>=8 && j<=15) down++;

                    if (j>=0 && j<=7 && i+j<23) left++;
                    if (j>=0 && j<=7 && i+j>23) down++;

                    if (j>=16 && j<=23 && i>j) down++;
                    if (j>=16 && j<=23 && i<j) right++;
                }


            }
        }
    }

    //console.log(letterCounts);
    var max=0;
    for (var i=1;i<letterCounts.length;i++){
        if (letterCounts[i]>letterCounts[max]){
            max=i;
        }
    }

    if (canType && highscore){
        switch(max){
            case 26:
                rem();
                break;
            case 27:
                done();
                break;
            default:
                if (letterCounts[max]>0){
                    type(65+max);
                }
        }
        canType=false;
        setTimeout(function(){
            canType=true;
        }, 500);
    }

    if (!active && !highscore){
        if (middle>2) refresh();
    }

    var winner=Math.max(up,down,left,right);
    var key;
    if (winner>1){
        switch (winner){
           case 0:
               key=-1;
               break;
            case up:
                key=38;
                break;
            case down:
                key=40;
                break;
            case left:
                key=37;
                break;
            case right:
                key=39;
                break;
        }
    }

    if (key!=-1)
        press(key);
    //console.log(key);
}

function startCanvas(){
    console.log("canvas");
    canvas = document.getElementById('floorCanvas');
    canvas.width = 192;
    canvas.height = 192;
    ctx = canvas.getContext('2d');
}

function refreshXML() {
    'use strict';
	// change IP address to match ActiveFloor server address
    $.get('http://activefloor.bca.bergen.org:8080/', function (data) {
        dataHolderArray = [];

        $(data).find('BLFloor').each(function () {
            $item = $(this);
            ledsX = $item.attr('ledsX');
            ledsY = $item.attr('ledsY');
            sensorsX = $item.attr('sensorsX');
            sensorsY = $item.attr('sensorsY');
            ledPerSensorX = (ledsX / sensorsX);
            ledPerSensorY = (ledsY / sensorsY);
            xCenter = ledPerSensorX / 2;
            yCenter = ledPerSensorY / 2;
        });

        $(data).find('Row').each(function () {
            var $row, rowNum, rowVal, n;
            $row = $(this);
            rowNum = $row.attr('rownum');
            rowVal = $row.attr('values');
            n = rowVal.split(charDivide).join('');

            dataHolderArray.push(n);
        });

        initCanvas(dataHolderArray);
    });
}

function startRefresh() {
    'use strict';
    myInterval = setInterval(function () {refreshXML(); }, refreshTime);
}

$(document).ready(function () {
    'use strict';
    startRefresh();

    sendSemaphore(function() {
        // Clear spacing and borders.
        $("body").addClass("app");
        $("div").addClass("app");
        $("#floorCanvas").addClass("app");

    });
});
