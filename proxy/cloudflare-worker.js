/**
 * Proxy CORS para a pesquisa em tempo real da pagina Produtos.
 *
 * PORQUE EXISTE
 * O https://www.speculum.pt/includes/get_search.php nao devolve o cabecalho
 * Access-Control-Allow-Origin, por isso o browser bloqueia a chamada sempre que
 * a produtos.html nao esta alojada no proprio speculum.pt (por exemplo, no
 * GitHub Pages). Este Worker fica pelo meio: recebe o pedido, reencaminha-o para
 * o site e devolve a resposta com os cabecalhos que faltam.
 *
 * Quando a pagina passar a viver em www.speculum.pt, a chamada e same-origin e
 * este proxy deixa de ser usado — a produtos.html so recorre a ele fora do site.
 *
 * NAO E UM PROXY ABERTO: o destino esta fixo em ALVO, so seguem os tres
 * parametros que o get_search.php aceita, e so as origens listadas em ORIGENS
 * conseguem obter resposta.
 *
 * COMO PUBLICAR (sem CLI, ~3 minutos)
 *   1. dash.cloudflare.com > Workers & Pages > Create > Start from Hello World
 *   2. Da-lhe um nome (ex.: speculum-pesquisa) e Deploy
 *   3. Edit code > apaga o que la esta > cola este ficheiro > Deploy
 *   4. Copia o URL que fica (https://speculum-pesquisa.<algo>.workers.dev)
 *   5. Poe esse URL na constante PROXY, na produtos.html
 *
 * Plano gratuito: 100 mil pedidos por dia.
 */

const ALVO = 'https://www.speculum.pt/includes/get_search.php';

// Origens autorizadas a usar este proxy. Acrescenta aqui qualquer dominio novo
// onde a pagina passe a viver (sem barra no fim).
const ORIGENS = [
	'https://vndesignwork-creator.github.io',
	'http://localhost:4173'
];

export default {
	async fetch(pedido) {
		const origem = pedido.headers.get('Origin') || '';
		const autorizada = ORIGENS.includes(origem);

		if (pedido.method === 'OPTIONS') {
			return new Response(null, {
				status: autorizada ? 204 : 403,
				headers: cabecalhos(origem, autorizada)
			});
		}

		if (pedido.method !== 'POST') {
			return new Response('Metodo nao permitido', { status: 405, headers: { Allow: 'POST, OPTIONS' } });
		}

		if (!autorizada) {
			return new Response('Origem nao autorizada', { status: 403 });
		}

		// Reconstroi o corpo em vez de o reencaminhar tal e qual: so estes tres
		// campos chegam ao site, e o termo vai limitado no tamanho.
		const recebido = new URLSearchParams(await pedido.text());
		const corpo = new URLSearchParams({
			text: (recebido.get('text') || '').slice(0, 512),
			id_lang: recebido.get('id_lang') === '2' ? '2' : '1',
			lang: recebido.get('lang') === 'en' ? 'en' : 'pt'
		});

		let resposta;
		try {
			resposta = await fetch(ALVO, {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
				body: corpo
			});
		} catch (erro) {
			return new Response('O speculum.pt nao respondeu', {
				status: 502,
				headers: cabecalhos(origem, true)
			});
		}

		return new Response(resposta.body, {
			status: resposta.status,
			headers: Object.assign(cabecalhos(origem, true), { 'Content-Type': 'text/html; charset=UTF-8' })
		});
	}
};

function cabecalhos(origem, autorizada) {
	if (!autorizada) return {};
	return {
		'Access-Control-Allow-Origin': origem,
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Max-Age': '86400',
		'Vary': 'Origin'
	};
}
