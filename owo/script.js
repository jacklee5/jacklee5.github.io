includeHTML = function(cb) {
  var z, i, elmnt, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          elmnt.innerHTML = this.responseText;
          elmnt.removeAttribute("w3-include-html");
          var arr = elmnt.getElementsByTagName('script')
          for (var n = 0; n < arr.length; n++)
            eval(arr[n].innerHTML)
          includeHTML(cb);
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
  if (cb) cb();
};
var pages = document.getElementsByClassName("page");
var page = 0;
var showPage = function(file){
    pages[(page - 1) * -1].style.display = "none";
    pages[(page - 1) * -1].innerHTML = "";
    pages[page].style.display = "block";
    pages[page].setAttribute("w3-include-html", file);
    current = file;
    includeHTML();
    page = (page - 1) * -1;
}
var navLinks = document.querySelectorAll("nav a");
var navLink = function(i){
    navLinks[i].addEventListener("click", function(){
        showPage(files[i])
    });
}
for(var i = 0; i < navLinks.length; i++){
    navLink(i);
}