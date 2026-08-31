// Repõe acentos e maiúsculas nos nomes de tipo, que a origem escreve em slug sem acentos.
// Trabalha ao nível da palavra, para abranger os 418 tipos e não só os do filtro.

// Palavras que mudam. As que ficam iguais (agulhas, sondas, luvas...) não entram.
export const PALAVRA = {
	especulos: 'espéculos', endoespeculos: 'endoespéculos', espatulas: 'espátulas',
	canulas: 'cânulas', capsulas: 'cápsulas', laminas: 'lâminas', pincas: 'pinças',
	algalias: 'algálias', pessarios: 'pessários', polipos: 'pólipos', iris: 'íris',
	solucoes: 'soluções', mascaras: 'máscaras', lampadas: 'lâmpadas', armarios: 'armários',
	balancas: 'balanças', bracadeiras: 'braçadeiras', alteres: 'halteres',
	manipulos: 'manípulos', osteotomos: 'osteótomos', dermotomos: 'dermátomos',
	diapasoes: 'diapasões', lencois: 'lençóis', tungstenio: 'tungsténio',
	copos: 'copos', goiva: 'goiva', maco: 'maço',

	disseccao: 'dissecção', preensao: 'preensão', hemostatica: 'hemostática',
	esterilizacao: 'esterilização', identificacao: 'identificação',
	eletroestimulacao: 'eletroestimulação', electrocoagulacao: 'eletrocoagulação',
	electrocardiografia: 'eletrocardiografia', electrodos: 'elétrodos',
	monitorizacao: 'monitorização', biopsia: 'biópsia', amniocentese: 'amniocentese',

	cardiotocografos: 'cardiotocógrafos', ecografos: 'ecógrafos',
	colposcopios: 'colposcópios', laringoscopios: 'laringoscópios',
	otoscopios: 'otoscópios', estetoscopios: 'estetoscópios',
	negatoscopios: 'negatoscópios', oftalmoscopio: 'oftalmoscópio',
	sinuscopios: 'sinuscópios', esfigmomanometros: 'esfigmomanómetros',
	histerometros: 'histerómetros', termometros: 'termómetros',
	espirometros: 'espirómetros', audiometros: 'audiómetros',
	monitores: 'monitores', acessorios: 'acessórios',

	perifericos: 'periféricos', continuos: 'contínuos', vaginais: 'vaginais',
	superficie: 'superfície', ecogenicas: 'ecogénicas', radiofrequencia: 'radiofrequência',
	vasculares: 'vasculares', cardiovasctoracica: 'cardiovascular e torácica',
	histerossonografia: 'histerossonografia', raquianestesia: 'raquianestesia',
	uretrais: 'uretrais', linguais: 'linguais', cervical: 'cervical',

	// siglas e nomes próprios
	ecg: 'ECG', ctg: 'CTG', sonoplex: 'SonoPlex', sonomsk: 'SonoMSK',
	tuohy: 'Tuohy', mayo: 'Mayo', kelly: 'Kelly', metzenbaum: 'Metzenbaum',
	bookwalter: 'Bookwalter', mosquito: 'mosquito', bipolar: 'bipolar',
};

// Ligações que ficam em minúscula no meio do nome.
const LIGACAO = new Set(['e', 'de', 'do', 'da', 'com', 'sem', 'para']);

// Nomes que levam hífen a sério, e não como separador de palavras.
const HIFENIZADOS = {
	'porta-agulhas': 'Porta-agulhas',
	'ansas-e-electrodos': 'Ansas e elétrodos',
	'papel-ecg-maco': 'Papel ECG (maço)',
	'papel-ecg-rolo': 'Papel ECG (rolo)',
	'recolha-do-endo-e-exocolo': 'Recolha endo e exocolo',
	'agulhas-single-shot': 'Agulhas single shot',
	'caixas-esterilizacao': 'Caixas de esterilização',
	'electrodos-eletroestimulacao': 'Elétrodos de eletroestimulação',
	'agulhas-bloqueios-perifericos-continuos': 'Agulhas de bloqueios periféricos',
	'agulhas-biopsia': 'Agulhas de biópsia',
	'agulhas-amniocentese': 'Agulhas de amniocentese',
	'agulhas-raquianestesia': 'Agulhas de raquianestesia',
	'guias-de-biopsia': 'Guias de biópsia',
	'clamp': 'Clamps',
	'kit': 'Kits',
};

export function nomeTipo(slug) {
	const s = slug.replace(/^\d+-/, '');
	if (!s) return '';
	if (HIFENIZADOS[s]) return HIFENIZADOS[s];

	const partes = s.split('-').map(w => PALAVRA[w] || w);
	const texto = partes.map((w, i) => {
		if (i > 0 && LIGACAO.has(w)) return w;
		// não mexer nas siglas que já vieram em maiúsculas do dicionário
		if (w === w.toUpperCase() && w.length <= 4) return w;
		return i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w;
	}).join(' ');
	return texto;
}
