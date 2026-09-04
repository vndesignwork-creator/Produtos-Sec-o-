// Constrói samsung-r20.html: conteúdo da página R20 do speculum.pt dentro do nosso
// esqueleto (cabeçalho, rodapé, pesquisa e correções ao CSS do site).
//
// O CSS da R20 é escrito para uma página isolada, com regras globais (*, body, img, a,
// .container) que dariam cabo do nosso cabeçalho/rodapé — que dependem da stylesheet.css
// do speculum.pt. Por isso é todo delimitado a #produtos-main, como nas outras páginas
// nossas, e as regras que só serviam o cabeçalho/rodapé deles são deitadas fora.
import { readFileSync, writeFileSync } from 'node:fs';

const ESQUELETO = 'C:/Users/asus/Desktop/Projectos/AI/teste00/speculum-site/ecografos.html';
const DESTINO   = 'C:/Users/asus/Desktop/Projectos/AI/teste00/speculum-site/samsung-r20.html';

const r20 = readFileSync('./r20.html', 'utf8');
const esq = readFileSync(ESQUELETO, 'utf8').split('\n');

// --- 1. CSS da R20: separar em blocos de topo ---
const css = r20.slice(r20.indexOf('<style>') + 7, r20.indexOf('</style>'));

function blocos(texto) {
	const out = [];
	let profundidade = 0, inicio = 0;
	for (let i = 0; i < texto.length; i++) {
		if (texto[i] === '{') profundidade++;
		else if (texto[i] === '}') {
			profundidade--;
			if (profundidade === 0) { out.push(texto.slice(inicio, i + 1)); inicio = i + 1; }
		}
	}
	return out.map(b => b.trim()).filter(Boolean);
}

// Regras que existiam só para o cabeçalho/rodapé deles — substituídos pelos nossos.
const DEITAR_FORA = /^\.(topbar|lang|flag|site-header|header-main|logo|nav|header-actions|search-wrap|mobile-toggle|footer|copyright)\b/;

function prefixar(seletor) {
	return seletor.split(',').map(s => {
		s = s.trim();
		if (!s) return s;
		if (s === '*') return '#produtos-main *';
		if (s === 'body') return '#produtos-main';
		return '#produtos-main ' + s;
	}).join(',');
}

function tratarBloco(bloco) {
	const abre = bloco.indexOf('{');
	let seletor = bloco.slice(0, abre).trim();
	const corpo = bloco.slice(abre);

	// Comentários vêm colados ao seletor; guarda-os para não se perder a documentação.
	const comentarios = seletor.match(/\/\*[\s\S]*?\*\//g) || [];
	seletor = seletor.replace(/\/\*[\s\S]*?\*\//g, '').trim();
	const prefixoComentario = comentarios.length ? '\n\t\t' + comentarios.join(' ') + '\n\t\t' : '';

	// @media: prefixar as regras lá dentro, uma a uma.
	if (seletor.startsWith('@media')) {
		const interior = corpo.slice(1, corpo.lastIndexOf('}'));
		const dentro = blocos(interior)
			.map(b => {
				const a = b.indexOf('{');
				const sel = b.slice(0, a).replace(/\/\*[\s\S]*?\*\//g, '').trim();
				if (DEITAR_FORA.test(sel)) return null;
				return '\t\t\t' + prefixar(sel) + b.slice(a).replace(/\n\s*/g, '');
			})
			.filter(Boolean);
		if (!dentro.length) return '';
		return `\n\t\t${seletor}{\n${dentro.join('\n')}\n\t\t}`;
	}

	// @keyframes e afins: manter tal como estão.
	if (seletor.startsWith('@')) return prefixoComentario + '\t\t' + seletor + corpo;

	if (DEITAR_FORA.test(seletor)) return '';
	// :root e html ficam globais — variáveis e scroll-behavior não colidem com o site.
	if (seletor === ':root' || seletor === 'html') {
		return prefixoComentario + '\t\t' + seletor + corpo.replace(/\n\s*/g, '');
	}
	return prefixoComentario + '\t\t' + prefixar(seletor) + corpo.replace(/\n\s*/g, '');
}

const cssTransformado = blocos(css).map(tratarBloco).filter(Boolean).join('\n');

// Vai depois do CSS da página, porque tem de vencer regras que ele não declara.
const correcoesDepois = `
		/* O esqueleto das nossas páginas dá 20px de padding lateral a
		   "#produtos-main .container". A página original conta com o container sem
		   padding — com ele, o conteúdo ficava 40px mais estreito do que no original. */
		#produtos-main .container{padding-inline:0}

		/* Abaixo de 768px o site tem uma regra anti-scroll-horizontal que apanha .container
		   e lhe impõe width e max-width a 100% e margens laterais a zero, tudo !important.
		   Sem repor isto, o conteúdo colava-se às margens do ecrã — a página original
		   mantém uma folga (36px, ou 24px abaixo de 720px). Vencemos por especificidade:
		   o id vale mais do que a classe, com !important dos dois lados. */
		@media (max-width:768px){
			#produtos-main .container{width:min(100% - 36px,1180px)!important;
				max-width:1180px!important;margin-inline:auto!important}
		}
		@media (max-width:720px){
			#produtos-main .container{width:min(100% - 24px,1180px)!important}
		}
`;

// --- 2. Correções ao CSS do site, para o conteúdo da R20 ---
// A stylesheet.css do speculum.pt aplica as suas próprias fontes a h1..h4, p, span, a,
// strong, li e afins. Sem isto, o conteúdo herdava as fontes MiniSans/MiniSerif, que
// estão alojadas em speculum.pt sem CORS e ficam invisíveis até o browser desistir —
// o mesmo problema já corrigido nas outras páginas.
const correcoes = `		/* ===== Correções ao CSS do site, para o conteúdo desta página =====
		   A stylesheet.css do speculum.pt impõe as suas fontes a estes elementos; sem esta
		   regra o texto herdava MiniSans/MiniSerif, que não carregam fora do domínio deles
		   e deixam o texto invisível até o browser desistir. */
		#produtos-main h1,#produtos-main h2,#produtos-main h3,#produtos-main h4,
		#produtos-main p,#produtos-main span,#produtos-main a,#produtos-main strong,
		#produtos-main small,#produtos-main li,#produtos-main figcaption,
		#produtos-main button,#produtos-main label{
			font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;
		}
		/* O site pinta os <a> de cinzento e mete os <label> em maiúsculas. */
		#produtos-main a{color:inherit;text-decoration:none}
		#produtos-main label{text-transform:none;letter-spacing:normal}

		/* A página original conta com dois valores por omissão que o CSS do site pisa:
		   os títulos a negrito (ela nunca declara font-weight em h1..h6) e a entrelinha
		   de 1,55 herdada do corpo. O site impõe peso 400 aos títulos, uma entrelinha
		   mais curta e letter-spacing de .1px a todo o texto — sem isto os títulos saíam
		   finos e os parágrafos apertados. As classes da própria página continuam a
		   mandar, porque têm mais especificidade do que estes seletores de elemento. */
		#produtos-main h1,#produtos-main h2,#produtos-main h3,
		#produtos-main h4,#produtos-main h5,#produtos-main h6{font-weight:700}
		#produtos-main h1,#produtos-main h2,#produtos-main h3,#produtos-main h4,
		#produtos-main h5,#produtos-main h6,#produtos-main p,#produtos-main li,
		#produtos-main a,#produtos-main span,#produtos-main small,#produtos-main strong,
		#produtos-main div,#produtos-main figure,#produtos-main article{
			line-height:inherit;letter-spacing:normal;
		}
		/* O site também impõe font-size aos parágrafos (18px onde a original herda os
		   16px do corpo). Fora dos títulos e dos <small>, que têm tamanhos próprios. */
		#produtos-main p,#produtos-main li,#produtos-main a,#produtos-main span,
		#produtos-main div,#produtos-main figure,#produtos-main article{
			font-size:inherit;
		}
		/* Os <small> sem tamanho próprio na página original ficam com o valor do browser
		   (~0,83em); o site impõe-lhes 12px. As classes da página que declaram tamanho
		   (.r20-spec-card small, por exemplo) continuam a mandar. */
		#produtos-main small{font-size:smaller}
		/* O site também zera as margens dos <p>. A página original conta com a margem por
		   omissão do browser (1em) nos parágrafos a que não dá margem própria — o .note
		   sob os transdutores e o texto da coluna .tech-large. Os que declaram margem
		   (.card p, .cta-box p...) continuam a mandar, por especificidade. */
		#produtos-main p{margin-block:1em}
`;

// --- 3. Conteúdo: as secções da página, sem o cabeçalho/rodapé deles ---
const linhas = r20.split('\n');
// A faixa azul da Samsung fica fora do <main> na original, logo a seguir ao cabeçalho
// deles — entra aqui, senão perdia-se ao trocar o cabeçalho.
const iBarra = linhas.findIndex(l => l.includes('class="partner-bar"'));
const iMain = linhas.findIndex(l => l.trim() === '<main>');
const iFimMain = linhas.findIndex((l, i) => i > iMain && l.trim() === '</main>');
const conteudo = linhas.slice(iBarra, iFimMain)
	.filter(l => l.trim() !== '<main>')
	.join('\n');

// --- 4. Montagem, sobre o esqueleto de ecografos.html ---
// parte1: <head> e as correções ao CSS do site (linhas 1..167)
// parte2: </style> </head> <body> e o cabeçalho (linhas 255..344)
// parte3: rodapé, o seu CSS e os scripts (linha 511 até ao fim)
const parte1 = esq.slice(0, 167).join('\n');
const parte2 = esq.slice(254, 344).join('\n');
const parte3 = esq.slice(510).join('\n');

let html = [
	parte1,
	correcoes,
	'\t\t/* ============================================================= */',
	'\t\t/* ===== PÁGINA SAMSUNG R20 =====',
	'\t\t   CSS da página original speculum.pt/rs20_4/, delimitado a #produtos-main: as',
	'\t\t   regras globais dela (*, body, img, a, .container) davam cabo do cabeçalho e do',
	'\t\t   rodapé, que dependem da stylesheet.css do site. As regras que só serviam o',
	'\t\t   cabeçalho/rodapé próprios dela foram deitadas fora. */',
	'\t\t/* ============================================================= */',
	cssTransformado,
	correcoesDepois,
	parte2,
	'<main id="produtos-main">',
	conteudo,
	'</main>',
	parte3,
].join('\n');

// Título e descrição próprios
html = html.replace(
	/<title>[\s\S]*?<\/title>/,
	'<title>Samsung R20 | Ecografia de nova geração | Speculum</title>'
).replace(
	/<meta name="description" content="[^"]*">/,
	'<meta name="description" content="Samsung R20: ecógrafo ultra-premium de imagem geral com monitor 27\u2033 UHD OLED, painel tátil 15,6\u2033 e Advanced Imaging Engine. Distribuição e acompanhamento Speculum em Portugal.">'
).replace(
	/<meta name="keywords" content="[^"]*">/,
	'<meta name="keywords" content="Samsung R20, ecógrafo, ecografia, imagem geral, ultra-premium, UHD OLED, Advanced Imaging Engine, Speculum">'
);

// A fonte da página original (Inter) tem de vir com as outras folhas de estilo.
html = html.replace(
	'<!-- Fonte para o conteúdo de produtos (não afeta cabeçalho/rodapé) -->',
	'<!-- Fontes: Inter para o conteúdo desta página (a original usa-a), Montserrat pelo resto do sítio -->\n\t<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">'
);

// Marcar "Produtos" como o item ativo do menu
html = html.replace(/<a href="ecografos\.html" class="selected">/g, '<a href="ecografos.html">');

writeFileSync(DESTINO, html);
console.error(`samsung-r20.html: ${Math.round(html.length / 1024)} KB, ${html.split('\n').length} linhas`);
console.error(`CSS: ${blocos(css).length} blocos originais → ${cssTransformado.split('\n').filter(l => l.includes('{')).length} mantidos`);
