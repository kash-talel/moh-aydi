(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Nav background on scroll
  const nav = document.querySelector('.nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Play gallery videos only while visible
  const vio = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (reduceMotion) return;
      if (e.isIntersecting) e.target.play().catch(() => {});
      else e.target.pause();
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.g video').forEach((v) => vio.observe(v));

  // Le Labo — bulking calculator (Mifflin–St Jeor)
  const form = document.getElementById('calc');
  const $ = (id) => document.getElementById(id);
  const fmt = (n) => Math.round(n).toLocaleString('fr-FR');
  const fmt1 = (n) => n.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  function calc() {
    const d = new FormData(form);
    const w = parseFloat(d.get('weight'));
    const h = parseFloat(d.get('height'));
    const a = parseFloat(d.get('age'));
    if (!(w > 30 && h > 120 && a > 12)) return;
    const sex = d.get('sex');
    const act = parseFloat(d.get('activity'));
    const surplus = parseFloat(d.get('pace'));

    const bmr = 10 * w + 6.25 * h - 5 * a + (sex === 'm' ? 5 : -161);
    const kcal = Math.round((bmr * act + surplus) / 10) * 10;
    const prot = 2 * w;                 // 2 g/kg
    const fat = Math.max(0.9 * w, (kcal * 0.25) / 9); // ≥ 25 % des calories
    const carb = Math.max(0, (kcal - prot * 4 - fat * 9) / 4);

    $('kcal').textContent = fmt(kcal);
    $('prot').textContent = fmt(prot);
    $('fat').textContent = fmt(fat);
    $('carb').textContent = fmt(carb);
    const total = prot * 4 + fat * 9 + carb * 4;
    $('bar-p').style.width = (prot * 4 / total * 100) + '%';
    $('bar-c').style.width = (carb * 4 / total * 100) + '%';
    $('bar-f').style.width = (fat * 9 / total * 100) + '%';

    // Prise visée : 0,25–0,5 % (lean) ou 0,4–0,75 % (hardgainer) du poids / semaine
    const [lo, hi] = surplus < 400 ? [0.0025, 0.005] : [0.004, 0.0075];
    $('gain').textContent = `+${fmt1(w * lo * 4.3)} à ${fmt1(w * hi * 4.3)} kg / mois`;
  }
  form.addEventListener('input', calc);
  form.addEventListener('submit', (e) => e.preventDefault());
  calc();

  $('year').textContent = new Date().getFullYear();

  // Communauté Skool : si un lien est renseigné, les boutons y mènent directement
  const community = document.getElementById('communaute');
  const skoolUrl = community && community.dataset.skoolUrl.trim();
  if (skoolUrl) {
    const btn = $('skool-btn');
    btn.href = skoolUrl;
    btn.textContent = 'Rejoindre la communauté';
    $('skool-status').textContent = 'Sur Skool';
    const f = $('skool-footer');
    f.href = skoolUrl; f.target = '_blank'; f.rel = 'noopener'; f.hidden = false;
  }
})();
