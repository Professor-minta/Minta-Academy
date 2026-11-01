(() => {
  const KEY = 'ma-progres';
  const root = document.documentElement;
  root.classList.add('js');

  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
  const write = (data) => { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {} };

  function paintProgress() {
    const done = read();
    document.querySelectorAll('[data-module]').forEach((el) => {
      if (el.tagName === 'ARTICLE') return;
      el.classList.toggle('is-done', Boolean(done[el.dataset.module]));
    });
    const steps = [...document.querySelectorAll('.step')];
    const line = document.querySelector('.progress-line');
    const resume = document.querySelector('[data-resume]');
    if (steps.length && line) {
      const count = steps.filter((s) => done[s.dataset.module]).length;
      line.hidden = count === 0;
      line.textContent = count === steps.length ? 'Bravo, tu as terminé les 10 modules.' : `Ta progression : ${count} module${count > 1 ? 's' : ''} terminé${count > 1 ? 's' : ''} sur ${steps.length}.`;
      const next = steps.find((s) => !done[s.dataset.module]);
      if (resume && count > 0 && next) {
        resume.href = next.querySelector('a').getAttribute('href');
        resume.textContent = `Continuer avec le module ${next.querySelector('.step-num').textContent}`;
      }
    }
    document.querySelectorAll('[data-done]').forEach((button) => {
      const on = Boolean(done[button.dataset.done]);
      button.setAttribute('aria-pressed', String(on));
      button.textContent = on ? 'Module terminé' : 'J’ai terminé ce module';
    });
  }

  document.querySelectorAll('[data-done]').forEach((button) => {
    button.addEventListener('click', () => {
      const done = read();
      if (done[button.dataset.done]) delete done[button.dataset.done];
      else done[button.dataset.done] = new Date().toISOString().slice(0, 10);
      write(done);
      paintProgress();
    });
  });
  paintProgress();

  document.querySelectorAll('.copy').forEach((button) => {
    button.addEventListener('click', async () => {
      const text = button.parentElement.querySelector('code').innerText;
      try { await navigator.clipboard.writeText(text); button.textContent = 'Copié'; }
      catch { button.textContent = 'Sélectionne le texte'; }
      setTimeout(() => { button.textContent = 'Copier'; }, 1800);
    });
  });

  const inscription = document.querySelector('[data-inscription]');
  if (inscription) inscription.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(inscription);
    const value = (name) => String(data.get(name) || '').trim();
    const lines = [
      'Bonjour Minta Academy, je souhaite me pré-inscrire à la formation à Bamako.',
      '',
      `Nom : ${value('nom')}`,
      `WhatsApp : ${value('tel')}`,
      `Formule : ${value('formule')}`,
      `Disponibilités : ${value('dispo')}`,
      `Ordinateur portable : ${value('pc')}`
    ];
    if (value('quartier')) lines.push(`Quartier ou ville : ${value('quartier')}`);
    window.location.href = `https://wa.me/${inscription.dataset.inscription}?text=${encodeURIComponent(lines.join('\n'))}`;
  });

  const theme = document.querySelector('.theme');
  if (theme) theme.addEventListener('click', () => {
    const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('ma-theme', root.dataset.theme); } catch {}
  });

  const typed = document.querySelector('.t-type');
  if (typed && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const full = typed.dataset.text;
    const lines = [...document.querySelectorAll('.t-line')];
    typed.textContent = '';
    typed.classList.add('caret');
    let i = 0;
    const tick = () => {
      typed.textContent = full.slice(0, ++i);
      if (i < full.length) return setTimeout(tick, 38 + Math.random() * 40);
      typed.classList.remove('caret');
      lines.forEach((line, n) => setTimeout(() => line.classList.add('is-on'), 600 + n * 1100));
    };
    setTimeout(tick, 500);
  } else {
    document.querySelectorAll('.t-line').forEach((line) => line.classList.add('is-on'));
  }
})();
