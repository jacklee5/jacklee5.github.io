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