var getAnswer = function(){
    var other = document.getElementById("other").value.toUpperCase();
    var player = document.getElementById("player").value.toUpperCase();
    var mention = document.getElementById("mention").value;
    var out1 = document.getElementById("out-1");
    var out2 = document.getElementById("out-2");
    var answers = [];
    var moves = [];
    _types.forEach(function(val,index,arr){
        val.Multipliers.forEach(function(mult){
            if(mult.Type === other && mult.Multiplication == 2){
                answers.push(val.Name);
                moves.push(val.Moves[0]);
            }
        })
    });
    if(player.length > 0 && answers.indexOf(player) != -1){
        out1.value = ".attack " + moves[answers.indexOf(player)] + " " + mention
    }else{
        out1.value = ".settype " + answers[0].toLowerCase();
        out2.value = ".attack \"" + moves[0] + "\" " + mention
    }
};