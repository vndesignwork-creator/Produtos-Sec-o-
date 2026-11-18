// Gera speculum-site/biopsia.html a partir da nervetrack.html (cabeçalho, rodapé, CSS base e scripts)
// e dos dados em data.js.
const fs = require('fs');
const path = require('path');
const { guias, agulhas, pistolas, P, IMG, BOX24 } = require('./data.js');

const SITE = path.join(__dirname, '..', '..');
const RAW = fs.readFileSync(path.join(SITE, 'nervetrack.html'), 'utf8');
const CRLF = RAW.includes('\r\n');
let src = RAW.split('\r\n').join('\n');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const BRAND = { samsung: 'Samsung', ge: 'GE Healthcare', hitachi: 'Hitachi', toshiba: 'Toshiba', siemens: 'Siemens' };
const PROBE = { endo: 'Endocavitária', conv: 'Convexa / linear' };
const CONTACTOS = 'https://www.speculum.pt/pt/contactos';

// ---------------------------------------------------------------- guias
let nKits = 0;
function guiaCard(g) {
  const refs = [];
  let body = '';
  if (g.kits) {
    body += '<table class="bx-kits"><thead><tr><th scope="col">Referência</th><th scope="col">Conteúdo</th></tr></thead><tbody>';
    g.kits.forEach(([ref, desc, url]) => {
      refs.push(ref); nKits++;
      const r = url ? `<a href="${esc(url)}">${esc(ref)}</a>` : esc(ref);
      body += `<tr><th scope="row">${r}</th><td>${esc(desc)}</td></tr>`;
    });
    body += '</tbody></table>';
  }
  const lists = g.kit ? [g.kit] : g.kitsList;
  if (lists) {
    lists.forEach(([ref, items]) => {
      refs.push(ref); nKits++;
      body += `<div class="bx-kit"><strong>${esc(ref)}</strong><ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></div>`;
    });
  }
  if (refs.length > 1) {
    // Mais de uma referência: fica fechado, com as referências resumidas numa linha, para o cartão não crescer demais.
    const curtas = refs.map((r, i) => (i === 0 ? r : r.replace(/^1-535-|^#/, ''))).join(' · ');
    body = `<details class="bx-refs"><summary><span class="bx-refs-head"><span class="bx-refs-n">${refs.length} referências</span><span class="bx-refs-list">${esc(curtas)}</span></span><span class="bx-refs-toggle" aria-hidden="true"></span></summary>${body}</details>`;
  }
  if (g.note) body += `<p class="bx-note">${esc(g.note)}</p>`;
  if (!refs.length) body += '<p class="bx-ref-tbd">Referência e conteúdo do kit sob consulta.</p>';

  const box = g.box || (g.kits ? BOX24 : '');
  const search = [g.compat, g.also || '', refs.join(' '), BRAND[g.brands[0]] || ''].join(' ');
  const img = g.img
    ? `<div class="bx-guia-img${/^@1-535-[59]/.test(g.img[0]) ? ' bx-sangra' : ''}">${g.img.map((f) => `<img src="${f[0] === '@' ? 'images/products/biopsia/' + f.slice(1) : IMG + encodeURI(f).replace(/\(/g, '%28').replace(/\)/g, '%29')}" alt="" width="253" height="132" loading="lazy" onerror="this.closest('.bx-guia').classList.add('bx-sem-img')">`).join('')}</div>`
    : '';
  const acoes = [];
  if (g.url) acoes.push(`<a class="bx-link" href="${esc(g.url)}">Ver produto</a>`);
  acoes.push(`<a class="bx-link bx-link-ghost" href="${CONTACTOS}">Pedir informação</a>`);

  return `
            <article class="bx-guia${g.img ? '' : ' bx-sem-img'}" data-brands="${g.brands.join(' ')}" data-probe="${g.probe}" data-search="${esc(search)}" data-refs="${esc(refs.join(' '))}">
              ${img}
              <div class="bx-guia-body">
                <div class="bx-guia-tags"><span>${esc(BRAND[g.brands[0]])}</span><span>${PROBE[g.probe]}</span></div>
                ${g.title ? `<p class="bx-guia-title">${esc(g.title)}</p>` : ''}
                <h3><span>Compatível com</span>${esc(g.compat)}</h3>
                ${g.also ? `<p class="bx-also"><span>Também serve</span>${esc(g.also)}</p>` : ''}
                ${body}
                <div class="bx-guia-foot">
                  ${box ? `<span class="bx-box">${esc(box)}</span>` : '<span></span>'}
                  <div class="bx-guia-actions">${acoes.join('')}</div>
                </div>
              </div>
            </article>`;
}
const guiasHTML = guias.map(guiaCard).join('\n');
const contaMarca = (b) => guias.filter((g) => g.brands.includes(b)).length;

// ---------------------------------------------------------------- agulhas / pistolas
function prodCard([nome, medida, img, slug], grupo) {
  const url = P + grupo + '/' + slug;
  const [cal, comp] = medida.split(' × ');
  const pic = img
    ? `<img src="https://www.speculum.pt/files/images/products/${img}" alt="" width="400" height="300" loading="lazy">`
    : '<span class="bx-prod-sem">Imagem indisponível</span>';
  return `
              <a class="bx-prod" href="${esc(url)}">
                <div class="bx-prod-img">${pic}</div>
                <div class="bx-prod-body">
                  <h4>${esc(nome)}</h4>
                  <div class="bx-prod-specs"><span>${esc(cal)}</span><span>${esc(comp)}</span></div>
                  <em>Ver detalhes →</em>
                </div>
              </a>`;
}
const grid = (list, grupo) => `<div class="bx-prod-grid">${list.map((p) => prodCard(p, grupo)).join('')}
            </div>`;

const nAg = agulhas.mama.length + agulhas.prostata.length;
const nPi = pistolas.mama.length + pistolas.prostata.length;

// ---------------------------------------------------------------- CSS da página
const css = `
    /* ============================================================
       Biópsia — acrescentos a esta página (a base vem da nervetrack.html / rs20.html)
       ============================================================ */
    /* O core.css do site dá a "body strong" a fonte MiniSerifBold: aqui herda a do texto. */
    body :where(#root) strong { font-family: inherit; }
    .bx-hero { min-height: 640px; }
    .bx-hero::before {
      background:
        radial-gradient(circle at 78% 42%, rgba(18, 165, 204, 0.22), transparent 38%),
        linear-gradient(100deg, #03101b 0%, #04131f 55%, #062033 100%);
    }
    .bx-hero-grid { position: relative; z-index: 2; display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 48px; align-items: center; }
    .bx-hero-grid .r20-hero-inner { max-width: none; }
    .bx-hero .r20-hero-stats { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .bx-hero .r20-hero-stat strong { font-size: 22px; }
    .bx-hero-visual { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .bx-hero-visual figure { margin: 0; padding: 14px; border-radius: 18px; background: #ffffff; box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35); }
    .bx-hero-visual figure:first-child { grid-column: 1 / -1; }
    #root .bx-hero-visual img { width: 100%; height: 150px; object-fit: contain; padding: 0; border-radius: 0; box-shadow: none; background: transparent; }
    .bx-hero-visual figcaption { margin-top: 8px; color: #00527f; font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; text-align: center; }

    /* O que procura? */
    .bx-cat-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 19px; margin-top: 40px; }
    .bx-cat { display: flex; flex-direction: column; overflow: hidden; border: 1px solid var(--line); border-radius: 18px; background: #ffffff; box-shadow: var(--shadow); transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
    .bx-cat:hover { transform: translateY(-4px); border-color: #9fd7ea; box-shadow: 0 18px 36px rgba(0, 36, 58, 0.14); }
    .bx-cat-img { display: grid; place-items: center; aspect-ratio: 16 / 9; padding: 18px; background: #f4f7f9; }
    #root .bx-cat-img img { width: 100%; height: 100%; object-fit: contain; padding: 0; border-radius: 0; box-shadow: none; background: transparent; mix-blend-mode: multiply; }
    .bx-cat-body { display: flex; flex-direction: column; flex: 1; padding: 20px 22px 22px; }
    .bx-cat-count { color: #087fa8; font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
    .bx-cat h3 { margin: 6px 0 8px; font-family: "Montserrat", sans-serif; font-size: 21px; color: var(--text); }
    .bx-cat p { margin: 0; color: #617581; font-size: 14px; line-height: 1.65; }
    .bx-cat em { margin-top: auto; padding-top: 16px; color: #005a85; font-style: normal; font-size: 13px; font-weight: 800; }

    /* Localizador de guias */
    .bx-finder { margin-top: 36px; padding: 22px; border: 1px solid var(--line); border-radius: 18px; background: #ffffff; box-shadow: var(--shadow); }
    .bx-search { display: flex; align-items: center; gap: 12px; padding: 0 16px; border: 1px solid #c9d8df; border-radius: 12px; background: #f9fbfc; transition: border-color .2s, box-shadow .2s; }
    .bx-search:focus-within { border-color: #087fa8; box-shadow: 0 0 0 3px rgba(8, 127, 168, .15); background: #fff; }
    .bx-search svg { flex: 0 0 auto; width: 20px; height: 20px; color: #087fa8; }
    #root .bx-search input { flex: 1; min-width: 0; height: 52px; margin: 0; padding: 0; border: 0; outline: 0; background: transparent; color: var(--text); font: inherit; font-size: 16px; box-shadow: none; }
    .bx-search input::placeholder { color: #8399a5; }
    .bx-filters { display: flex; flex-wrap: wrap; align-items: center; gap: 16px 28px; margin-top: 18px; }
    .bx-filter-group { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
    .bx-filter-label { margin-right: 4px; color: #607481; font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
    #root .bx-chip {
      display: inline-flex; align-items: center; gap: 6px; width: auto; min-width: 0; min-height: 0; margin: 0;
      padding: 8px 14px; border: 1px solid #d3e0e6; border-radius: 999px;
      color: #173043; background: #ffffff; box-shadow: none; text-transform: none;
      font-size: 13px; font-weight: 700; line-height: 1.2; cursor: pointer; transition: .2s ease;
    }
    #root .bx-chip small { color: #8399a5; font-size: 11px; font-weight: 700; }
    #root .bx-chip:hover { color: #00527f; border-color: #087fa8; background: #f0f8fb; }
    #root .bx-chip[aria-pressed="true"] { color: #ffffff; border-color: #00527f; background: #00527f; }
    #root .bx-chip[aria-pressed="true"] small { color: #a9e5f3; }
    #root .bx-chip:focus-visible { outline: 2px solid #087fa8; outline-offset: 2px; }
    .bx-status { margin: 18px 0 0; color: #607481; font-size: 14px; }
    .bx-status strong { color: var(--text); }

    .bx-guia-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 19px; margin-top: 22px; }
    .bx-guia { display: grid; grid-template-columns: 170px minmax(0, 1fr); overflow: hidden; border: 1px solid var(--line); border-radius: 18px; background: #ffffff; transition: border-color .2s ease, box-shadow .2s ease; }
    .bx-guia:hover { border-color: #9fd7ea; box-shadow: var(--shadow); }
    .bx-guia[hidden] { display: none; }
    .bx-guia-img { display: flex; flex-direction: column; justify-content: center; gap: 10px; padding: 16px; border-right: 1px solid var(--line); background: #ffffff; }
    #root .bx-guia-img img { width: 100%; height: auto; padding: 0; border-radius: 0; box-shadow: none; background: transparent; }
    .bx-guia.bx-sem-img { grid-template-columns: minmax(0, 1fr); }
    .bx-guia.bx-sem-img .bx-guia-img { display: none; }
    .bx-guia-unused { background: #f4f7f9 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%2300527f' d='M24 3.5 L40.5 9.5 V23 C40.5 33 33.5 40.8 24 44.5 C14.5 40.8 7.5 33 7.5 23 V9.5 Z'/%3E%3Cpath fill='%23008cc2' d='M24 3.5 L40.5 9.5 V23 C40.5 33 33.5 40.8 24 44.5 Z'/%3E%3Cpath fill='none' stroke='%23fff' stroke-width='4.6' stroke-linecap='round' stroke-linejoin='round' d='M16 24 L21.5 29.5 L32.5 17.5'/%3E%3C/svg%3E") center / 46px no-repeat; }
    /* As fotografias oficiais das guias endocavitárias Aspen vêm cortadas à esquerda (a pega da sonda sai do
       enquadramento). Encostam-se ao limite esquerdo do contentor para a sonda parecer entrar pelo cartão. */
    .bx-guia-img.bx-sangra { padding-left: 0; }
    .bx-hero-visual figure.bx-sangra { padding-left: 0; }
    .bx-cat-img.bx-sangra { padding-left: 0; justify-items: start; }
    #root .bx-hero-visual figure.bx-sangra img { object-position: left center; }
    #root .bx-cat-img.bx-sangra img { object-position: left center; }
    .bx-guia-body { display: flex; flex-direction: column; min-width: 0; padding: 18px 20px; }
    .bx-guia-tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .bx-guia-tags span { padding: 4px 9px; border-radius: 999px; color: #00527f; background: #e8f6fa; font-size: 10px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; }
    .bx-guia-tags span + span { color: #607481; background: #f1f4f6; }
    .bx-guia-title { margin: 12px 0 0; color: #087fa8; font-size: 13px; font-weight: 800; }
    .bx-guia h3 { margin: 10px 0 0; font-family: "Montserrat", sans-serif; font-size: 16px; line-height: 1.45; color: var(--text); }
    .bx-guia h3 span, .bx-also span { display: block; margin-bottom: 2px; color: #8399a5; font-family: "Plus Jakarta Sans", Arial, sans-serif; font-size: 10px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
    .bx-also { margin: 10px 0 0; color: #4c6371; font-size: 13px; line-height: 1.55; }
    .bx-kits { width: 100%; margin-top: 14px; border-collapse: collapse; font-size: 12.5px; line-height: 1.5; }
    .bx-kits thead th { padding: 0 0 6px; color: #8399a5; font-size: 10px; font-weight: 800; letter-spacing: .08em; text-align: left; text-transform: uppercase; }
    .bx-kits tbody th, .bx-kits td { padding: 8px 0; border-top: 1px solid var(--line); vertical-align: top; text-align: left; }
    .bx-kits tbody th { width: 96px; padding-right: 12px; color: var(--text); font-weight: 800; white-space: nowrap; }
    .bx-kits td { color: #4c6371; }
    .bx-kits a { color: #087fa8; border-bottom: 1px solid rgba(8, 127, 168, .35); }
    .bx-kit { margin-top: 14px; padding-top: 10px; border-top: 1px solid var(--line); font-size: 12.5px; }
    .bx-kit strong { color: var(--text); font-family: "Plus Jakarta Sans", Arial, sans-serif; font-size: 12.5px; font-weight: 800; }
    .bx-kit ul { display: grid; gap: 5px; margin: 8px 0 0; padding: 0; list-style: none; }
    .bx-kit li { position: relative; padding-left: 16px; color: #4c6371; line-height: 1.5; }
    .bx-kit li::before { content: ""; position: absolute; left: 2px; top: 7px; width: 6px; height: 6px; border-radius: 50%; background: #008cc2; }
    .bx-refs { margin-top: 14px; border-top: 1px solid var(--line); }
    .bx-refs > summary { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 0; list-style: none; cursor: pointer; }
    .bx-refs > summary::-webkit-details-marker { display: none; }
    .bx-refs-head { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
    .bx-refs-n { color: #087fa8; font-size: 10px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
    .bx-refs-list { color: var(--text); font-size: 12.5px; font-weight: 800; line-height: 1.5; }
    .bx-refs-toggle { flex: 0 0 auto; display: inline-flex; align-items: center; gap: 6px; padding: 6px 11px; border-radius: 999px; color: #00527f; background: #e8f6fa; font-size: 11px; font-weight: 800; transition: background .2s ease; }
    .bx-refs-toggle::before { content: "Ver conteúdo"; }
    .bx-refs-toggle::after { content: ""; width: 7px; height: 7px; border-right: 2px solid currentColor; border-bottom: 2px solid currentColor; transform: translateY(-2px) rotate(45deg); transition: transform .2s ease; }
    .bx-refs[open] .bx-refs-toggle::before { content: "Fechar"; }
    .bx-refs[open] .bx-refs-toggle::after { transform: translateY(2px) rotate(-135deg); }
    .bx-refs > summary:hover .bx-refs-toggle { background: #d3eef6; }
    .bx-refs > summary:focus-visible { outline: 2px solid #087fa8; outline-offset: 2px; border-radius: 6px; }
    .bx-refs[open] .bx-refs-list { display: none; }
    .bx-refs .bx-kits, .bx-refs .bx-kit:first-of-type { margin-top: 4px; }
    @media (prefers-reduced-motion: reduce) { .bx-refs-toggle::after { transition: none; } }
    .bx-note { margin: 12px 0 0; color: #4c6371; font-size: 13px; line-height: 1.6; }
    .bx-ref-tbd { margin: 12px 0 0; color: #607481; font-size: 12.5px; font-style: italic; }
    .bx-guia-foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; margin-top: auto; padding-top: 16px; }
    .bx-box { color: #607481; font-size: 11px; font-weight: 700; }
    .bx-guia-actions { display: flex; flex-wrap: wrap; gap: 8px; }
    .bx-link { display: inline-flex; align-items: center; padding: 8px 13px; border-radius: 9px; color: #ffffff; background: #00527f; font-size: 12px; font-weight: 800; transition: .2s ease; }
    .bx-link:hover { background: #087fa8; }
    :where(#root) a.bx-link:link, :where(#root) a.bx-link:visited { color: #ffffff; }
    :where(#root) a.bx-link-ghost:link, :where(#root) a.bx-link-ghost:visited { color: #00527f; }
    .bx-link-ghost { color: #00527f; background: #e8f6fa; }
    .bx-link-ghost:hover { color: #ffffff; }
    :where(#root) a.bx-link-ghost:hover { color: #ffffff; }

    .bx-empty { margin-top: 22px; padding: 30px; border: 1px dashed #b9cfd8; border-radius: 18px; background: #ffffff; text-align: center; }
    .bx-empty h3 { margin: 0 0 8px; font-family: "Montserrat", sans-serif; font-size: 19px; color: var(--text); }
    .bx-empty p { margin: 0 auto 16px; max-width: 560px; color: #607481; font-size: 14px; line-height: 1.65; }

    /* Agulhas e pistolas */
    .bx-sub { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; margin-top: 44px; padding-bottom: 12px; border-bottom: 1px solid var(--line); }
    .bx-sub h3 { margin: 0; font-family: "Montserrat", sans-serif; font-size: 22px; color: var(--text); }
    .bx-sub span { color: #607481; font-size: 13px; font-weight: 700; }
    .bx-prod-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: 20px; }
    .bx-prod { display: flex; flex-direction: column; overflow: hidden; border: 1px solid var(--line); border-radius: 16px; background: #ffffff; transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
    .bx-prod:hover { transform: translateY(-3px); border-color: #9fd7ea; box-shadow: var(--shadow); }
    .bx-prod-img { display: grid; place-items: center; aspect-ratio: 4 / 3; padding: 14px; background: #ffffff; border-bottom: 1px solid var(--line); }
    #root .bx-prod-img img { width: 100%; height: 100%; object-fit: contain; padding: 0; border-radius: 0; box-shadow: none; background: transparent; }
    .bx-prod-sem { color: #8399a5; font-size: 12px; }
    .bx-prod-body { display: flex; flex-direction: column; flex: 1; padding: 14px 16px 16px; }
    .bx-prod h4 { margin: 0; font-family: "Montserrat", sans-serif; font-size: 14.5px; line-height: 1.4; color: var(--text); }
    .bx-prod-specs { display: flex; gap: 6px; margin-top: 10px; }
    .bx-prod-specs span { padding: 4px 9px; border-radius: 8px; color: #00527f; background: #e8f6fa; font-size: 12px; font-weight: 800; }
    .bx-prod em { margin-top: auto; padding-top: 14px; color: #005a85; font-style: normal; font-size: 12px; font-weight: 800; }
    .r20-soft .bx-prod, .r20-soft .bx-guia { background: #ffffff; }

    /* Benefícios (fundo escuro, cartões e ícones como na NerveTrack) */
    .bx-benefit-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }

    @media (prefers-reduced-motion: reduce) { .bx-cat, .bx-prod { transition: none; } .bx-cat:hover, .bx-prod:hover { transform: none; } }
    @media (max-width: 1100px) {
      .bx-prod-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .bx-guia-grid { grid-template-columns: 1fr; }
      .bx-benefit-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 820px) {
      .bx-hero-grid { grid-template-columns: 1fr; }
      .bx-hero-visual { display: none; }
      .bx-hero { min-height: 0; }
      .bx-hero .r20-hero-inner { padding: 64px 0 64px; }
      .bx-cat-grid { grid-template-columns: 1fr; }
      .bx-prod-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 560px) {
      .bx-guia { grid-template-columns: 1fr; }
      .bx-guia-img { flex-direction: row; justify-content: center; border-right: 0; border-bottom: 1px solid var(--line); }
      #root .bx-guia-img img { max-width: 220px; }
      .bx-guia-img.bx-sangra { justify-content: flex-start; }
      .bx-benefit-grid { grid-template-columns: 1fr; }
      .bx-finder { padding: 16px; }
      .bx-filters { gap: 14px; }
    }
    @media (max-width: 420px) {
      .bx-prod-grid { grid-template-columns: 1fr; }
    }
`;

// ---------------------------------------------------------------- conteúdo
const chip = (attr, val, label, count, on) =>
  `<button type="button" class="bx-chip" data-${attr}="${val}" aria-pressed="${on ? 'true' : 'false'}">${label}${count != null ? ` <small>${count}</small>` : ''}</button>`;

const main = `  <div id="root">

    <!-- SUBNAV -->
    <nav class="r20-subnav" aria-label="Secções desta página">
      <div class="r20-container">
        <a class="eco-voltar" href="https://www.speculum.pt/pt/produtos/categoria=[1-consumiveis]">← Consumíveis</a>
        <a href="#bxHero">Visão Geral</a>
        <a href="#bxGuias">Guias</a>
        <a href="#bxAgulhas">Agulhas</a>
        <a href="#bxPistolas">Pistolas</a>
        <a href="#bxVantagens">Vantagens</a>
      </div>
    </nav>

    <main>

      <!-- HERO -->
      <section id="bxHero" class="r20-hero bx-hero">
        <div class="r20-container bx-hero-grid">
          <div class="r20-hero-inner r20-reveal visible">
            <span class="r20-pill">Consumíveis · Biópsia ecoguiada</span>

            <h1>
              Biópsia
              <span>Guias, agulhas e pistolas para cada sonda.</span>
            </h1>

            <p>
              Guias de biópsia descartáveis para as sondas endocavitárias, convexas e lineares dos
              principais ecógrafos, e agulhas e pistolas para biópsia mamária e prostática.
              Encontre o kit certo pelo modelo da sua sonda.
            </p>

            <div class="r20-actions">
              <a class="r20-btn r20-btn-primary" href="#bxGuias">Encontrar a guia da minha sonda</a>
              <a class="r20-btn r20-btn-outline" href="#bxAgulhas">Agulhas e pistolas</a>
            </div>

            <div class="r20-hero-stats">
              <div class="r20-hero-stat">
                <strong>${nKits}</strong>
                <span>referências de guias e kits de biópsia</span>
              </div>
              <div class="r20-hero-stat">
                <strong>5 marcas</strong>
                <span>Samsung, GE, Hitachi, Toshiba e Siemens</span>
              </div>
              <div class="r20-hero-stat">
                <strong>Estéreis</strong>
                <span>Kits de uso único, em caixas de 24</span>
              </div>
              <div class="r20-hero-stat">
                <strong>14–25G</strong>
                <span>Calibres de agulha suportados</span>
              </div>
            </div>
          </div>

          <div class="bx-hero-visual r20-reveal visible" aria-hidden="true">
            <figure class="bx-sangra">
              <img src="images/products/biopsia/1-535-5144.webp" alt="" width="253" height="132">
              <figcaption>Guia endocavitária</figcaption>
            </figure>
            <figure>
              <img src="https://www.speculum.pt/files/images/products/SWCCH2220.jpg" alt="" width="400" height="300">
              <figcaption>Agulhas</figcaption>
            </figure>
            <figure>
              <img src="https://www.speculum.pt/files/images/products/SWMLC1611.jpg" alt="" width="400" height="300">
              <figcaption>Pistolas</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <!-- O QUE PROCURA -->
      <section id="bxProcura" class="r20-section">
        <div class="r20-container">
          <div class="r20-reveal">
            <span class="r20-kicker">O que procura?</span>
            <h2 class="r20-title">Tudo para a biópsia ecoguiada, num só sítio.</h2>
            <p class="r20-lead">
              Escolha a categoria. Nas guias, pode pesquisar diretamente pelo modelo da sonda ou
              filtrar por marca do ecógrafo e tipo de sonda.
            </p>
          </div>

          <div class="bx-cat-grid r20-reveal">
            <a class="bx-cat" href="#bxGuias">
              <div class="bx-cat-img bx-sangra"><img src="images/products/biopsia/1-535-9000.webp" alt="" width="253" height="132" loading="lazy"></div>
              <div class="bx-cat-body">
                <span class="bx-cat-count">${guias.length} modelos · ${nKits} referências</span>
                <h3>Guias de biópsia</h3>
                <p>Para sondas endocavitárias, convexas e lineares. Só a guia, ou kit com protetor de sonda, gel estéril e elásticos.</p>
                <em>Encontrar a minha guia →</em>
              </div>
            </a>
            <a class="bx-cat" href="#bxAgulhas">
              <div class="bx-cat-img"><img src="https://www.speculum.pt/files/images/products/SWCCH2220.jpg" alt="" width="400" height="300" loading="lazy"></div>
              <div class="bx-cat-body">
                <span class="bx-cat-count">${nAg} referências</span>
                <h3>Agulhas de biópsia</h3>
                <p>Agulhas Chiba e agulhas para pistolas Fast Gun e Magnum, para biópsia mamária e prostática.</p>
                <em>Ver agulhas →</em>
              </div>
            </a>
            <a class="bx-cat" href="#bxPistolas">
              <div class="bx-cat-img"><img src="https://www.speculum.pt/files/images/products/SWMLC1611.jpg" alt="" width="400" height="300" loading="lazy"></div>
              <div class="bx-cat-body">
                <span class="bx-cat-count">${nPi} referências</span>
                <h3>Pistolas de biópsia</h3>
                <p>Pistolas descartáveis Multicore e Primo Cut, para mama e próstata.</p>
                <em>Ver pistolas →</em>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- GUIAS -->
      <section id="bxGuias" class="r20-section r20-soft">
        <div class="r20-container">
          <div class="r20-reveal">
            <span class="r20-kicker">Guias de biópsia</span>
            <h2 class="r20-title">Encontre a guia para a sua sonda.</h2>
            <p class="r20-lead">
              Guias descartáveis e estéreis que direcionam a agulha segundo a linha de biópsia
              apresentada no ecrã do ecógrafo. Escreva o modelo da sonda, ou a referência, para ver
              só as guias compatíveis.
            </p>
          </div>

          <div class="bx-finder r20-reveal" role="search" aria-label="Localizador de guias de biópsia">
            <label class="bx-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
              <!-- type="text" de propósito: o stylesheet.css do site esconde todos os input[type=search] em ecrãs até 768px. -->
              <input id="bxQuery" type="text" inputmode="search" enterkeyhint="search" aria-label="Pesquisar por modelo da sonda ou referência" placeholder="Modelo da sonda ou referência — ex.: EV4-9, E8C, C41V1, 5144" autocomplete="off" spellcheck="false">
            </label>

            <div class="bx-filters">
              <div class="bx-filter-group" role="group" aria-label="Marca do ecógrafo">
                <span class="bx-filter-label">Marca</span>
                ${chip('brand', 'all', 'Todas', guias.length, true)}
                ${['samsung', 'ge', 'hitachi', 'toshiba', 'siemens'].map((b) => chip('brand', b, b === 'ge' ? 'GE' : BRAND[b], contaMarca(b), false)).join('\n                ')}
              </div>
              <div class="bx-filter-group" role="group" aria-label="Tipo de sonda">
                <span class="bx-filter-label">Sonda</span>
                ${chip('probe', 'all', 'Todas', null, true)}
                ${chip('probe', 'endo', 'Endocavitária', null, false)}
                ${chip('probe', 'conv', 'Convexa / linear', null, false)}
              </div>
            </div>
            <p class="bx-status" id="bxStatus" aria-live="polite"><strong>${guias.length}</strong> guias</p>
          </div>

          <div class="bx-guia-grid" id="bxGrid">
${guiasHTML}
          </div>

          <div class="bx-empty" id="bxEmpty" hidden>
            <h3>Não encontrámos guias para essa sonda.</h3>
            <p>Confirme o modelo escrito na própria sonda, ou fale connosco: a Speculum verifica a compatibilidade e indica a guia certa.</p>
            <a class="bx-link" href="${CONTACTOS}">Pedir ajuda à Speculum</a>
          </div>
        </div>
      </section>

      <!-- AGULHAS -->
      <section id="bxAgulhas" class="r20-section">
        <div class="r20-container">
          <div class="r20-reveal">
            <span class="r20-kicker">Agulhas de biópsia</span>
            <h2 class="r20-title">Agulhas para biópsia mamária e prostática.</h2>
            <p class="r20-lead">
              Agulhas Chiba e agulhas de corte para pistolas Fast Gun e Magnum, em vários calibres
              e comprimentos.
            </p>
          </div>

          <div class="r20-reveal">
            <div class="bx-sub"><h3>Biópsia mamária</h3><span>${agulhas.mama.length} referências</span></div>
            ${grid(agulhas.mama, '1719-agulhas-biopsia')}
          </div>
          <div class="r20-reveal">
            <div class="bx-sub"><h3>Biópsia prostática</h3><span>${agulhas.prostata.length} referências</span></div>
            ${grid(agulhas.prostata, '1719-agulhas-biopsia')}
          </div>
        </div>
      </section>

      <!-- PISTOLAS -->
      <section id="bxPistolas" class="r20-section r20-soft">
        <div class="r20-container">
          <div class="r20-reveal">
            <span class="r20-kicker">Pistolas de biópsia</span>
            <h2 class="r20-title">Pistolas descartáveis, prontas a usar.</h2>
            <p class="r20-lead">
              Pistolas de biópsia descartáveis Multicore e Primo Cut, para mama e próstata.
            </p>
          </div>

          <div class="r20-reveal">
            <div class="bx-sub"><h3>Mama</h3><span>${pistolas.mama.length} referências</span></div>
            ${grid(pistolas.mama, '629-pistolas')}
          </div>
          <div class="r20-reveal">
            <div class="bx-sub"><h3>Próstata</h3><span>${pistolas.prostata.length} referências</span></div>
            ${grid(pistolas.prostata, '629-pistolas')}
          </div>
        </div>
      </section>

      <!-- VANTAGENS -->
      <section id="bxVantagens" class="r20-section r20-dark">
        <div class="r20-container">
          <div class="r20-software-heading r20-reveal">
            <h2 class="r20-title">Porquê guias descartáveis?</h2>
          </div>

          <div class="nt-benefit-grid bx-benefit-grid">
            <article class="r20-software-card r20-reveal">
              <div class="r20-feature-icon"><svg aria-hidden="true"><use href="#nt-i-shield"/></svg></div>
              <h3>Estéreis e de uso único</h3>
              <p class="r20-software-summary">Reduzem o risco de contaminação cruzada entre doentes e dispensam o reprocessamento da guia.</p>
            </article>
            <article class="r20-software-card r20-reveal">
              <div class="r20-feature-icon"><svg aria-hidden="true"><use href="#nt-i-target"/></svg></div>
              <h3>Trajetória guiada</h3>
              <p class="r20-software-summary">A agulha segue a linha de biópsia apresentada no ecrã, com visualização em tempo real durante todo o procedimento.</p>
            </article>
            <article class="r20-software-card r20-reveal">
              <div class="r20-feature-icon"><svg aria-hidden="true"><use href="#nt-i-vers"/></svg></div>
              <h3>Kits completos</h3>
              <p class="r20-software-summary">Só a guia ou o kit com protetor de sonda, gel estéril e elásticos: tudo o que é preciso, numa embalagem.</p>
            </article>
            <article class="r20-software-card r20-reveal">
              <div class="r20-feature-icon"><svg aria-hidden="true"><use href="#nt-i-clinic"/></svg></div>
              <h3>Apoio da Speculum</h3>
              <p class="r20-software-summary">Confirmamos a compatibilidade com a sua sonda e o seu ecógrafo antes da encomenda.</p>
            </article>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="r20-cta">
        <div class="r20-container r20-cta-inner">
          <div>
            <h2>Não encontra a guia para a sua sonda?</h2>
            <p>
              Diga-nos a marca e o modelo do ecógrafo e da sonda. A Speculum indica a guia, a agulha
              ou a pistola certa para o seu procedimento.
            </p>
          </div>

          <a class="r20-contact-button" href="https://www.speculum.pt/pt/contactos">Contactar Speculum</a>
        </div>
      </section>

    </main>

  </div>
`;

// ---------------------------------------------------------------- script do localizador
const finderJS = `
<!-- Imagens das guias com referência 1-535-xxxx: site oficial da Aspen Surgical (fundo transparente); guias
     Leapmed (Toshiba, Siemens, alternativas GE): site oficial da Leapmed. Todas em images/products/biopsia/ — é preciso enviar essa pasta para o servidor junto com a página. -->
<!-- Localizador de guias: pesquisa por modelo/referência e filtros por marca e tipo de sonda. -->
<script>
	(function () {
		var grelha = document.getElementById('bxGrid');
		if (!grelha) return;
		var cartoes = [].slice.call(grelha.querySelectorAll('.bx-guia'));
		var campo = document.getElementById('bxQuery');
		var estado = document.getElementById('bxStatus');
		var vazio = document.getElementById('bxEmpty');
		var marca = 'all', sonda = 'all';

		// Compara sem espaços, hífenes, barras nem maiúsculas: "ev 4-9" encontra "EV4-9/10ED".
		function norm(s) { return (s || '').toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').replace(/[^a-z0-9]/g, ''); }
		cartoes.forEach(function (c) {
			c._txt = norm(c.getAttribute('data-search'));
			c._refs = (c.getAttribute('data-refs') || '').split(' ').map(norm).filter(Boolean);
			c._det = c.querySelector('details.bx-refs');
			c._quer = false; // estado pedido pela pesquisa; se o "toggle" não coincidir, foi um clique
			if (c._det) c._det.addEventListener('toggle', function () { if (c._det.open !== c._quer) c._manual = true; });
		});

		function aplicar() {
			var termos = (campo.value || '').split(/[\\s,;]+/).map(norm).filter(Boolean);
			var n = 0;
			cartoes.forEach(function (c) {
				var ok = (marca === 'all' || (' ' + c.getAttribute('data-brands') + ' ').indexOf(' ' + marca + ' ') > -1) &&
					(sonda === 'all' || c.getAttribute('data-probe') === sonda) &&
					termos.every(function (t) { return c._txt.indexOf(t) > -1; });
				c.hidden = !ok;
				if (ok) n++;
				// Se a pesquisa é por uma referência (3+ dígitos), abre a lista do cartão para a mostrar.
				if (c._det && !c._manual) {
					var abrir = ok && termos.some(function (t) { return /[0-9]{3}/.test(t) && c._refs.some(function (r) { return r.indexOf(t) > -1; }); });
					c._quer = abrir;
					if (c._det.open !== abrir) c._det.open = abrir;
				}
			});
			estado.innerHTML = '<strong>' + n + '</strong> ' + (n === 1 ? 'guia' : 'guias');
			vazio.hidden = n > 0;
		}

		function grupo(attr, set) {
			var botoes = [].slice.call(document.querySelectorAll('.bx-chip[data-' + attr + ']'));
			botoes.forEach(function (b) {
				b.addEventListener('click', function () {
					botoes.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
					set(b.getAttribute('data-' + attr));
					aplicar();
				});
			});
		}
		grupo('brand', function (v) { marca = v; });
		grupo('probe', function (v) { sonda = v; });
		campo.addEventListener('input', aplicar);
		aplicar();
	})();
</script>
`;

// ---------------------------------------------------------------- montagem
function swap(re, rep, label) {
  if (!re.test(src)) throw new Error('Marcador não encontrado: ' + label);
  src = src.replace(re, rep);
}
swap(/<title>[\s\S]*?<\/title>/, '<title>Speculum | Biópsia – Guias, agulhas e pistolas de biópsia</title>', 'title');
swap(/<meta\s+name="description"[\s\S]*?>/, `<meta
    name="description"
    content="Guias de biópsia descartáveis para sondas Samsung, GE, Hitachi, Toshiba e Siemens, e agulhas e pistolas para biópsia mamária e prostática. Pesquise pelo modelo da sua sonda."
  >`, 'description');
swap(/\n  <\/style>\n\n  <style>/, '\n' + css + '  </style>\n\n  <style>', 'fim do 1.º <style>');
swap(/  <div id="root">[\s\S]*?\n  <\/div>\n\n<!-- Rodapé/, main + '\n<!-- Rodapé', 'conteúdo #root');
swap(/\n<\/body>/, '\n' + finderJS + '\n</body>', '</body>');

fs.writeFileSync(path.join(SITE, 'biopsia.html'), CRLF ? src.split('\n').join('\r\n') : src);
console.log('OK', guias.length, 'cartões de guias,', nKits, 'refs,', nAg, 'agulhas,', nPi, 'pistolas');
