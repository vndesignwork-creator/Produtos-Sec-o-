// Passo 3 de 3: junta catalogo.json + refs.json, aplica os dicionários de acentos e
// de área clínica, e substitui os três blocos marcados em produtos-catalogo.html —
// <!-- CATALOGO:MAIN --> , <!-- CATALOGO:DADOS --> e <!-- CATALOGO:JS -->.
//
// Usa marcadores HTML, não números de linha: corre sozinho (GitHub Action) sem se
// partir se alguém tiver editado outra parte do ficheiro entretanto.
// Uso: node 3-montar.mjs   (lê build/*.json, escreve ../../produtos-catalogo.html)
import { readFileSync, writeFileSync } from 'node:fs';
import { nomeTipo } from './acentos.mjs';

const PAGINA_HTML = '../../produtos-catalogo.html';
const MIN_PARA_FILTRO = 8; // tipos com menos que isto não entram na lista de filtro
const SEM_IMAGEM = 'product-no-image.jpg';

const produtos   = JSON.parse(readFileSync('./build/catalogo.json', 'utf8'));
const refs       = JSON.parse(readFileSync('./build/refs.json', 'utf8'));
const categorias = JSON.parse(readFileSync('./build/categorias.json', 'utf8'));

// --- Área clínica por tipo de artigo ---
// NOTA: critério editorial nosso. O speculum.pt não classifica os produtos por área;
// no site de referência essa arrumação é feita à mão, produto a produto. Aqui deduz-se
// do tipo de artigo, que é o que os dados da origem permitem.
const AREA = {
	Exame: ['Espéculos', 'Endoespéculos', 'Valvas vaginais', 'Otoscópios', 'Sinuscópios',
		'Estetoscópios', 'Esfigmomanómetros', 'Auriculares', 'Velas dilatadoras', 'Nasais',
		'Espelhos', 'Colposcópios', 'Negatoscópios', 'Balanças', 'Braçadeiras', 'Testes',
		'Reagentes', 'Zaragatoas'],
	Ecografia: ['Ecógrafos', 'Sondas', 'Gel', 'Dopplers', 'Papel de impressora',
		'Histerossonografia', 'Sensores'],
	Obstetrícia: ['Cardiotocógrafos', 'Monitorização', 'Ventosas', 'Agulhas de amniocentese',
		'Pessários', 'Software', 'Papel CTG'],
	Biópsia: ['Agulhas de biópsia', 'Guias de biópsia', 'Curetas', 'Pólipos',
		'Recolha endo e exocolo', 'Pistolas'],
	Anestesia: ['Agulhas de bloqueios periféricos', 'Agulhas SonoPlex', 'Agulhas Butterfly',
		'Agulhas de raquianestesia', 'Agulhas single shot', 'Laringoscópios', 'Magill',
		'Anestesia', 'Tubos', 'Cânulas'],
	Cirurgia: ['Retractores', 'Histerectomia', 'Dissecção', 'Pinças', 'Porta-agulhas',
		'Hemostática', 'Clamps', 'Metzenbaum', 'Tesouras', 'Íris', 'Bookwalter',
		'Ansas e elétrodos', 'Bipolar', 'Eletrocoagulação', 'Lâminas', 'Bisturis',
		'Afastadores', 'Ganchos', 'Mosquito', 'Mayo', 'Preensão', 'Manipuladores',
		'Osteótomos', 'Dermátomos', 'Pontos', 'Caixas de esterilização'],
};
const AREA_POR_TIPO = {};
for (const [area, tipos] of Object.entries(AREA)) for (const t of tipos) AREA_POR_TIPO[t] = area;

// --- Normaliza ---
const itens = produtos.map(p => {
	const tipo = nomeTipo(p.tipoSlug);
	return {
		nome: p.nome,
		img: p.img === SEM_IMAGEM ? '' : p.img,
		via: p.via,
		cat: p.cat,
		tipo,
		area: AREA_POR_TIPO[tipo] || '',
		ref: refs[p.via] || '',
	};
});

// Primeiro os que têm fotografia — a grelha ganha muito —, depois por nome.
itens.sort((a, b) => {
	if (!a.img !== !b.img) return a.img ? -1 : 1;
	return a.nome.localeCompare(b.nome, 'pt');
});

const contar = campo => {
	const m = new Map();
	itens.forEach(i => { if (i[campo]) m.set(i[campo], (m.get(i[campo]) || 0) + 1); });
	return [...m.entries()];
};
const cats  = contar('cat').sort((a, b) => b[1] - a[1]);
const areas = contar('area').sort((a, b) => b[1] - a[1]);
const tiposTodos = contar('tipo');
const tiposFiltro = tiposTodos
	.filter(([nome, n]) => nome !== 'Outros' && n >= MIN_PARA_FILTRO)
	.sort((a, b) => a[0].localeCompare(b[0], 'pt'));

const LCATS  = cats.map(c => c[0]);
const LTIPOS = [...new Set(itens.map(i => i.tipo).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt'));
const LAREAS = areas.map(a => a[0]);

const dados = itens.map(i => [
	i.nome, i.img, i.via,
	i.tipo ? LTIPOS.indexOf(i.tipo) : -1,
	LCATS.indexOf(i.cat),
	i.area ? LAREAS.indexOf(i.area) : -1,
	i.ref,
]);

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const caixas = (lista, campo) => lista.map(([nome, n]) =>
	`						<label class="pr-opcao"><input type="checkbox" data-campo="${campo}" value="${esc(nome)}">${esc(nome)} <span class="n">(${n})</span></label>`
).join('\n');

const hoje = new Date().toISOString().slice(0, 10);
const semArea = itens.length - itens.filter(i => i.area).length;
const numComRef = itens.filter(i => i.ref).length;

// Mapa "categoria → última página" para o aviso de desatualização no browser: é uma
// verificação leve (3 pedidos), não uma recolha nova — compara o que está gravado aqui
// com o que existir ao vivo quando a página for aberta.
const paginasPorCategoria = {};
categorias.forEach(c => { paginasPorCategoria[c.nome] = c.paginas; });

const dadosJs =
`	<!-- CATALOGO:DADOS -->
	/* --- Dados do catálogo ---
	   Gerado automaticamente a partir da listagem do speculum.pt (scripts/catalogo/).
	   Última recolha: ${hoje}. Não editar à mão — a próxima execução do script substitui
	   este bloco por inteiro.
	   Dicionários para categorias, tipos e áreas, e um vetor por produto para o texto não
	   se repetir milhares de vezes: [nome, imagem, endereço, tipo, categoria, área,
	   referência] — tipo e área a -1 quando não há. Imagem vazia = a origem não tem foto. */
	var PR_BUILD={data:"${hoje}",paginas:${JSON.stringify(paginasPorCategoria)}};
	var PR_CATS=${JSON.stringify(LCATS)},PR_TIPOS=${JSON.stringify(LTIPOS)},PR_AREAS=${JSON.stringify(LAREAS)},PR_DADOS=${JSON.stringify(dados)};
	<!-- /CATALOGO:DADOS -->`;

const areasHero = areas.map(([nome]) =>
	`					<button type="button" class="pr-area-btn" data-area="${esc(nome)}">${esc(nome)}</button>`).join('\n');

const mainHtml =
`<!-- CATALOGO:MAIN -->
<main id="produtos-main">

	<h1 class="so-leitores">Catálogo de produtos médico-hospitalares</h1>

	<!-- ===== Migalhas ===== -->
	<nav class="breadcrumbs" aria-label="Está aqui">
		<div class="container bc-inner">
			<a href="https://www.speculum.pt/pt/inicio">Início</a>
			<span class="sep" aria-hidden="true">›</span>
			<a href="produtos.html">Produtos</a>
			<span class="sep" aria-hidden="true">›</span>
			<span class="atual" aria-current="page">Catálogo</span>
		</div>
	</nav>

	<!-- ===== Cabeçalho da página ===== -->
	<section class="pr-hero" aria-labelledby="pr-hero-title">
		<div class="container pr-hero-inner">
			<p class="pr-eyebrow">Catálogo</p>
			<h2 id="pr-hero-title">Produtos Médico-Hospitalares</h2>
			<p>
				Do consumível de uso diário ao equipamento de última geração — o catálogo da
				Speculum, ${itens.length.toLocaleString('pt-PT')} referências organizadas por categoria, tipo de artigo e área clínica.
			</p>
			<div class="pr-areas" role="group" aria-label="Atalhos por área clínica">
${areasHero}
			</div>
		</div>
	</section>

	<!-- ===== Catálogo =====
	     Os ${itens.length} produtos, as fotografias, as referências e os destinos são os do
	     speculum.pt: o catálogo completo, recolhido das páginas de listagem de
	     /pt/produtos/categoria (última recolha: ${hoje} — ver scripts/catalogo/ e o
	     workflow .github/workflows/atualizar-catalogo.yml, que repete isto sozinho). A
	     categoria "Inovação" do site não entra porque não tem produtos — lista notícias
	     (URLs /pt/noticias/...).

	     Ao contrário das outras páginas deste sítio, os cartões NÃO vêm escritos no HTML:
	     a esta escala seriam mais de 2 MB de marcação e outros tantos nós no DOM. Os dados
	     vão num bloco compacto no fim da página e o JS desenha as 24 fichas de cada página.
	     A troca é explícita: sem JS esta página não mostra produtos, ao contrário das
	     restantes — ver o <noscript> abaixo.

	     O tipo de artigo é lido do endereço de cada ficha (".../354-especulos/..."):
	     ${tiposTodos.length} tipos ao todo, dos quais ${tiposFiltro.length} entram no filtro — abaixo de ${MIN_PARA_FILTRO}
	     produtos a lista ficaria com centenas de entradas de um só artigo, mas o tipo
	     continua na etiqueta do cartão e pesquisável por texto.

	     A área clínica é atribuição nossa a partir do tipo: o speculum.pt não classifica
	     produtos por área, e por isso ${semArea} dos ${itens.length} ficam sem área — papel de marquesa,
	     armários, cadeiras e afins não pertencem a nenhuma.

	     Os títulos vêm truncados a 40 caracteres da própria base de dados de origem: a
	     ficha de detalhe mostra exatamente o mesmo. -->
	<section class="produtos-cat" aria-labelledby="pr-title">
		<div class="container">
			<h2 class="so-leitores" id="pr-title">Catálogo de produtos</h2>

			<div class="pr-layout">

			<!-- Painel de filtros: texto, categoria, área e tipo, combináveis. Sem <form> a
			     envolver o campo — ver a nota do CSS sobre a regra do site abaixo de 768px. -->
			<div class="pr-painel">
				<div class="pr-bloco pr-busca">
					<label class="pr-rotulo" for="pr-busca">Pesquisar</label>
					<input type="text" id="pr-busca" placeholder="Pesquisar produtos…" autocomplete="off">
				</div>

				<div class="pr-bloco">
					<button type="button" class="pr-toggle" id="pr-tg-cat" aria-expanded="true" aria-controls="pr-lista-cat">Categorias</button>
					<div class="pr-lista" id="pr-lista-cat" role="group" aria-labelledby="pr-tg-cat">
${caixas(cats, 'cat')}
					</div>
				</div>

				<div class="pr-bloco">
					<button type="button" class="pr-toggle" id="pr-tg-area" aria-expanded="true" aria-controls="pr-lista-area">Áreas &amp; famílias</button>
					<div class="pr-lista" id="pr-lista-area" role="group" aria-labelledby="pr-tg-area">
${caixas(areas, 'area')}
					</div>
				</div>

				<div class="pr-bloco">
					<button type="button" class="pr-toggle" id="pr-tg-tipo" aria-expanded="false" aria-controls="pr-lista-tipo">Artigos por tipo</button>
					<div class="pr-lista pr-lista--longa" id="pr-lista-tipo" role="group" aria-labelledby="pr-tg-tipo" hidden>
${caixas(tiposFiltro, 'tipo')}
					</div>
				</div>

				<button type="button" class="pr-limpar" id="pr-limpar" hidden>Limpar filtros</button>
			</div>

			<div class="pr-resultados">
			<p class="pr-contagem" id="pr-contagem" role="status">A carregar o catálogo…</p>
			<p class="pr-aviso" id="pr-aviso" hidden></p>

			<!-- Preenchida pelo JS a partir do bloco de dados no fim da página. -->
			<div class="pr-grelha" id="pr-grelha"></div>

			<p class="pr-vazio" id="pr-vazio" hidden>Nenhum produto corresponde a esses filtros.</p>
			<noscript>
				<p class="pr-vazio">Esta página precisa de JavaScript para mostrar o catálogo — são ${itens.length.toLocaleString('pt-PT')} produtos, desenhados à medida que navega. Veja o catálogo em <a href="https://www.speculum.pt/pt/produtos/categoria" target="_blank" rel="noopener">speculum.pt</a>.</p>
			</noscript>
			<nav class="pr-paginacao" id="pr-paginacao" aria-label="Páginas de resultados"></nav>
			</div><!-- /.pr-resultados -->

			</div><!-- /.pr-layout -->
		</div>
	</section>

	<!-- ===== Faixa de contacto ===== -->
	<section class="cta-band" aria-label="Peça informação">
		<div class="container cta-inner">
			<div class="cta-text">
				<h2>Não encontra o que procura?</h2>
				<p>Se não encontrar aqui a referência de que precisa, diga-nos — temos acesso a muito mais do que está listado.</p>
			</div>
			<a class="cta-btn" href="contactos.html">Contacte-nos</a>
		</div>
	</section>

</main>
<!-- /CATALOGO:MAIN -->`;

// --- Substitui os blocos marcados na página, por regex — não por número de linha,
// para o script correr sozinho sem se partir com edições feitas noutras partes. ---
function substituir(html, marcador, novoConteudo) {
	const re = new RegExp(
		`<!-- CATALOGO:${marcador} -->[\\s\\S]*?<!-- /CATALOGO:${marcador} -->`
	);
	if (!re.test(html)) throw new Error(`marcador CATALOGO:${marcador} não encontrado na página`);
	return html.replace(re, novoConteudo);
}

let html = readFileSync(PAGINA_HTML, 'utf8');
html = substituir(html, 'MAIN',  mainHtml);
html = substituir(html, 'DADOS', dadosJs);
writeFileSync(PAGINA_HTML, html);

console.error(`Página atualizada: ${itens.length} produtos, ${numComRef} com referência, ${tiposTodos.length} tipos (${tiposFiltro.length} no filtro).`);
console.error('Categorias:', JSON.stringify(cats));
console.error('Áreas:', JSON.stringify(areas));
