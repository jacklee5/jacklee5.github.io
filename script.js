/*
<a href = "https://jacklee5.github.io/DINGDONG" target = "blank">
                <div class = "card">
                    <h1>DiIIiIiINnNNNgGGgGgGg DDDDDDdDdOoOOonnnNNgggGgg</h1>
                </div> 
            </a>*/
var addProject = function(title,url){
    document.getElementById("projects").innerHTML += "<a href = '"+url+"' target = 'blank'><div class = 'card'><h1>"+title+"</h1></div></a>";
}
firebase.database().ref("projects").once("value",function(snapshot){
    for(var i in snapshot.val()){
        addProject(snapshot.val()[i].title,snapshot.val()[i].url);
    }
})
var pages = document.querySelectorAll(".page");
var active = 0;
var navLinks = document.querySelectorAll("nav a")
var showPage = function(index) {
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = "none"
    }
    pages[index].style.display = "block"
}
var navLink = function(index) {
    navLinks[index].addEventListener("click", function() {
        showPage(index + 1)
    })
}
for (var i = 0; i < navLinks.length; i++) {
    navLink(i)
}