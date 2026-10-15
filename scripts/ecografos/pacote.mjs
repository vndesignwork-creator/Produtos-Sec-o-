// Monta a pasta para publicar as páginas dos ecógrafos no speculum.pt.
//
//   cd scripts/ecografos
//   node pacote.mjs
//
// Cria pacote-ecografos/ na raiz do repositório:
//
//   site/              o que se envia para a raiz do site (ao lado do ecografos.html atual)
//     ecografos.html, rs20.html e samsung-*.html
//     images/ecografos/   as imagens das páginas dos modelos e da lista
//     images/products/    as imagens da página do R20
//   INSTALAR.md        as instruções (copiadas de instalar.md, ao lado deste script)
//
// e o mesmo em pacote-ecografos.zip. As páginas são as do repositório com dois acertos para
// o servidor do speculum.pt:
//   - o "Produtos" do menu aponta para produtos.html, que só existe na versão nova do site;
//     no pacote passa para https://www.speculum.pt/pt/produtos, como no menu atual;
//   - as imagens do R20 vêm do jsDelivr (cópia do repositório no GitHub); no pacote passam a
//     ficheiros locais em images/products/, para não dependerem do repositório.

import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, copyFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { execFileSync } from 'node:child_process';

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = join(AQUI, '..', '..');
const SAIDA = join(RAIZ, 'pacote-ecografos');
const SITE = join(SAIDA, 'site');

const PAGINAS = ['ecografos.html', 'rs20.html',
	...readdirSync(RAIZ).filter(f => /^samsung-.+\.html$/.test(f) && f !== 'samsung-r20.html').sort()];
const PRODUTOS = 'https://www.speculum.pt/pt/produtos';
const JSDELIVR = /https:\/\/cdn\.jsdelivr\.net\/gh\/vndesignwork-creator\/Produtos-Sec-o-@[0-9a-f]+\/images\/products\/([\w.-]+)/g;

rmSync(SAIDA, { recursive: true, force: true });
mkdirSync(SITE, { recursive: true });

// Páginas
const imagensProdutos = new Set();
for (const p of PAGINAS) {
	let html = readFileSync(join(RAIZ, p), 'utf8');
	html = html.split('href="produtos.html"').join(`href="${PRODUTOS}"`);
	html = html.replace(JSDELIVR, (_, f) => { imagensProdutos.add(f); return 'images/products/' + f; });
	// Tudo o que é relativo tem de existir no pacote (ou ser uma das páginas).
	for (const [, ref] of html.matchAll(/(?:src|href)="(?!https?:|mailto:|tel:|data:|#)([^"#]+)"/g)) {
		const alvo = decodeURIComponent(ref);
		if (!PAGINAS.includes(alvo) && !alvo.startsWith('images/')) throw new Error(`${p}: ligação relativa sem destino no pacote: ${ref}`);
	}
	writeFileSync(join(SITE, p), html, 'utf8');
}

// Imagens
const copia = (de, para) => { mkdirSync(dirname(para), { recursive: true }); copyFileSync(de, para); };
const pasta = d => readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? pasta(join(d, e.name)) : [join(d, e.name)]);
for (const f of pasta(join(RAIZ, 'images', 'ecografos'))) copia(f, join(SITE, relative(RAIZ, f)));
for (const f of imagensProdutos) copia(join(RAIZ, 'images', 'products', f), join(SITE, 'images', 'products', f));

// Confirmar que todas as imagens referidas existem
let falta = 0;
for (const p of PAGINAS) {
	const html = readFileSync(join(SITE, p), 'utf8');
	for (const [, ref] of html.matchAll(/["'(](images\/[^"')\s]+)/g))
		if (!existsSync(join(SITE, decodeURIComponent(ref)))) { console.error(`${p}: falta ${ref}`); falta++; }
}
if (falta) throw new Error(`${falta} imagens em falta`);

copyFileSync(join(AQUI, 'instalar.md'), join(SAIDA, 'INSTALAR.md'));

// Zip (PowerShell, Windows)
const zip = join(RAIZ, 'pacote-ecografos.zip');
rmSync(zip, { force: true });
execFileSync('powershell', ['-NoProfile', '-Command', `Compress-Archive -Path '${SAIDA}\\*' -DestinationPath '${zip}'`]);

const total = pasta(SITE);
const mb = n => (n / 1048576).toFixed(1) + ' MB';
console.log(`${PAGINAS.length} páginas, ${total.length - PAGINAS.length} imagens, ${mb(total.reduce((s, f) => s + statSync(f).size, 0))}; zip ${mb(statSync(zip).size)}`);
console.log(PAGINAS.join(', '));
