/**
 * CASA TANVI — A CINEMATIC 14TH BIRTHDAY FILM FOR TANVI
 * Master Orchestrator, Soundtrack Director & Narrative Choreographer
 * Synchronized with "Lut Gaye" Musical Hooks:
 *   - Hook 1 (0:44): Heartbeat Collision Explosion & Golden Heart Merge
 *   - Hook 2 (2:04): Bow Arrow Strike & Cosmic Heart Tree Blossom
 * Fully responsive on tablet (iPad) & mobile (100dvh).
 * Auto-advancing with clearly visible bottom-right skip button.
 */

(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────
  //  THE 7 CINEMATIC SCENES
  //  Strict rule: Narrative thoughts are prior (intro) or after (outro),
  //  never overlaying or obscuring active visual canvases.
  // ─────────────────────────────────────────────────────────────
  const SCENES = [
    {
      id: 'spiderman',
      title: 'The Loss',
      number: '01',
      url: './experiences/spiderman/index.html',
      introNarrative: null,
      outroNarrative: [
        { text: 'Even a hero can lose the one he loves.', sub: '', duration: 3400 },
        { text: "The universe doesn't promise us forever.", sub: '', duration: 3400 },
        { text: 'But I will keep choosing you, Tanvi.', sub: '', duration: 3800 },
        { text: "Even on the hardest days, I'll find my way back to you.", sub: '', duration: 5200 }
      ],
      autoContinueDelay: 32000,
      targetAudioTime: 0,
      duckAudio: false
    },
    {
      id: 'heartbeat-sync',
      title: 'The Promise',
      number: '02',
      url: './experiences/heartbeat-sync/heartbeat-sync.html',
      introNarrative: null, // The Spider-Man promise leads directly into the visual hearts of Umar & Tanvi
      outroNarrative: null,
      autoContinueDelay: 48000,
      targetAudioTime: 37.0, // Natural audio time cue (never seeked)
      duckAudio: false
    },
    {
      id: 'crimson-blossom',
      title: 'A Garden For You',
      number: '03',
      url: './experiences/crimson-blossom/index.html',
      introNarrative: [
        { text: "I can't show up at your doorstep with a real bouquet today.", sub: "", duration: 4200 },
        { text: "So I coded you a garden that will never fade.", sub: "Just for you, Tanvi.", duration: 4800 }
      ],
      outroNarrative: null,
      autoContinueDelay: 16000,
      targetAudioTime: 68.0,
      duckAudio: false
    },
    {
      id: 'animated-flower',
      title: 'World Of Flowers',
      number: '04',
      url: './experiences/animated-flower/index.html',
      introNarrative: [
        { text: "Every flower I couldn't give you in person…", sub: "I wanted to give you a whole endless universe of them.", duration: 4800 }
      ],
      outroNarrative: null,
      autoContinueDelay: 16000,
      targetAudioTime: 92.0,
      duckAudio: false
    },
    {
      id: 'birthday-gift',
      title: 'The Heart-Blossom Gift',
      number: '05',
      url: './experiences/birthday-gift/index.html',
      introNarrative: [
        { text: "For the girl who holds my heart in her hands…", sub: "Draw the bow & aim for my heart, baby.", duration: 4800 }
      ],
      outroNarrative: null,
      autoContinueDelay: 28000,
      targetAudioTime: 110.0, // Music leads directly into pre-chorus and 124s Hook 2 tree blossom
      duckAudio: false
    },
    {
      id: 'birthday-cake',
      title: 'The Birthday Cake',
      number: '06',
      url: './experiences/birthday-cake/index.html',
      introNarrative: [
        { text: "Every celebration begins with a flame…", sub: "Make your 14th wish and touch the candle to blow it out.", duration: 4600 }
      ],
      outroNarrative: null,
      autoContinueDelay: 22000,
      targetAudioTime: 155.0,
      duckAudio: false
    },
    {
      id: 'love-heart',
      title: 'The Final Love Letter',
      number: '07',
      url: './experiences/love-heart/index.html',
      introNarrative: null,
      outroNarrative: [
        { text: "Happy 14th birthday, Tanvi. ❤️", sub: "", duration: 4200 },
        { text: "Until I can be there to hold you in person,", sub: "Here's a world made just for you, with all my love.", duration: 4800 },
        { text: "No matter how many miles sit between us,", sub: "I'm grateful every single day that I found you.", duration: 5000 }
      ],
      autoContinueDelay: 20000,
      targetAudioTime: 180.0,
      duckAudio: false
    }
  ];

  // ─────────────────────────────────────────────────────────────
  //  DOM ELEMENTS
  // ─────────────────────────────────────────────────────────────
  const elMasterAudio = document.getElementById('masterAudio');
  const elConfessionPrelude = document.getElementById('confessionPrelude');
  const elConfessionLine = document.getElementById('confessionLine');
  const elBtnEnterCasa = document.getElementById('btnEnterCasa');
  const elConfessionDustCanvas = document.getElementById('confessionDustCanvas');
  const elPrologue = document.getElementById('prologue');
  const elPrologueCanvas = document.getElementById('prologueCanvas');
  const elCurtain = document.getElementById('curtain');
  const elFrame = document.getElementById('experienceFrame');
  const elSceneNumber = document.getElementById('sceneNumber');
  const elNarrativeOverlay = document.getElementById('narrativeOverlay');
  const elNarrativeLine1 = document.getElementById('narrativeLine1');
  const elNarrativeLine2 = document.getElementById('narrativeLine2');
  const elBtnContinue = document.getElementById('btnContinue');
  const elContinueLabel = document.getElementById('continueLabel');
  const elBtnAudioToggle = document.getElementById('btnAudioToggle');
  const elIconVolumeOn = document.getElementById('iconVolumeOn');
  const elIconVolumeOff = document.getElementById('iconVolumeOff');
  const elFinaleLetter = document.getElementById('finaleLetter');
  const elBtnReplay = document.getElementById('btnReplay');

  let currentSceneIndex = -1;
  let isTransitioning = false;
  let isStarted = false;
  let narrativeTimer = null;
  let continueTimer = null;
  let autoAdvanceTimer = null;

  // Strict guard: outro narratives can ONLY be played once per scene
  const scenesWithOutroPlayed = new Set();

  // ─────────────────────────────────────────────────────────────
  //  SOUNDTRACK DIRECTOR (Lut Gaye Master Audio Controller)
  //  Web Audio API Gain Node + HTML5 Audio Element
  // ─────────────────────────────────────────────────────────────
  class SoundtrackDirector {
    constructor(audioEl) {
      this.audio = audioEl;
      this.ctx = null;
      this.source = null;
      this.masterGain = null;
      this.duckGain = null;
      this.isUnlocked = false;
      this.isMuted = false;
      this.hook1Triggered = false;
      this.hook2Triggered = false;
      this.targetVolume = 0.88;

      if (this.audio) {
        this.audio.volume = this.targetVolume;
        this.audio.loop = false; // Continuous play without looping or auto-restarting
      }
    }

    unlock() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          if (!this.ctx) {
            this.ctx = new AudioCtx();
          }
          if (this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
          }
        }
      } catch (_) {}
      this.isUnlocked = true;
    }

    play() {
      this.unlock();
      if (!this.audio) return;
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      this.audio.muted = false;
      this.audio.volume = this.targetVolume;
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Playback deferred until screen interaction:', err);
        });
      }
    }

    pause() {
      if (this.audio) this.audio.pause();
    }

    seek(timeSeconds, force = false) {
      // Scene changes are strictly prohibited from seeking audio!
      // Only explicit user replays (force === true) are permitted to reset audio to 0:00.
      if (!this.audio || !force) return;
      try {
        this.audio.currentTime = Math.max(0, timeSeconds);
      } catch (_) {}
    }

    duck(factor = 0.4, duration = 0.5) {
      if (this.ctx && this.duckGain) {
        this.duckGain.gain.linearRampToValueAtTime(factor, this.ctx.currentTime + duration);
      } else if (this.audio) {
        this.audio.volume = this.targetVolume * factor;
      }
    }

    unduck(duration = 0.8) {
      if (this.ctx && this.duckGain) {
        this.duckGain.gain.linearRampToValueAtTime(1.0, this.ctx.currentTime + duration);
      } else if (this.audio && !this.isMuted) {
        this.audio.volume = this.targetVolume;
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      if (this.audio) {
        this.audio.muted = this.isMuted;
      }
      if (this.ctx && this.masterGain) {
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.targetVolume, this.ctx.currentTime);
      }
      if (elIconVolumeOn && elIconVolumeOff) {
        elIconVolumeOn.style.display = this.isMuted ? 'none' : 'block';
        elIconVolumeOff.style.display = this.isMuted ? 'block' : 'none';
      }
      return this.isMuted;
    }

    getCurrentTime() {
      return this.audio ? this.audio.currentTime : 0;
    }
  }

  const soundtrack = new SoundtrackDirector(elMasterAudio);
  window.masterAudio = elMasterAudio; // Expose for direct iframe queries

  // ─────────────────────────────────────────────────────────────
  //  CINEMATIC CONFESSION PRELUDE (Private note before the film)
  // ─────────────────────────────────────────────────────────────
  const CONFESSION_LINES = [
    "This isn't the Casa Tanvi I dreamed of making for you.",
    "I ran out of time—not love. But accept this little piece of my heart."
  ];

  function initConfessionPrelude() {
    if (!elConfessionPrelude) return;

    // Drifting dust canvas
    if (elConfessionDustCanvas) {
      const ctx = elConfessionDustCanvas.getContext('2d');
      let w = (elConfessionDustCanvas.width = window.innerWidth);
      let h = (elConfessionDustCanvas.height = window.innerHeight);
      window.addEventListener('resize', () => {
        w = elConfessionDustCanvas.width = window.innerWidth;
        h = elConfessionDustCanvas.height = window.innerHeight;
      });
      const dust = [];
      for (let i = 0; i < 40; i++) {
        dust.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.6 + Math.random() * 1.5,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -0.15 - Math.random() * 0.35,
          alpha: 0.15 + Math.random() * 0.45,
          phase: Math.random() * Math.PI * 2
        });
      }
      function renderDust() {
        if (!elConfessionPrelude || elConfessionPrelude.classList.contains('is-dismissed') || elConfessionPrelude.style.display === 'none') return;
        ctx.clearRect(0, 0, w, h);
        for (const d of dust) {
          d.x += d.vx;
          d.y += d.vy;
          d.phase += 0.015;
          if (d.y < -10) d.y = h + 10;
          if (d.x < -10) d.x = w + 10;
          if (d.x > w + 10) d.x = -10;
          const a = d.alpha * (0.6 + 0.4 * Math.sin(d.phase));
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          ctx.fillStyle = '#fef08a';
          ctx.globalAlpha = a;
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = d.r * 3;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(renderDust);
      }
      requestAnimationFrame(renderDust);
    }

    let lineIdx = 0;
    let isDismissed = false;

    function dismissConfession() {
      if (isDismissed || !elConfessionPrelude) return;
      isDismissed = true;
      elConfessionPrelude.classList.add('is-dismissed');
      // Trigger slow cinematic entrance on the prologue
      if (elPrologue) {
        elPrologue.classList.add('is-entering');
      }
      setTimeout(() => {
        elConfessionPrelude.style.display = 'none';
      }, 2000);
    }

    function showLine(idx) {
      if (isDismissed || !elConfessionLine) return;
      if (idx >= CONFESSION_LINES.length) {
        // Confession finished naturally -> smoothly dissolve into the intro!
        setTimeout(() => {
          dismissConfession();
        }, 800);
        return;
      }

      elConfessionLine.textContent = CONFESSION_LINES[idx];
      requestAnimationFrame(() => {
        elConfessionLine.classList.add('is-visible');
      });

      const readTime = (idx === 0) ? 3600 : 4200;

      setTimeout(() => {
        if (isDismissed || !elConfessionLine) return;
        elConfessionLine.classList.remove('is-visible');
        setTimeout(() => {
          if (isDismissed) return;
          lineIdx++;
          showLine(lineIdx);
        }, 900);
      }, readTime);
    }

    // Gentle tap anywhere to dismiss smoothly without waiting
    elConfessionPrelude.addEventListener('click', () => {
      dismissConfession();
    });

    setTimeout(() => {
      showLine(0);
    }, 800);
  }

  // ─────────────────────────────────────────────────────────────
  //  INTERACTIVE PROLOGUE STARDUST CANVAS
  // ─────────────────────────────────────────────────────────────
  function initPrologueCanvas() {
    if (!elPrologueCanvas) return;
    const ctx = elPrologueCanvas.getContext('2d');
    let width = 0, height = 0;
    let particles = [];
    let mouse = { x: -1000, y: -1000, active: false };
    let rafId = 0;

    function resize() {
      width = elPrologueCanvas.width = window.innerWidth;
      height = elPrologueCanvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(85, Math.floor((window.innerWidth * window.innerHeight) / 12000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.8 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.5,
        alpha: 0.2 + Math.random() * 0.65,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.4 ? '#f59e0b' : '#fda4af'
      });
    }

    function onPointerMove(e) {
      mouse.x = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : -1000);
      mouse.y = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : -1000);
      mouse.active = true;
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    function render(time) {
      if (!elPrologue || elPrologue.classList.contains('is-dismissed')) {
        cancelAnimationFrame(rafId);
        return;
      }
      ctx.clearRect(0, 0, width, height);

      // Subtle ambient gold cursor sheen
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
        glow.addColorStop(0, 'rgba(245, 158, 11, 0.08)');
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.02;

        // Wrap around boundaries
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Gentle mouse repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            p.x += (dx / dist) * force * 1.5;
            p.y += (dy / dist) * force * 1.5;
          }
        }

        const twinkle = 0.55 + 0.45 * Math.sin(p.phase);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * twinkle;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.r * 3;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      rafId = requestAnimationFrame(render);
    }
    rafId = requestAnimationFrame(render);
  }

  // ─────────────────────────────────────────────────────────────
  //  NARRATIVE INTERTITLES (Strictly on Dark Velvet Screen)
  // ─────────────────────────────────────────────────────────────
  let narrativeSeqId = 0;
  let narrativeTimers = [];
  let narrativeClearTimer = null;

  function cancelNarrativeClear() {
    if (narrativeClearTimer) {
      clearTimeout(narrativeClearTimer);
      narrativeClearTimer = null;
    }
  }

  function hideNarrative(immediate = false) {
    elNarrativeLine1.classList.remove('is-visible');
    elNarrativeLine2.classList.remove('is-visible');
    elNarrativeOverlay.classList.remove('is-active');
    cancelNarrativeClear();

    if (immediate) {
      elNarrativeLine1.textContent = '';
      elNarrativeLine2.textContent = '';
      return;
    }

    const currentSeq = narrativeSeqId;
    narrativeClearTimer = setTimeout(() => {
      // Guard against erasing newer sequence text
      if (currentSeq === narrativeSeqId) {
        elNarrativeLine1.textContent = '';
        elNarrativeLine2.textContent = '';
      }
    }, 850);
  }

  function clearNarrative() {
    narrativeSeqId++;
    narrativeTimers.forEach(t => clearTimeout(t));
    narrativeTimers = [];
    if (narrativeTimer) {
      clearTimeout(narrativeTimer);
      narrativeTimer = null;
    }
    cancelNarrativeClear();
    hideNarrative(true);
  }

  function showNarrative(line1, line2) {
    cancelNarrativeClear();
    elNarrativeLine1.textContent = line1 || '';
    elNarrativeLine2.textContent = line2 || '';
    elNarrativeOverlay.classList.add('is-active');

    requestAnimationFrame(() => {
      elNarrativeLine1.classList.add('is-visible');
      if (line2) elNarrativeLine2.classList.add('is-visible');
    });
  }

  function playNarrativeSequence(lines, onDone) {
    clearNarrative();
    if (!lines || lines.length === 0) {
      if (onDone) onDone();
      return;
    }

    const mySeqId = narrativeSeqId;
    let idx = 0;

    function next() {
      if (mySeqId !== narrativeSeqId) return;
      if (idx >= lines.length) {
        hideNarrative();
        if (onDone) {
          const doneT = setTimeout(() => {
            if (mySeqId === narrativeSeqId) onDone();
          }, 850);
          narrativeTimers.push(doneT);
        }
        return;
      }

      const item = lines[idx++];
      showNarrative(item.text, item.sub);

      const t1 = setTimeout(() => {
        if (mySeqId !== narrativeSeqId) return;
        elNarrativeLine1.classList.remove('is-visible');
        elNarrativeLine2.classList.remove('is-visible');
        const t2 = setTimeout(next, 850); // Allow full 700ms fade-out + 150ms calm breath before next line
        narrativeTimers.push(t2);
      }, item.duration || 4500);
      narrativeTimers.push(t1);
    }

    next();
  }

  // ─────────────────────────────────────────────────────────────
  //  CONTINUE CONTROLLER (Always clearly visible in right bottom)
  // ─────────────────────────────────────────────────────────────
  function updateContinueLabel(label = 'Next Chapter') {
    if (elContinueLabel) elContinueLabel.textContent = label;
  }

  // ─────────────────────────────────────────────────────────────
  //  HOOK BEAT WATCHER (Synchronizing drop moments with visual peaks)
  //  - Hook 1 (0:44.0s): Heartbeat Collision Blast
  //  - Hook 2 (2:04.0s / 124.0s): Bow Arrow Impact & Tree Blossom
  // ─────────────────────────────────────────────────────────────
  function startBeatWatcher() {
    function tick() {
      if (soundtrack && soundtrack.audio && !soundtrack.audio.paused) {
        const t = soundtrack.getCurrentTime();

        // Hook 2: Bow Arrow & Blossom (Scene 5)
        if (currentSceneIndex === 4 && !soundtrack.hook2Triggered) {
          if (t >= 124.0) {
            soundtrack.hook2Triggered = true;
            try {
              if (elFrame && elFrame.contentWindow) {
                elFrame.contentWindow.postMessage({ type: 'CASA_TRIGGER_GIFT_FIRE', time: t }, '*');
              }
            } catch (_) {}
          }
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ─────────────────────────────────────────────────────────────
  //  SCENE ROUTER
  // ─────────────────────────────────────────────────────────────
  let transitionTimer = null;
  let sceneAdvanceTimer = null;
  let sceneToken = 0;
  const completedScenes = new Set();

  function clearAllSceneTimers() {
    if (transitionTimer) {
      clearTimeout(transitionTimer);
      transitionTimer = null;
    }
    if (autoAdvanceTimer) {
      clearTimeout(autoAdvanceTimer);
      autoAdvanceTimer = null;
    }
    if (sceneAdvanceTimer) {
      clearTimeout(sceneAdvanceTimer);
      sceneAdvanceTimer = null;
    }
    if (continueTimer) {
      clearTimeout(continueTimer);
      continueTimer = null;
    }
  }

  function goToScene(index) {
    if (index < 0 || index >= SCENES.length) return;
    clearAllSceneTimers();

    isTransitioning = true;
    clearNarrative();

    // Scene generation counter to prevent outdated iframe loads or delayed callbacks
    const currentToken = ++sceneToken;

    // Curtain down (pure pitch black)
    elCurtain.classList.add('curtain--active');

    transitionTimer = setTimeout(() => {
      transitionTimer = null;
      if (currentToken === sceneToken) {
        loadScene(index, currentToken);
      }
    }, 1000);
  }

  function loadScene(index, token) {
    if (token !== sceneToken) return;
    currentSceneIndex = index;
    const scene = SCENES[index];
    clearAllSceneTimers();

    elSceneNumber.textContent = scene.number;
    updateContinueLabel(index === SCENES.length - 1 ? 'Read Letter' : 'Next Chapter');

    if (scene.duckAudio) soundtrack.duck(0.35);
    else soundtrack.unduck();

    // If scene has an intro narrative, play it on the pure dark intertitle BEFORE mounting
    if (scene.introNarrative && scene.introNarrative.length > 0) {
      playNarrativeSequence(scene.introNarrative, () => {
        if (token === sceneToken) {
          mountFrame(scene, index, token);
        }
      });
    } else {
      mountFrame(scene, index, token);
    }
  }

  function mountFrame(scene, index, token) {
    if (token !== sceneToken) return;
    let loaded = false;

    function onReady() {
      if (loaded || token !== sceneToken) return;
      loaded = true;
      elFrame.onload = null;

      // Note: NO AUDIO SEEKING! Soundtrack plays continuously from 0:00 without interruption.

      // Lift curtain smoothly — scene appears with zero text on it
      setTimeout(() => {
        if (token !== sceneToken) return;
        elCurtain.classList.remove('curtain--active');
        isTransitioning = false;
        try {
          if (elFrame && elFrame.contentWindow) {
            elFrame.contentWindow.postMessage({ type: 'CASA_START' }, '*');
          }
        } catch (_) {}
        onFrameMounted(scene, token);
      }, 350);
    }

    elFrame.onload = onReady;
    elFrame.src = scene.url;

    // Safety fallback: ensure curtain lifts even if load event is suppressed
    setTimeout(() => {
      if (!loaded && token === sceneToken) onReady();
    }, 2500);
  }

  function onFrameMounted(scene, token) {
    if (token !== sceneToken) return;
    // Auto-advance safety fallback timer:
    // If left alone, she can just watch peacefully without needing to click
    if (scene.autoContinueDelay) {
      clearAllSceneTimers();
      autoAdvanceTimer = setTimeout(() => {
        if (token === sceneToken) {
          handleExternalFinish(scene.id);
        }
      }, scene.autoContinueDelay);
    }
  }

  function advance() {
    clearAllSceneTimers();

    if (currentSceneIndex + 1 < SCENES.length) {
      goToScene(currentSceneIndex + 1);
    } else {
      showFinale();
    }
  }

  function handleExternalFinish(sceneId) {
    const scene = SCENES[currentSceneIndex];
    if (!scene || scene.id !== sceneId) return;

    // IDEMPOTENCY GUARD: Once finished or actively transitioning, never re-trigger
    if (completedScenes.has(scene.id) || isTransitioning) return;
    completedScenes.add(scene.id);

    clearAllSceneTimers();

    if (scene.outroNarrative && scene.outroNarrative.length > 0) {
      // 1. Fade the running scene into pure dark void
      elCurtain.classList.add('curtain--active');
      setTimeout(() => {
        // 2. Blank the frame
        elFrame.src = 'about:blank';
        // 3. Play outro reflection in pure dark void
        playNarrativeSequence(scene.outroNarrative, () => {
          if (currentSceneIndex === SCENES.length - 1) {
            showFinale();
          } else {
            // Auto advance to next chapter peacefully
            sceneAdvanceTimer = setTimeout(() => {
              advance();
            }, 1200);
          }
        });
      }, 1000);
    } else {
      if (currentSceneIndex === SCENES.length - 1) {
        showFinale();
      } else {
        sceneAdvanceTimer = setTimeout(() => {
          advance();
        }, 1200);
      }
    }
  }

  // ─────────────────────────────────────────────────────────────
  //  FINALE LETTER (Cinematic Gold Ink Penning Reveal)
  // ─────────────────────────────────────────────────────────────
  const LETTER_SECTIONS = [
    { id: 'letterGreeting', text: 'Happy birthday, baby. ❤️', pauseAfter: 700 },
    { id: 'letterPara1', text: 'I really wish I could be there with you yesterday. I wanted to give you something that felt a little more personal than just a text, so I spent my time making this little corner of the internet for you.', pauseAfter: 650 },
    { id: 'letterPara2', text: "I know it isn't the same as being there to hold you in person, and the one i originally spent my entire time making.. but I hope it made you smile. Through every fight, every late-night conversation, and every mile between Mumbai and Howrah, I'm just really grateful for you.", pauseAfter: 650 },
    { id: 'letterPara3', text: 'Happy 14th, Tanvi. Meri bhadwi, meri cuttiya. I love you.', pauseAfter: 800 },
    { id: 'letterSign', text: '— Umar', pauseAfter: 500 }
  ];

  let letterAbortController = null;
  let letterFinished = false;

  function instantRevealAllLetter() {
    if (letterFinished) return;
    letterFinished = true;
    if (letterAbortController) letterAbortController.aborted = true;

    document.querySelectorAll('.ink-word').forEach(w => w.classList.add('is-revealed'));
    const cursor = document.querySelector('.ink-cursor');
    if (cursor) cursor.remove();
    const skipHint = document.getElementById('letterSkipHint');
    if (skipHint) skipHint.classList.remove('is-visible');
    const actions = document.getElementById('letterActions');
    if (actions) {
      actions.style.opacity = '1';
      actions.style.pointerEvents = 'auto';
    }
  }

  async function playCinematicLetter() {
    letterFinished = false;
    const abort = { aborted: false };
    letterAbortController = abort;

    const cursor = document.createElement('span');
    cursor.className = 'ink-cursor';

    // Build the DOM structure with unrevealed ink words
    for (const section of LETTER_SECTIONS) {
      const el = document.getElementById(section.id);
      if (!el) continue;
      el.innerHTML = '';
      const words = section.text.split(' ');
      for (let i = 0; i < words.length; i++) {
        const span = document.createElement('span');
        span.className = 'ink-word';
        span.textContent = words[i];
        el.appendChild(span);
        if (i < words.length - 1) {
          el.appendChild(document.createTextNode(' '));
        }
      }
    }

    const actions = document.getElementById('letterActions');
    if (actions) {
      actions.style.opacity = '0';
      actions.style.pointerEvents = 'none';
    }

    const skipHint = document.getElementById('letterSkipHint');
    if (skipHint) {
      skipHint.classList.remove('is-visible');
      setTimeout(() => {
        if (!letterFinished) skipHint.classList.add('is-visible');
      }, 2500);
    }

    // Initial gentle hold before ink begins
    await new Promise(r => setTimeout(r, 700));
    if (abort.aborted) return;

    // Fluid, cinematic writing flow
    for (const section of LETTER_SECTIONS) {
      if (abort.aborted) return;
      const el = document.getElementById(section.id);
      if (!el) continue;

      const words = el.querySelectorAll('.ink-word');
      for (let i = 0; i < words.length; i++) {
        if (abort.aborted) return;
        const w = words[i];
        w.classList.add('is-revealed');

        w.insertAdjacentElement('afterend', cursor);

        const text = w.textContent;
        let delay = 75;
        if (text.includes(',') || text.includes(';')) delay = 240;
        else if (text.includes('.') || text.includes('!') || text.includes('❤️') || text.includes('—')) delay = 520;

        await new Promise(r => setTimeout(r, delay));
      }

      await new Promise(r => setTimeout(r, section.pauseAfter || 400));
    }

    if (!abort.aborted) {
      letterFinished = true;
      cursor.remove();
      if (skipHint) skipHint.classList.remove('is-visible');
      if (actions) {
        actions.style.opacity = '1';
        actions.style.pointerEvents = 'auto';
      }
    }
  }

  function showFinale() {
    clearNarrative();
    elCurtain.classList.add('curtain--active');
    soundtrack.unduck();

    setTimeout(() => {
      elFrame.src = 'about:blank';
      elFinaleLetter.style.display = 'flex';
      requestAnimationFrame(() => {
        elCurtain.classList.remove('curtain--active');
        elFinaleLetter.classList.add('is-active');
        playCinematicLetter();
      });
    }, 1000);
  }

  function hideFinale() {
    elFinaleLetter.classList.remove('is-active');
    if (letterAbortController) letterAbortController.aborted = true;
    setTimeout(() => {
      elFinaleLetter.style.display = 'none';
    }, 600);
  }

  // ─────────────────────────────────────────────────────────────
  //  EVENTS & INTERACTION
  // ─────────────────────────────────────────────────────────────
  window.addEventListener('message', e => {
    if (e.data && e.data.type === 'CASA_SCENE_FINISHED') {
      const currentScene = SCENES[currentSceneIndex];
      // Only process finish event if it belongs to the currently active scene
      if (currentScene && e.data.scene === currentScene.id) {
        handleExternalFinish(e.data.scene);
      }
    }
  });

  function startExperience() {
    if (isStarted) return;
    isStarted = true;

    // Start Lut Gaye soundtrack continuously from 0:00
    soundtrack.unlock();
    soundtrack.play();
    startBeatWatcher();

    elPrologue.classList.add('is-dismissed');
    document.body.classList.add('film-started');
    setTimeout(() => {
      elPrologue.style.display = 'none';
      goToScene(0); // Scene 0 (Spider-Man) sketches to acoustic guitar intro
    }, 1600);
  }

  let audioUnlocked = false;

  function unlockAndPlayAudio() {
    if (soundtrack.ctx && soundtrack.ctx.state === 'suspended') {
      soundtrack.ctx.resume().catch(() => {});
    }
    if (!audioUnlocked || (soundtrack.audio && soundtrack.audio.paused && !soundtrack.isMuted)) {
      audioUnlocked = true;
      soundtrack.unlock();
      soundtrack.play();
    }
  }

  function handleScreenInteraction(e) {
    // If the confession prelude is still active, do not start audio or master film!
    if (elConfessionPrelude && !elConfessionPrelude.classList.contains('is-dismissed') && elConfessionPrelude.style.display !== 'none') {
      return;
    }

    unlockAndPlayAudio();

    if (!isStarted) {
      startExperience();
    }
  }

  // Universal screen interaction listeners:
  // Audio starts playing immediately as soon as the user touches the prologue screen!
  ['pointerdown', 'touchstart', 'mousedown', 'click', 'keydown'].forEach(evt => {
    window.addEventListener(evt, handleScreenInteraction, { capture: true, passive: true });
    document.addEventListener(evt, handleScreenInteraction, { capture: true, passive: true });
  });

  if (elBtnAudioToggle) {
    elBtnAudioToggle.addEventListener('click', e => {
      e.stopPropagation();
      soundtrack.toggleMute();
    });
  }

  elBtnContinue.addEventListener('click', e => {
    e.stopPropagation();
    clearAllSceneTimers();
    const scene = SCENES[currentSceneIndex];
    // If outro narrative has NOT been played yet, fade to black and play it; otherwise advance!
    if (scene && scene.outroNarrative && !scenesWithOutroPlayed.has(scene.id)) {
      scenesWithOutroPlayed.add(scene.id);
      completedScenes.add(scene.id);
      elCurtain.classList.add('curtain--active');
      setTimeout(() => {
        elFrame.src = 'about:blank';
        playNarrativeSequence(scene.outroNarrative, () => {
          advance();
        });
      }, 1000);
    } else {
      advance();
    }
  });

  elBtnReplay.addEventListener('click', e => {
    e.stopPropagation();
    hideFinale();
    completedScenes.clear();
    scenesWithOutroPlayed.clear();
    clearAllSceneTimers();
    soundtrack.hook1Triggered = false;
    soundtrack.hook2Triggered = false;
    soundtrack.seek(0, true);
    setTimeout(() => {
      goToScene(0);
    }, 500);
  });

  const elLetterCard = document.getElementById('letterCard');
  if (elLetterCard) {
    elLetterCard.addEventListener('click', e => {
      if (e.target.closest('#btnReplay')) return;
      instantRevealAllLetter();
    });
  }

  // Keyboard navigation for testing
  window.addEventListener('keydown', e => {
    if (e.code === 'Space' || e.code === 'ArrowRight') {
      if (isStarted && !isTransitioning) {
        elBtnContinue.click();
      }
    }
  });

  // Listen for scene completion messages from embedded experiences to auto-advance
  window.addEventListener('message', e => {
    if (!e.data || typeof e.data !== 'object') return;
    if (e.data.type === 'CASA_SCENE_FINISHED' && e.data.scene) {
      handleExternalFinish(e.data.scene);
    }
  });

  // Init confession prelude & prologue stardust
  initConfessionPrelude();
  initPrologueCanvas();

})();
