// Gera as páginas individuais dos ecógrafos Samsung a partir de modelos.mjs.
//
// O esqueleto é a página do R20 (rs20-v2.html, na raiz do site): cabeçalho e rodapé do
// speculum.pt, pesquisa, barra de secções e todo o CSS dos componentes r20-*. Daqui sai só
// o conteúdo do <main>, que é substituído pelo de cada modelo; o resto fica igual, para as
// páginas acompanharem qualquer correção feita na do R20.
//
//   cd scripts/ecografos
//   node gerar.mjs
//
// Escreve samsung-*.html na raiz do site. Voltar a correr depois de mexer em modelos.mjs ou
// na rs20-v2.html.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { modelos, CONTACTOS } from './modelos.mjs';

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = join(AQUI, '..', '..');
const ESQUELETO = readFileSync(join(RAIZ, 'rs20-v2.html'), 'utf8');

/* ---------- utilitários ---------- */

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const corta = (texto, ini, fim, nome) => {
	const a = texto.indexOf(ini);
	const b = texto.indexOf(fim, a);
	if (a === -1 || b === -1) throw new Error('rs20-v2.html mudou: não encontrei ' + nome);
	return [texto.slice(0, a), texto.slice(b)];
};

// Ícones dos pontos de tecnologia (traço, 24×24), no mesmo desenho dos da página do R20.
const ICONES = {
	onda: '<path d="M2.5 12q2.375-6.5 4.75 0t4.75 0 4.75 0 4.75 0"/>',
	olho: '<path d="M1.8 12s3.7-6.2 10.2-6.2S22.2 12 22.2 12s-3.7 6.2-10.2 6.2S1.8 12 1.8 12Z"/><circle cx="12" cy="12" r="2.7"/>',
	contraste: '<circle cx="12" cy="12" r="6.3"/><path d="M12 5.7a6.3 6.3 0 0 0 0 12.6Z" fill="currentColor" stroke="none"/><path d="M12 1.6v1.8M12 20.6v1.8M1.6 12h1.8M20.6 12h1.8"/>',
	camadas: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
	fluxo: '<path d="M3 7c4 0 4 4 9 4s5-4 9-4"/><path d="M3 13c4 0 4 4 9 4s5-4 9-4"/>',
	sonda: '<path d="M9 3h6v8a3 3 0 0 1-6 0Z"/><path d="M12 14v4"/><path d="M8 21h8"/>',
	coracao: '<path d="M20.8 6.6a5.5 5.5 0 0 0-9-1.8L12 5.8l-.2-1a5.5 5.5 0 0 0-9 1.8c-1 2.7.4 5.3 2.3 7.2L12 21l6.9-7.2c1.9-1.9 3.3-4.5 2.9-7.2z"/>',
	brilho: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
	gota: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z"/>',
	escudo: '<path d="M12 3 4.5 6v6c0 4.4 3.2 8.2 7.5 9 4.3-.8 7.5-4.6 7.5-9V6Z"/>',
	toque: '<path d="M8 13V5.5a1.6 1.6 0 0 1 3.2 0V11"/><path d="M11.2 10V8.6a1.6 1.6 0 0 1 3.2 0V11"/><path d="M14.4 10.4a1.6 1.6 0 0 1 3.2 0v3.2a6.8 6.8 0 0 1-6.8 6.8h-.9a5 5 0 0 1-3.5-1.5l-2.9-2.9a1.7 1.7 0 0 1 2.4-2.4L8 16"/>'
};
const icone = nome => {
	if (!ICONES[nome]) throw new Error('ícone desconhecido: ' + nome);
	return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES[nome]}</svg>`;
};

/* ---------- CSS próprio destas páginas ----------
   Acrescenta-se ao da página do R20: a imagem de fundo do herói (uma por modelo), o título
   mais pequeno para nomes compridos e os cartões com imagem das secções de fluxo e design. */
const css = m => `
  <style>
    /* ===== Página do ${m.nome} — acrescentos ao esqueleto da página do R20 ===== */

    /* Fotografia de estúdio da Samsung para este modelo, com o mesmo véu da página do R20. */
    .r20-hero::before {
      background:
        ${m.heroiVeu || 'linear-gradient(100deg, rgba(3, 16, 27, 0.97) 0%, rgba(3, 16, 27, 0.93) 38%, rgba(4, 19, 31, 0.62) 63%, rgba(6, 22, 35, 0.4) 100%)'},
        url("${m.heroi}") ${m.heroiFundo || 'top center / 100% auto'} no-repeat;
    }

    /* "R20" cabe a 100px; "HERA W10 Elite" e afins não. */
    #root .r20-hero--longo h1 { font-size: clamp(44px, 6vw, 80px) !important; line-height: 0.95 !important; }
    @media (max-width: 620px) {
      #root .r20-hero--longo h1 { font-size: 40px !important; }
    }

    /* Números do herói: três colunas quando são três, uma linha só quando é um. */
    .r20-hero-stats.eco-n3 { grid-template-columns: repeat(3, 1fr); }
    .r20-hero-stats.eco-n1 { grid-template-columns: minmax(0, 360px); }
    .r20-hero-stat strong { white-space: nowrap; }

    /* Ligação de volta à lista, à esquerda das secções. Não é âncora, por isso a barra
       não a trata como secção. */
    .r20-subnav a.eco-voltar { color: #8fb3c6; }
    .r20-subnav a.eco-voltar::after { display: none; }
    .r20-subnav a.eco-voltar:hover { color: #fff; }

    /* Botão de contorno também sobre fundo claro (o herói é escuro, o CTA é azul). */
    .r20-actions .r20-btn-outline:hover { background: rgba(255, 255, 255, 0.12); }

    /* Nota de rodapé das ferramentas */
    .eco-nota { max-width: 760px; margin: 34px auto 0; text-align: center; color: #8ea6ba; font-size: 12px; line-height: 1.6; }

    /* Cartões com imagem (fluxo de trabalho, design) */
    .eco-cartoes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin-top: 42px; }
    .eco-cartoes.eco-n4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .eco-cartao { display: flex; flex-direction: column; min-width: 0; overflow: hidden; border: 1px solid var(--line); border-radius: 17px; background: #ffffff; box-shadow: var(--shadow); transition: transform 0.2s ease, box-shadow 0.2s ease; }
    .eco-cartao:hover { transform: translateY(-4px); box-shadow: 0 18px 36px rgba(0, 36, 58, 0.13); }
    .eco-cartao-img { aspect-ratio: 3 / 2; overflow: hidden; background: #e7edf0; }
    .eco-cartao-img img { width: 100%; height: 100%; object-fit: cover; }
    .eco-cartao-corpo { padding: 18px 20px 22px; }
    .eco-cartao h3 { margin: 0 0 7px; font-family: "Montserrat", sans-serif; font-size: 16px; line-height: 1.35; color: var(--text); }
    .eco-cartao p { margin: 0; color: #617581; font-size: 13.5px; line-height: 1.62; }
    .r20-dark .eco-cartao { border-color: #23324a; background: linear-gradient(145deg, #111d31, #091425); box-shadow: none; }
    .r20-dark .eco-cartao:hover { border-color: rgba(0, 207, 255, 0.46); box-shadow: 0 18px 40px rgba(0, 0, 0, 0.3); }
    .r20-dark .eco-cartao h3 { color: #ffffff; }
    .r20-dark .eco-cartao p { color: #9eb6ca; }
    .r20-dark .eco-cartao-img { background: #02050a; }

    /* Catálogos no fecho da página */
    .eco-cta-acoes { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: 10px; flex: 0 0 auto; }
    .eco-cta-pdf { display: inline-flex; align-items: center; gap: 8px; padding: 13px 18px; border: 1px solid rgba(255, 255, 255, 0.45); border-radius: 11px; color: #ffffff; font-size: 13px; font-weight: 700; transition: background 0.2s; }
    .eco-cta-pdf:hover { background: rgba(255, 255, 255, 0.12); }
    .eco-cta-pdf small { padding: 2px 6px; border-radius: 4px; background: rgba(255, 255, 255, 0.18); font-size: 10px; letter-spacing: 0.05em; }

    @media (max-width: 1100px) {
      .eco-cartoes, .eco-cartoes.eco-n4 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 820px) {
      .r20-hero-stats.eco-n3 { grid-template-columns: 1fr 1fr; }
      .eco-cta-acoes { justify-content: flex-start; margin-top: 24px; }
    }
    @media (max-width: 620px) {
      .eco-cartoes, .eco-cartoes.eco-n4 { grid-template-columns: 1fr; }
    }
  </style>
`;

/* ---------- blocos de conteúdo ---------- */

const pdfs = m => m.catalogos.length
	? m.catalogos.map(([rotulo, url]) => `<a class="eco-cta-pdf" href="${esc(url)}" target="_blank" rel="noopener"><small>PDF</small>${esc(rotulo)}</a>`).join('\n            ')
	: '';

const heroi = m => {
	const longo = m.nome.length > 5 ? ' r20-hero--longo' : '';
	const pdf = m.catalogos[0];
	const numeros = m.numeros.length ? `

            <div class="r20-hero-stats eco-n${m.numeros.length}">
${m.numeros.map(([n, t]) => `              <div class="r20-hero-stat">
                <strong>${esc(n)}</strong>
                <span>${esc(t)}</span>
              </div>`).join('\n')}
            </div>` : '';
	return `
      <!-- HERO -->
      <section id="visao-geral" class="r20-hero${longo}">
        <div class="r20-container">
          <div class="r20-hero-inner r20-reveal visible">
            <span class="r20-pill">Samsung · ${esc(m.area)}</span>

            <h1>
              ${esc(m.nome)}
              <span>${esc(m.frase)}</span>
            </h1>

            <p>${esc(m.lead)}</p>

            <div class="r20-actions">
              <a class="r20-btn r20-btn-primary" href="${CONTACTOS}">Pedir demonstração</a>
              ${pdf ? `<a class="r20-btn r20-btn-outline" href="${esc(pdf[1])}" target="_blank" rel="noopener">Ver catálogo (PDF)</a>` : `<a class="r20-btn r20-btn-outline" href="#ferramentas">Explorar ferramentas</a>`}
            </div>${numeros}
          </div>
        </div>
      </section>
`;
};

const tecnologia = m => !m.tecnologia ? '' : `
      <!-- TECNOLOGIA -->
      <section id="tecnologia" class="r20-section">
        <div class="r20-container r20-grid-2">
          <div class="r20-reveal">
            <h2 class="r20-title">${esc(m.tecnologia.titulo)}</h2>

            <p class="r20-lead">${esc(m.tecnologia.lead)}</p>

            <div class="r20-feature-list">
${m.tecnologia.pontos.map(([ic, t, p]) => `              <div class="r20-feature">
                <div class="r20-feature-icon">${icone(ic)}</div>
                <div>
                  <h3>${esc(t)}</h3>
                  <p>${esc(p)}</p>
                </div>
              </div>`).join('\n\n')}
            </div>
          </div>

          <figure class="r20-image-card r20-reveal">
            <img src="${esc(m.tecnologia.imagem[0])}" alt="${esc(m.tecnologia.imagem[1])}" loading="lazy">
          </figure>
        </div>
      </section>
`;

const ferramentas = m => `
      <!-- FERRAMENTAS -->
      <section id="ferramentas" class="r20-section r20-dark">
        <div class="r20-container">

          <div class="r20-software-heading r20-reveal">
            <h2 class="r20-title">${esc(m.ferramentas.titulo)}</h2>
            <p class="r20-lead">${esc(m.ferramentas.lead)}</p>
          </div>

          <div class="r20-software-grid">
${m.ferramentas.cartoes.map(([cat, selo, img, t, p]) => `            <article class="r20-software-card r20-reveal">
              <div class="r20-software-top">
                <span class="r20-software-category">${esc(cat)}</span>
                <span class="r20-software-badge">${esc(selo)}</span>
              </div>
              <div class="r20-software-image">
                <img src="${esc(img)}" alt="${esc(t + ' no Samsung ' + m.curto)}" loading="lazy">
              </div>
              <h3>${esc(t)}</h3>
              <p class="r20-software-summary">${esc(p)}</p>
            </article>`).join('\n\n')}
          </div>

          <p class="eco-nota r20-reveal">${esc(m.ferramentas.nota)}</p>
        </div>
      </section>
`;

const bloco = (m, b) => `
      <!-- ${b.menu.toUpperCase()} -->
      <section id="${b.id}" class="r20-section ${b.tom === 'escuro' ? 'r20-dark' : 'r20-soft'}">
        <div class="r20-container">
          <div class="r20-reveal">
            <h2 class="r20-title">${esc(b.titulo)}</h2>
            <p class="r20-lead">${esc(b.lead)}</p>
          </div>

          <div class="eco-cartoes${b.cartoes.length === 4 ? ' eco-n4' : ''}">
${b.cartoes.map(([img, t, p]) => `            <article class="eco-cartao r20-reveal">
              <div class="eco-cartao-img"><img src="${esc(img)}" alt="${esc(t + ', Samsung ' + m.curto)}" loading="lazy"></div>
              <div class="eco-cartao-corpo">
                <h3>${esc(t)}</h3>
                <p>${esc(p)}</p>
              </div>
            </article>`).join('\n')}
          </div>
        </div>
      </section>
`;

const fecho = m => `
      <!-- CTA -->
      <section class="r20-cta">
        <div class="r20-container r20-cta-inner">
          <div>
            <h2>Conheça o ${esc(m.curto)} em detalhe.</h2>
            <p>
              Para informação técnica, configuração, disponibilidade ou demonstração do sistema
              em Portugal, contacte a Speculum.
            </p>
          </div>

          <div class="eco-cta-acoes">
            ${pdfs(m)}
            <a class="r20-contact-button" href="${CONTACTOS}">Contactar Speculum</a>
          </div>
        </div>
      </section>
`;

const barra = m => {
	const ligacoes = [['visao-geral', 'Visão geral']];
	if (m.tecnologia) ligacoes.push(['tecnologia', 'Tecnologia']);
	ligacoes.push(['ferramentas', 'Ferramentas clínicas']);
	m.blocos.forEach(b => ligacoes.push([b.id, b.menu]));
	return `    <!-- SUBNAV -->
    <nav class="r20-subnav" aria-label="Secções desta página">
      <div class="r20-container">
        <a class="eco-voltar" href="ecografos.html">← Ecógrafos</a>
${ligacoes.map(([id, t]) => `        <a href="#${id}">${esc(t)}</a>`).join('\n')}
      </div>
    </nav>

    <main>
`;
};

/* ---------- montagem ---------- */

const [cabeca, depoisCabeca] = corta(ESQUELETO, '</head>', '</head>', 'o fim do <head>');
const [inicioCorpo, resto] = corta(depoisCabeca, '    <!-- SUBNAV -->', '    </main>', 'a barra de secções e o <main>');

modelos.forEach(m => {
	let topo = cabeca
		.replace(/<title>[^<]*<\/title>/, `<title>Samsung ${esc(m.nome)} | Ecógrafos | Speculum</title>`)
		.replace(/<meta\s+name="description"\s+content="[^"]*"\s*>/, `<meta\n    name="description"\n    content="${esc(m.descricao)}"\n  >`);
	if (!topo.includes(`<title>Samsung ${esc(m.nome)}`)) throw new Error('título por trocar');
	if (!topo.includes(esc(m.descricao))) throw new Error('descrição por trocar');

	const html = topo + css(m) + inicioCorpo
		+ barra(m)
		+ heroi(m) + tecnologia(m) + ferramentas(m) + m.blocos.map(b => bloco(m, b)).join('') + fecho(m)
		+ '\n' + resto;

	writeFileSync(join(RAIZ, m.ficheiro), html, 'utf8');
	console.log(`${m.ficheiro}: ${Math.round(Buffer.byteLength(html) / 1024)} KB`);
});
