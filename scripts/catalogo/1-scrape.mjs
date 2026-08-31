// Passo 1 de 3: recolhe o catálogo completo do speculum.pt.
// "Inovação" fica de fora — essa categoria lista notícias, não produtos.
// Uso: node 1-scrape.mjs   (grava build/catalogo.json)
import { writeFileSync, mkdirSync } from 'node:fs';

const CATEGORIAS = [
	{ slug: '1-consumiveis',  nome: 'Consumíveis'  },
	{ slug: '2-equipamentos', nome: 'Equipamentos' },
	{ slug: '3-metalicos',    nome: 'Metálicos'    },
];
const CONCORRENTES = 5;

function limparTitulo(t) {
	return t.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'")
		.replace(/\.\.\.$/, '').replace(/\s+/g, ' ').trim();
}

async function ultimaPagina(catSlug) {
	const r = await fetch(`https://www.speculum.pt/pt/produtos/categoria=%5B${catSlug}%5D`);
	const html = await r.text();
	const re = new RegExp(`categoria=\\[${catSlug}\\]/(\\d+)`, 'g');
	let m, max = 1;
	while ((m = re.exec(html)) !== null) max = Math.max(max, Number(m[1]));
	return max;
}

async function lerPagina(catSlug, n) {
	const base = `https://www.speculum.pt/pt/produtos/categoria=%5B${catSlug}%5D`;
	const url = n === 1 ? base : `${base}/${n}`;
	const r = await fetch(url);
	if (!r.ok) throw new Error(String(r.status));
	const html = await r.text();

	const itens = [];
	const re = /background-image:url\('([^']+)'\)[\s\S]*?<p class="ptitle"><a href="([^"]+)">([^<]+)<\/a>/g;
	let m;
	while ((m = re.exec(html)) !== null) {
		const [, imagem, href, titulo] = m;
		if (!/\/pt\/produtos\//.test(href)) continue; // a listagem mistura notícias
		const caminho = href.replace(/^https?:\/\/www\.speculum\.pt\/pt\/produtos\//, '');
		itens.push({
			nome: limparTitulo(titulo),
			img: imagem.replace('https://www.speculum.pt/files/images/products/', ''),
			via: caminho,
			tipoSlug: caminho.split('/')[0] || '',
		});
	}
	return itens;
}

console.error('a determinar o número de páginas de cada categoria…');
const comPaginas = await Promise.all(CATEGORIAS.map(async c => ({ ...c, paginas: await ultimaPagina(c.slug) })));
comPaginas.forEach(c => console.error(`  ${c.nome}: ${c.paginas} páginas`));

const tarefas = [];
for (const c of comPaginas) for (let p = 1; p <= c.paginas; p++) tarefas.push({ cat: c, p });
const totalTarefas = tarefas.length;

const todos = [];
const vistos = new Set();
let feitas = 0, falhas = 0;

await Promise.all(Array.from({ length: CONCORRENTES }, async () => {
	while (tarefas.length) {
		const t = tarefas.shift();
		try {
			const itens = await lerPagina(t.cat.slug, t.p);
			for (const it of itens) {
				if (vistos.has(it.via)) continue; // o mesmo artigo pode surgir em duas categorias
				vistos.add(it.via);
				todos.push({ ...it, cat: t.cat.nome });
			}
		} catch (e) {
			falhas++;
			console.error(`falhou ${t.cat.nome} p${t.p}: ${e.message}`);
		}
		feitas++;
		if (feitas % 25 === 0) console.error(`${feitas}/${totalTarefas} páginas — ${todos.length} produtos`);
	}
}));

console.error(`\nFIM: ${todos.length} produtos, ${falhas} páginas falhadas`);
mkdirSync('./build', { recursive: true });
writeFileSync('./build/catalogo.json', JSON.stringify(todos));
writeFileSync('./build/categorias.json', JSON.stringify(comPaginas.map(({ nome, paginas }) => ({ nome, paginas }))));
