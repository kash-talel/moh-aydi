(() => {
  const $ = (id) => document.getElementById(id);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Manifeste : mots qui révèlent une photo ---------- */
  const peek = $('peek');
  if (peek && canHover) {
    document.querySelectorAll('.peek').forEach((el) => {
      el.addEventListener('mouseenter', () => { peek.src = el.dataset.peek; peek.classList.add('is-on'); });
      el.addEventListener('mouseleave', () => peek.classList.remove('is-on'));
    });
    window.addEventListener('mousemove', (e) => {
      peek.style.left = Math.min(e.clientX + 170, window.innerWidth - 120) + 'px';
      peek.style.top = Math.max(e.clientY - 150, 160) + 'px';
    }, { passive: true });
  }

  /* ---------- Mouvement : séquence au scroll ---------- */
  const seq = $('mouvement');
  if (seq && !reduceMotion) {
    const frames = [...seq.querySelectorAll('.seq__frame')];
    const word = $('seq-word'), count = $('seq-i'), bar = $('seq-bar');
    let current = 0, ticking = false;
    const update = () => {
      ticking = false;
      const r = seq.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / total));
      bar.style.width = (p * 100) + '%';
      const i = Math.min(frames.length - 1, Math.floor(p * frames.length));
      if (i === current) return;
      frames[current].classList.remove('is-active');
      frames[i].classList.add('is-active');
      current = i;
      word.textContent = frames[i].dataset.word;
      word.classList.remove('swap'); void word.offsetWidth; word.classList.add('swap');
      count.textContent = String(i + 1).padStart(2, '0');
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------- Quiz : ton profil ---------- */
  const QUESTIONS = [
    { q: 'Depuis combien de temps tu t’entraînes ?', a: [
      ['Jamais, ou moins de 6 mois', { b: 2 }],
      ['Entre 6 mois et 2 ans', { h: 1, p: 1 }],
      ['Plus de 2 ans', { p: 2 }],
      ['Par périodes : j’arrête, je reprends', { i: 2 }] ] },
    { q: 'Ton plus gros frein aujourd’hui ?', a: [
      ['Je ne sais pas quoi faire en salle', { b: 2 }],
      ['Je mange, mais je ne prends pas de poids', { h: 2 }],
      ['Mes charges n’augmentent plus', { p: 2 }],
      ['Je lâche au bout de quelques semaines', { i: 2 }] ] },
    { q: 'Combien de repas tu prends par jour ?', a: [
      ['1 ou 2', { h: 2 }],
      ['3', { h: 1 }],
      ['4 ou plus', { p: 1 }],
      ['Ça dépend complètement des jours', { i: 1, b: 1 }] ] },
    { q: 'Et ton programme d’entraînement ?', a: [
      ['Je n’en ai pas, j’improvise', { b: 1, i: 1 }],
      ['Un programme trouvé sur internet', { h: 1 }],
      ['Le même depuis longtemps', { p: 2 }],
      ['J’en change tout le temps', { i: 2 }] ] },
  ];
  const PROFILES = {
    b: { t: 'Le <em>Bâtisseur.</em>', d: 'Tu pars de zéro, et c’est une chance : les débutants progressent plus vite que tout le monde. Ce qu’il te faut maintenant, ce sont des bases propres.',
         p: ['Apprendre 5 ou 6 mouvements de base avec une technique propre.', 'Suivre un programme simple, trois séances par semaine.', 'Une vraie source de protéines à chaque repas.'] },
    h: { t: 'Le <em>Hardgainer.</em>', d: 'Tu t’entraînes, mais la balance ne suit pas. Le plus souvent, ce n’est pas ta génétique : tu ne manges simplement pas assez, ni assez souvent.',
         p: ['Connaître tes vraies calories (Le Labo, juste en dessous).', 'Passer à quatre repas ou collations par jour.', 'Te peser chaque semaine et ajouter 150 kcal si rien ne bouge.'] },
    p: { t: 'En <em>plateau.</em>', d: 'Tu as de l’expérience, mais tes charges ne bougent plus. Ton corps s’est adapté : il faut changer la façon dont tu progresses, pas t’entraîner plus.',
         p: ['Une vraie surcharge progressive, suivie séance après séance.', 'Revoir ton volume : parfois moins de séries, mais plus intenses.', 'Vérifier que ton sommeil et tes calories suivent l’effort.'] },
    i: { t: 'L’<em>Intermittent.</em>', d: 'Tu sais quoi faire. Le problème, c’est de le faire longtemps. Tu n’as pas besoin de plus de motivation, mais d’un système qui tient quand elle disparaît.',
         p: ['Un programme court et réaliste, tenable même les mauvaises semaines.', 'Des repères simples : séances cochées, poids, photos.', 'Quelqu’un, ou une communauté, à qui rendre des comptes.'] },
  };
  const body = $('quiz-body');
  if (body) {
    const step = $('quiz-step'), qbar = $('quiz-bar');
    let idx = 0, score = {};
    const render = () => {
      if (idx >= QUESTIONS.length) return result();
      const { q, a } = QUESTIONS[idx];
      step.textContent = `Question ${idx + 1} / ${QUESTIONS.length}`;
      qbar.style.width = (idx / QUESTIONS.length * 100) + '%';
      body.innerHTML = `<p class="quiz__q">${q}</p><div class="quiz__opts">${
        a.map(([label], k) => `<button type="button" class="quiz__opt" data-k="${k}"><b>${'ABCD'[k]}</b><span>${label}</span></button>`).join('')}</div>`;
    };
    const result = () => {
      const order = ['h', 'p', 'b', 'i'];
      const best = order.reduce((m, k) => ((score[k] || 0) > (score[m] || 0) ? k : m), order[0]);
      const pr = PROFILES[best];
      step.textContent = 'Résultat';
      qbar.style.width = '100%';
      body.innerHTML = `<h3 class="quiz__result-title">${pr.t}</h3>
        <p class="quiz__result-text">${pr.d}</p>
        <ol class="quiz__prios">${pr.p.map((x) => `<li><span>${x}</span></li>`).join('')}</ol>
        <div class="quiz__actions"><a class="btn" href="#reserver">En parler pendant un appel</a><button type="button" class="quiz__restart">Recommencer</button></div>`;
    };
    body.addEventListener('click', (e) => {
      const opt = e.target.closest('.quiz__opt');
      if (opt) {
        const pts = QUESTIONS[idx].a[+opt.dataset.k][1];
        Object.entries(pts).forEach(([k, v]) => { score[k] = (score[k] || 0) + v; });
        idx++; render();
        body.querySelector('button')?.focus({ preventScroll: true });
        return;
      }
      if (e.target.closest('.quiz__restart')) { idx = 0; score = {}; render(); }
    });
    render();
  }

  /* ---------- Planche contact : lightbox ---------- */
  const lb = $('lightbox');
  if (lb) {
    const img = lb.querySelector('img');
    const closeBtn = lb.querySelector('.lightbox__close');
    let opener = null;
    const close = () => { lb.hidden = true; document.body.style.overflow = ''; opener?.focus(); };
    document.querySelectorAll('.frame').forEach((f) => f.addEventListener('click', () => {
      opener = f;
      img.src = f.dataset.full;
      img.alt = f.querySelector('img').alt;
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }));
    lb.addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lb.hidden) close(); });
  }
})();
