var classes = {
    "IGS": {
        teacher: "Wallace, Chrstine Marie",
        room: "Room 236",
        start: [8,0],
        end: [8,5],
        days:[1,2,3,4,5],
        color: "#EF9A9A"
    },
    "American Literature I" : {
        teacher: "Villanova, Donna",
        room: "Room 035",
        start: [8,7],
        end: [8,58],
        days: [1,2,4,5],
        color: "#CE93D8"
    },
    "Study Hall": {
        teacher: "Staff, 2",
        room: "Cafeteria",
        start: [9,1],
        end: [9,52],
        days: [1,3,4],
        color: "#90CAF9"
    },
    "Guidance Seminar": {
        teacher: "Natelli, Anthony",
        room: "Room 149",
        start: [9,55],
        end: [10,46],
        days: [3],
        color: "#80CBC4"
    },
    "World History" : {
        teacher: "Buccino, Andrea",
        room: "Room 237",
        start: [9,55],
        end: [10,46],
        days: [2,4,5],
        color: "#A5D6A7"
    },
    "French": {
        teacher: "Ponce, Lucia Erminia",
        room: "Room 204",
        start: [11,43],
        end: [12,34],
        days: [1,2,4,5],
        color: "#FFF59D"
    },
    "Biology": {
        teacher: "Bajwa, Ravinder",
        room: "Room 147",
        start: [12,37],
        end: [13,28],
        days: [1,2,3,4],
        color: "#FFE082"
    },
    "Intro to Comp Sci": {
        teacher: "Respass, Bryan",
        room: "Room 138",
        start: [13,31],
        end: [14,22],
        days: [1,2,3,4,5],
        color: "#FFCC80"
    },
    "Math Struct_Proofs": {
        teacher: "Pinyan, Jonathan",
        room: "Room 267",
        start: [14,25],
        end: [15,16],
        days: [1,2,3,4,5],
        color: "#FFAB91"
    },
    "-PE_X Country": {
        teacher: "Muller, William",
        room: "Field",
        start: [15,19],
        end: [16,10],
        days: [1,2,3,4,5],
        color: "#BCAAA4"
    }
}

var d,day,hour,minutes,ms,minutesSince,minutesUntil,currentClass,nextClass,classEnd,percentage,lastClass,times;

var showCurrent = function(name,teacher,room,percentage,color,overIn){
    document.querySelector("#now .name").innerHTML = name;
    document.querySelector("#now .teacher").innerHTML = teacher;
    document.querySelector("#now .room").innerHTML = room;
    document.getElementById("next").style.height = (percentage*.5 + 25) + "vh";
    document.getElementById("now").style.height = (100-percentage*.5+25) + "vh";
    document.getElementById("now").style.height = ((100-percentage)*.5+25) + "vh";
    document.getElementById("now").style.background = color;
    document.querySelector("#over .over-in").innerHTML = overIn;
    console.log(percentage)
}

var showNext = function(name,teacher,room,color){
    document.querySelector("#next .name").innerHTML = name;
    document.querySelector("#next .teacher").innerHTML = teacher;
    document.querySelector("#next .room").innerHTML = room;
    document.getElementById("next").style.background = color;
}

/*
Gets the difference between two times in minutes
Parameters:
time1: array ([hour,minutes])
time2: array ([hour,minutes])
*/
var getDiff = function(time1,time2){
    return ((time1[0] - time2[0]) * 60 + (time1[1] - time2[1]))
}

var display = function(){
    d = new Date();
    day = d.getDay();
    hour = d.getHours();
    minutes = d.getMinutes();
    seconds = d.getSeconds();
day = 10;
hour = 47;
//    minutes = 47;
    
    times = [];
    
    // Get the times until/since of each class
    for(var i in  classes){
        if(classes[i].days.indexOf(day) != -1){
            times[i] = (getDiff([hour,minutes],classes[i].start));
        }
    }
    
    // Calculate the current class
    var nows = [];
    for(var i in times){
        if(times[i] >= 0){
            nows[i] = times[i]
        }
    }
    var closest = Infinity;
    var now;
    for(var i in nows){
        if(nows[i] < closest){
            closest = nows[i];
            now = i;
        }
    }
    if(now != undefined&&getDiff([hour,minutes],classes[now].end)>0){
        now = undefined;
    }
    
    if(now != undefined){
        minutesSince = getDiff([hour,minutes],classes[now].start) + seconds/60;
        minutesUntil = getDiff(classes[i].end,classes[i].start);
        percentage = (minutesSince / minutesUntil) * 100;
        showCurrent(now,classes[now].teacher,classes[now].room,percentage,classes[now].color,Math.round(minutesUntil - minutesSince));
    }else{
        var prevs = [];
        var nexts = [];
        var times2 = [];
        for(var i in times){
            if(times[i] >= 0){
                prevs.push([i,times[i]]);
            }else{
                nexts.push([i,times[i]])
            }
            times2.push([i,times[i]]);
        }
        prevs.sort(function(a, b){return a[1]-b[1]});
        nexts.sort(function(a,b){return b[1]-a[1]});
        times2.sort(function(a,b){return a[1]-b[1]});
        var firstClass = times2[0];
        var lastClass = times2[times2.length-1];
        if(prevs != []){
            prev = prevs[0][0];
        }else{
            prev = firstClass[0]
        }
        if(nexts != []){
            next = nexts[0][0]
        }else{
            next = lastClass[0]
        }
        minutesSince = getDiff([hour,minutes],classes[prev].end) + seconds/60;
        minutesUntil = getDiff(classes[next].start,[hour,minutes]);
        percentage = (minutesSince / minutesUntil) * 100;
        showCurrent("Free!","","",percentage,"#E0E0E0",Math.round(minutesUntil - minutesSince));
        console.log("free")
    }
    
    //Calcuate the next class
    
    
//    currentClass = "";
//    percentage = 0;
//    classEnd = [];
//    nextClass = "";
//    lastClass = [0,0];
//    times = [];
//    
//    for(var i in classes){
//        if((classes[i].end[0] - lastClass[0]) * 60 + (classes[i].end[1]) > 0){
//            lastClass = classes[i].end;
//        }
//    }
//    
//    for(var i in classes){
//        minutesSince = ((hour - classes[i].start[0]) * 60 + (minutes - classes[i].start[1])) + ms/60000;
//        minutesUntil = ((classes[i].end[0] - classes[i].start[0]) * 60 + (classes[i].end[1] - classes[i].start[1]));
//        times.push(minutesSince);
//        if(minutesSince < minutesUntil && classes[i].days.indexOf(day) >= 0 && minutesSince >= 0){
//            currentClass = i;
//            percentage = ((hour - classes[i].start[0]) * 60 + (minutes - classes[i].start[1])) / ((classes[i].end[0] - classes[i].start[0]) * 60 + (classes[i].end[1] - classes[i].start[1]));
//            percentage *= 100;
//            showCurrent(i,classes[i].teacher,classes[i].room,percentage,classes[i].color,Math.round(minutesUntil - minutesSince));
//            classEnd = classes[i].end;
//        }
//    }
//    
//    times = times.filter(function(x){ return x < 0 });
//
//    for(i in classes){
//        minutesSince = ((classEnd[0] - classes[i].start[0]) * 60 + (classEnd[1] - classes[i].start[1])) + 3;
//        minutesUntil = ((classes[i].end[0] - classes[i].start[0]) * 60 + (classes[i].end[1] - classes[i].start[1]))
//        if(minutesSince < minutesUntil && classes[i].days.indexOf(day) >= 0 && minutesSince >= 0){
//            nextClass = i;
//            showNext(i,classes[i].teacher,classes[i].room,classes[i].color)
//        }
//    }
//    
//    if(currentClass === ""){
//        if(nextClass === "" && ((hour - lastClass[0]) * 60 + (minutes - lastClass[1])) > 0){
//            showCurrent("Free!","","",0,"#E0E0E0",0);
//            document.querySelector("#over").innerHTML = "You have no more classes today!";
//            document.getElementById("next").style.height = "0px"
//        }else if(nextClass === ""){
//            showNext("Free!","","","#E0E0E0");
//            percentage = ((hour - classes[nextClass].start[0]) * 60 + (minutes - classes[nextClass].start[1])) / ((classes[i].end[0] - classes[nextClass].start[0]) * 60 + (classes[nextClass].end[1] - classes[nextClass].start[1])) + ms/60000;
//            percentage *= 100;
//            showCurrent("Free!","","",percentage,"#E0E0E0");
//        }else{
//            percentage = ((hour - classes[nextClass].start[0]) * 60 + (minutes - classes[nextClass].start[1])) / ((classes[i].end[0] - classes[nextClass].start[0]) * 60 + (classes[nextClass].end[1] - classes[nextClass].start[1])) + ms/60000;
//            percentage *= 100;
//            showCurrent("Free!","","",percentage,"#E0E0E0");
//        }        
//    }
//
//    if(document.getElementById("now").offsetHeight < document.querySelector("#now .text").offsetHeight){
//        els = document.querySelectorAll("#now .text *");
//        for (var i = 0; i < els.length; i++){
//            els[i].style.display = "inline-block";
//            els[i].style.fontSize = "14px";
//        }
//    }
};

display();

setInterval(function(){
    display();
},1000)
