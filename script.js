document.addEventListener('DOMContentLoaded', () => {
    const cordBtn = document.getElementById('ripCordBtn');
    const cordAudioFeedback = () => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const now = ctx.currentTime;
            
            // Simular arranque con oscilador y distorsión tipo sierra
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sawtooth';
            // Rampa de frecuencia que sube como aceleración de motor
            osc.frequency.setValueAtTime(65, now);
            osc.frequency.exponentialRampToValueAtTime(320, now + 0.15);
            osc.frequency.exponentialRampToValueAtTime(180, now + 0.35);
            
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start(now);
            osc.stop(now + 0.36);
        } catch (e) {
            // AudioContext no permitido o bloqueado por navegador
        }
    };

    if (cordBtn) {
        cordBtn.addEventListener('click', () => {
            cordAudioFeedback();

            // Animación de temblor en toda la pantalla
            document.body.classList.remove('screen-shake');
            void document.body.offsetWidth; // Forzar reflow
            document.body.classList.add('screen-shake');

            // Feedback visual en el botón
            const originalText = cordBtn.innerHTML;
            cordBtn.style.backgroundColor = '#ffd000';
            cordBtn.innerHTML = '<span class="cord-ring"></span> ¡MOTOR ENCENDIDO! 🪚';

            setTimeout(() => {
                cordBtn.innerHTML = originalText;
                cordBtn.style.backgroundColor = '';
            }, 1200);
        });
    }
});
