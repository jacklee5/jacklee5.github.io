var commands = [
    {
        name: "!ostart",
        function: "After this command is used, all message send will be corrected to their owo-fied version"
    },
    {
        name: "!oend",
        function: "Unfortunately, this command stops the owo-fication of messages"
    },
    {
        name: "!otoggle",
        function: "Toggles whether or not messages are being owo-fied"
    },
    {
        name: "!ostatus",
        function: "Tells OwO to report on whether or not the channel you are on is being owo-fied"
    },
    {
        name: "!owo [num]",
        function: "Takes [num] amount of the previous messages and owo-fies them, or one if not specified.<br><b>Warning:</b> Extreme spam can be generated from this."
    },
    {
        name: "!ofaces [num]",
        function: "Sends [num] faces, or one if not specified.<br><b>Warning:</b> Extreme spam can be generated from this."
    }
]
var how = function(){
    var table = document.getElementById("commands");
    for(var i = 0; i < commands.length; i ++){
        table.innerHTML += "<tr><td>"+commands[i].name+"</td><td>"+commands[i].function+"</td></tr>";
        console.log(table.innerHTML)
    }
}