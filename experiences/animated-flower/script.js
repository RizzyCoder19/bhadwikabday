const starsRoot = document.querySelector(".stars");

if (starsRoot) {
  let seed = 73129;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let index = 0; index < 156; index += 1) {
    const star = document.createElement("span");
    const isBright = index % 13 === 0;
    star.className = isBright ? "star star--bright" : "star";
    star.style.setProperty("--star-x", `${(random() * 100).toFixed(2)}%`);
    star.style.setProperty("--star-y", `${(random() * 83).toFixed(2)}%`);
    star.style.setProperty("--star-size", `${isBright ? 1.4 + random() * 1.1 : 0.65 + random() * 0.9}px`);
    star.style.setProperty("--star-alpha", (0.3 + random() * 0.38).toFixed(2));
    star.style.setProperty("--star-duration", `${(3.2 + random() * 5.5).toFixed(2)}s`);
    star.style.setProperty("--star-delay", `${(-random() * 8).toFixed(2)}s`);
    starsRoot.appendChild(star);
  }
}

window.addEventListener("load", () => {
  const butterfliesRoot = document.querySelector(".butterflies");
  const flowersRoot = document.querySelector(".flowers");

  // Reuse the original flower designs so the garden keeps the same hand-drawn look.
  [
    { source: ".flower--2", number: 4 },
    { source: ".flower--3", number: 5 },
  ].forEach(({ source, number }) => {
    const original = document.querySelector(source);

    if (!original || !flowersRoot) {
      return;
    }

    const flower = original.cloneNode(true);
    flower.className = `flower flower--${number}`;
    flower.querySelector(".flower__leafs").className = `flower__leafs flower__leafs--${number}`;
    flowersRoot.insertBefore(flower, flowersRoot.firstChild);
  });

  const gardenRows = [
    { left: "-25vmin", scale: 0.3, stem: 29, bottom: 11, delay: 3.6, hue: 18 },
    { left: "-17vmin", scale: 0.38, stem: 36, bottom: 7, delay: 2.4, hue: -12 },
    { left: "-9vmin", scale: 0.29, stem: 25, bottom: 14, delay: 4.2, hue: 24 },
    { left: "8vmin", scale: 0.41, stem: 38, bottom: 6, delay: 1.9, hue: -8 },
    { left: "21vmin", scale: 0.32, stem: 31, bottom: 12, delay: 4.7, hue: 16 },
  ];

  gardenRows.forEach((row, index) => {
    const source = document.querySelector(index % 2 ? ".flower--3" : ".flower--2");

    if (!source || !flowersRoot) {
      return;
    }

    const flower = source.cloneNode(true);
    flower.className = "flower flower--garden";
    flower.style.left = row.left;
    flower.style.bottom = `${row.bottom}vmin`;
    flower.style.scale = String(row.scale);
    flower.style.zIndex = String(Math.round(row.scale * 10));
    flower.style.animationDelay = `${-(index % 7) * 0.72}s`;
    flower.style.animationDuration = `${5.8 + (index % 4) * 0.65}s`;
    flower.style.filter = `hue-rotate(${row.hue}deg) saturate(1.08)`;
    flower.style.setProperty("--grow-delay", `${row.delay}s`);
    flower.querySelector(".flower__line").style.height = `${row.stem}vmin`;
    flower.querySelector(".flower__leafs").className = `flower__leafs flower__leafs--garden-${index}`;
    flower.querySelectorAll(".flower__light").forEach((light) => light.remove());
    flowersRoot.insertBefore(flower, flowersRoot.firstChild);
  });

  const fieldRows = [
    { left: "-46vw", scale: 0.34, stem: 63, bottom: 9, delay: 3.4, hue: -8 },
    { left: "-37vw", scale: 0.42, stem: 45, bottom: 3, delay: 4.8, hue: 10 },
    { left: "-28vw", scale: 0.31, stem: 70, bottom: 13, delay: 2.9, hue: 22 },
    { left: "-19vw", scale: 0.4, stem: 52, bottom: 5, delay: 5.2, hue: -14 },
    { left: "-9vw", scale: 0.33, stem: 60, bottom: 11, delay: 4.1, hue: 5 },
    { left: "3vw", scale: 0.39, stem: 48, bottom: 4, delay: 5.8, hue: 18 },
    { left: "14vw", scale: 0.32, stem: 68, bottom: 12, delay: 3.8, hue: -10 },
    { left: "25vw", scale: 0.43, stem: 44, bottom: 2, delay: 4.6, hue: 26 },
    { left: "36vw", scale: 0.35, stem: 57, bottom: 8, delay: 5.5, hue: -5 },
    { left: "46vw", scale: 0.3, stem: 66, bottom: 14, delay: 3.1, hue: 14 },
    { left: "-43vw", scale: 0.62, stem: 28, bottom: 2, delay: 6.3, hue: 12 },
    { left: "-31vw", scale: 0.8, stem: 22, bottom: 5, delay: 7.2, hue: -16 },
    { left: "-17vw", scale: 0.68, stem: 35, bottom: 1, delay: 6.8, hue: 24 },
    { left: "-4vw", scale: 0.86, stem: 25, bottom: 4, delay: 8.1, hue: 3 },
    { left: "11vw", scale: 0.64, stem: 39, bottom: 0, delay: 7.5, hue: -10 },
    { left: "27vw", scale: 0.78, stem: 27, bottom: 3, delay: 8.7, hue: 18 },
    { left: "40vw", scale: 0.7, stem: 34, bottom: 1, delay: 6.6, hue: -5 },
  ];

  fieldRows.forEach((row, index) => {
    const source = document.querySelector(index % 2 ? ".flower--3" : ".flower--2");

    if (!source || !flowersRoot) {
      return;
    }

    const flower = source.cloneNode(true);
    flower.className = "flower flower--garden";
    flower.style.left = row.left;
    flower.style.bottom = `${row.bottom}vmin`;
    flower.style.scale = String(row.scale);
    flower.style.zIndex = String(Math.round(row.scale * 10));
    flower.style.animationDelay = `${-(index % 7) * 0.72}s`;
    flower.style.animationDuration = `${5.8 + (index % 4) * 0.65}s`;
    flower.style.filter = `hue-rotate(${row.hue}deg) saturate(1.08)`;
    flower.style.setProperty("--grow-delay", `${row.delay}s`);
    flower.querySelector(".flower__line").style.height = `${row.stem}vmin`;
    flower.querySelector(".flower__leafs").className = `flower__leafs flower__leafs--field-${index}`;
    flower.querySelectorAll(".flower__light").forEach((light) => light.remove());
    flowersRoot.insertBefore(flower, flowersRoot.firstChild);
  });

  [
    { type: 1, delay: -4.3, duration: 14 },
    { type: 2, delay: -7.1, duration: 16 },
    { type: 3, delay: -2.8, duration: 13 },
  ].forEach(({ type, delay, duration }) => {
    const original = butterfliesRoot?.querySelector(`.butterfly--${type}`);

    if (!original || !butterfliesRoot) {
      return;
    }

    const butterfly = original.cloneNode(true);
    butterfly.classList.add("butterfly--roamer");
    butterfly.style.setProperty("--roam-delay", `${delay}s`);
    butterfly.style.setProperty("--roam-time", `${duration}s`);
    butterfliesRoot.appendChild(butterfly);
  });

  const landingProfiles = [
    {
      className: "butterfly--1",
      flower: ".flower__leafs--1",
      entry: { x: -76, y: 45, scale: 0.82, rotate: -24 },
      scale: 0.52,
      rotate: 5,
    },
    {
      className: "butterfly--2",
      flower: ".flower__leafs--2",
      entry: { x: 68, y: 36, scale: 0.78, rotate: 24 },
      scale: 0.48,
      rotate: -5,
    },
    {
      className: "butterfly--3",
      flower: ".flower__leafs--3",
      entry: { x: -44, y: -32, scale: 0.72, rotate: -12 },
      scale: 0.44,
      rotate: 10,
    },
  ];

  const vmin = () => Math.min(window.innerWidth, window.innerHeight) / 100;
  const ease = (value) => (1 - Math.cos(Math.PI * value)) / 2;
  const lerp = (start, end, progress) => start + (end - start) * progress;

  const readTransform = (butterfly) => {
    const transform = getComputedStyle(butterfly).transform;

    if (!transform || transform === "none") {
      return { x: 0, y: 0, scale: 0.55, rotate: 0 };
    }

    const matrix = new DOMMatrixReadOnly(transform);

    return {
      x: matrix.m41,
      y: matrix.m42,
      scale: Math.hypot(matrix.a, matrix.b) || 0.55,
      rotate: Math.atan2(matrix.b, matrix.a) * (180 / Math.PI),
    };
  };

  const landingTransform = (butterfly, profile) => {
    const flower = document.querySelector(profile.flower);
    const nectar = flower?.querySelector(".flower__white-circle");

    if (!butterfliesRoot || !nectar) {
      return null;
    }

    const rootRect = butterfliesRoot.getBoundingClientRect();
    const nectarRect = nectar.getBoundingClientRect();
    const butterflyHeight = butterfly.offsetHeight;
    const unit = vmin();
    const nectarX = nectarRect.left + nectarRect.width * 0.5;
    const nectarY = nectarRect.top + nectarRect.height * 0.45;
    const probeX = 6 * unit * profile.scale;
    const probeY = 4.25 * unit * profile.scale;

    return {
      x: nectarX - probeX - rootRect.left,
      y: nectarY - probeY - (rootRect.top - butterflyHeight),
    };
  };

  const attachToFlower = (butterfly, profile) => {
    const flower = document.querySelector(profile.flower);

    if (!flower) {
      return;
    }

    butterfly.classList.remove("is-landing");
    butterfly.classList.add("is-landed");
    flower.appendChild(butterfly);
    butterfly.style.removeProperty("transform");
  };

  const landButterfly = (butterfly, profile) => {
    const start = readTransform(butterfly);
    const startedAt = performance.now();
    const duration = 12000;
    const phase = landingProfiles.indexOf(profile) * 1.4;

    butterfly.style.transform = `translate(${start.x}px, ${start.y}px) scale(${start.scale}) rotate(${start.rotate}deg)`;
    butterfly.classList.add("is-landing");

    const move = (now) => {
      const rawProgress = Math.min((now - startedAt) / duration, 1);
      const progress = ease(rawProgress);
      const target = landingTransform(butterfly, profile);

      if (!target) {
        return;
      }

      const unit = vmin();
      const flutter = 1 - progress;
      const x =
        lerp(start.x, target.x, progress) +
        Math.sin(rawProgress * Math.PI * 3 + phase) * unit * 0.8 * flutter;
      const y =
        lerp(start.y, target.y, progress) -
        Math.sin(rawProgress * Math.PI) * unit * 4 * flutter +
        Math.cos(rawProgress * Math.PI * 3 + phase) * unit * 0.6 * flutter;
      const scale = lerp(start.scale, profile.scale, progress);
      const rotate =
        lerp(start.rotate, profile.rotate, progress) +
        Math.sin(rawProgress * Math.PI * 3 + phase) * 7 * flutter;

      butterfly.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`;

      if (rawProgress < 1) {
        requestAnimationFrame(move);
        return;
      }

      attachToFlower(butterfly, profile);
    };

    requestAnimationFrame(move);
  };

  const startLandingSequence = () => {
    landingProfiles.forEach((profile, index) => {
      const butterfly = document.querySelector(`.${profile.className}`);

      if (!butterfly || butterfly.classList.contains("is-landed")) {
        return;
      }

      setTimeout(() => landButterfly(butterfly, profile), index * 1000);
    });
  };

  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
    setTimeout(startLandingSequence, 6200);
  }, 1000);
});
