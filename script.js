const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
  {
    name: 'quran-1',
    diaplayName: 'Al-Rahman',
    artist: 'Edres Abkar',
  },
  {
    name: 'quran-2',
    diaplayName: 'Maram',
    artist: 'Anas Abkar',
  },
  {
    name: 'quran-3',
    diaplayName: 'Fater',
    artist: 'Yaser Abkar',
  },
  {
    name: 'quran-4',
    diaplayName: 'Yseen',
    artist: 'Ali Abkar',
  }
];

// Initalize play
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM 
function loadSong(song) {
  title.textContent = song.diaplayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Change Song
function nextSong(next){
  next ? songIndex-- : songIndex++;
  if (songIndex < 0) {
    songIndex = songs.length -1;
  } else if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  console.log(songIndex, next, songs.length - 1);
  playSong();
}

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update Progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }
}

//Event Listeners
prevBtn.addEventListener('click', () => {
  nextSong(true)
});
nextBtn.addEventListener('click', () => {
  nextSong(false)
});
music.addEventListener('timeupdate', updateProgressBar);
