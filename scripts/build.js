#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { Marked } = require('marked');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'site');
const SITE_URL = 'https://mintaservices.com/academy/';
const WHATSAPP = '22377295259';
const EMAIL = 'academy@mintaservices.com';
const GITHUB = 'https://github.com/Professor-minta/Minta-Academy';
const VERSION = '6';
// Première promotion à Bamako : change ces lignes, puis lance « npm run build ».
const PROMO = {
  debut: 'lundi 7 décembre 2026',
  fin: 'jeudi 24 décembre 2026',
  horaire: 'du lundi au jeudi, de 18 h à 20 h',
  prix: '75 000 FCFA',
  prixEtudiant: '50 000 FCFA',
};

const escape = (text) => String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const slugify = (text) => String(text).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// La vidéo courte de la promotion : remplace les deux fichiers de site/assets/videos/ pour la changer.
const promoVideo = () => `
<section class="promo-video" aria-labelledby="promo-video-titre">
  <video controls playsinline muted preload="none" width="720" height="1280" poster="assets/videos/formation-bamako-decembre-2026.webp" aria-label="La formation Minta Academy à Bamako : dates, horaire, prix et lieu">
    <source src="assets/videos/formation-bamako-decembre-2026.mp4" type="video/mp4">
  </video>
  <div>
    <h2 id="promo-video-titre">La formation en 22 secondes</h2>
    <p>Les dates, l'horaire, le prix et le lieu de la première promotion, en une courte vidéo à partager.</p>
    <ul class="facts">
      <li>Du 7 au 24 décembre 2026</li>
      <li>Lundi au jeudi, 18 h à 20 h</li>
      <li>${PROMO.prix}, étudiants ${PROMO.prixEtudiant}</li>
      <li>Bamako</li>
    </ul>
  </div>
</section>`;
const wa = (message) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

function frontMatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  const data = {};
  if (match) for (const line of match[1].split('\n')) { const i = line.indexOf(':'); if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim(); }
  return { data, body: match ? source.slice(match[0].length) : source };
}

function markdown() {
  const headings = [];
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const html = this.parser.parseInline(tokens);
        const id = slugify(html);
        if (depth === 2) headings.push({ id, html });
        return `<h${depth} id="${id}">${html}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href);
        return `<a href="${escape(href)}"${title ? ` title="${escape(title)}"` : ''}${external ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`;
      },
      code({ text, lang }) {
        return `<div class="code"><pre><code${lang ? ` data-lang="${escape(lang)}"` : ''}>${escape(text)}</code></pre><button class="copy" type="button">Copier</button></div>\n`;
      },
      table(token) {
        const header = token.header.map((cell) => `<th>${this.parser.parseInline(cell.tokens)}</th>`).join('');
        const rows = token.rows.map((row) => `<tr>${row.map((cell) => `<td>${this.parser.parseInline(cell.tokens)}</td>`).join('')}</tr>`).join('\n');
        return `<div class="table"><table><thead><tr>${header}</tr></thead><tbody>${rows}</tbody></table></div>\n`;
      }
    }
  });
  return { render: (text) => marked.parse(text), headings };
}

const modules = fs.readdirSync(path.join(ROOT, 'modules')).filter((f) => /^\d{2}-.+\.md$/.test(f)).sort().map((file) => {
  const { data, body } = frontMatter(fs.readFileSync(path.join(ROOT, 'modules', file), 'utf8'));
  return { file, slug: file.replace(/\.md$/, ''), numero: Number(data.numero), titre: data.titre, phase: data.phase, duree: data.duree, objectif: data.objectif, body };
});

const logo = (prefix = '') => `<img class="logo-mark" src="${prefix}assets/minta-academy-192.png" alt="" width="34" height="34">`;

function page({ title, description, body, current, prefix = '' }) {
  const nav = [['index.html', 'Cours', 'cours'], ['bamako.html', 'Bamako', 'bamako'], ['entreprises.html', 'Entreprises', 'entreprises']]
    .map(([href, label, key]) => `<a href="${prefix}${href}"${current === key ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title)}</title>
<meta name="description" content="${escape(description)}">
<meta name="theme-color" content="#14213d">
<meta property="og:title" content="${escape(title)}">
<meta property="og:description" content="${escape(description)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Minta Academy">
<meta property="og:locale" content="fr_FR">
<meta property="og:image" content="${SITE_URL}assets/partage.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Logo de Minta Academy : cours tech gratuits et formation à Bamako">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${SITE_URL}assets/partage.jpg">
<link rel="icon" href="${prefix}assets/minta-academy-192.png" type="image/png">
<link rel="apple-touch-icon" href="${prefix}assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=JetBrains+Mono:wght@400&display=swap">
<link rel="stylesheet" href="${prefix}assets/style.css?v=${VERSION}">
<script>document.documentElement.classList.add('js');try{var t=localStorage.getItem('ma-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
</head>
<body>
<a class="skip" href="#contenu">Aller au contenu</a>
<header class="top">
  <a class="brand" href="${prefix}index.html">${logo(prefix)}<span>Minta Academy</span></a>
  <nav class="nav" aria-label="Navigation principale">${nav}<a href="${GITHUB}" target="_blank" rel="noopener">GitHub</a></nav>
  <button class="theme" type="button" aria-label="Changer de thème"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z"/></svg></button>
</header>
<main id="contenu">
${body}
</main>
<footer class="foot">
  <div class="foot-in">
    <p class="foot-brand">${logo(prefix)}<span>Minta Academy, par Minta Services. Missira, Ségou, Mali.</span></p>
    <p>Les cours sont sous licence <a href="https://creativecommons.org/licenses/by/4.0/deed.fr" target="_blank" rel="noopener">CC BY 4.0</a> : copie-les, traduis-les et partage-les en citant Minta Academy.</p>
    <p><a href="${wa('Bonjour, j’ai une question sur Minta Academy.')}" target="_blank" rel="noopener">WhatsApp +223 77 29 52 59</a> <a href="mailto:${EMAIL}">${EMAIL}</a> <a href="https://ia.mintaservices.com" target="_blank" rel="noopener">Mande-IA</a> <a href="https://mintaservices.com" target="_blank" rel="noopener">mintaservices.com</a></p>
  </div>
</footer>
<script src="${prefix}assets/app.js?v=${VERSION}" defer></script>
</body>
</html>
`;
}

function home() {
  const phases = [];
  for (const m of modules) {
    let phase = phases.find((p) => p.name === m.phase);
    if (!phase) phases.push(phase = { name: m.phase, modules: [] });
    phase.modules.push(m);
  }
  const path_ = phases.map((phase) => `
    <li class="phase">
      <h3 class="phase-name">${escape(phase.name)}</h3>
      <ol class="steps">${phase.modules.map((m) => `
        <li class="step" data-module="${m.slug}">
          <a href="${m.slug}.html">
            <span class="step-num" aria-hidden="true">${m.numero}</span>
            <span class="step-text"><strong>${escape(m.titre)}</strong><span>${escape(m.objectif)}</span></span>
            <span class="step-time">${escape(m.duree)}</span>
          </a>
        </li>`).join('')}
      </ol>
    </li>`).join('');
  const body = `
<section class="hero">
  <div class="hero-text">
    <h1>Construis ton propre cloud et ta propre IA.</h1>
    <p class="lead">Minta Academy est une formation <strong>gratuite et ouverte</strong>, en français, pensée pour le Mali. Dix modules pratiques, du nom de domaine jusqu'à une intelligence artificielle qui tourne sur ta machine, sans internet.</p>
    <div class="actions">
      <a class="btn btn-gold" href="${modules[0].slug}.html" data-resume>Commencer le module 1</a>
      <a class="btn btn-line" href="bamako.html#inscription">M'inscrire à la formation à Bamako</a>
      <a class="btn btn-line" href="entreprises.html">Installer Mande-IA dans mon entreprise</a>
    </div>
    <p class="progress-line" hidden></p>
  </div>
  <figure class="terminal" aria-label="Exemple : Mande-IA v3 qui répond sur un ordinateur, sans internet">
    <div class="term-bar"><i></i><i></i><i></i><span>PowerShell</span></div>
    <pre class="term"><span class="t-prompt">PS C:\\Users\\Awa&gt;</span> <span class="t-type" data-text="ollama run professor-minta/mande-ia.v3">ollama run professor-minta/mande-ia.v3</span>
<span class="t-line" data-delay="1"><span class="t-ai">&gt;&gt;&gt;</span> I ni ce ! C'est quoi un serveur VPS ?</span>
<span class="t-line t-answer" data-delay="2">I ni ce ! Un VPS est un ordinateur qui tourne jour et nuit dans un centre de données. Tu t'y connectes avec SSH et tu y installes ton site ou ton application. On le voit au module 4.</span></pre>
    <figcaption><span class="dot" aria-hidden="true"></span>Réponse calculée sur ce PC, sans connexion</figcaption>
  </figure>
</section>

<section class="pro pro-bamako" aria-labelledby="bamako-titre">
  <div>
    <h2 id="bamako-titre">La formation en présentiel à Bamako</h2>
    <p>12 séances pratiques avec un formateur, un vrai serveur et un groupe. Première promotion : <strong>du ${PROMO.debut} au ${PROMO.fin}</strong>, ${PROMO.horaire}. ${PROMO.prix}, ${PROMO.prixEtudiant} pour les étudiants. 15 places.</p>
  </div>
  <a class="btn btn-gold" href="bamako.html">Voir le programme et se pré-inscrire</a>
</section>
${promoVideo()}

<section class="parcours" aria-labelledby="parcours-titre">
  <div class="section-head">
    <h2 id="parcours-titre">Le parcours</h2>
    <p>Suis les modules dans l'ordre : chacun utilise ce que tu as construit au précédent. Ta progression est gardée sur cet appareil.</p>
  </div>
  <ol class="phases">${path_}
  </ol>
</section>

<section class="ollama" aria-labelledby="ollama-titre">
  <div class="ollama-in">
    <h2 id="ollama-titre">Essaie Mande-IA v3 sur ton ordinateur</h2>
    <p>Installe <a href="https://ollama.com/download" target="_blank" rel="noopener">Ollama</a>, puis tape cette commande. Le modèle se télécharge une fois (environ 2 Go) et répond ensuite sans internet.</p>
    <div class="code code-hero"><pre><code>ollama run professor-minta/mande-ia.v3</code></pre><button class="copy" type="button">Copier</button></div>
    <p class="small">Tout est expliqué pas à pas dans le <a href="08-ollama-mande-ia.html">module 8</a>, et l'interface dans le navigateur au <a href="09-open-webui.html">module 9</a>.</p>
  </div>
</section>

<section class="pro" aria-labelledby="pro-titre">
  <div>
    <h2 id="pro-titre">Pour les entreprises, écoles et administrations</h2>
    <p>Nous installons Mande-IA dans vos locaux, avec une interface pour toute l'équipe et vos propres documents. Il fonctionne sans internet et vos données ne sortent pas de chez vous.</p>
  </div>
  <a class="btn btn-gold" href="entreprises.html">Découvrir le pack entreprise</a>
</section>

<section class="ensemble" aria-labelledby="ensemble-titre">
  <h2 id="ensemble-titre">Apprendre ensemble</h2>
  <div class="ensemble-grid">
    <a class="link-card" href="${wa('Bonjour, je suis la formation Minta Academy et j’ai une question.')}" target="_blank" rel="noopener"><strong>Pose ta question sur WhatsApp</strong><span>Bloqué sur un exercice ? Écris-nous au +223 77 29 52 59.</span></a>
    <a class="link-card" href="${GITHUB}" target="_blank" rel="noopener"><strong>Améliore un cours sur GitHub</strong><span>Une erreur, une meilleure explication, une traduction en bambara : propose-la.</span></a>
    <a class="link-card" href="https://ia.mintaservices.com" target="_blank" rel="noopener"><strong>Demande à Mande-IA</strong><span>L'assistant en ligne répond en bambara, en français et en anglais.</span></a>
  </div>
</section>`;
  return page({ title: 'Minta Academy : formation gratuite cloud, serveurs et IA locale', description: 'Formation gratuite et ouverte, en français, pensée pour le Mali : nom de domaine, VPS, aaPanel, Node.js, Python, Ollama et Mande-IA v3 sans internet.', body, current: 'cours' });
}

function modulePage(m, index) {
  const md = markdown();
  const html = md.render(m.body);
  const prev = modules[index - 1];
  const next = modules[index + 1];
  const side = modules.map((x) => `<li data-module="${x.slug}"><a href="${x.slug}.html"${x === m ? ' aria-current="page"' : ''}><span class="side-num">${x.numero}</span>${escape(x.titre)}</a></li>`).join('');
  const toc = md.headings.map((h) => `<li><a href="#${h.id}">${h.html}</a></li>`).join('');
  const body = `
<div class="lesson-wrap">
  <aside class="side" aria-label="Modules">
    <p class="side-title">Les 10 modules</p>
    <ol class="side-list">${side}</ol>
  </aside>
  <article class="lesson" data-module="${m.slug}">
    <header class="lesson-head">
      <p class="lesson-meta">Module ${m.numero} sur ${modules.length}, ${escape(m.phase.toLowerCase())}, environ ${escape(m.duree)}</p>
      <h1>${escape(m.titre)}</h1>
      <p class="lesson-goal">${escape(m.objectif)}</p>
      <details class="toc"><summary>Dans ce module</summary><ol>${toc}</ol></details>
    </header>
    <div class="prose">
${html}
    </div>
    <div class="done-box">
      <button class="btn btn-done" type="button" data-done="${m.slug}" aria-pressed="false">J'ai terminé ce module</button>
      <p>Fais l'exercice avant de cocher : c'est lui qui t'apprend le plus.</p>
    </div>
    <nav class="pager" aria-label="Modules précédent et suivant">
      ${prev ? `<a class="pager-prev" href="${prev.slug}.html"><span>Module ${prev.numero}</span>${escape(prev.titre)}</a>` : '<span></span>'}
      ${next ? `<a class="pager-next" href="${next.slug}.html"><span>Module ${next.numero}</span>${escape(next.titre)}</a>` : `<a class="pager-next" href="entreprises.html"><span>Et après ?</span>Le pack Mande-IA pour les entreprises</a>`}
    </nav>
  </article>
</div>`;
  return page({ title: `Module ${m.numero} : ${m.titre}, Minta Academy`, description: m.objectif, body, current: 'cours' });
}

function entreprises() {
  const { data, body } = frontMatter(fs.readFileSync(path.join(ROOT, 'pages', 'entreprises.md'), 'utf8'));
  const html = markdown().render(body);
  const message = 'Bonjour, je souhaite installer Mande-IA dans ma structure. Nous sommes ___ personnes.';
  const content = `
<div class="ent">
  <header class="ent-head">
    <h1>${escape(data.titre)}</h1>
    <div class="actions">
      <a class="btn btn-gold" href="${wa(message)}" target="_blank" rel="noopener">Demander un devis sur WhatsApp</a>
      <a class="btn btn-line" href="mailto:${EMAIL}?subject=${encodeURIComponent('Pack Mande-IA entreprise')}">Écrire à ${EMAIL}</a>
    </div>
  </header>
  <div class="prose prose-ent">
${html}
  </div>
  <section class="ent-cta">
    <h2>Parlons de votre projet</h2>
    <p>Dites-nous combien de personnes utiliseront Mande-IA et ce que vous voulez lui confier.</p>
    <a class="btn btn-gold" href="${wa(message)}" target="_blank" rel="noopener">Demander un devis sur WhatsApp</a>
  </section>
</div>`;
  return page({ title: 'Pack Mande-IA entreprise : IA locale sans internet, Minta Academy', description: data.description, body: content, current: 'entreprises' });
}

function bamako() {
  const { data, body } = frontMatter(fs.readFileSync(path.join(ROOT, 'pages', 'bamako.md'), 'utf8'));
  const html = markdown().render(body);
  const question = 'Bonjour, j’ai une question sur la formation Minta Academy à Bamako.';
  const content = `
<div class="ent">
  <header class="ent-head">
    <h1>${escape(data.titre)}</h1>
    <ul class="facts">
      <li>Début : ${PROMO.debut}</li>
      <li>12 séances, le soir</li>
      <li>15 places</li>
      <li>${PROMO.prix}, étudiants ${PROMO.prixEtudiant}</li>
    </ul>
    <div class="actions">
      <a class="btn btn-gold" href="#inscription">Me pré-inscrire</a>
      <a class="btn btn-line" href="${wa(question)}" target="_blank" rel="noopener">Poser une question sur WhatsApp</a>
    </div>
  </header>
${promoVideo()}
  <div class="prose prose-ent">
${html}
  </div>
  <section class="inscription" id="inscription" aria-labelledby="inscription-titre">
    <h2 id="inscription-titre">Pré-inscription</h2>
    <p>Gratuite et sans engagement. Le formulaire prépare un message WhatsApp : tu n'as plus qu'à l'envoyer.</p>
    <form class="form" data-inscription="${WHATSAPP}">
      <label>Nom et prénom<input name="nom" required autocomplete="name"></label>
      <label>Numéro WhatsApp<input name="tel" type="tel" required autocomplete="tel" inputmode="tel" placeholder="+223 …"></label>
      <label>Formule<select name="formule" required>
        <option>Formation complète (75 000 FCFA)</option>
        <option>Formation complète, étudiant (50 000 FCFA)</option>
        <option>Atelier d'un sujet (15 000 FCFA)</option>
        <option>Formation en entreprise (sur devis)</option>
      </select></label>
      <label>Tes disponibilités<select name="dispo">
        <option>Promotion du ${PROMO.debut}, le soir</option>
        <option>Une prochaine promotion, le soir</option>
        <option>Une prochaine promotion, le samedi</option>
      </select></label>
      <label>As-tu un ordinateur portable ?<select name="pc">
        <option>Oui</option>
        <option>Non</option>
      </select></label>
      <label>Ton quartier ou ta ville <small>(facultatif)</small><input name="quartier" autocomplete="address-level2"></label>
      <button class="btn btn-gold" type="submit">Envoyer ma pré-inscription sur WhatsApp</button>
      <p class="form-note">Rien n'est enregistré sur le site : tes informations partent seulement dans le message WhatsApp que tu envoies. Sans WhatsApp, écris à <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>
    </form>
  </section>
</div>`;
  return page({ title: 'Formation Minta Academy à Bamako : début le 7 décembre 2026, 15 places', description: data.description, body: content, current: 'bamako' });
}

fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
for (const f of fs.readdirSync(OUT)) if (f.endsWith('.html')) fs.unlinkSync(path.join(OUT, f));
fs.writeFileSync(path.join(OUT, 'index.html'), home());
modules.forEach((m, i) => fs.writeFileSync(path.join(OUT, `${m.slug}.html`), modulePage(m, i)));
fs.writeFileSync(path.join(OUT, 'entreprises.html'), entreprises());
fs.writeFileSync(path.join(OUT, 'bamako.html'), bamako());
// L'adresse courte mintaservices.com/academy/bamako mène à la même page.
fs.mkdirSync(path.join(OUT, 'bamako'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'bamako', 'index.html'), `<!doctype html><meta charset="utf-8"><title>Formation Minta Academy à Bamako</title><meta name="robots" content="noindex"><link rel="canonical" href="${SITE_URL}bamako.html"><meta http-equiv="refresh" content="0; url=../bamako.html"><script>location.replace('../bamako.html' + location.hash)</script><a href="../bamako.html">Formation Minta Academy à Bamako</a>\n`);
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${['', ...modules.map((m) => `${m.slug}.html`), 'bamako.html', 'entreprises.html'].map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log(`Site généré dans site/ : accueil, ${modules.length} modules, Bamako, entreprises.`);
