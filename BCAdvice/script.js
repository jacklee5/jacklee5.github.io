classes = ["Freshmen","Sophomores","Juniors","Seniors"]
        var targetToString = function(targets){
            string = ""
            for(var i = 0; i < targets.length; i++){
                string+=classes[targets[i]]
                if(i!=targets.length-1&&targets.length>2){
                    string+=", "
                }
                if(targets.length>1&&i == targets.length-2){
                    string+=" and "
                }
            }
            return string;
        }
        var upVotes = [];
        var upVoted = [];
        var upVote = function(key){
            var exists = false;
            for(var i = 0; i < upVoted.length; i++){
                if(upVoted[i] === key){
                    exists = true;
                    
                }
                
            }
            if(!exists){
                firebase.database().ref("posts/"+key+"/up").once("value",function(snapshot){
                    firebase.database().ref("posts/"+key+"/up").set(snapshot.val()+1);
                });
                upVoted.push(key);
                console.log(upVoted)
            }
            for (var i = 0; i < upVotes.length; i++){
                var el = document.getElementById(upVotes[i]).getElementsByClassName("up")[0];
                el.style.color = "#1976d2";
            }
            for (var i = 0; i < downVotes.length; i++){
                var el = document.getElementById(downVotes[i]).getElementsByClassName("down")[0];
                el.style.color = "#1976d2";
            }
        }
        var newUpVote = function(key){
            var exists = false;
            for(var i = 0; i < upVotes.length; i++){
                if(upVotes[i] === key){
                    exists = true;
                }
            }
            if(!exists){
                upVotes.push(key);
                upVote(key)
            }
        }
        var downVotes = [];
        var downVoted = [];
        var downVote = function(key){
            var exists = false;
            for(var i = 0; i < downVoted.length; i++){
                if(downVoted[i] === key){
                    exists = true;
                    
                }
                
            }
            if(!exists){
                firebase.database().ref("posts/"+key+"/down").once("value",function(snapshot){
                    firebase.database().ref("posts/"+key+"/down").set(snapshot.val()+1);
                });
                downVoted.push(key);
                console.log(upVoted)
            }
            for (var i = 0; i < downVotes.length; i++){
                var el = document.getElementById(downVotes[i]).getElementsByClassName("down")[0];
                el.style.color = "#1976d2";
            }
            for (var i = 0; i < upVotes.length; i++){
                var el = document.getElementById(upVotes[i]).getElementsByClassName("up")[0];
                el.style.color = "#1976d2";
            }
        }
        var newDownVote = function(key){
            var exists = false;
            for(var i = 0; i < downVotes.length; i++){
                if(downVotes[i] === key){
                    exists = true;
                }
            }
            if(!exists){
                downVotes.push(key);
                downVote(key)
            }
        }
        var addPost = function(config){
            targets = config[0];
            text = config[1];
            ups = config[2]||0;
            downs = config[3]||0;
            key = config[4];
            document.getElementById("learn1").innerHTML+="<div id = '"+key+"' class = 'card'><div style = 'font-size:12px;'><span style = 'color:rgba(0,0,0,0.7);font-weight:500;'>TO</span> <b class = 'target'>"+targetToString(targets)+":</b></div><br>"+text+"<br><br><i onclick = 'newUpVote(\""+key+"\")' class = 'material-icons up'>thumb_up</i><span class= 'ups'>"+ups+"</span><i onclick = 'newDownVote(\""+key+"\")' class = 'material-icons down'>thumb_down</i><span class = 'downs'>"+downs+"</span></div>"
        }
        var post = function(){
            var body = document.getElementById("input").value;
            var checkboxes = document.querySelectorAll("input[type=checkbox]");
            var targets = [];
            for (var i = 0; i < checkboxes.length; i++){
                if(checkboxes[i].checked){
                    targets.push(i);
                }
            }
            writeNewPost(body,targets);
            document.getElementById("input").value="";
        };
        var ref = firebase.database().ref("posts");
        var posts = [];
        ref.on("value",function(snapshot) {
            posts = [];
            document.getElementById("learn1").innerHTML=""
            for (var i in snapshot.val()){
                posts.push([snapshot.val()[i].targets,snapshot.val()[i].body,snapshot.val()[i].up,snapshot.val()[i].down,i]);
            }
            posts = posts.reverse();
            for (var i = 0; i < posts.length; i++){
                addPost(posts[i])
            }
          });
        
        var checks = document.getElementsByClassName("checkbox");
        for (var i = 0; i < checks.length; i++) {
            checks[i].addEventListener("click", function() {
                el = this.getElementsByClassName("ripple")[0]
                el.className += " ripple-animate";
                setTimeout(function() {
                    el.className = "ripple";
                }, 300)
            })
        }
        function writeNewPost(body, targets) {
          // A post entry.
          var postData = {
            body: body,
            targets: targets,
            up: 0,
            down: 0
          };

          // Get a key for a new Post.
          var newPostKey = firebase.database().ref().child('posts').push().key;

          // Write the new post's data simultaneously in the posts list and the user's post list.
          var updates = {};
          updates['/posts/' + newPostKey] = postData;

          return firebase.database().ref().update(updates);
        }
        var input = document.getElementById("input");
        input.addEventListener("keydown", function (e) {
            if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
                post();
            }
        });
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