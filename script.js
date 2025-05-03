document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const songTitle = document.getElementById('song-title');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');
    const playlistItems = document.querySelectorAll('.playlist-item');
    
    // Canciones disponibles
    const songs = [
        {
            path: 'media/ride.mp3',
            title: 'Ride',
            duration: '3:34'
        },
        {
            path: 'media/counting.mp3',
            title: 'Counting Stars',
            duration: '4:17' 
        },
        {
            path: 'media/adventure.mp3',
            title: 'Adventure of A Life Time',
            duration: '4:23'
        },
        {
            path: 'media/demons.mp3',
            title: 'Adventure of A Life Time',
            duration: '2:54'
        },
        {
            path: 'media/sugar.mp3',
            title: 'Sugar',
            duration: '4:24'
        },
        
    ];
    
    // Variables del reproductor
    let currentSongIndex = 0;
    let isPlaying = false;
    const audio = new Audio();
    
    // Inicializar reproductor
    function initPlayer() {
        loadSong(currentSongIndex);
        
        // Event listeners
        playBtn.addEventListener('click', togglePlay);
        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', nextSong);
        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', nextSong);
        audio.addEventListener('loadedmetadata', updateSongInfo);
        progressBar.addEventListener('click', setProgress);
        
        // Playlist click events
        playlistItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentSongIndex = index;
                loadSong(currentSongIndex);
                playSong();
            });
        });
    }   
    
    // Cargar canción
    function loadSong(index) {
        audio.src = songs[index].path;
        songTitle.textContent = songs[index].title;
        durationEl.textContent = songs[index].duration;
        
        // Actualizar item activo en playlist
        playlistItems.forEach(item => item.classList.remove('active'));
        playlistItems[index].classList.add('active');
    }
    
    // Reproducir canción
    function playSong() {
        isPlaying = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        audio.play();
    }
    
    // Pausar canción
    function pauseSong() {
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        audio.pause();
    }
    
    // Alternar play/pause
    function togglePlay() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }
    
    // Canción anterior
    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1;
        }
        loadSong(currentSongIndex);
        playSong();
    }
    
    // Siguiente canción
    function nextSong() {
        currentSongIndex++;
        if (currentSongIndex > songs.length - 1) {
            currentSongIndex = 0;
        }
        loadSong(currentSongIndex);
        playSong();
    }
    
    // Actualizar barra de progreso
    function updateProgress() {
        const { currentTime, duration } = audio;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Actualizar tiempos
        currentTimeEl.textContent = formatTime(currentTime);
    }
    
    // Actualizar información de la canción
    function updateSongInfo() {
        durationEl.textContent = formatTime(audio.duration);
    }
    
    // Formatear tiempo (mm:ss)
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Establecer progreso al hacer clic en la barra
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }
    
    // Iniciar el reproductor
    initPlayer();
    
    // Funcionalidad del modal de video
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
    
    // Cerrar modal al hacer click fuera del contenido
    document.getElementById('video-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // Funcionalidad de las historias
    window.openStory = function(storyId) {
        alert(`Opening story: ${storyId}\nThis would open a full-screen story reader in a real implementation.`);
        // Aquí iría la lógica para cargar y mostrar la historia seleccionada
    };
    
    // Funcionalidad de los juegos
    window.startGame = function(gameId) {
        alert(`Starting game: ${gameId}\nThis would launch an interactive game in a real implementation.`);
        // Aquí iría la lógica para iniciar el juego seleccionado
    };
    
    // Efecto de scroll suave para los enlaces del menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Actualizar enlace activo
            document.querySelectorAll('.navbar a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Animación al cargar la página
    setTimeout(() => {
        document.querySelector('.banner-content').style.opacity = '1';
        document.querySelector('.banner-content').style.transform = 'translateY(0)';
    }, 300);

// Detectar cambios de tamaño para ajustar elementos
function handleResponsiveChanges() {
    const windowWidth = window.innerWidth;
    
    // Ajustar el número de columnas en grids dinámicamente
    const videoGrid = document.querySelector('.video-grid');
    const gamesGrid = document.querySelector('.games-grid');
    
    if (windowWidth < 600) {
        // Para móviles pequeños, una columna
        if (videoGrid) videoGrid.style.gridTemplateColumns = '1fr';
        if (gamesGrid) gamesGrid.style.gridTemplateColumns = '1fr';
    } else if (windowWidth < 900) {
        // Para tablets pequeñas, dos columnas
        if (videoGrid) videoGrid.style.gridTemplateColumns = '1fr 1fr';
        if (gamesGrid) gamesGrid.style.gridTemplateColumns = '1fr 1fr';
    } else {
        // Para pantallas grandes, grid automático
        if (videoGrid) videoGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(280px, 1fr))';
        if (gamesGrid) gamesGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
    }
    
    // Ajustar altura del banner en móviles landscape
    if (window.innerHeight < 500 && window.innerWidth > window.innerHeight) {
        document.querySelector('.banner').style.minHeight = 'auto';
    } else {
        document.querySelector('.banner').style.minHeight = '';
    }
}

// Ejecutar al cargar y al cambiar tamaño
window.addEventListener('load', handleResponsiveChanges);
window.addEventListener('resize', handleResponsiveChanges);

// Mejorar el modal para móviles
function adjustModalForMobile() {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('modal-video');
    
    if (window.innerWidth < 768) {
        // En móviles, hacer video de ancho completo
        if (video) {
            video.style.maxHeight = 'auto';
            video.style.height = 'auto';
        }
        if (modal) {
            modal.style.alignItems = 'flex-start';
            modal.style.paddingTop = '20px';
        }
    } else {
        // Restaurar valores por defecto
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

// Función para abrir video de YouTube
function playYouTubeVideo(videoId, title) {
    const modal = document.getElementById('youtube-modal');
    const titleElement = document.getElementById('youtube-modal-title');
    const playerContainer = document.getElementById('youtube-player');
    
    // Actualizar el título del modal
    titleElement.textContent = title;
    
    // Crear el iframe de YouTube
    playerContainer.innerHTML = `
        <iframe width="100%" height="400" 
                src="https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
        </iframe>
    `;
    
    // Mostrar el modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Evitar scroll en el fondo
}

// Función para cerrar el modal de YouTube
function closeYouTubeModal() {
    const modal = document.getElementById('youtube-modal');
    const playerContainer = document.getElementById('youtube-player');
    
    // Detener el video al cerrar el modal
    const iframe = playerContainer.querySelector('iframe');
    if (iframe) {
        iframe.src = ''; // Esto detiene la reproducción
    }
    
    // Ocultar el modal
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaurar scroll
}

// Cerrar modal al hacer clic fuera del contenido
document.getElementById('youtube-modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeYouTubeModal();
    }

    function openNewTab(url) {
        // Aquí se abriría la URL en una nueva pestaña
        window.open(url, '_blank');
    }
});
