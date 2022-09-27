var playBtn = document.querySelector(".catalog__video-btn");
var video = document.querySelector(".catalog__video-iframe");

playBtn.addEventListener("click", function () {
  video.classList.add("catalog__video-iframe--show");
  playBtn.classList.add("catalog__video-btn--hide");
});
