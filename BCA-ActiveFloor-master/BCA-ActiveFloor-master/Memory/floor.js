/*jslint browser: true*/
/*global $, jQuery*/
var myInterval;
var $item, ledsX, ledsY, sensorsX, sensorsY, ledPerSensorX, ledPerSensorY, xCenter, yCenter;
var dataHolderArray = [];
var charSearch = '*';
var charDivide = ',';
var canvas, context2D;
var refreshTime = 17;
var shapes = [];
var visible = [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false]
];
var visibleTimer = 0;
var solved = [[false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false]];
var startTime = (new Date()).getTime();
var currentTime;
var finalTime = 0;
var restartBtn = false;

function drawObj(xPos, yPos, size, numShape, canSee, solved) {
    'use strict';

    context2D.fillStyle = 'grey';
    context2D.fillRect(xPos, yPos, size, size);

    if (canSee || solved) {
        drawShape(xPos, yPos, size, numShape);
    }
}

function drawShape(xPos, yPos, size, numShape) {
    'use strict';

    var xPos2 = xPos + 3;
    var yPos2 = yPos + 3;
    var size2 = size - 6;

    switch (numShape) {
        case 0:
            context2D.fillStyle = 'black';
            context2D.beginPath();
            context2D.arc(xPos2 + size2 / 2, yPos2 + size2 / 2, size2 / 2, 0, 2 * Math.PI);
            context2D.fill();
            break;
        case 1:
            context2D.fillStyle = 'yellow';
            context2D.fillRect(xPos2, yPos2, size2, size2);
            break;
        case 2:
            context2D.fillStyle = 'green';
            context2D.beginPath();
            context2D.arc(xPos2 + size2 / 2, yPos2 + size2 / 2, size2 / 2, 0, 2 * Math.PI);
            context2D.fill();
            break;
        case 3:
            context2D.fillStyle = 'purple';
            context2D.beginPath();
            context2D.arc(xPos2 + size2 / 2, yPos2 + size2 / 2, size2 / 2, 0, 2 * Math.PI);
            context2D.fill();
            break;
        case 4:
            context2D.fillStyle = 'red';
            context2D.fillRect(xPos2, yPos2, size2, size2);
            break;
        case 5:
            context2D.fillStyle = 'pink';
            context2D.beginPath();
            context2D.arc(xPos2 + size2 / 2, yPos2 + size2 / 2, size2 / 2, 0, 2 * Math.PI);
            context2D.fill();
            break;
        case 6:
            context2D.fillStyle = 'blue';
            context2D.fillRect(xPos2, yPos2, size2, size2);
            break;
        case 7:
            context2D.fillStyle = 'white';
            context2D.fillRect(xPos2, yPos2, size2, size2);
            break;
        default:
            break;

    }


}

function drawCanvas(arr) {
    'use strict';
    canvas = document.getElementById('floorCanvas');
    canvas.width = ledsX;
    canvas.height = ledsY;
    context2D = canvas.getContext('2d');

    var i, tempRow, j, tempX, tempY;
    for (i = 0; i < shapes.length; i += 1) {
        tempRow = shapes[i];

        for (j = 0; j < tempRow.length; j += 1) {

            // * 6 makes 4 separate squares; + ledPerSensor centers
            tempX = j * ledPerSensorX * 6 + ledPerSensorX;
            tempY = i * ledPerSensorY * 6 + ledPerSensorY;
            var shapeArrayIndexValue = shapes[i][j];
            drawObj(tempX, tempY, 4 * ledPerSensorX, shapeArrayIndexValue, visible[i][j], solved[i][j]);
        }
    }

    // timer
    var time = Math.floor((currentTime - startTime) / 1000);
    var seconds = time % 60;
    var minutes = Math.floor(time / 60);

    context2D.fillStyle = 'white';
    if (seconds < 10) {
        context2D.fillText(minutes + ":0" + seconds, (canvas.width / 2 - (context2D.measureText(minutes + ":" + seconds).width / 2)),
            canvas.height / 2);
    }

    else {
        context2D.fillText(minutes + ":" + seconds, (canvas.width / 2 - (context2D.measureText(minutes + ":" + seconds).width / 2)),
            canvas.height / 2);
    }

    if (allTrue(solved)) {
        if (finalTime == 0)
            finalTime = Math.floor((currentTime - startTime) / 1000);
        endScreen();
    }

}


function refreshXML() {
    'use strict';
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

        var numSelected = 0;
        var selectedCells = [];
        var cellX1, cellY1, cellX2, cellY2;

        // timer on colored squares
        // while elements in visible array are above 0, will draw colored shape
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (visible[i][j] && solved[i][j] == false) {

                    // sets up for comparison
                    selectedCells[numSelected] = shapes[i][j];

                    if (numSelected == 0) {
                        cellX1 = i;
                        cellY1 = j;
                    }
                    else if (numSelected == 1) {
                        cellX2 = i;
                        cellY2 = j;
                    }
                    numSelected++;
                }
            }
        }

        // makes two selected squares have same timer
        if (numSelected == 2) {
            if (visibleTimer <= 0)
                visibleTimer = 1500;
            else {
                visibleTimer -= refreshTime;
                if (visibleTimer <= 0) {
                    visible = [
                        [false, false, false, false],
                        [false, false, false, false],
                        [false, false, false, false],
                        [false, false, false, false]
                    ];
                }
            }
            if (selectedCells[0] === selectedCells[1]) {
                solved[cellX1][cellY1] = true;
                solved[cellX2][cellY2] = true;
            }
        }


        //draws colored shape
        // if sensors are stepped on, will convert sensor pos to array pos
        for (var i = 0; i < sensorsX; i++) {
            if (i % 6 == 0 || i % 6 == 5)
                continue;

            for (var j = 0; j < sensorsY; j++) {
                if (j % 6 == 0 || j % 6 == 5)
                    continue;
                if (dataHolderArray[i][j] === charSearch) {
                    var k = Math.floor(i / 6);
                    var t = Math.floor(j / 6);
                    // draws colored shape and sets timer
                    if (numSelected < 2) {
                        visible[k][t] = true;
                    }
                }
                    if (dataHolderArray[i][j] === charSearch && i>= 10 && i <= 14 && j >= 13 &&  j <= 14 && allTrue(solved))
                        setTimeout(startGame(), 3000);


            }
        }
        currentTime = (new Date()).getTime();

        drawCanvas(dataHolderArray);
    });
}

$(document).ready(function () {
    'use strict';

    // Start getting floor data automatically (assuming Floor Server is running).
    startRefresh();

    sendSemaphore(function () {
        // Clear spacing and borders.
        $("body").addClass("app");
        $("div").addClass("app");
        $("#floorCanvas").addClass("app");

    });

    startGame();


});

function startRefresh() {
    'use strict';
    myInterval = setInterval(function () {
        refreshXML();
    }, refreshTime);
}

function stopRefresh() {
    'use strict';
    clearInterval(myInterval);
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

}

function allTrue(solved) {
    for (var o = 0; o < 4; o++) {
        for (var p = 0; p < 4; p++) {
            if (solved[o][p] == false)
                return false;
        }
    }

    return true;
}

function endScreen() {
    // game over sign
    context2D.fillStyle = 'grey';
    context2D.fillRect(canvas.width / 4, canvas.height / 5, 95, 95);
    context2D.fillStyle = 'black';
    context2D.font = '16px serif';
    context2D.fillText("Game Over", (canvas.width / 2 - (context2D.measureText('Game Over').width / 2)), canvas.height / 4 + 10);

    // timer
    // var time = Math.floor((currentTime - startTime) / 1000);
    var seconds = finalTime % 60;
    var minutes = Math.floor(finalTime / 60);

    if (seconds < 10) {
        context2D.fillText(minutes + ":0" + seconds, (canvas.width / 2 - (context2D.measureText(minutes + ":" + seconds).width / 2)),
            canvas.height / 4 + 35);
    }

    else {
        context2D.fillText(minutes + ":" + seconds, (canvas.width / 2 - (context2D.measureText(minutes + ":" + seconds).width / 2)),
            canvas.height / 4 + 35);
    }

    // restart button
    context2D.rect(canvas.width / 2 - (context2D.measureText('Restart').width / 2), canvas.height / 4 + 50, context2D.measureText("Restart").width, 20);
    context2D.stroke();
    context2D.fillText("Restart", (canvas.width / 2 - (context2D.measureText('Restart').width / 2)), canvas.height / 4 + 63);
}

function startGame() {
    var numArry1 = [
        0, 0, 1, 1,
        2, 2, 3, 3,
        4, 4, 5, 5,
        6, 6, 7, 7
    ];


    shuffle(numArry1);

    // assigns shuffled array to new array
    shapes = [
        [numArry1[0], numArry1[1], numArry1[2], numArry1[3]],
        [numArry1[4], numArry1[5], numArry1[6], numArry1[7]],
        [numArry1[8], numArry1[9], numArry1[10], numArry1[11]],
        [numArry1[12], numArry1[13], numArry1[14], numArry1[15]]
    ];

    for (var e = 0; e < 4; e++) {
        for (var q = 0; q < 4; q++) {
            visible[e][q] = false;
            solved[e][q] = false;
        }
    }
    restartBtn = false;
    startTime = (new Date()).getTime();
    finalTime = 0;
}
