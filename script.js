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
      url: './experiences/animated-flower/index.html',
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
      url: './experiences/crimson-blossom/index.html',
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
      autoContinueDelay: null, // Will NOT transition until user draws the bow and shoots the heart!
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
  const elHud = document.getElementById('ambientHud');
  const elFooter = document.getElementById('ambientFooter');
  const elFinaleLetter = document.getElementById('finaleLetter');
  const elLetterCard = document.getElementById('letterCard');
  const elLetterActions = document.getElementById('letterActions');
  const elBtnEnterFinalStage = document.getElementById('btnEnterFinalStage');
  const elLetterSkipHint = document.getElementById('letterSkipHint');
  const elCinematicEpilogue = document.getElementById('cinematicEpilogue');
  const elEpilogueAtmosphere = document.getElementById('epilogueAtmosphere');
  const elEpilogueStarCanvas = document.getElementById('epilogueStarCanvas');
  const elEpilogueInvitation = document.getElementById('epilogueInvitation');
  const elBtnOpenEpilogue = document.getElementById('btnOpenEpilogue');
  const elBtnRetryAudio = document.getElementById('btnRetryAudio');
  const elEpilogueExperience = document.getElementById('epilogueExperience');
  const elPhotoLanesContainer = document.getElementById('photoLanesContainer');
  const elPhotoTrack1 = document.getElementById('photoTrack1');
  const elPhotoTrack2 = document.getElementById('photoTrack2');
  const elPhotoTrack3 = document.getElementById('photoTrack3');
  const elEpilogueTypography = document.getElementById('epilogueTypography');
  const elEpilogueBurstCanvas = document.getElementById('epilogueBurstCanvas');
  const elEpilogueRelive = document.getElementById('epilogueRelive');
  const elBtnReliveStory = document.getElementById('btnReliveStory');

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
            this.ctx.resume().catch(() => { });
          }
        }
      } catch (_) { }
      this.isUnlocked = true;
    }

    play() {
      this.unlock();
      if (!this.audio) return;
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => { });
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
      } catch (_) { }
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
            } catch (_) { }
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
        } catch (_) { }
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
            }, 500);
          }
        });
      }, 1000);
    } else {
      if (currentSceneIndex === SCENES.length - 1) {
        showFinale();
      } else {
        sceneAdvanceTimer = setTimeout(() => {
          advance();
        }, 500);
      }
    }
  }

  // ─────────────────────────────────────────────────────────────
  //  PERSONAL BIRTHDAY LETTER (Word-by-Word Cinematic Reveal)
  //  Appears after Scene 7 concludes, before the final climax stage.
  // ─────────────────────────────────────────────────────────────
  const LETTER_SECTIONS = [
    { id: 'letterGreeting', text: 'Happy 14th birthday, baby. ❤️', pauseAfter: 750 },
    { id: 'letterPara1', text: "I know life gets overwhelming, and between Mumbai and Howrah, the distance sometimes feels so heavy. But through every quiet night, every late conversation, and every little moment, you are the easiest person to choose and my favorite reason to smile.", pauseAfter: 700 },
    { id: 'letterPara2', text: "I didn't want to just send a simple text or buy something ordinary. I wanted to code an entire little universe just for you—somewhere you can always come back to and remember how deeply, endlessly loved and special you are.", pauseAfter: 700 },
    { id: 'letterPara3', text: 'Meri pyari bhadwi, meri cuttiya... thank you for being you. Happy 14th birthday, meri jaan. I love you more than words or code could ever show.', pauseAfter: 850 },
    { id: 'letterSign', text: '— Forever yours, Umar', pauseAfter: 600 }
  ];

  let letterAbortController = null;
  let letterFinished = false;

  function instantRevealAllLetter() {
    if (letterFinished) return;
    letterFinished = true;
    if (letterAbortController) letterAbortController.aborted = true;

    document.querySelectorAll('.ink-word').forEach(w => w.classList.add('is-revealed'));
    if (elLetterSkipHint) elLetterSkipHint.classList.remove('is-visible');
    if (elLetterActions) {
      elLetterActions.style.opacity = '1';
      elLetterActions.style.pointerEvents = 'auto';
      if (window.gsap) {
        gsap.fromTo('#btnEnterFinalStage',
          { opacity: 0, scale: 0.88, filter: 'blur(10px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }
        );
      }
    }
  }

  async function playCinematicLetter() {
    letterFinished = false;
    const abort = { aborted: false };
    letterAbortController = abort;

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

    if (elLetterActions) {
      elLetterActions.style.opacity = '0';
      elLetterActions.style.pointerEvents = 'none';
    }

    if (elLetterSkipHint) {
      elLetterSkipHint.classList.remove('is-visible');
      setTimeout(() => {
        if (!letterFinished && elLetterSkipHint) elLetterSkipHint.classList.add('is-visible');
      }, 2500);
    }

    // Initial gentle hold before words begin to fade in smoothly
    await new Promise(r => setTimeout(r, 650));
    if (abort.aborted) return;

    // Fluid, cinematic word-by-word fade in
    for (const section of LETTER_SECTIONS) {
      if (abort.aborted) return;
      const el = document.getElementById(section.id);
      if (!el) continue;

      const words = el.querySelectorAll('.ink-word');
      for (let i = 0; i < words.length; i++) {
        if (abort.aborted) return;
        const w = words[i];
        w.classList.add('is-revealed');

        const text = w.textContent;
        let delay = 110;
        if (text.includes(',') || text.includes(';')) delay = 280;
        else if (text.includes('.') || text.includes('!') || text.includes('❤️') || text.includes('—')) delay = 480;

        await new Promise(r => setTimeout(r, delay));
      }

      await new Promise(r => setTimeout(r, section.pauseAfter || 400));
    }

    if (!abort.aborted) {
      letterFinished = true;
      if (elLetterSkipHint) elLetterSkipHint.classList.remove('is-visible');
      if (elLetterActions) {
        elLetterActions.style.opacity = '1';
        elLetterActions.style.pointerEvents = 'auto';
        if (window.gsap) {
          gsap.fromTo('#btnEnterFinalStage',
            { opacity: 0, scale: 0.88, filter: 'blur(10px)' },
            { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.8, ease: 'power3.out' }
          );
        }
      }
    }
  }

  // ─────────────────────────────────────────────────────────────
  //  THE CINEMATIC EPILOGUE (The Secret Final Chapter)
  //  Order of experience:
  //    1. Seven original scenes finish normally.
  //    2. Curtain fades into deep black; HUD & footer hide.
  //    3. Subtle wine-red atmosphere & stardust; understated invitation.
  //    4. Viewer deliberate click: starts personal recording (Bhadwi.m4a)
  //       Lut Gaye master soundtrack paused cleanly.
  //    5. Massive cinematic typography: “Once again, happy birthday, meri jaan.”
  //    6. Horizontal drifting photographic memory lanes (all 56 photos, uncropped).
  //    7. Audio ended event: natural silence -> dissolve to black ->
  //       multi-focal full-screen layered heart burst on canvas.
  //    8. Settles into black void -> “Some moments deserve to be lived twice.”
  //    9. “Relive Our Story” button cleanly restarts film from Scene 0.
  // ─────────────────────────────────────────────────────────────

  // All 56 unique photos of Tanvi & memories (preserved without cropping)
  const ALL_PHOTOS = [
    './photos/1000009221.jpg',
    './photos/1000010561.jpg',
    './photos/1000010562.jpg',
    './photos/1000010563.jpg',
    './photos/1000010564.jpg',
    './photos/1000010565.jpg',
    './photos/1000010566.jpg',
    './photos/1000010567.jpg',
    './photos/1000010568.jpg',
    './photos/1000010569.jpg',
    './photos/1000010570.jpg',
    './photos/1000010571.jpg',
    './photos/1000010572.jpg',
    './photos/1000010573.jpg',
    './photos/1000010574.jpg',
    './photos/1000010575.jpg',
    './photos/1000010576.jpg',
    './photos/1000010577.jpg',
    './photos/1000010578.jpg',
    './photos/1000010579.jpg',
    './photos/1000010580.jpg',
    './photos/1000010581.jpg',
    './photos/1000010582.jpg',
    './photos/1000010583.jpg',
    './photos/1000010584.jpg',
    './photos/1000010585.jpg',
    './photos/1000010586.jpg',
    './photos/1000010587.jpg',
    './photos/1000010588.jpg',
    './photos/1000010589.jpg',
    './photos/1000010590.jpg',
    './photos/1000010591.jpg',
    './photos/1000010592.jpg',
    './photos/1000010593.jpg',
    './photos/1000010594.jpg',
    './photos/1000010595.jpg',
    './photos/1000010596.jpg',
    './photos/1000010597.jpg',
    './photos/1000010598.jpg',
    './photos/169941.jpg',
    './photos/172059.jpg',
    './photos/IMG_20260606_134202_631.jpg',
    './photos/IMG_20260703_211727_458.jpg',
    './photos/IMG_20260808_203740_846.jpg',
    './photos/Screenshot_20260820_141358_Instagram.jpg',
    './photos/Screenshot_20260826_011700_Instagram.jpg',
    './photos/Screenshot_20260826_011714_Instagram.jpg',
    './photos/Screenshot_20260826_142651_Instagram.jpg',
    './photos/Screenshot_20260826_143136_Instagram.jpg',
    './photos/Screenshot_20260828_154058_Instagram.jpg',
    './photos/Screenshot_20260828_154303_Instagram.jpg',
    './photos/Screenshot_20260828_154322_Instagram.jpg',
    './photos/Screenshot_20260828_154337_Instagram.jpg',
    './photos/Screenshot_20260828_154346_Instagram.jpg',
    './photos/Screenshot_20260828_154428_Instagram.jpg',
    './photos/Screenshot_20260828_160635_Instagram.jpg'
  ];

  let voiceAudio = null;
  let voiceEndedHandled = false;
  let epilogueAudioStarted = false;
  let starAnimFrame = null;
  let burstAnimFrame = null;
  let starParticles = [];
  let burstHearts = [];
  let burstCtx = null;
  let starCtx = null;
  let epilogueActiveTimeline = null;
  let lanesPopulated = false;

  // Stardust animation loop for Phase 1 wine-red atmosphere
  function initEpilogueStars() {
    if (!elEpilogueStarCanvas) return;
    const canvas = elEpilogueStarCanvas;
    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);
    starCtx = canvas.getContext('2d');
    starParticles = [];
    for (let i = 0; i < 48; i++) {
      starParticles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.7 + 0.2,
        speedY: -(Math.random() * 18 + 8),
        twinkleSpeed: Math.random() * 2 + 1,
        phase: Math.random() * Math.PI * 2
      });
    }

    if (starAnimFrame) cancelAnimationFrame(starAnimFrame);
    function starLoop() {
      if (!starCtx) return;
      starCtx.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now() * 0.001;
      for (const p of starParticles) {
        p.y += p.speedY * 0.016;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        const a = p.alpha * (0.6 + 0.4 * Math.sin(now * p.twinkleSpeed + p.phase));
        starCtx.fillStyle = `rgba(255, 215, 0, ${Math.max(0, a * 0.6)})`;
        starCtx.beginPath();
        starCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        starCtx.fill();
      }
      starAnimFrame = requestAnimationFrame(starLoop);
    }
    starAnimFrame = requestAnimationFrame(starLoop);
  }

  // Populate photo lanes with all 56 photos
  function populatePhotoLanes() {
    if (lanesPopulated) return;
    lanesPopulated = true;

    if (!elPhotoTrack1 || !elPhotoTrack2 || !elPhotoTrack3) return;
    elPhotoTrack1.innerHTML = '';
    elPhotoTrack2.innerHTML = '';
    elPhotoTrack3.innerHTML = '';

    // Split 56 photos across 3 lanes: 19, 18, 19
    const lane1Photos = ALL_PHOTOS.slice(0, 19);
    const lane2Photos = ALL_PHOTOS.slice(19, 37);
    const lane3Photos = ALL_PHOTOS.slice(37);

    function createLaneCard(photoUrl) {
      const card = document.createElement('div');
      card.className = 'photo-memory-card';
      const img = document.createElement('img');
      img.className = 'photo-memory-img';
      img.src = photoUrl;
      img.alt = 'Tanvi';
      img.loading = 'lazy';
      card.appendChild(img);
      return card;
    }

    // Populate each track twice for seamless infinite CSS looping
    [...lane1Photos, ...lane1Photos].forEach(url => {
      elPhotoTrack1.appendChild(createLaneCard(url));
    });
    [...lane2Photos, ...lane2Photos].forEach(url => {
      elPhotoTrack2.appendChild(createLaneCard(url));
    });
    [...lane3Photos, ...lane3Photos].forEach(url => {
      elPhotoTrack3.appendChild(createLaneCard(url));
    });
  }

  // Multi-focal Heart Burst Palette & Helpers
  const BURST_COLORS = [
    '#e60039', // vibrant crimson
    '#ff1744', // radiant rose-red
    '#ff4d6d', // tender rose
    '#ff758f', // warm petal pink
    '#c9184a', // deep ruby
    '#800f2f', // rich wine
    '#590d22', // midnight bordeaux
    '#ffd700', // champagne gold
    '#ffea75', // radiant amber gold
    '#fff5eb'  // warm ivory
  ];

  function pickBurstColor() {
    return BURST_COLORS[(Math.random() * BURST_COLORS.length) | 0];
  }

  function resizeBurstCanvas() {
    if (!elEpilogueBurstCanvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    elEpilogueBurstCanvas.width = w * dpr;
    elEpilogueBurstCanvas.height = h * dpr;
    burstCtx = elEpilogueBurstCanvas.getContext('2d');
    burstCtx.setTransform(1, 0, 0, 1, 0, 0);
    burstCtx.scale(dpr, dpr);
  }

  function drawVectorHeart(ctx, x, y, size, color, alpha, rotation = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.fillStyle = color;
    ctx.beginPath();
    const topCurve = size * 0.3;
    ctx.moveTo(0, topCurve);
    ctx.bezierCurveTo(-size * 0.5, -topCurve, -size, size * 0.35, 0, size);
    ctx.bezierCurveTo(size, size * 0.35, size * 0.5, -topCurve, 0, topCurve);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Multi-focal layered heart burst (Center, Upper Left, Lower Right)
  function triggerMultiFocalHeartBurst() {
    resizeBurstCanvas();
    burstHearts = [];
    const w = window.innerWidth;
    const h = window.innerHeight;

    const focalPoints = [
      { cx: w * 0.5,  cy: h * 0.48, count: 500, speedMin: 140, speedMax: 880 }, // Main focal center
      { cx: w * 0.26, cy: h * 0.35, count: 280, speedMin: 120, speedMax: 720 }, // Upper left heart bloom
      { cx: w * 0.74, cy: h * 0.62, count: 280, speedMin: 120, speedMax: 720 }  // Lower right heart bloom
    ];

    focalPoints.forEach(fp => {
      for (let i = 0; i < fp.count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * (fp.speedMax - fp.speedMin) + fp.speedMin;
        burstHearts.push({
          x: fp.cx,
          y: fp.cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - Math.random() * 95,
          size: Math.random() * 13 + 5,
          color: pickBurstColor(),
          alpha: 1.0,
          rot: Math.random() * Math.PI * 2,
          vrot: (Math.random() - 0.5) * 8.5,
          sway: Math.random() * 3.2 + 1.2,
          phase: Math.random() * Math.PI * 2,
          life: 0,
          maxLife: Math.random() * 3.6 + 2.4
        });
      }
    });

    if (burstAnimFrame) cancelAnimationFrame(burstAnimFrame);

    let lastTime = performance.now();
    function burstLoop(now) {
      const dt = Math.min((now - lastTime) * 0.001, 0.033);
      lastTime = now;

      if (!burstCtx) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      burstCtx.clearRect(0, 0, w, h);

      for (let i = burstHearts.length - 1; i >= 0; i--) {
        const p = burstHearts[i];
        p.life += dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.965; // air friction
        p.vy += 105 * dt; // gravity
        p.rot += p.vrot * dt;
        p.x += Math.sin(p.life * p.sway + p.phase) * 0.9;
        p.alpha = Math.max(0, 1 - (p.life / p.maxLife));

        if (p.life >= p.maxLife || p.alpha <= 0.01) {
          burstHearts.splice(i, 1);
          continue;
        }

        drawVectorHeart(burstCtx, p.x, p.y, p.size, p.color, p.alpha, p.rot);
      }

      if (burstHearts.length > 0) {
        burstAnimFrame = requestAnimationFrame(burstLoop);
      } else {
        burstCtx.clearRect(0, 0, w, h);
        burstAnimFrame = null;
      }
    }
    burstAnimFrame = requestAnimationFrame(burstLoop);
  }

  function playEpilogueChimeSound() {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      const ctx = new AC();
      const now = ctx.currentTime;

      // Deep resonant heart boom
      const boom = ctx.createOscillator();
      const bGain = ctx.createGain();
      boom.type = 'sine';
      boom.frequency.setValueAtTime(150, now);
      boom.frequency.exponentialRampToValueAtTime(32, now + 0.7);
      bGain.gain.setValueAtTime(0.4, now);
      bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
      boom.connect(bGain);
      bGain.connect(ctx.destination);
      boom.start(now);
      boom.stop(now + 0.78);

      // Crystalline romantic harmony chimes
      [587.33, 783.99, 1046.50, 1318.51, 1567.98].forEach((freq, idx) => {
        const chime = ctx.createOscillator();
        const cGain = ctx.createGain();
        chime.type = 'triangle';
        chime.frequency.setValueAtTime(freq, now + idx * 0.03);
        cGain.gain.setValueAtTime(0.001, now + idx * 0.03);
        cGain.gain.linearRampToValueAtTime(0.07, now + idx * 0.03 + 0.02);
        cGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.03 + 1.1);
        chime.connect(cGain);
        cGain.connect(ctx.destination);
        chime.start(now + idx * 0.03);
        chime.stop(now + idx * 0.03 + 1.15);
      });
    } catch (_) { }
  }

  // ── PHASE 1: Start Mysterious Epilogue Transition ──
  function startCinematicEpilogue(skipInvitation = false) {
    clearNarrative();
    clearAllSceneTimers();
    if (elFrame) elFrame.src = 'about:blank';

    // Hide normal HUD & footer controls
    if (elHud) elHud.style.display = 'none';
    if (elFooter) elFooter.style.display = 'none';

    // Reset epilogue flags
    voiceEndedHandled = false;
    epilogueAudioStarted = false;

    // Show epilogue container & invitation view
    if (elCinematicEpilogue) {
      elCinematicEpilogue.style.display = 'flex';
      elCinematicEpilogue.classList.add('is-active');
    }
    if (skipInvitation) {
      if (elEpilogueInvitation) {
        elEpilogueInvitation.style.display = 'none';
        elEpilogueInvitation.style.opacity = '0';
      }
    } else {
      if (elEpilogueInvitation) {
        elEpilogueInvitation.style.display = 'flex';
        elEpilogueInvitation.style.opacity = '1';
      }
      if (elBtnOpenEpilogue) {
        elBtnOpenEpilogue.disabled = false;
      }
    }
    if (elBtnRetryAudio) {
      elBtnRetryAudio.style.display = 'none';
    }
    if (elEpilogueExperience) {
      elEpilogueExperience.style.display = 'none';
    }
    if (elEpilogueRelive) {
      elEpilogueRelive.style.display = 'none';
    }

    initEpilogueStars();

    // Release curtain slowly into the wine-red atmosphere
    setTimeout(() => {
      elCurtain.classList.remove('curtain--active');
    }, 600);

    // GSAP choreographed reveal of the secret invitation (if not skipping directly to experience)
    if (!skipInvitation && window.gsap) {
      gsap.fromTo('.invitation-eyebrow',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.6, ease: 'power2.out', delay: 0.8 }
      );
      gsap.fromTo('.invitation-ornament',
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out', delay: 1.1 }
      );
      gsap.fromTo('#btnOpenEpilogue',
        { opacity: 0, scale: 0.88, filter: 'blur(8px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.8, ease: 'power3.out', delay: 1.4 }
      );
      gsap.fromTo('.invitation-hint',
        { opacity: 0 },
        { opacity: 0.7, duration: 1.6, ease: 'sine.out', delay: 2.2 }
      );
    }
  }

  // ── PHASE 2, 3, 4: Viewer Click Starts Recording & Experience ──
  function beginEpilogueRecording() {
    if (epilogueAudioStarted) return;
    epilogueAudioStarted = true;

    if (elBtnOpenEpilogue) {
      elBtnOpenEpilogue.disabled = true;
    }

    // 1. Duck and cleanly pause master soundtrack
    soundtrack.duck(0, 1.2);
    setTimeout(() => {
      soundtrack.pause();
    }, 1250);

    // 2. Prepare personal voice recording (Bhadwi.m4a)
    if (voiceAudio) {
      voiceAudio.pause();
      voiceAudio = null;
    }
    voiceAudio = new Audio('./Bhadwi.m4a');
    voiceAudio.preload = 'auto';

    voiceAudio.addEventListener('ended', onVoiceRecordingFinished);
    voiceAudio.addEventListener('error', onVoiceRecordingError);

    // 3. Play voice recording
    const playPromise = voiceAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn('Voice recording rejected by browser audio policy:', err);
        if (elBtnRetryAudio) {
          elBtnRetryAudio.style.display = 'inline-block';
          elBtnRetryAudio.onclick = () => {
            elBtnRetryAudio.style.display = 'none';
            if (voiceAudio) voiceAudio.play().catch(() => { });
          };
        }
      });
    }

    // 4. Populate photo lanes
    populatePhotoLanes();

    // 5. Fade out invitation view
    if (window.gsap) {
      gsap.to(elEpilogueInvitation, {
        opacity: 0,
        y: -18,
        duration: 1.0,
        ease: 'power2.inOut',
        onComplete: () => {
          if (elEpilogueInvitation) elEpilogueInvitation.style.display = 'none';
        }
      });
    } else {
      if (elEpilogueInvitation) elEpilogueInvitation.style.display = 'none';
    }

    // 6. Reveal photo lanes & massive typography
    if (elEpilogueExperience) {
      elEpilogueExperience.style.display = 'flex';
      elEpilogueExperience.style.opacity = '1';
    }

    // GSAP entrance for photo lanes
    if (window.gsap) {
      gsap.fromTo('#photoLanesContainer',
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 2.2, ease: 'power2.out', delay: 0.4 }
      );

      // PHASE 3: Massive editorial typography entrance (Smooth camouflage blend & fade-in)
      const titleTl = gsap.timeline({ delay: 0.6 });
      titleTl.fromTo('.t-word',
        { opacity: 0, y: 24, filter: 'blur(22px)', scale: 0.96 },
        { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: 2.2, stagger: 0.26, ease: 'power2.out' }
      );
      titleTl.fromTo('.t-heart',
        { opacity: 0, scale: 0.4, filter: 'blur(12px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power2.out' },
        '-=0.6'
      );
      // Gentle ambient floating breath
      titleTl.to('#epilogueTypography', {
        y: -6,
        duration: 5.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      epilogueActiveTimeline = titleTl;
    } else {
      document.querySelectorAll('.t-word, .t-heart').forEach(el => el.style.opacity = '1');
    }
  }

  function onVoiceRecordingError(e) {
    console.error('Epilogue voice audio loading error:', e);
    if (elBtnRetryAudio) {
      elBtnRetryAudio.style.display = 'inline-block';
      elBtnRetryAudio.onclick = () => {
        elBtnRetryAudio.style.display = 'none';
        if (voiceAudio) voiceAudio.load();
        if (voiceAudio) voiceAudio.play().catch(() => { });
      };
    }
  }

  // ── PHASE 5: Recording Ends -> Darkness -> Multi-Focal Heart Burst ──
  function onVoiceRecordingFinished() {
    if (voiceEndedHandled) return;
    voiceEndedHandled = true;

    // 1. Spoken words finish naturally. Wait brief moment (~600ms).
    setTimeout(() => {
      // 2. Dissolve photos, vignette & typography into deep black
      if (window.gsap) {
        gsap.to(['#photoLanesContainer', '#epilogueTypography', '.epilogue-typography-vignette'], {
          opacity: 0,
          filter: 'blur(14px)',
          duration: 2.2,
          ease: 'power2.inOut'
        });
      } else {
        if (elEpilogueExperience) elEpilogueExperience.style.opacity = '0';
      }

      // 3. Intentional moment of silence (1100ms), then trigger multi-focal heart burst!
      setTimeout(() => {
        playEpilogueChimeSound();
        triggerMultiFocalHeartBurst();

        // 4. After burst reaches its peak, screen settles into dark void -> PHASE 6 Reveal
        setTimeout(() => {
          revealReliveScreen();
        }, 3400);
      }, 1100);
    }, 600);
  }

  // ── PHASE 6: The Final Invitation to Relive Everything ──
  function revealReliveScreen() {
    if (elEpilogueExperience) {
      elEpilogueExperience.style.display = 'none';
    }
    if (elEpilogueRelive) {
      elEpilogueRelive.style.display = 'flex';
      elEpilogueRelive.style.opacity = '0';
    }

    if (window.gsap) {
      const reliveTl = gsap.timeline();
      reliveTl.to(elEpilogueRelive, { opacity: 1, duration: 1.8, ease: 'power2.inOut' });
      reliveTl.fromTo('.relive-crest',
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.4, ease: 'back.out(1.7)' },
        '-=1.0'
      );
      reliveTl.fromTo('.relive-quote',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 2.0, ease: 'power2.out' },
        '-=0.8'
      );
      reliveTl.fromTo('.relive-subtext',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 1.6, ease: 'power2.out' },
        '-=1.2'
      );
      reliveTl.fromTo('.relive-cinematic-btn',
        { opacity: 0, scale: 0.92, filter: 'blur(6px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 2.0, ease: 'power3.out' },
        '-=0.8'
      );
      epilogueActiveTimeline = reliveTl;
    } else {
      if (elEpilogueRelive) elEpilogueRelive.style.opacity = '1';
    }
  }

  // Clean Replay Mechanism: Resets all state and restarts 7-scene film
  function reliveStoryFromBeginning() {
    // 1. Stop & clean up epilogue audio
    if (voiceAudio) {
      voiceAudio.pause();
      voiceAudio.currentTime = 0;
      voiceAudio = null;
    }

    // 2. Cancel animations & clear canvases
    if (starAnimFrame) {
      cancelAnimationFrame(starAnimFrame);
      starAnimFrame = null;
    }
    if (burstAnimFrame) {
      cancelAnimationFrame(burstAnimFrame);
      burstAnimFrame = null;
    }
    if (burstCtx && elEpilogueBurstCanvas) {
      burstCtx.clearRect(0, 0, elEpilogueBurstCanvas.width, elEpilogueBurstCanvas.height);
    }
    if (starCtx && elEpilogueStarCanvas) {
      starCtx.clearRect(0, 0, elEpilogueStarCanvas.width, elEpilogueStarCanvas.height);
    }
    burstHearts = [];
    starParticles = [];

    if (epilogueActiveTimeline) {
      epilogueActiveTimeline.kill();
      epilogueActiveTimeline = null;
    }
    if (window.gsap) {
      gsap.killTweensOf([
        '#cinematicEpilogue',
        '#epilogueInvitation',
        '#epilogueExperience',
        '#photoLanesContainer',
        '#epilogueTypography',
        '.epilogue-typography-vignette',
        '.t-word',
        '.t-heart',
        '#epilogueRelive',
        '.relive-crest',
        '.relive-quote',
        '.relive-subtext',
        '.relive-cinematic-btn'
      ]);
      gsap.set(['#photoLanesContainer', '#epilogueTypography', '.epilogue-typography-vignette'], {
        opacity: 1,
        filter: 'blur(0px)'
      });
      gsap.set('.t-word', { opacity: 0, y: 24, filter: 'blur(22px)' });
      gsap.set('.t-heart', { opacity: 0, scale: 0.4, filter: 'blur(12px)' });
    }

    // 3. Reset letter state & hide containers
    if (letterAbortController) {
      letterAbortController.aborted = true;
      letterAbortController = null;
    }
    letterFinished = false;
    if (elFinaleLetter) {
      elFinaleLetter.classList.remove('is-active');
      elFinaleLetter.style.display = 'none';
      elFinaleLetter.style.opacity = '';
      elFinaleLetter.style.filter = '';
      elFinaleLetter.style.transform = '';
    }
    if (elLetterActions) {
      elLetterActions.style.opacity = '0';
      elLetterActions.style.pointerEvents = 'none';
    }
    if (elBtnEnterFinalStage) {
      elBtnEnterFinalStage.disabled = false;
    }
    if (elCinematicEpilogue) {
      elCinematicEpilogue.classList.remove('is-active');
      elCinematicEpilogue.style.display = 'none';
    }
    if (elEpilogueRelive) {
      elEpilogueRelive.style.display = 'none';
    }

    // 4. Reset film orchestrator & soundtrack director state
    currentSceneIndex = -1;
    isTransitioning = false;
    isStarted = true;
    completedScenes.clear();
    scenesWithOutroPlayed.clear();
    clearAllSceneTimers();
    clearNarrative();

    // Reset master soundtrack to 0:00 (force seek allowed on explicit replay)
    soundtrack.hook1Triggered = false;
    soundtrack.hook2Triggered = false;
    soundtrack.seek(0, true);
    soundtrack.unduck(0.1);
    soundtrack.play();

    // 5. Restore HUD & footer controls
    if (elHud) elHud.style.display = '';
    if (elFooter) elFooter.style.display = '';

    // 6. Transition curtain to black and start Scene 0 (Spider-Man) afresh
    elCurtain.classList.add('curtain--active');
    setTimeout(() => {
      goToScene(0);
    }, 500);
  }

  // ── Orchestrator Show/Hide Finale Entrypoints ──
  function showFinale() {
    clearNarrative();
    elCurtain.classList.add('curtain--active');
    soundtrack.unduck();

    setTimeout(() => {
      if (elFrame) elFrame.src = 'about:blank';
      if (elHud) elHud.style.display = 'none';
      if (elFooter) elFooter.style.display = 'none';

      if (elFinaleLetter) {
        elFinaleLetter.style.display = 'flex';
        requestAnimationFrame(() => {
          elCurtain.classList.remove('curtain--active');
          elFinaleLetter.classList.add('is-active');
          playCinematicLetter();
        });
      } else {
        startCinematicEpilogue();
      }
    }, 1000);
  }

  function hideFinale() {
    if (elFinaleLetter) {
      elFinaleLetter.classList.remove('is-active');
      if (letterAbortController) letterAbortController.aborted = true;
      elFinaleLetter.style.display = 'none';
    }
    if (elCinematicEpilogue) {
      elCinematicEpilogue.classList.remove('is-active');
      elCinematicEpilogue.style.display = 'none';
    }
  }

  // Wire personal birthday letter event listeners
  if (elLetterCard) {
    elLetterCard.addEventListener('click', e => {
      if (e.target.closest('#btnEnterFinalStage')) return;
      instantRevealAllLetter();
    });
  }

  if (elBtnEnterFinalStage) {
    elBtnEnterFinalStage.addEventListener('click', e => {
      e.stopPropagation();
      elBtnEnterFinalStage.disabled = true;

      // Mysterious cinematic transition from letter to the final stage
      if (window.gsap) {
        gsap.to(elFinaleLetter, {
          opacity: 0,
          filter: 'blur(12px)',
          scale: 0.98,
          duration: 1.4,
          ease: 'power2.inOut',
          onComplete: () => {
            if (elFinaleLetter) {
              elFinaleLetter.classList.remove('is-active');
              elFinaleLetter.style.display = 'none';
              elFinaleLetter.style.opacity = '';
              elFinaleLetter.style.filter = '';
              elFinaleLetter.style.transform = '';
            }
            startCinematicEpilogue(true);
            beginEpilogueRecording();
          }
        });
      } else {
        if (elFinaleLetter) {
          elFinaleLetter.classList.remove('is-active');
          elFinaleLetter.style.display = 'none';
        }
        startCinematicEpilogue(true);
        beginEpilogueRecording();
      }
    });
  }

  // Wire epilogue event listeners
  if (elBtnOpenEpilogue) {
    elBtnOpenEpilogue.addEventListener('click', e => {
      e.stopPropagation();
      beginEpilogueRecording();
    });
  }

  if (elBtnReliveStory) {
    elBtnReliveStory.addEventListener('click', e => {
      e.stopPropagation();
      reliveStoryFromBeginning();
    });
  }

  window.addEventListener('resize', () => {
    resizeBurstCanvas();
    if (elEpilogueStarCanvas && elEpilogueStarCanvas.style.display !== 'none') {
      initEpilogueStars();
    }
  });

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
      soundtrack.ctx.resume().catch(() => { });
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
