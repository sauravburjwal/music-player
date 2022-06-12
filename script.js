const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

const songs = ["hey", "summer", "ukulele"];

let songIndex = 2;
loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add("play");

  playBtn.innerHTML = `
  <i class="fas fa-pause"></i>
  `;

  audio.play();
}
function pauseSong() {
  musicContainer.classList.remove("play");
  // playBtn.querySelector("i.fas").classList.remove("fa-pause");
  // playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.innerHTML = `
  <i class="fas fa-play"></i>
  `;
  audio.pause();
}

function updateProgress(e) {
  const { currentTime, duration } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function nextSong() {
  if (songIndex < songs.length - 1) {
    songIndex++;
  } else {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function prevSong() {
  if (songIndex !== 0) {
    songIndex--;
  } else {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
//Event Listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);

/////////////////////////////
//  COMPLETED
