document.addEventListener('DOMContentLoaded', () => {
    // Código para as abas
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.dataset.tab;

            tabContents.forEach(content => {
                content.style.display = 'none';
            });

            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            document.getElementById(`tab-${tab}`).style.display = 'block';
            button.classList.add('active');
        });
    });

    // Função para iniciar a câmera
    const iniciarCamera = (videoId, canvasId, captureBtnId) => {
        const video = document.getElementById(videoId);
        const captureBtn = document.getElementById(captureBtnId);
        
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                video.style.display = 'block';
                captureBtn.disabled = false;
            })
            .catch(err => {
                console.error("Erro ao acessar a câmera: ", err);
                alert("Erro ao acessar a câmera. Verifique as permissões.");
            });
    };

    // Função para capturar a foto
    const capturarFoto = (videoId, canvasId, photoResultId) => {
        const video = document.getElementById(videoId);
        const canvas = document.getElementById(canvasId);
        const photoResult = document.getElementById(photoResultId);
        const context = canvas.getContext('2d');
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const photoDataURL = canvas.toDataURL('image/png');
        photoResult.src = photoDataURL;
        photoResult.style.display = 'block';

        // Opcional: Parar o stream da câmera após a captura
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
        video.style.display = 'none';
    };

    // Eventos para a aba de Visitantes
    const iniciarCameraVisitanteBtn = document.getElementById('iniciar-camera-btn');
    const capturarFotoVisitanteBtn = document.getElementById('capturar-foto-btn');
    
    if (iniciarCameraVisitanteBtn) {
        iniciarCameraVisitanteBtn.addEventListener('click', () => {
            iniciarCamera('camera-video', 'photo-canvas', 'capturar-foto-btn');
        });
    }

    if (capturarFotoVisitanteBtn) {
        capturarFotoVisitanteBtn.addEventListener('click', () => {
            capturarFoto('camera-video', 'photo-canvas', 'photo-result');
        });
    }

    // Eventos para a aba de Prestadores de Serviço
    const iniciarCameraPrestadorBtn = document.getElementById('iniciar-camera-prestador-btn');
    const capturarFotoPrestadorBtn = document.getElementById('capturar-foto-prestador-btn');
    
    if (iniciarCameraPrestadorBtn) {
        iniciarCameraPrestadorBtn.addEventListener('click', () => {
            iniciarCamera('camera-video-prestador', 'photo-canvas-prestador', 'capturar-foto-prestador-btn');
        });
    }
    
    if (capturarFotoPrestadorBtn) {
        capturarFotoPrestadorBtn.addEventListener('click', () => {
            capturarFoto('camera-video-prestador', 'photo-canvas-prestador', 'photo-result-prestador');
        });
    }

    // Eventos para a aba de Moradores
    const iniciarCameraMoradorBtn = document.getElementById('iniciar-camera-morador-btn');
    const capturarFotoMoradorBtn = document.getElementById('capturar-foto-morador-btn');
    
    if (iniciarCameraMoradorBtn) {
        iniciarCameraMoradorBtn.addEventListener('click', () => {
            iniciarCamera('camera-video-morador', 'photo-canvas-morador', 'capturar-foto-morador-btn');
        });
    }
    
    if (capturarFotoMoradorBtn) {
        capturarFotoMoradorBtn.addEventListener('click', () => {
            capturarFoto('camera-video-morador', 'photo-canvas-morador', 'photo-result-morador');
        });
    }
});