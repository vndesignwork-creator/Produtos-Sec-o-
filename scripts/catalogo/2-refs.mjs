// Passo 2 de 3: vai a cada ficha buscar a referência ("Ref: XXXX"), que a listagem
// não traz. Concorrência contida e gravação incremental — o servidor é do cliente,
// não convém martelar, e uma interrupção não deve deitar fora o que já foi feito.
// Uso: node 2-refs.mjs   (lê build/catalogo.json, grava build/refs.json)
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const produtos = JSON.parse(readFileSync('./build/catalogo.json', 'utf8'));
const CONCORRENTES = 6;
const refs = existsSync('./build/refs.json') ? JSON.parse(readFileSync('./build/refs.json', 'utf8')) : {};

const fila = produtos.filter(p => !(p.via in refs)); // permite retomar
console.error(`${fila.length} fichas por ler (${Object.keys(refs).length} já feitas)`);

let feitos = 0;
async function buscar(p) {
	try {
		const r = await fetch('https://www.speculum.pt/pt/produtos/' + p.via);
		if (r.ok) {
			const html = await r.text();
			const m = html.match(/Ref:\s*([A-Za-z0-9._\-\/]+)/);
			refs[p.via] = m ? m[1].trim() : '';
		}
	} catch (e) { /* a página funciona sem referência */ }
	finally {
		feitos++;
		if (feitos % 250 === 0) {
			writeFileSync('./build/refs.json', JSON.stringify(refs));
			console.error(`${feitos}/${fila.length}`);
		}
	}
}

await Promise.all(Array.from({ length: CONCORRENTES }, async () => {
	while (fila.length) await buscar(fila.shift());
}));

writeFileSync('./build/refs.json', JSON.stringify(refs));
const comRef = Object.values(refs).filter(Boolean).length;
console.error(`FIM: ${comRef} referências de ${produtos.length} produtos`);
