var videoWrapper = document.querySelector(".catalog__video");
var playBtn = videoWrapper.querySelector(".catalog__video-btn");

var video = document.createElement("video");
video.setAttribute("controls","")
var videoSource = document.createElement("source");
videoSource.setAttribute("src","img/catalog/Production1.mp4")
videoSource.setAttribute("type","video/mp4")
var videoText = document.createTextNode("Your browser does not support the video tag.");
video.appendChild(videoSource);
video.appendChild(videoText);

playBtn.addEventListener("click", function () {
  videoWrapper.appendChild(video);
  video.classList.add("catalog__video-iframe");
  playBtn.classList.add("catalog__video-btn--hide");
  video.play();
});
