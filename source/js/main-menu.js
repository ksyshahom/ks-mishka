var menuBtn = document.querySelector(".page-header__menu-opener");
var pageHeader = document.querySelector(".page-header");

pageHeader.classList.remove("page-header--menu-nojs");
pageHeader.classList.add("page-header--menu-closed");

menuBtn.addEventListener("click", function (){
  if (pageHeader.classList.contains("page-header--menu-closed")) {
    pageHeader.classList.remove("page-header--menu-closed");
    pageHeader.classList.add("page-header--menu-opened");
  }
  else {
    pageHeader.classList.add("page-header--menu-closed");
    pageHeader.classList.remove("page-header--menu-opened");
  }
});
