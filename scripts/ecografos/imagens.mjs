// Copia para o site as imagens das páginas dos ecógrafos, com nomes descritivos.
//
// As imagens vêm dos sites da Samsung (global e EUA), onde têm nomes como
// 469a7d74-0fb4-….png. Este script descarrega cada uma, dá-lhe um nome a partir do modelo e
// do cartão onde aparece (samsung-hera-z20-myhera.jpg) e grava-a otimizada em
// images/ecografos/:
//
//   <modelo>/   as imagens de uma só página de modelo
//   comum/      as que se repetem em várias páginas (por exemplo, a do SonoSync™)
//   lista/      as da página ecografos.html (fotografias de produto e alinhamento do herói)
//
// As fotografias opacas passam a JPEG. As transparentes continuam em PNG, salvo quando a
// transparência é só a dos cantos arredondados: aí vão para JPEG sobre a cor de fundo da
// caixa onde aparecem, que é o que se via através dos cantos. Nenhuma fica com mais de
// 1600 px de largura (2000 px nos heróis). A conversão usa o
// System.Drawing do Windows, através do PowerShell.
//
// No fim escreve imagens.json, o mapa endereço original → caminho local, que o gerar.mjs
// aplica às páginas. Só descarrega o que ainda não existe; para refazer uma imagem, apague-a.
//
//   cd scripts/ecografos
//   node imagens.mjs
//   node gerar.mjs

import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { modelos } from './modelos.mjs';

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = join(AQUI, '..', '..');
const PASTA = 'images/ecografos';
const CACHE = join(tmpdir(), 'speculum-ecografos-imagens');
mkdirSync(CACHE, { recursive: true });

const IMG = 'https://www.samsunghealthcare.com/upload/';
const HUB = 'https://usa.samsunghealthcare.com/hs-fs/hubfs/';
const HUB2 = 'https://usa.samsunghealthcare.com/hubfs/';

// Nome de ficheiro a partir de um texto: sem acentos, sem ™ e em minúsculas.
const slug = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[™®”"']/g, '')
	.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/* ---------- O que há para copiar ---------- */

// [endereço, modelo (pasta), nome, largura máxima, cor de fundo da caixa]. As cores são as
// do CSS do gerar.mjs e da rs20-v2.html; o herói não tem cor (o fundo é um gradiente).
const FUNDO = { claro: '#e7edf0', escuro: '#02050a', ferramenta: '#02050a', tecnologia: '#000000', lista: '#edf1f5' };
const usos = [];
for (const m of modelos) {
	const pasta = m.ficheiro.replace(/^samsung-|\.html$/g, '');
	usos.push([m.heroi, pasta, 'heroi', 2000, null]);
	usos.push([m.tecnologia.imagem[0], pasta, 'tecnologia', 1600, m.tecnologia.imagem[2] || FUNDO.tecnologia]);
	for (const c of m.ferramentas.cartoes) usos.push([c[2], pasta, c[3], 1600, FUNDO.ferramenta]);
	for (const b of m.blocos) for (const c of b.cartoes) usos.push([c[0], pasta, c[1], 1600, FUNDO[b.tom]]);
}

// Página ecografos.html: fotografia de produto de cada modelo (a do V7, V6 e V5 serve
// também a gama CV) e os recortes do herói.
const LISTA = [
	[IMG + '469a7d74-0fb4-49bc-98a8-ab645d4b4672.png', 'hera-z20'],
	[IMG + 'af9044d6-84af-4874-8ec9-a89b0a0d07e1.png', 'q10-evo'],
	[IMG + 'cf59d3d7-9b6b-4c7d-95dd-8f1665750702.png', 'r20'],
	[IMG + 'bedc88aa-93d8-416c-be73-a19722f3e1be.png', 'rs85-prestige'],
	[IMG + '0b9c0148-9a5d-4cf7-a8bf-88c9be45884a.png', 'v8'],
	[IMG + '947124f6-8d9a-40e5-ad15-1d4d0ebc5bb3.png', 'v7'],
	[IMG + '4c14036f-308c-4020-b55c-9ce545c5e167.png', 'v6'],
	[IMG + 'fbfe40f3-2131-4c78-923c-0b8fe4e0ac34.png', 'v5'],
	[HUB + 'WH-W10-Elite-Hero-450x600.png', 'hera-w10-elite'],
	[IMG + '6bd1fc5b-015a-4c18-bd23-9ae6a250adc9.png', 'hs40'],
	[IMG + '2ced30d5-3b23-4aa6-a927-ca89eae89e56.png', 'hs30']
].map(([u, m]) => [u, 'lista', 'samsung-' + m + '-produto', 1600, FUNDO.lista]);
LISTA.push(
	[HUB2 + 'usa-samsung-wh-hs40-527px-1.png', 'lista', 'samsung-hs40-recorte', 1600, null],
	[HUB2 + 'usa-samsung-z20-527px.png', 'lista', 'samsung-hera-z20-recorte', 1600, null],
	[HUB2 + 'usa-samsung-gi-v8-527px.png', 'lista', 'samsung-v8-recorte', 1600, null],
	[HUB2 + 'usa-samsung-wh-v6-527px-1.png', 'lista', 'samsung-v6-recorte', 1600, null],
	[HUB + 'GI-R20-Hero-image3-450x600.png', 'lista', 'samsung-r20-destaque', 1600, null]
);

/* ---------- Nomes ---------- */

// Um endereço usado em mais de uma página de modelo vai para comum/, com o nome do cartão
// sem o modelo. Dentro de uma pasta, nomes repetidos levam -2, -3…
const paginasPorUrl = new Map();
for (const [u, pasta] of usos) paginasPorUrl.set(u, new Set([...(paginasPorUrl.get(u) || []), pasta]));

const destino = new Map();        // endereço → caminho sem extensão
const ocupados = new Set();
const reserva = (base) => {
	let n = base, i = 2;
	while (ocupados.has(n)) n = base + '-' + i++;
	ocupados.add(n);
	return n;
};
const largura = new Map();
const fundo = new Map();          // só fica uma cor se todas as caixas onde a imagem aparece a tiverem igual
for (const [u, pasta, nome, max, cor] of [...LISTA, ...usos]) {
	if (destino.has(u)) {
		largura.set(u, Math.max(largura.get(u), max));
		if (fundo.get(u) !== cor) fundo.set(u, null);
		continue;
	}
	fundo.set(u, cor);
	const partilhada = pasta !== 'lista' && paginasPorUrl.get(u).size > 1;
	const caminho = pasta === 'lista' ? `${PASTA}/lista/${slug(nome)}`
		: partilhada ? `${PASTA}/comum/samsung-${slug(nome)}`
		: `${PASTA}/${pasta}/samsung-${pasta}-${slug(nome)}`;
	destino.set(u, reserva(caminho));
	largura.set(u, max);
}

/* ---------- Descarregar ---------- */

const ficheiroCache = u => join(CACHE, slug(u.replace(/^https:\/\//, '')).slice(-120));
let novos = 0;
for (const u of destino.keys()) {
	const f = ficheiroCache(u);
	if (existsSync(f)) continue;
	const r = await fetch(u);
	if (!r.ok) throw new Error(`${r.status} ao descarregar ${u}`);
	writeFileSync(f, Buffer.from(await r.arrayBuffer()));
	novos++;
}
console.log(`descarregadas ${novos} (${destino.size} no total)`);

/* ---------- Converter (PowerShell + System.Drawing) ---------- */

// O PowerShell decide a extensão (.jpg ou .png) conforme a imagem tenha transparência e
// devolve-a; o mapa guarda o caminho final.
const anterior = existsSync(join(AQUI, 'imagens.json')) ? JSON.parse(readFileSync(join(AQUI, 'imagens.json'), 'utf8')) : {};
const tarefas = [];
for (const [u, base] of destino) {
	const feito = anterior[u];
	if (feito && feito.startsWith(base + '.') && existsSync(join(RAIZ, feito))) continue;
	tarefas.push({ origem: ficheiroCache(u), destino: join(RAIZ, base), max: largura.get(u), fundo: fundo.get(u), url: u });
}
const mapa = {};
for (const [u, base] of destino) if (anterior[u] && anterior[u].startsWith(base + '.')) mapa[u] = anterior[u];

if (tarefas.length) {
	for (const t of tarefas) mkdirSync(dirname(t.destino), { recursive: true });
	const lista = join(CACHE, 'tarefas.json');
	writeFileSync(lista, JSON.stringify(tarefas));
	const saida = execFileSync('powershell', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', join(AQUI, 'converter.ps1'), lista],
		{ encoding: 'utf8', maxBuffer: 1 << 24 });
	const ext = JSON.parse(saida.trim().split(/\r?\n/).pop());
	tarefas.forEach((t, i) => { mapa[t.url] = destino.get(t.url) + ext[i]; });
}

const ordenado = Object.fromEntries(Object.entries(mapa).sort((a, b) => a[1].localeCompare(b[1])));
writeFileSync(join(AQUI, 'imagens.json'), JSON.stringify(ordenado, null, '\t') + '\n');
console.log(`convertidas ${tarefas.length}; imagens.json com ${Object.keys(ordenado).length} entradas`);
