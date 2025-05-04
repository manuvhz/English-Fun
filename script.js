document.addEventListener('DOMContentLoaded', function() {

    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const songTitle = document.getElementById('song-title');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');
    const playlistItems = document.querySelectorAll('.playlist-item');
    

    const songs = [
        {
            path: 'https://raw.githubusercontent.com/manuvhz/English-Fun/main/Media/ride.mp3',
            title: 'Ride',
            duration: '3:34'
        },
        {
            path: 'https://raw.githubusercontent.com/manuvhz/English-Fun/main/Media/counting.mp3',
            title: 'Counting Stars',
            duration: '4:17' 
        },
        {
            path: 'https://raw.githubusercontent.com/manuvhz/English-Fun/main/Media/adventure.mp3',
            title: 'Adventure of A Life Time',
            duration: '4:23'
        },
        {
            path: 'https://raw.githubusercontent.com/manuvhz/English-Fun/main/Media/demons.mp3',
            title: 'Demons',
            duration: '2:54'
        },
        {
            path: 'https://raw.githubusercontent.com/manuvhz/English-Fun/main/Media/sugar.mp3',
            title: 'Sugar',
            duration: '4:24'
        },
        
    ];
    

    let currentSongIndex = 0;
    let isPlaying = false;
    const audio = new Audio();
    

    function initPlayer() {
        loadSong(currentSongIndex);
        

        playBtn.addEventListener('click', togglePlay);
        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', nextSong);
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', nextSong);
        audio.addEventListener('loadedmetadata', updateSongInfo);
        progressBar.addEventListener('click', setProgress);
        

        playlistItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                playSong();
            });
        });
    }   
    

    function loadSong(index) {
        audio.src = songs[index].path;
        songTitle.textContent = songs[index].title;
        durationEl.textContent = songs[index].duration;
        

        playlistItems.forEach(item => item.classList.remove('active'));
        playlistItems[index].classList.add('active');
    }
    

    function playSong() {
        isPlaying = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        audio.play();
    }
    

    function pauseSong() {
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        audio.pause();
    }
    

    function togglePlay() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }
    

    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1;
        }
        loadSong(currentSongIndex);
        playSong();
    }
    

    function nextSong() {
        currentSongIndex++;
        if (currentSongIndex > songs.length - 1) {
            currentSongIndex = 0;
        }
        loadSong(currentSongIndex);
        playSong();
    }
    

    function updateProgress() {
        const { currentTime, duration } = audio;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        

        currentTimeEl.textContent = formatTime(currentTime);
    }
    

    function updateSongInfo() {
        durationEl.textContent = formatTime(audio.duration);
    }
    

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
    

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }

    initPlayer();
    

    window.playVideo = function(videoSrc, title) {
        const modal = document.getElementById('video-modal');
        const video = document.getElementById('modal-video');
        const videoTitle = document.getElementById('video-modal-title');
        
        video.src = videoSrc;
        videoTitle.textContent = title;
        modal.style.display = 'flex';
        video.play();
    };
    
    window.closeModal = function() {
        const modal = document.getElementById('video-modal');
        const video = document.getElementById('modal-video');
        
        video.pause();
        modal.style.display = 'none';
    };
    

    document.getElementById('video-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    

    window.openStory = function(storyId) {
        alert(`Opening story: ${storyId}\nThis would open a full-screen story reader in a real implementation.`);
        
    };
    

    window.startGame = function(gameId) {
        alert(`Starting game: ${gameId}\nThis would launch an interactive game in a real implementation.`);

    };
    

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            

            document.querySelectorAll('.navbar a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    

    setTimeout(() => {
        document.querySelector('.banner-content').style.opacity = '1';
        document.querySelector('.banner-content').style.transform = 'translateY(0)';
    }, 300);


function handleResponsiveChanges() {
    const windowWidth = window.innerWidth;
    

    const videoGrid = document.querySelector('.video-grid');
    const gamesGrid = document.querySelector('.games-grid');
    
    if (windowWidth < 600) {

        if (videoGrid) videoGrid.style.gridTemplateColumns = '1fr';
        if (gamesGrid) gamesGrid.style.gridTemplateColumns = '1fr';
    } else if (windowWidth < 900) {

        if (videoGrid) videoGrid.style.gridTemplateColumns = '1fr 1fr';
        if (gamesGrid) gamesGrid.style.gridTemplateColumns = '1fr 1fr';
    } else {

        if (videoGrid) videoGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
        if (gamesGrid) gamesGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
    }
    

    if (window.innerHeight < 500 && window.innerWidth > window.innerHeight) {
        document.querySelector('.banner').style.minHeight = 'auto';
    } else {
        document.querySelector('.banner').style.minHeight = '';
    }
}


window.addEventListener('load', handleResponsiveChanges);
window.addEventListener('resize', handleResponsiveChanges);


function adjustModalForMobile() {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('modal-video');
    
    if (window.innerWidth < 768) {

        if (video) {
            video.style.maxHeight = 'auto';
            video.style.height = 'auto';
        }
        if (modal) {
            modal.style.alignItems = 'flex-start';
            modal.style.paddingTop = '20px';
        }
    } else {

        if (video) {
            video.style.maxHeight = '';
            video.style.height = '';
        }
        if (modal) {
            modal.style.alignItems = '';
            modal.style.paddingTop = '';
        }
    }
}


window.addEventListener('resize', adjustModalForMobile);
window.addEventListener('orientationchange', adjustModalForMobile);


const volumeControl = document.getElementById('volume');
volumeControl.addEventListener('input', function() {
    audio.volume = this.value;
});



});


function playYouTubeVideo(videoId, title) {
    const modal = document.getElementById('youtube-modal');
    const titleElement = document.getElementById('youtube-modal-title');
    const playerContainer = document.getElementById('youtube-player');
    

    titleElement.textContent = title;
    

    playerContainer.innerHTML = `
        <iframe width="100%" height="400" 
                src="https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
        </iframe>
    `;
    
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
}


function closeYouTubeModal() {
    const modal = document.getElementById('youtube-modal');
    const playerContainer = document.getElementById('youtube-player');
    
    const iframe = playerContainer.querySelector('iframe');
    if (iframe) {
        iframe.src = ''; 
    }
   
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; 
}


document.getElementById('youtube-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeYouTubeModal();
    }

    function openNewTab(url) {
       
        window.open(url, '_blank');
    }
});

function toggleMenu() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
    
   
    const toggleBtn = document.querySelector('.menu-toggle');
    if (navbar.classList.contains('active')) {
        toggleBtn.innerHTML = '✕';
    } else {
        toggleBtn.innerHTML = '☰';
    }
}


document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navbar').classList.remove('active');
        document.querySelector('.menu-toggle').innerHTML = '☰';
    });

    const audio = new Audio();
audio.crossOrigin = "anonymous";


function toggleMenu() {
    const navbar = document.getElementById('navbar');
    const body = document.body;
    
    navbar.classList.toggle('active');
    
    
    if (navbar.classList.contains('active')) {
        body.style.overflow = 'hidden';
        document.querySelector('.menu-toggle').innerHTML = '✕';
    } else {
        body.style.overflow = 'auto';
        document.querySelector('.menu-toggle').innerHTML = '☰';
    }
}

function toggleMenu() {
    const navbar = document.getElementById('navbar');
    const body = document.body;
    const toggleBtn = document.querySelector('.menu-toggle');
    
    navbar.classList.toggle('active');
    
    if (navbar.classList.contains('active')) {
        body.style.overflow = 'hidden';
        toggleBtn.innerHTML = '✕';
        toggleBtn.style.position = 'fixed';
        toggleBtn.style.right = '20px';
        toggleBtn.style.top = '20px';
    } else {
        body.style.overflow = 'auto';
        toggleBtn.innerHTML = '☰';
        toggleBtn.style.position = 'static';
    }
}


document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navbar').classList.remove('active');
        document.body.style.overflow = 'auto';
        document.querySelector('.menu-toggle').innerHTML = '☰';
        document.querySelector('.menu-toggle').style.position = 'static';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const body = document.body;
    
    hamburger.addEventListener('click', function() {

        this.classList.toggle('active');
        navbar.classList.toggle('active');
        
       o
        if (navbar.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    });
    
   
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
                body.style.overflow = 'auto';
            });
        });
    }
});

});

