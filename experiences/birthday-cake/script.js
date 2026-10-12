$(document).ready(function() {
    'use strict';

    // ─────────────────────────────────────────────────────────────
    //  WEB AUDIO SYNTHESIZER (Puff & Chimes, Zero External Assets)
    // ─────────────────────────────────────────────────────────────
    let audioCtx = null;
    function getAudioCtx() {
        if (!audioCtx) {
            const AC = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AC();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function playBlowOutSound() {
        try {
            const ctx = getAudioCtx();
            const now = ctx.currentTime;

            // Soft breath / wind whoosh
            const bufferSize = ctx.sampleRate * 0.8;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.25));
            }
            const noise = ctx.createBufferSource();
            noise.buffer = buffer;

            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(600, now);
            filter.frequency.exponentialRampToValueAtTime(150, now + 0.7);

            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.18, now);
            gain.gain.linearRampToValueAtTime(0.001, now + 0.75);

            noise.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            noise.start(now);

            // Romantic celestial chime chords
            const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            freqs.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const chimeGain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + 0.15 + idx * 0.12);

                chimeGain.gain.setValueAtTime(0.001, now + 0.15 + idx * 0.12);
                chimeGain.gain.linearRampToValueAtTime(0.08, now + 0.2 + idx * 0.12);
                chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8 + idx * 0.12);

                osc.connect(chimeGain);
                chimeGain.connect(ctx.destination);
                osc.start(now + 0.15 + idx * 0.12);
                osc.stop(now + 2.0 + idx * 0.12);
            });
        } catch (_) {}
    }

    function playPopSound() {
        try {
            const ctx = getAudioCtx();
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(420, now);
            osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

            gain.gain.setValueAtTime(0.2, now);
            gain.gain.linearRampToValueAtTime(0.001, now + 0.09);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.1);
        } catch (_) {}
    }

    // ─────────────────────────────────────────────────────────────
    //  SMOKE SIMULATION ON CANDLE BLOWOUT
    // ─────────────────────────────────────────────────────────────
    const smokeCanvas = document.getElementById('smokeCanvas');
    const smokeCtx = smokeCanvas.getContext('2d');
    let smokeParticles = [];
    let isSmoking = false;

    function resizeSmoke() {
        smokeCanvas.width = window.innerWidth;
        smokeCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeSmoke);
    resizeSmoke();

    class SmokeParticle {
        constructor(x, y) {
            this.x = x + (Math.random() - 0.5) * 6;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = -(Math.random() * 1.8 + 1.2);
            this.size = Math.random() * 4 + 3;
            this.growth = Math.random() * 0.25 + 0.15;
            this.alpha = Math.random() * 0.5 + 0.4;
            this.decay = Math.random() * 0.007 + 0.006;
            this.rot = Math.random() * Math.PI * 2;
            this.vRot = (Math.random() - 0.5) * 0.04;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vx += (Math.random() - 0.5) * 0.12;
            this.size += this.growth;
            this.alpha -= this.decay;
            this.rot += this.vRot;
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rot);
            ctx.globalAlpha = Math.max(0, this.alpha);
            ctx.fillStyle = 'rgba(235, 230, 225, 0.7)';
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function emitSmoke(x, y) {
        isSmoking = true;
        let count = 0;
        const interval = setInterval(() => {
            for (let i = 0; i < 3; i++) {
                smokeParticles.push(new SmokeParticle(x, y));
            }
            count++;
            if (count > 25) clearInterval(interval);
        }, 50);
    }

    function renderSmoke() {
        smokeCtx.clearRect(0, 0, smokeCanvas.width, smokeCanvas.height);
        for (let i = smokeParticles.length - 1; i >= 0; i--) {
            const p = smokeParticles[i];
            p.update();
            p.draw(smokeCtx);
            if (p.alpha <= 0) {
                smokeParticles.splice(i, 1);
            }
        }
        if (isSmoking || smokeParticles.length > 0) {
            requestAnimationFrame(renderSmoke);
        }
    }

    // ─────────────────────────────────────────────────────────────
    //  INTERACTIVE CANDLE BLOWOUT
    // ─────────────────────────────────────────────────────────────
    let candleBlown = false;

    function blowOutCandle() {
        if (candleBlown) return;
        candleBlown = true;

        playBlowOutSound();
        $('.fire').fadeOut(400);

        // Calculate candle tip position
        const candleEl = document.querySelector('.candle');
        const rect = candleEl.getBoundingClientRect();
        const candleTipX = rect.left + rect.width / 2;
        const candleTipY = rect.top;

        // Emit realistic rising smoke
        emitSmoke(candleTipX, candleTipY);
        renderSmoke();

        // Update prompt text with royal blessing
        const promptEl = document.getElementById('cakePrompt');
        if (promptEl) {
            promptEl.classList.add('is-granted');
            promptEl.innerHTML = '<span class="prompt-icon">👑</span><span class="prompt-text">Your wish has been sealed in the stars, Tanvi ❤️</span>';
        }

        // Royal Celebratory Confetti Shower
        const duration = 4000;
        const end = Date.now() + duration;
        const colors = ['#D4AF37', '#FFD700', '#FFB6C1', '#ffffff', '#F5F5DC', '#FF75A0'];

        (function frame() {
            confetti({
                particleCount: 8,
                angle: 60,
                spread: 65,
                origin: { x: 0, y: 0.75 },
                colors: colors
            });
            confetti({
                particleCount: 8,
                angle: 120,
                spread: 65,
                origin: { x: 1, y: 0.75 },
                colors: colors
            });
            confetti({
                particleCount: 6,
                angle: 90,
                spread: 80,
                origin: { x: 0.5, y: 0.6 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());

        // Handshake to Casa Tanvi orchestrator after peaceful celebration (7 seconds)
        setTimeout(() => {
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({ type: 'CASA_SCENE_FINISHED', scene: 'birthday-cake' }, '*');
            }
        }, 7000);
    }

    $('.candle, #candleHitbox, #cakePrompt').on('click touchstart', function(e) {
        e.preventDefault();
        blowOutCandle();
    });

    // Gentle auto-blowout fallback if viewer is watching passively
    setTimeout(() => {
        if (!candleBlown) {
            blowOutCandle();
        }
    }, 12500);

    // ─────────────────────────────────────────────────────────────
    //  INTERACTIVE BALLOON POPPING
    // ─────────────────────────────────────────────────────────────
    $('.balloon').on('click touchstart', function(e) {
        e.preventDefault();
        playPopSound();

        const rect = e.target.getBoundingClientRect();
        const x = (rect.left + (rect.width / 2)) / window.innerWidth;
        const y = (rect.top + (rect.height / 2)) / window.innerHeight;

        confetti({
            particleCount: 45,
            spread: 70,
            origin: { x: x, y: y },
            colors: [$(this).css('background-color'), '#FFD700', '#ffffff', '#C0C0C0', '#FF75A0']
        });

        $(this).css({ transform: 'scale(1.4)', opacity: 0, transition: 'all 0.15s ease' });
        setTimeout(() => {
            $(this).remove();
        }, 160);
    });

    // ─────────────────────────────────────────────────────────────
    //  AMBIENT MAGIC STARDUST CURSOR
    // ─────────────────────────────────────────────────────────────
    const canvas = document.getElementById('magicCursor');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const mouse = { x: null, y: null };

    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
        if (Math.random() > 0.3) {
            particlesArray.push(new Particle());
        }
    });

    window.addEventListener('touchmove', function(event) {
        if (event.touches.length > 0) {
            mouse.x = event.touches[0].clientX;
            mouse.y = event.touches[0].clientY;
            particlesArray.push(new Particle());
        }
    });

    class Particle {
        constructor() {
            this.x = mouse.x;
            this.y = mouse.y;
            this.size = Math.random() * 2.2 + 1.5;
            this.speedX = Math.random() * 1.2 - 0.6;
            this.speedY = Math.random() * 1.2 - 0.6;
            
            const colors = [
                'rgba(255, 215, 0, 0.85)',
                'rgba(255, 255, 255, 0.9)',
                'rgba(255, 182, 193, 0.8)',
                'rgba(247, 215, 148, 0.85)'
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.life = 100;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 2.8;
            if (this.size > 0.05) this.size -= 0.04;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function handleParticles() {
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            if (particlesArray[i].life <= 0 || particlesArray[i].size <= 0.1) {
                particlesArray.splice(i, 1);
                i--;
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        handleParticles();
        requestAnimationFrame(animate);
    }
    animate();
});
