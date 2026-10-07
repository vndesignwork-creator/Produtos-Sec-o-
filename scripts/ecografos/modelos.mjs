// Conteúdo das páginas individuais dos ecógrafos Samsung.
//
// Textos traduzidos e condensados a partir das páginas oficiais de cada modelo no site
// global da Samsung (samsunghealthcare.com/en/Product/UltrasoundSystem/...) e no site da
// Samsung EUA (usa.samsunghealthcare.com/ultrasound/...), consultados em outubro de 2026.
// Os números citados (dimensões, percentagens, contagens) são os que essas páginas indicam;
// não se acrescentou nada que lá não esteja.
//
// As imagens vêm da Samsung: U() para o site global, H() para o site dos EUA. O imagens.mjs
// copia-as para images/ecografos/ e o gerar.mjs usa as cópias. L() aponta diretamente para uma
// imagem que já está no site: as versões em português de infográficos da Samsung com texto
// em inglês, preparadas pela Speculum.

const U = (id, ext = 'png') => `https://www.samsunghealthcare.com/upload/${id}.${ext}`;
const H = nome => `https://usa.samsunghealthcare.com/hs-fs/hubfs/${nome}`;
const L = ficheiro => `images/ecografos/${ficheiro}`;

const CAT = 'https://www.speculum.pt/files/files/catalog/';
const CONTACTOS = 'https://www.speculum.pt/pt/contactos';
const OPCIONAL = 'Algumas funções são opcionais e podem exigir aquisição adicional; a configuração disponível varia de país para país.';

export { CONTACTOS };

export const modelos = [

	/* ===================================================================== HERA Z20 */
	{
		ficheiro: 'samsung-hera-z20.html',
		nome: 'HERA Z20',
		curto: 'Z20',
		area: 'Ginecologia e Obstetrícia',
		frase: 'Visão ao serviço da saúde da mulher.',
		lead: 'O HERA Z20 adapta-se a cada doente, com imagem 2D, 3D e Doppler a cores ajustada a cada caso. A IA integrada e as funções automáticas apoiam a decisão clínica e libertam tempo para o que importa: a doente.',
		descricao: 'Samsung HERA Z20 em Portugal pela Speculum: ecógrafo premium para ginecologia e obstetrícia, com Crystal Architecture™ de 2.ª geração, Live ViewAssist™, HeartAssist™, BrainVue™ e monitor OLED de 27".',
		heroi: U('6d346346-d17b-4836-94d1-2ab43e4aa2d1'),
		numeros: [
			['27”', 'Monitor OLED com pretos profundos'],
			['15,6”', 'Ecrã tátil inclinável'],
			['47', 'Estruturas anotadas pelo Live ViewAssist™'],
			['52%', 'Menos tempo de exame no 2.º trimestre, com Live ViewAssist™']
		],
		catalogos: [],
		tecnologia: {
			titulo: 'Imagem cristalina, com detalhe em cada plano.',
			lead: 'A Crystal Architecture™ de 2.ª geração junta os pontos fortes do CrystalBeam™ e do CrystalLive™ aos últimos avanços da tecnologia S-Vue Transducer™, para imagens nítidas e ricas em detalhe.',
			pontos: [
				['onda', 'CrystalBeam™', 'Melhor relação sinal-ruído, mais imagens por segundo e maior resolução espacial e de contraste.'],
				['sonda', 'S-Vue Transducer™', 'Maior penetração, sensibilidade e resolução.'],
				['olho', 'CrystalLive™', 'Limites dos tecidos bem definidos e excelente resolução de contraste.'],
				['fluxo', 'MV-Flow™ Max', 'Evolução do MV-Flow™: mais sensibilidade na visualização do fluxo microvascular, sem perder resolução.']
			],
			imagem: [U('100a2b71-fbca-4ca7-95e0-8385c364933e', 'jpg'), 'Imagem clínica do HERA Z20 com MV-Flow™ Max a mostrar a microvascularização']
		},
		ferramentas: {
			titulo: 'Inteligência artificial para o coração e o cérebro fetais',
			lead: 'Ferramentas automáticas que reduzem passos manuais e tornam a avaliação neurocardíaca fetal mais rápida e reprodutível.',
			cartoes: [
				['Morfologia fetal', 'IA', U('ddd8a63c-db04-4d6a-bce8-2a5de2daa5d7'), 'Live ViewAssist™', 'Classifica as imagens em tempo real, anota até 47 estruturas e faz até 46 medições, sem intervenção do utilizador.'],
				['Coração fetal', 'IA', U('2f6a7c9a-0677-40a3-862e-7667f55cb5a0', 'jpg'), 'EzHQ™', 'Segmenta e acompanha o coração fetal e quantifica indicadores que ajudam a diagnosticar cardiopatias.'],
				['Coração fetal', 'IA', U('369b6ce1-445a-4f9b-9a69-685096fc1bed', 'jpg'), 'HeartAssist™', 'Classifica as vistas necessárias à avaliação cardíaca e apresenta logo as medições.'],
				['Cérebro fetal', 'IA', U('f63c40d2-1433-44b3-92e2-e34130f8ef81', 'jpg'), 'BrainVue™', 'Num só clique alinha o cérebro, remove o crânio e define a ROI para mostrar a superfície cerebral.'],
				['Sistema nervoso central', '5D', U('35abedb8-e9e6-4368-96b3-519ec93325c1', 'jpg'), '5D CNS+™', 'Encontra 9 planos no volume do cérebro fetal e apresenta-os com 6 medições automáticas.'],
				['Ginecologia', 'IOTA', U('7dce8800-2b50-4505-bcd4-7de431dc4049'), 'IOTA-SRrisk', 'Calcula o risco de malignidade de tumores do ovário segundo o modelo Simple Rules do grupo IOTA.']
			],
			nota: OPCIONAL
		},
		blocos: [
			{
				id: 'experiencia', menu: 'Experiência', tom: 'claro',
				titulo: 'Uma experiência pensada para quem examina.',
				lead: 'Personalização, 3D assistido por IA e cabos mais leves: o Z20 adapta-se a cada utilizador e a cada exame.',
				cartoes: [
					[U('fbc0fcaa-c585-46eb-ab71-ce6573d529e2'), 'MyHERA™', 'Ao iniciar sessão, o sistema carrega as preferências de cada utilizador: definições, ecrã tátil, presets de imagem e até a iluminação.', 'object-position: 72% 58%; transform: scale(2.6); transform-origin: 84% 55%'],
					[H('usa-samsung-wh-z20-volume-seg-thumb.jpg'), 'EzVolume™', 'Segmenta e colore automaticamente estruturas fetais em 3D, para uma visualização anatómica mais clara.'],
					[H('PortraitVue%20Thumbnail%202.jpg'), 'PortraitVue™', 'Otimiza a face fetal em 3D sem manipulação demorada. Função não diagnóstica, pensada para a família.'],
					[U('0fc16ae1-eada-4559-a828-d8a920a22ad5'), 'Cabos flex™', 'Acompanham os movimentos naturais e reduzem o arrasto e a torção que sobrecarregam o pulso e o ombro.', 'transform: scale(1.08)']
				]
			},
			{
				id: 'design', menu: 'Design', tom: 'escuro',
				titulo: 'Cumpre ou supera 100% das diretrizes ergonómicas.',
				lead: 'Testes independentes da Sound Ergonomics confirmam que o Z20 cumpre todos os critérios avaliados no carro, no fluxo de trabalho e nas sondas.',
				cartoes: [
					[U('6671e6a0-aae2-446c-a4a6-0391fbbb1db8'), 'Monitor OLED de 27”', 'Pretos profundos, ideais para imagens ecográficas sobre fundo negro.'],
					[U('825bc1ee-3b1d-40c6-962c-414bb134c894'), 'Ecrã tátil de 15,6”', 'Inclinável, para o melhor ângulo de visão.'],
					[U('3a68f3d0-b11a-48ef-bf48-5f1ff7223baa'), 'Painel com grande amplitude', 'Mais liberdade de movimento e de postura.'],
					[U('aff7e3ff-3897-4831-9848-0e079bc1cc0d'), 'Bloqueio das rodas', 'Um botão trava e destrava o sistema.'],
					[U('7dd997ae-71a2-49c3-830e-2e4ca7d2c26e'), 'Iluminação LED', 'Boa visibilidade em salas escuras.'],
					[U('87a3d7ab-bb7d-4102-8555-790e86232f01'), 'Aquecedor de gel', 'Dois níveis de temperatura ajustáveis.']
				]
			}
		]
	},

	/* ===================================================================== Q10 EVO */
	{
		ficheiro: 'samsung-q10-evo.html',
		nome: 'Q10 EVO',
		curto: 'Q10 EVO',
		area: 'Portátil · Point of Care',
		frase: 'Rapidez com qualidade.',
		lead: 'Ecografia portátil já não significa compromisso. Assente na mesma arquitetura dos sistemas em carro, o Q10 EVO leva imagem de alta resolução e ferramentas automáticas para onde os cuidados acontecem.',
		descricao: 'Samsung Q10 EVO em Portugal pela Speculum: ecógrafo portátil para point of care, imagem geral e saúde da mulher, com painel IP22, estrutura em magnésio, até 7 horas de bateria e HeartAssist™.',
		heroi: U('0240b114-82e3-43f6-9ee1-0981597d09e5'),
		numeros: [
			['IP22', 'Painel de controlo protegido contra líquidos'],
			['2,5×', 'Mais robusto: estrutura em magnésio (face ao modelo anterior)'],
			['7 h', 'Até 7 horas de exame com uma carga de bateria'],
			['90%', 'Menos teclas nas medições cardíacas com HeartAssist™']
		],
		catalogos: [['Catálogo (EN)', U('d8cfe4a5-a7e7-4ad7-9981-610d977d29a1', 'pdf')]],
		tecnologia: {
			titulo: 'Imagem de sistema em carro, num formato portátil.',
			lead: 'O Q10 EVO partilha a arquitetura dos sistemas em carro da Samsung e foi construído para aguentar a exigência do dia a dia clínico, da urgência ao consultório.',
			pontos: [
				['olho', 'Qualidade de imagem', 'Imagem de alta resolução para diagnósticos mais rápidos e mais seguros.'],
				['gota', 'Fácil de desinfetar', 'Painel de controlo IP22 e materiais resistentes a químicos, para um controlo de infeção eficaz.'],
				['escudo', 'Estrutura em magnésio', 'Até 2,5 vezes mais resistente do que o modelo anterior, para situações imprevisíveis.']
			],
			imagem: [H('wh-q10-4-Chamber-Fetal-Heart.jpg'), 'Coração fetal em quatro câmaras, imagem clínica do Q10']
		},
		ferramentas: {
			titulo: 'Preparado para cada contexto de point of care',
			lead: 'Da cardiologia à saúde da mulher, ferramentas com IA e imagem de qualidade para avaliações rápidas e precisas.',
			cartoes: [
				['Cardiologia', 'IA', U('74a08b62-7997-4ac9-ae7b-2072c0b98e3d'), 'HeartAssist™', 'Classifica as vistas cardíacas e apresenta as medições, com até 90% menos teclas.'],
				['Abdómen', 'Imagem', U('3be94646-0771-458d-b468-ea045a6f740c'), 'Quistos hepáticos múltiplos', 'Imagem clínica obtida com o Q10 EVO.'],
				['Obstetrícia', '3D', H('wh-q10-3D-Fetal-Face.jpg'), 'Face fetal em 3D', 'Imagem clínica obtida com o Q10.'],
				['Obstetrícia', 'S-Flow™', H('wh-q10-s-flow-placenta.jpg'), 'Placenta com S-Flow™', 'Imagem clínica obtida com o Q10.'],
				['Ginecologia', 'Imagem', H('wh-q10-uterus.jpg'), 'Útero', 'Imagem clínica obtida com o Q10.'],
				['Fertilidade', 'Auto', H('wh-q10-2D-Follicle.jpg'), '2D Follicle™', 'Medição de folículos ováricos em 2D.']
			],
			nota: OPCIONAL
		},
		blocos: [
			{
				id: 'fluxo', menu: 'Fluxo de trabalho', tom: 'claro',
				titulo: 'Menos passos, do primeiro toque ao relatório.',
				lead: 'Personalização, gestos e comandos por voz para simplificar a utilização e manter o foco no doente.',
				cartoes: [
					[L('q10-evo/samsung-q10-evo-mirrortouch.jpg'), 'MirrorTouch™', 'Ecrã tátil espelhado que simplifica o fluxo de trabalho.', 'object-position: 50% 75%'],
					[L('q10-evo/samsung-q10-evo-ezstructure.jpg'), 'EzStructure™', 'Otimiza a imagem 2D num só toque.'],
					[H('usa-samsung-wh-q10-designed-user.jpg'), 'MyTune™ e comandos por voz', 'Personalização, controlo por gestos no ecrã tátil e comandos por voz, sem mãos.'],
					[U('c75ab9ae-bdf4-44df-842b-1742339e8e9d'), 'SonoSync™', 'Partilha de imagem em tempo real e controlo remoto. Não é uma função de diagnóstico.'],
					[U('2b99d245-4167-40e3-b11c-f8eafa298419'), 'S-Hub', 'Gestão centralizada do parque de ecógrafos.', 'transform: scale(1.06)'],
					[H('Q10-security.jpg'), 'Segurança', 'Proteção do sistema e dos dados dos doentes, agora com Windows 11.']
				]
			},
			{
				id: 'design', menu: 'Design', tom: 'escuro',
				titulo: 'Compacto, resistente e pronto a mover.',
				lead: 'Um desenho dedicado ao point of care, para chegar ao doente onde quer que esteja.',
				cartoes: [
					[U('8710bf93-9628-4cd0-9780-af1e5deaa9c6', 'jpg'), 'Construção durável', 'Estrutura em magnésio até 2,5 vezes mais resistente do que o modelo anterior.'],
					[U('e23283f2-9635-4086-9b63-aa96d9500cd9', 'jpg'), 'Posicionamento flexível', '300 mm de ajuste em altura e inclinação entre 20° e 60°.'],
					[U('e84d2163-6b35-4f5f-a7f8-9bff539128a0', 'jpg'), 'Compacto e móvel', 'Manobra com facilidade mesmo em espaços apertados.'],
					[U('a52a4809-96db-47f9-ad72-4827272a41bb', 'jpg'), 'Bateria de longa duração', 'Até 7 horas de exame com uma carga; varia com a utilização e o ambiente.']
				]
			}
		]
	},

	/* ===================================================================== RS85 PRESTIGE */
	{
		ficheiro: 'samsung-rs85-prestige.html',
		nome: 'RS85 Prestige',
		curto: 'RS85 Prestige',
		area: 'Radiologia · Musculoesquelética',
		frase: 'A verdadeira revolução.',
		lead: 'Tecnologias avançadas para confirmar com confiança os casos mais difíceis, num sistema fácil de usar que acompanha o esforço da rotina diária.',
		descricao: 'Samsung RS85 Prestige em Portugal pela Speculum: ecógrafo premium de imagem geral e radiologia, com Crystal Architecture™, ShadowHDR™, S-Shearwave Imaging™, S-Fusion™ e monitor OLED de 27".',
		heroi: U('232957d7-31b9-4cd2-932d-3b00507084dd'),
		// A fotografia traz o nome do modelo gravado à esquerda; o véu fica opaco até meio,
		// para esse texto não aparecer por trás do título.
		heroiVeu: 'linear-gradient(100deg, rgb(3, 16, 27) 0%, rgb(3, 16, 27) 46%, rgba(4, 19, 31, 0.62) 66%, rgba(6, 22, 35, 0.4) 100%)',
		numeros: [
			['27”', 'Monitor OLED (opcional; 23,8” de série)'],
			['23%', 'Mais campo lateral com WideScreen'],
			['14”', 'Ecrã tátil inclinável'],
			['6', 'Direções de ajuste do painel de controlo']
		],
		catalogos: [['Catálogo', CAT + 'RS85%20Prestige%20V2.02_Catalog_CE_200908_single%20page-compactado-20230725-100107.pdf']],
		tecnologia: {
			titulo: 'Imagem redefinida pela Crystal Architecture™.',
			lead: 'A Crystal Architecture™ combina o CrystalBeam™ e o CrystalPure™ com a tecnologia S-Vue Transducer™, para imagens nítidas mesmo nos casos complexos.',
			pontos: [
				['onda', 'CrystalBeam™', 'Formação de feixe que melhora a resolução e a uniformidade da imagem.'],
				['camadas', 'CrystalPure™', 'Processamento 2D e de cor mais apurado, com menos ruído e melhor sinal de cor.'],
				['contraste', 'ShadowHDR™', 'Aplica frequências altas e baixas de forma seletiva para revelar estruturas em zonas de sombra acústica.']
			],
			imagem: [U('a6b931ab-ce4b-4024-bb4c-31ae1762f8d4'), 'Fígado com ShadowHDR™ desligado e ligado: mais contraste e menos sombra acústica']
		},
		ferramentas: {
			titulo: 'Avaliação quantitativa e procedimentos de intervenção',
			lead: 'Ferramentas para medir a rigidez dos tecidos e para guiar biópsias com fusão de imagem.',
			cartoes: [
				['Elastografia', 'SWE', U('a7c36b1f-2545-4aa2-92d4-b871aa6a8ece'), 'S-Shearwave Imaging™', 'Avalia de forma não invasiva a rigidez dos tecidos, com elastograma a cores, medições quantitativas e ROI à escolha.'],
				['Intervenção', 'Fusão', L('rs85-prestige/samsung-rs85-prestige-s-fusion.jpg'), 'S-Fusion™', 'Localiza lesões com ecografia em tempo real fundida com TC ou RM, para biópsias mais precisas.'],
				['Intervenção', 'Auto', U('44a311df-3831-4bfb-ad04-dfd1ba96eee5'), 'Matching Auto', 'Um marcador externo no doente permite o registo inicial automático antes do exame S-Fusion™.'],
				['Intervenção', 'Auto', U('af05c829-6540-4607-a456-dd435ff22917'), 'Positioning Auto', 'Registo inicial num só passo entre TC/RM e ecografia, com a sonda posicionada no epigastro.']
			],
			nota: OPCIONAL
		},
		blocos: [
			{
				id: 'fluxo', menu: 'Fluxo de trabalho', tom: 'claro',
				titulo: 'Menos teclas, mais exames.',
				lead: 'Soluções colaborativas e um fluxo simplificado que junta várias ações numa só.',
				cartoes: [
					[U('c75ab9ae-bdf4-44df-842b-1742339e8e9d'), 'SonoSync™', 'Partilha de imagem em tempo real com PC ou smartphone, com chat de voz e texto. Não é uma função de diagnóstico.'],
					[U('3674d65e-59f3-4c9d-ac1b-dc2bf239a340'), 'EzPrep™', 'Escolhe a sonda e o preset a partir da lista de trabalho.'],
					[U('b09f6935-b098-44ce-b724-17df028206b6'), 'EzExam+™', 'Protocolos predefinidos para que nenhuma imagem ou medição fique por fazer.'],
					[U('81277104-f0cf-4f54-9d8c-88cc9c39f12e'), 'Touch Customization', 'Coloca as funções mais usadas na primeira página do ecrã tátil.'],
					[U('fd63f527-befb-4220-b710-fd4ab18498ac'), 'QuickPreset', 'Combinações de sonda e preset num só clique.'],
					[U('b92d99bd-6d90-472d-9920-bd08c223411a'), 'RIS Browser', 'Acesso ao RIS no próprio ecógrafo, sem passar para um PC.', 'transform: scale(2); transform-origin: 1.5% 36%']
				]
			},
			{
				id: 'design', menu: 'Design', tom: 'escuro',
				titulo: 'Produtividade em cada detalhe.',
				lead: 'Ecrãs maiores, painel ajustável e mobilidade para trabalhar com menos esforço.',
				cartoes: [
					[U('538f6577-834c-4e3c-b7e3-da4f003d39e5'), 'Monitor OLED de 27”', 'Pretos reais, adequados à imagem ecográfica. Opcional; de série, 23,8”.'],
					[U('3ab64864-e629-43f5-91d5-b25d82c3325f'), 'WideScreen', 'Cerca de 23% mais informação lateral do que o ecrã normal.'],
					[U('28426c1d-0a21-46e3-8d10-b42d66b4e7c9'), 'Ecrã tátil de 14”', 'Inclinável, para qualquer ambiente de exame.'],
					[U('02b304a1-a37a-4d1a-b838-4df35b399a98'), 'Painel em 6 direções', 'Reduz o esforço dos movimentos repetitivos e volta à posição inicial ao desligar.'],
					[U('f22fbe1b-58c0-4080-a691-6aa59fd0fd2e'), 'Bloqueio central', 'Um só pedal fixa a consola no lugar.'],
					[U('dee93543-676a-4709-9fb4-13cfb7376ae2'), 'Rodas manobráveis', 'Quatro rodas giratórias, com bloqueio.']
				]
			}
		]
	},

	/* ===================================================================== V8 */
	{
		ficheiro: 'samsung-v8.html',
		nome: 'V8',
		curto: 'V8',
		area: 'Imagem Geral · Ginecologia e Obstetrícia',
		frase: 'Mais confiança em cada exame.',
		lead: 'Um sistema muito versátil, com ferramentas para casos clínicos e doentes diversos e funções de alta precisão para exames direcionados.',
		descricao: 'Samsung V8 em Portugal pela Speculum: ecógrafo de imagem geral e saúde da mulher, com Crystal Architecture™, quantificação hepática EzHRI™, TAI™ e TSI™, medições com IA e CrystalVue Flow™.',
		heroi: U('7116a24d-f745-41e1-bf17-166ac3da7397'),
		numeros: [
			['14”', 'Ecrã tátil inclinável'],
			['5', 'Órgãos medidos com IA: rim, baço, bexiga, próstata e intestino'],
			['3', 'Ferramentas de quantificação hepática: EzHRI™, TAI™ e TSI™']
		],
		catalogos: [
			['Ginecologia e Obstetrícia', CAT + 'V8_Catalog_Ob_Gyn_210917_spread-20230725-104344.pdf'],
			['Cardiovascular', CAT + 'V8_Catalog_CV_210914_spread-20230725-103233.pdf']
		],
		tecnologia: {
			titulo: 'Imagem de excelência para decisões seguras.',
			lead: 'A Crystal Architecture™ junta o CrystalBeam™ e o CrystalLive™ à tecnologia S-Vue Transducer™: processamento 2D melhorado, renderização 3D e sinal de cor detalhado.',
			pontos: [
				['onda', 'CrystalBeam™', 'Formação de feixe que melhora a resolução e a uniformidade da imagem.'],
				['camadas', 'CrystalLive™', 'Motor de imagem com 2D, 3D e cor mais apurados, também nos casos complexos.'],
				['brilho', 'Live Q-Scan', 'Ajusta em tempo real o brilho e a uniformidade da imagem a cada órgão e região.']
			],
			imagem: [L('v8/samsung-v8-crystal-architecture.jpg'), 'Diagrama da Crystal Architecture™: CrystalBeam™, CrystalLive™ e S-Vue Transducer™']
		},
		ferramentas: {
			titulo: 'Ferramentas Intelligent Assist',
			lead: 'Funções automáticas que ajudam a decidir com mais segurança e a fazer mais exames.',
			cartoes: [
				['Abdómen', 'Fígado', U('9c1bdcac-c182-428a-8f61-2e3bb83be748'), 'EzHRI™, TAI™ e TSI™', 'Quantificam a esteatose hepática em tempo real, para avaliações clínicas mais rigorosas.'],
				['Abdómen e urologia', 'IA', U('1a2ab75d-d3ed-4267-a42a-8dacc6f26a99'), 'Medições com IA', 'Mede rim, baço, bexiga, próstata e intestino com Deep Learning, reduzindo a variabilidade entre utilizadores.'],
				['Coração fetal', '3D', H('usa-samsung-wh-v8-crystal-heart-view.jpg'), 'CrystalVue Flow™', 'Junta anatomia e hemodinâmica numa só imagem renderizada do coração fetal.'],
				['Obstetrícia', 'IA', H('usa-samsung-wh-v8-view-assist-heart.jpg'), 'ViewAssist™', 'Reconhece os planos de imagem e identifica a anatomia automaticamente.'],
				['Imagem', 'Auto', U('dcbb053d-d8b7-47e7-9487-1a12fd6d3022'), 'EzStructure™ e EzFlow™', 'Otimizam a imagem 2D, a cor e o Doppler pulsado com um só clique.'],
				['3D', 'Toque', H('usa-samsung-wh-v8-touch-gesture.jpg'), 'Gestos no ecrã tátil', 'Rodar, ampliar e recortar volumes 3D diretamente no ecrã tátil.']
			],
			nota: OPCIONAL
		},
		blocos: [
			{
				id: 'fluxo', menu: 'Fluxo de trabalho', tom: 'claro',
				titulo: 'Um fluxo de trabalho redesenhado.',
				lead: 'Funções práticas e soluções colaborativas que reduzem várias tarefas a poucos passos.',
				cartoes: [
					[U('c75ab9ae-bdf4-44df-842b-1742339e8e9d'), 'SonoSync™', 'Partilha de imagem em tempo real com PC ou smartphone. Não é uma função de diagnóstico.'],
					[U('5a2463cb-2cbc-4289-9ae8-c85ef8b81db2'), 'EzExam+™', 'Protocolos predefinidos para os exames de rotina do serviço.'],
					[U('6daa08ed-8c13-4896-92ee-cd3c9391540b'), 'EzCompare™', 'Compara lado a lado o exame anterior e o atual, com as mesmas definições.'],
					[U('dd6497bd-76ff-46d6-b308-a5985fc898e4'), 'Vista expandida', 'Imagens e cines ampliados na proporção que preferir.'],
					[U('833fbf8a-0514-45ac-9574-5a84c905e327'), 'QuickPreset', 'Combinações de sonda e preset num só toque.'],
					[U('2e088216-6793-471d-a120-d1c0bbaf1483'), 'RIS Browser', 'Acesso ao RIS no próprio ecógrafo.', 'transform: scale(2); transform-origin: 1.5% 36%']
				]
			},
			{
				id: 'design', menu: 'Design', tom: 'escuro',
				titulo: 'Produtividade em cada detalhe.',
				lead: 'Um desenho ergonómico que tira partido do espaço de trabalho.',
				cartoes: [
					[U('ac2bddd7-3178-4cdc-99e6-e67aac23201b'), 'Ecrã tátil de 14”', 'Inclinável, para qualquer ambiente de exame.'],
					[U('33c66316-28ea-48ad-b234-293a8824dff5'), 'Botões programáveis', 'Funções à volta do trackball adaptadas a cada exame.'],
					[U('f8cf12fc-c04e-4ed6-8721-e6694fe3dad6'), 'QuickSave', 'Grava imagens diretamente numa pen USB durante o exame.'],
					[U('a9a2e5fe-7e4f-4d06-9918-87f898a3eac7'), 'BatteryAssist™', 'Exames sem corrente e mudança de sala sem desligar.'],
					[U('e9d504a8-edd9-47a4-8b87-cce6a7ff6a66'), 'Arrefecimento eficaz', 'Menos calor e menos ruído de ventoinha.'],
					[U('e8cfbb0d-8da4-49ee-87ba-7f75779b478e'), 'Materiais reciclados', 'Resina ecológica na cobertura das grelhas de ventilação.']
				]
			}
		]
	},

	/* ===================================================================== V7 */
	{
		ficheiro: 'samsung-v7.html',
		nome: 'V7',
		curto: 'V7',
		area: 'Imagem Geral · Ginecologia e Obstetrícia',
		frase: 'Tudo o que precisa, ao seu alcance.',
		lead: 'Ferramentas para casos diversos e exigentes, no sítio certo, e imagem 2D e Doppler a cores de grande qualidade para exames direcionados.',
		descricao: 'Samsung V7 em Portugal pela Speculum: ecógrafo de imagem geral e saúde da mulher, com Crystal Architecture™, S-Shearwave Imaging™, MV-Flow™, CrystalVue Flow™ e BiometryAssist™.',
		heroi: U('fc03a32c-9f13-4f52-97e8-9a1ac3006e42'),
		numeros: [],
		catalogos: [
			['Ginecologia e Obstetrícia', CAT + 'V7%20catalog%20v1.03_OBGyn_230125-20230725-110916.pdf'],
			['Imagem Geral', CAT + 'V7%20catalog%20v1.03_GI_230125-20230725-111103.pdf']
		],
		tecnologia: {
			titulo: 'Qualidade de imagem que dá confiança ao diagnóstico.',
			lead: 'A Crystal Architecture™ combina processamento 2D melhorado com sinal de cor detalhado para otimizar e refinar cada imagem.',
			pontos: [
				['camadas', 'Crystal Architecture™', 'Imagem nítida e de alta resolução para um diagnóstico seguro em casos complexos.'],
				['fluxo', 'MV-Flow™', 'Mostra o fluxo microvascular lento com detalhe.'],
				['coracao', 'CrystalVue Flow™', 'Estruturas cardíacas fetais e fluxo sanguíneo numa só vista renderizada.']
			],
			imagem: [U('c768ced9-3d51-4401-95fe-ebf4766e2881'), 'Imagem clínica do V7']
		},
		ferramentas: {
			titulo: 'Diagnóstico com rigor e precisão',
			lead: 'Funções avançadas e uma interface simples que melhoram a rotina diária de ecografia.',
			cartoes: [
				['Elastografia', 'SWE', U('80f69d3a-b2f3-444a-b9fa-671e928c8426'), 'S-Shearwave Imaging™', 'Avaliação não invasiva da rigidez dos tecidos, com elastograma a cores e medições quantitativas.'],
				['Obstetrícia', 'IA', H('usa-samsung-wh-v7-biometry-assist.jpg'), 'BiometryAssist™', 'Biometria fetal semiautomática, mais rápida e consistente.'],
				['Ginecologia', 'IA', H('usa-samsung-wh-v6-uterine-assist.jpg'), 'UterineAssist™', 'Mede o tamanho e a forma do útero com Deep Learning, ajudando a detetar alterações.'],
				['Microvascularização', 'Fluxo', H('usa-samsung-wh-v7-mv-flow.jpg'), 'MV-Flow™', 'Fluxo lento e microcirculação visíveis com cor e resolução.'],
				['Coração fetal', '3D', H('usa-samsung-wh-v7-crystal-flow.jpg'), 'CrystalVue Flow™', 'Anatomia e hemodinâmica do coração fetal numa só imagem.'],
				['Partilha', 'QR', H('usa-samsung-wh-v7-hello-mom.jpg'), 'Mobile Export', 'Envia imagens fetais para o telemóvel da grávida através de um código QR.']
			],
			nota: OPCIONAL
		},
		blocos: [
			{
				id: 'fluxo', menu: 'Fluxo de trabalho', tom: 'claro',
				titulo: 'Um fluxo de trabalho mais simples.',
				lead: 'Menos passos e menos teclas, com os dados do exame apresentados de forma clara.',
				cartoes: [
					[U('c75ab9ae-bdf4-44df-842b-1742339e8e9d'), 'SonoSync™', 'Partilha de imagem em tempo real com PC ou smartphone. Não é uma função de diagnóstico.'],
					[U('ff1af564-88be-452e-84cb-0f3d2342f9aa'), 'EzExam+™', 'Protocolos predefinidos para que nenhum passo fique por fazer.'],
					[U('4794bcd6-cb17-423b-ba60-215ebf1c9de5'), 'Vista expandida', 'Imagens e cines ampliados na proporção que preferir.'],
					[U('eddd3bb3-5347-442f-b584-9f41f8e6131d'), 'TouchEdit', 'Funções mais usadas na primeira página do ecrã tátil.'],
					[U('f59dc93f-0afc-4115-a7ed-943ed90fc296'), 'QuickPreset', 'Combinações de sonda e preset num só clique.'],
					[U('2f8a66ce-96d0-4ba3-878f-6c62c93c0557'), 'RIS Browser', 'Acesso ao RIS no próprio ecógrafo.', 'transform: scale(2); transform-origin: 1.5% 36%']
				]
			},
			{
				id: 'design', menu: 'Design', tom: 'escuro',
				titulo: 'Pensado para o dia inteiro de trabalho.',
				lead: 'Produtividade e conforto nos detalhes do sistema.',
				cartoes: [
					[U('2d7fadff-4c4f-4181-9c9e-c74999c2c68a'), 'Botões programáveis', 'Funções à volta do trackball à medida de cada exame.'],
					[U('6482614e-9f0e-47e3-9bde-7a80b5a9562f'), 'QuickSave', 'Grava imagens diretamente numa pen USB.'],
					[U('06204213-bd00-4cd3-bfc5-0e69d8e649ba'), 'BatteryAssist™', 'Exames sem corrente e mudança de sala sem desligar.'],
					[U('0e00adbe-4216-41ea-a5b0-3ac36d38c571'), 'Arrefecimento eficaz', 'Menos calor e menos ruído de ventoinha.'],
					[U('89c6a42a-490d-43ce-b6f4-6c76516b0ed8'), 'Materiais reciclados', 'Resina ecológica na cobertura das grelhas de ventilação.']
				]
			}
		]
	},

	/* ===================================================================== V6 */
	{
		ficheiro: 'samsung-v6.html',
		nome: 'V6',
		curto: 'V6',
		area: 'Imagem Geral · Ginecologia e Obstetrícia',
		frase: 'Inspira o seu dia a dia.',
		lead: 'Um sistema simples de usar, pensado para aliviar a carga de trabalho, com bateria integrada e a eficiência de que precisa na ecografia de todos os dias.',
		descricao: 'Samsung V6 em Portugal pela Speculum: ecógrafo de imagem geral e saúde da mulher, com Crystal Architecture™, S-Shearwave Imaging™, BiometryAssist™, UterineAssist™ e BatteryAssist™.',
		heroi: U('d729761b-75ea-4ccd-a85e-9f515a9c21ad'),
		numeros: [
			['3×', 'Mais tempo de exame a bateria do que o modelo anterior, HS60']
		],
		catalogos: [
			['Ginecologia e Obstetrícia', CAT + 'V6%20catalog%20OBGYN_230725-20230725-113222.pdf'],
			['Imagem Geral', CAT + 'V6%20catalog%20GI_230725-20230725-113118.pdf']
		],
		tecnologia: {
			titulo: 'Desempenho de imagem que eleva a confiança.',
			lead: 'Imagem 2D e Doppler a cores de grande qualidade para a imagem geral, com o motor Crystal Architecture™.',
			pontos: [
				['camadas', 'Crystal Architecture™', 'Processamento 2D e de cor apurado para imagens claras e rigorosas.'],
				['olho', 'ClearVision', 'Reduz o speckle e realça o contraste para imagens mais nítidas.'],
				['fluxo', 'LumiFlow™', 'Fluxo a cores com aspeto tridimensional, para melhor perceção espacial.']
			],
			imagem: [U('a1923931-67a8-4999-8d1e-8a856aba3a56'), 'Imagem clínica do V6']
		},
		ferramentas: {
			titulo: 'Ferramentas completas para o diagnóstico diário',
			lead: 'Automatização que facilita o trabalho e dá resultados fiáveis.',
			cartoes: [
				['Elastografia', 'SWE', U('10120978-4aa1-44df-b32e-51e03778d43e'), 'S-Shearwave Imaging™', 'Avaliação não invasiva da rigidez dos tecidos, com elastograma a cores e medições quantitativas.'],
				['Obstetrícia', 'IA', H('usa-samsung-wh-v6-biometry-assist.jpg'), 'BiometryAssist™', 'Biometria fetal num só clique, com resultados consistentes.'],
				['Obstetrícia', 'IA', H('usa-samsung-wh-v6-1-view-assist.jpg'), 'ViewAssist™', 'Reconhece a anatomia e os planos de imagem com IA.'],
				['Ginecologia', 'IA', H('usa-samsung-wh-v6-uterine-assist.jpg'), 'UterineAssist™', 'Avaliação automática do tamanho e da forma do útero.']
			],
			nota: OPCIONAL
		},
		blocos: [
			{
				id: 'fluxo', menu: 'Fluxo de trabalho', tom: 'claro',
				titulo: 'Simples, do início ao fim do exame.',
				lead: 'Tarefas complexas reduzidas a poucos passos.',
				cartoes: [
					[U('c75ab9ae-bdf4-44df-842b-1742339e8e9d'), 'SonoSync™', 'Partilha de imagem em tempo real com PC ou smartphone.'],
					[U('77255328-0a0d-4900-a6ef-c5675227cac2'), 'EzExam+™', 'Protocolos predefinidos para os exames de rotina.'],
					[U('3fc84703-1c08-4314-9e25-0790c92457d9'), 'EzCompare™', 'Exame anterior e atual lado a lado, com as mesmas definições.'],
					[U('710e2680-cfb4-4147-9f29-9f11e287546f'), 'Vista expandida', 'Imagens e cines ampliados na proporção que preferir.'],
					[U('820309d9-cc26-4b72-8e69-4bc43e6faf7e'), 'QuickPreset', 'Combinações de sonda e preset num só toque.'],
					[U('6aee069e-9ac2-40f9-9627-5de1af508005'), 'TouchEdit', 'Funções mais usadas na primeira página do ecrã tátil.']
				]
			},
			{
				id: 'design', menu: 'Design', tom: 'escuro',
				titulo: 'Produtividade, com bateria incluída.',
				lead: 'Detalhes que tornam o sistema mais prático no dia a dia.',
				cartoes: [
					[U('02bced53-a224-4c7c-8bf3-93ab9ca1fd1c'), 'BatteryAssist™', 'Cerca de 3 vezes mais tempo de exame sem corrente do que o HS60, o modelo anterior.'],
					[U('e8050b26-0c03-4421-84b9-c094f50db40f'), 'Botões programáveis', 'Funções à volta do trackball à medida de cada exame.'],
					[U('7370f28c-6d40-42ff-9d6a-5b0eaeb873ce'), 'Exportação por USB', 'Imagens e cines diretamente para uma pen USB.'],
					[U('5942d696-b289-437d-adda-c98215a12c30'), 'Arrefecimento eficaz', 'Menos calor e menos ruído de ventoinha.'],
					[U('d9fdd561-8ae7-42b2-afba-59c170dfd22c'), 'Materiais reciclados', 'Resina ecológica na cobertura das grelhas de ventilação.']
				]
			}
		]
	},

	/* ===================================================================== V5 */
	{
		ficheiro: 'samsung-v5.html',
		nome: 'V5',
		curto: 'V5',
		area: 'Imagem Geral · Ginecologia e Obstetrícia',
		frase: 'Do essencial ao extraordinário.',
		lead: 'Fino e compacto, sem abdicar de potência: o V5 junta imagem nítida, ferramentas de IA e mobilidade para a ecografia de todos os dias, da imagem geral à saúde da mulher.',
		descricao: 'Samsung V5 em Portugal pela Speculum: ecógrafo compacto de imagem geral e saúde da mulher, com S-Vue Transducer™, MV-Flow™, S-Shearwave Imaging™, BiometryAssist™ e 5D Follicle™.',
		heroi: U('7c7250d3-93d7-42c6-81de-1aef3944c8fb'),
		numeros: [],
		catalogos: [['Catálogo', CAT + 'V5_Catalog_All_0911-2-20251104-094631.pdf']],
		tecnologia: {
			titulo: 'Imagens nítidas, em formato compacto.',
			lead: 'Pensado para apoiar a imagem geral, cardiovascular, musculoesquelética e de saúde da mulher, com tecnologias de imagem que vêm dos sistemas superiores.',
			pontos: [
				['sonda', 'S-Vue Transducer™', 'Cristal único com maior largura de banda: mais penetração e mais resolução.'],
				['olho', 'ClearVision', 'Menos speckle e mais contraste, para imagens mais nítidas.'],
				['fluxo', 'MV-Flow™', 'Deteta fluxo microvascular muito lento, sem artefactos.'],
				['coracao', 'LumiFlow™', 'Fluxo a cores com aspeto tridimensional, para melhor perceção espacial.']
			],
			imagem: [U('0356a36d-c244-4564-a45c-d1d0caf3dd58'), 'Imagem clínica do V5 com MV-Flow™']
		},
		ferramentas: {
			titulo: 'IA para a rotina de saúde da mulher',
			lead: 'Medições e classificações automáticas que tornam o exame mais rápido e consistente.',
			cartoes: [
				['Elastografia', 'SWE', U('d440534c-5758-4f6e-92bf-bf897b6a8b54'), 'S-Shearwave Imaging™', 'Avalia de forma não invasiva a rigidez de tecidos e lesões, por exemplo na mama e no fígado.'],
				['Obstetrícia', 'IA', H('usa-samsung-wh-v5-carousel-BiometryAssist-25-Wk-Fetal-Head.jpg'), 'BiometryAssist™', 'Biometria fetal semiautomática, mais rápida e consistente.'],
				['Obstetrícia', 'IA', H('usa-samsung-wh-v5-carousel-ViewAssist-20-Wk-Fetal-Abdomen.jpg'), 'ViewAssist™', 'Reconhece os planos de imagem e identifica a anatomia fetal.'],
				['Ginecologia', 'IA', H('usa-samsung-wh-v5-carousel-UterineAssist.jpg'), 'UterineAssist™', 'Mede o tamanho e a forma do útero automaticamente.'],
				['Fertilidade', '3D', H('usa-samsung-wh-v5-carousel-5D-Follicle.jpg'), '5D Follicle™', 'Identifica e mede vários folículos ováricos a partir de um volume 3D.'],
				['Fertilidade', '2D', H('usa-samsung-wh-v5-carousel-2D-Follicle.jpg'), '2D Follicle™', 'Medição de folículos ováricos em 2D.']
			],
			nota: OPCIONAL
		},
		blocos: [
			{
				id: 'imagem-3d', menu: 'Imagem 3D', tom: 'claro',
				titulo: 'Anatomia em profundidade.',
				lead: 'Renderização 3D e transparência ajustável para ver mais detalhe anatómico.',
				cartoes: [
					[H('usa-samsung-wh-v5-realisticvue.jpg'), 'RealisticVue™', 'Anatomia 3D em alta resolução, com profundidade e definição realistas.'],
					[H('usa-samsung-wh-v5-crystalvue.jpg'), 'CrystalVue™', 'Ajusta a transparência para revelar mais profundidade e detalhe.'],
					[H('usa-samsung-wh-v5-lumiflow.jpg'), 'LumiFlow™', 'Fluxo a cores com aspeto tridimensional.']
				]
			},
			{
				id: 'fluxo', menu: 'Fluxo de trabalho', tom: 'escuro',
				titulo: 'Mais eficiência no dia a dia.',
				lead: 'Fluxo de trabalho avançado, acesso remoto, ecrã maior e uma estrutura compacta e robusta com bateria.',
				cartoes: [
					[U('c75ab9ae-bdf4-44df-842b-1742339e8e9d'), 'SonoSync™', 'Partilha de imagem em tempo real, com chat, videoconferência e marcações.'],
					[U('a1acdb05-f6c4-44c8-b6e3-d1f348e7193b'), 'Vista expandida', 'Imagens e cines ampliados na proporção que preferir.'],
					[U('0fb88de4-9543-4680-a06f-01505b905a90'), 'BatteryAssist™', 'Continua a examinar sem corrente e muda de sala sem desligar.'],
					[U('1c108177-801a-4518-962c-bd250ac412fd'), 'EzExam+™', 'Protocolos predefinidos para que nenhum passo fique por fazer.']
				]
			}
		]
	},

	/* ===================================================================== HERA W10 ELITE */
	{
		ficheiro: 'samsung-hera-w10-elite.html',
		nome: 'HERA W10 Elite',
		curto: 'HERA W10 Elite',
		area: 'Ginecologia e Obstetrícia',
		frase: 'Uma mudança visionária.',
		lead: 'IA integrada para a saúde da mulher: análise automática do crescimento fetal e relatórios completos, que reforçam a confiança clínica e agilizam o fluxo de trabalho.',
		descricao: 'Samsung HERA W10 Elite em Portugal pela Speculum: ecógrafo de saúde da mulher com Crystal Architecture™, HeartAssist™, ViewAssist™, BiometryAssist™, 5D CNS+™ e monitor OLED de 27".',
		heroi: U('4d83688c-965a-4fd2-b61b-54a50c63ac7d'),
		numeros: [
			['27”', 'Monitor OLED'],
			['57%', 'Monitor maior do que o do HERA W10'],
			['44', 'Medições cardíacas fetais automáticas com HeartAssist™'],
			['63%', 'Arranque mais rápido a partir do modo MobileSleep']
		],
		catalogos: [['Catálogo', CAT + 'HERA%20W10%20Elite%20V1.03_Catalog_CE_230309_link-compactado-20230724-045600.pdf']],
		tecnologia: {
			titulo: 'Imagem redefinida pela Crystal Architecture™.',
			lead: 'O CrystalBeam™ e o CrystalLive™, assentes na tecnologia S-Vue Transducer™, dão imagens claras e uniformes, com 2D melhorado, renderização 3D avançada e sinal de cor detalhado.',
			pontos: [
				['onda', 'CrystalBeam™', 'Transmissão de forma de onda arbitrária, formação de feixe paralela e abertura sintética: mais imagens por segundo e imagem mais uniforme.'],
				['camadas', 'CrystalLive™', 'Motor de imagem com 2D, 3D e cor mais apurados nos casos complexos.'],
				['sonda', 'Sonda volumétrica de banda larga', 'Imagem 3D/4D com a sonda CV1-8A.']
			],
			imagem: [H('usa-WH-HERA%20W10_Clinical%20Images_Fetal%20Abd%20Vasc-MV-Flow%203D.jpg'), 'Vascularização abdominal fetal com MV-Flow™ em 3D, imagem clínica do HERA W10 Elite']
		},
		ferramentas: {
			titulo: 'Um sistema de diagnóstico elevado pela IA',
			lead: 'Ferramentas automáticas para o crescimento fetal, o coração, o cérebro e a ginecologia.',
			cartoes: [
				['Coração fetal', 'IA', H('usa-WH-HERA%20W10_Elevated%20Diagnostic%20System_Fetal%20Heart-HeartAssist.jpg'), 'HeartAssist™', '44 medições cardíacas automáticas, 31 anotações e cálculo de Z-Score.'],
				['Morfologia fetal', 'IA', H('usa-WH-w10-Automated%20image%20classification.jpg'), 'ViewAssist™', 'Reconhece os planos, identifica a anatomia e apresenta a biometria fetal.'],
				['Biometria', 'IA', H('usa-WH-w10-Automated%20fetal%20biometry.jpg'), 'BiometryAssist™', 'Medições de crescimento fetal num só clique, com consistência.'],
				['Cérebro fetal', '5D', H('usa-WH-HERA%20W10_Clinical%20Images_Fetal%20Brain-5D%20CNS.jpg'), '5D CNS+™', '9 planos e 6 medições do cérebro fetal, automaticamente.'],
				['Ginecologia', 'IA', H('usa-WH-w10-Uterine%20cornal%20plane.jpg'), 'UterineContour™', 'Extrai o plano coronal do útero num clique, ajudando a identificar malformações.'],
				['Fertilidade', '3D', H('usa-WH-HERA%20W10_Elevated%20Diagnostic%20System_Stimulated%20Ovary-5D%20Follicle.jpg'), '5D Follicle™', 'Identifica e mede vários folículos a partir de um volume 3D.'],
				['Coração fetal', '5D', H('usa-WH-HERA%20W10_Elevated%20Diagnostic%20System_Fetal%20Heart-5D%20Heart%20Color.jpg'), '5D Heart Color™', 'A partir de dados STIC, identifica 9 planos cardíacos padrão, segundo as orientações da AIUM.'],
				['Peso fetal', '5D', H('usa-WH-HERA%20W10_Elevated%20Diagnostic%20System_Fetal%20Thigh-5D%20Limb%20Vol.jpg'), '5D Limb Vol.™', 'Mede o volume do braço ou da coxa para estimar o peso fetal.'],
				['Coração fetal', 'MPI', H('usa-WH-w10-Semi-automated%20Myocardial.jpg'), 'MPI+™', 'Índice de desempenho miocárdico dos dois ventrículos, de forma semiautomática.']
			],
			nota: OPCIONAL
		},
		blocos: [
			{
				id: 'fluxo', menu: 'Fluxo de trabalho', tom: 'claro',
				titulo: 'Colaboração em tempo real, à sua maneira.',
				lead: 'Menos teclas, várias ações numa só e definições personalizadas por protocolo.',
				cartoes: [
					[U('c75ab9ae-bdf4-44df-842b-1742339e8e9d'), 'SonoSync™', 'Partilha de imagem em tempo real com PC ou smartphone. Não é uma função de diagnóstico.'],
					[U('240d084b-9ae4-43da-9c51-f603da19f519'), 'HelloMom™', 'Imagens fetais para o telemóvel da família através de um código QR, sem instalar aplicações.'],
					[U('970b1cc0-ded1-4df3-9db0-01acb85e0c62'), 'Monitor OLED de 27”', '57% maior do que o do HERA W10, com pretos reais.', 'transform: scale(2.44); transform-origin: 90.7% 6.8%'],
					[U('efd44ddf-d7f8-4ec8-ae97-59e81604b2bf'), 'QuickPreset', 'Combinações de sonda e preset num só toque.'],
					[U('a52a39b8-70cc-4a5b-b2fa-57a6d8aca9fa'), 'TouchGesture', 'Rodar, ampliar, recortar e mover volumes 3D no ecrã tátil.'],
					[U('326a9e9c-ed74-4a72-b9be-707a14899f02'), 'Botões contextuais', 'As funções de cada exame atribuídas aos botões do painel.']
				]
			},
			{
				id: 'design', menu: 'Design', tom: 'escuro',
				titulo: 'Ergodinâmica para o seu conforto.',
				lead: 'O tema FreeForm™ reduz deslocações à volta do doente, com um painel de grande amplitude e espaço para as pernas.',
				cartoes: [
					[U('9b816e1b-5632-48f7-b516-4f219f2bc318'), 'FreeForm™', 'Painel com grande amplitude de movimento, pensado para o alcance do braço.'],
					[U('73b9c11a-3ce3-4fa4-9fb9-b2d923173a13'), 'Suporte de sondas', 'Sondas arrumadas e à mão.'],
					[U('1b3083aa-cde2-43de-9e54-481997466cea'), 'Gestão de cabos', 'Cabos organizados durante o exame.'],
					[U('8d59f0b3-ffe5-43d1-ba30-716113a8a2a6'), 'Iluminação de apoio', 'Visibilidade em salas escuras.'],
					[L('hera-w10-elite/samsung-hera-w10-elite-mobilesleep.jpg'), 'MobileSleep', 'Arranque cerca de 63% mais rápido do que um arranque normal.']
				]
			}
		]
	},

	/* ===================================================================== HS40 */
	{
		ficheiro: 'samsung-hs40.html',
		nome: 'HS40',
		curto: 'HS40',
		area: 'Imagem Geral · Ginecologia e Obstetrícia',
		frase: 'Eficiência para o dia a dia.',
		lead: 'Imagem clara com as tecnologias avançadas da Samsung e um desenho inspirado nas sugestões dos utilizadores, distinguido com o iF Design Award 2017.',
		descricao: 'Samsung HS40 em Portugal pela Speculum: ecógrafo de imagem geral e saúde da mulher, com ClearVision, S-Harmonic™, BiometryAssist™, LaborAssist™, monitor de 21,5" e braço articulado.',
		heroi: U('dc77ce2b-e4a3-4045-a9cc-a5ba9ef5a44b'),
		numeros: [
			['21,5”', 'Monitor LCD com retroiluminação LED'],
			['10,1”', 'Ecrã tátil inclinável'],
			['2017', 'iF Design Award']
		],
		catalogos: [
			['Imagem Geral', CAT + 'HS40_V1.02_GI_CE%20mark_200129_spread-20230731-104018.pdf'],
			['Ginecologia e Obstetrícia', CAT + 'HS40_V1.02_OB_CE%20mark_200129_spread-20230731-105324.pdf']
		],
		tecnologia: {
			titulo: 'Qualidade de imagem extraordinária.',
			lead: 'Com o motor CrystalLive™ e filtros de imagem avançados, as decisões clínicas ganham confiança.',
			pontos: [
				['olho', 'ClearVision', 'Filtro de redução de ruído que define melhor os contornos e dá imagens 2D mais nítidas.'],
				['onda', 'S-Harmonic™', 'Menos ruído, mais contraste e imagem uniforme em toda a área.'],
				['camadas', 'MultiVision', 'Combina várias linhas de varrimento para melhor resolução e menos artefactos.']
			],
			imagem: [U('6fb51191-b5a5-44a5-89ba-045add3ce66e'), 'Comparação de imagem 2D com e sem ClearVision no HS40']
		},
		ferramentas: {
			titulo: 'Ferramentas que eram exclusivas dos sistemas premium',
			lead: 'Funções avançadas a preço acessível para obstetrícia, ginecologia, vascular, cardíaco, musculoesquelético e pequenas partes.',
			cartoes: [
				['Obstetrícia', 'IA', H('usa-samsung-wh-v7-biometry-assist.jpg'), 'BiometryAssist™', 'Biometria fetal semiautomática, mais rápida e rigorosa.'],
				['Ginecologia', 'IA', H('usa-samsung-wh-hs40-uterine-assist.jpg'), 'UterineAssist™', 'Mede automaticamente o tamanho e a forma do útero.'],
				['Sala de partos', 'AoP', H('usa-samsung-wh-hs40-labor-assist.jpg'), 'LaborAssist™', 'Mede o ângulo de progressão e a direção da cabeça fetal, segundo as orientações da ISUOG.'],
				['1.º trimestre', '3D', H('3_2.%20CrystalVue_2-1.jpg'), 'CrystalVue™', 'Renderização 3D que realça contornos e estruturas, aqui num feto do primeiro trimestre.'],
				['3D', 'Render', H('usa-samsung-wh-hs40-realistic-view.jpg'), 'RealisticVue™', 'Anatomia 3D em alta resolução, com luz ajustável e sombras graduais.'],
				['Fertilidade', 'Auto', H('2D_Follicle.png'), '2D Follicle™', 'Medição de folículos ováricos em 2D.']
			],
			nota: OPCIONAL
		},
		blocos: [
			{
				id: 'fluxo', menu: 'Fluxo de trabalho', tom: 'claro',
				titulo: 'Um fluxo de trabalho organizado.',
				lead: 'Protocolos, presets e partilha que poupam passos em cada exame.',
				cartoes: [
					[H('HS40%20QuickPreset.png'), 'QuickPreset', 'As combinações de sonda e preset mais usadas num só toque.'],
					[U('9438be25-9bc7-40ac-bf65-41750b466c99'), 'EzExam+™', 'Protocolos predefinidos que garantem o exame completo com menos teclas.'],
					[H('HS40_HelloMom%20Mobile%20Export.png'), 'HelloMom™', 'Imagens fetais para o telemóvel da grávida através de um código QR.'],
					[U('de5b762c-423b-4a0e-8ffe-febb993554de'), 'BatteryAssist™', 'Exames e deslocações sem corrente, e arranque rápido a partir do modo de repouso.']
				]
			},
			{
				id: 'design', menu: 'Design', tom: 'escuro',
				titulo: 'Desenhado com quem o usa.',
				lead: 'Braço do monitor articulado, painel ajustável em altura e arrumação extra para um ambiente de trabalho mais confortável.',
				cartoes: [
					[U('20aa6fbd-f4a6-4e60-8af1-2542c1730d06'), 'Braço articulado', 'Grande amplitude de movimento do monitor.'],
					[U('1eb952e9-b1cd-4171-be23-cdfaf9cab4d3'), 'Painel ajustável em altura', 'Elevação a gás, suave e sem esforço.'],
					[U('fa5a5427-64eb-4704-a9cf-302dae6a24d4'), 'Suporte de sonda endocavitária', 'Montagem estável para exames ginecológicos.'],
					[U('1b13f2a7-6390-455e-83ba-08a2f2aa560a'), 'Aquecedor de gel', 'Dois níveis de temperatura ajustáveis.'],
					[U('e8d5ac6a-d937-4b07-b612-7a4772ef87ef'), 'Arrumação lateral', 'Espaço para tablet, processos clínicos e outros objetos.'],
					[U('33f1e00e-649a-4f7b-8778-a54f0f2b52e9'), 'Tabuleiro traseiro', 'Espaço extra para a sonda endocavitária e acessórios.']
				]
			}
		]
	},

	/* ===================================================================== HS30 */
	{
		ficheiro: 'samsung-hs30.html',
		nome: 'HS30',
		curto: 'HS30',
		area: 'Imagem Geral · Ginecologia e Obstetrícia',
		frase: 'O essencial, com valor.',
		lead: 'Imagem clara e ferramentas essenciais, com funções versáteis para os exames necessários e um desenho ergonómico que aumenta a produtividade.',
		descricao: 'Samsung HS30 em Portugal pela Speculum: ecógrafo de imagem geral e saúde da mulher, com ClearVision, ElastoScan™, EzAssist™ e monitor LED Full HD de 21,5".',
		heroi: U('ef9ce5c6-f45c-4c11-9fd3-6d774e4189b2'),
		numeros: [
			['21,5”', 'Monitor LED Full HD']
		],
		catalogos: [['Ficha do produto (PT)', 'https://www.speculum.pt/files/files/pdfs/SMS-HS3NN2X%20%20%20%20%20%20%20.pdf']],
		tecnologia: {
			titulo: 'Imagem clara, com ferramentas versáteis.',
			lead: 'O HS30 dá uma imagem limpa e reúne as ferramentas essenciais para os exames do dia a dia.',
			pontos: [
				['olho', 'ClearVision', 'Filtro de redução de ruído que realça os contornos e otimiza cada aplicação em tempo real.'],
				['camadas', 'ElastoScan™', 'Elastografia por deformação que mostra a rigidez relativa dos tecidos a cores.'],
				['toque', 'EzAssist™', 'Informação anatómica no ecrã para guiar o exame.']
			],
			// Fotografia larga com o ecógrafo à direita: corte em cover, encostado à direita e ao fundo.
			imagem: [U('e74cbbc1-b61c-43ae-9887-6c87c02aa5f2'), 'Ecógrafo Samsung HS30', '#f4f4f4', 'object-fit: cover; object-position: 90% 100%; aspect-ratio: 4 / 3']
		},
		ferramentas: {
			titulo: 'Ferramentas essenciais, imagem clara',
			lead: 'Tecnologias de imagem e de apoio ao exame que tornam o HS30 versátil.',
			cartoes: [
				['Imagem', '2D', U('4fd41e64-8de8-4115-add4-3eca2e724609'), 'ClearVision', 'Filtro de redução de ruído que realça os contornos e dá imagens 2D nítidas.'],
				['Elastografia', 'Strain', U('00b1faf7-5869-45c2-a9e0-495e03f23656'), 'ElastoScan™', 'Converte a rigidez relativa dos tecidos numa imagem a cores, ajudando a detetar massas sólidas.'],
				['Formação', 'Guia', U('821fc0bf-e5c3-4da5-9715-39a9755bd945'), 'EzAssist™', 'Mostra informação anatómica no ecrã para guiar o exame durante o varrimento.']
			],
			nota: OPCIONAL
		},
		blocos: [
			{
				id: 'design', menu: 'Design', tom: 'claro',
				titulo: 'Desenhado a pensar no utilizador.',
				lead: 'Detalhes práticos que tornam o trabalho diário mais confortável.',
				cartoes: [
					[U('b7a48825-d932-4c10-bf78-0b77fe5f4119'), 'Monitor LED de 21,5”', 'Full HD, com bom contraste, nitidez e cor.'],
					[U('abb67513-dc57-4033-b013-68295d9fd25c'), 'Teclado e Keyskin', 'Teclado de toque suave e capa que protege de contaminantes.'],
					[U('4f8c2446-1f02-4b48-922c-39b8e158cdbd'), 'Suportes de cabos', 'Dois suportes, um de cada lado, para cabos arrumados.'],
					[U('c7e29137-718a-4238-aed4-cd6d83b5b90e'), 'Aquecedor de gel', 'Dois níveis de temperatura ajustáveis.'],
					[U('435e12c8-ef99-4388-8fde-c4516070118f'), 'Bolsa lateral', 'Para tablet, processos clínicos e outros objetos.'],
					[U('dd5d790f-ed02-4860-a7ec-e606e54e6e51'), 'Tabuleiro traseiro', 'Espaço extra para a sonda endocavitária e acessórios.']
				]
			}
		]
	},

	/* ===================================================================== GAMA CV */
	{
		ficheiro: 'samsung-cv.html',
		nome: 'Gama CV',
		curto: 'CV7, CV6 e CV5',
		area: 'Cardiovascular',
		frase: 'CV7, CV6 e CV5 para cardiologia.',
		lead: 'Os sistemas cardiovasculares da Samsung juntam qualidade de imagem a uma interface simplificada pelas ferramentas Intelligent Assist, para avaliações cardíacas e vasculares com mais confiança.',
		descricao: 'Ecógrafos Samsung CV7, CV6 e CV5 em Portugal pela Speculum: sistemas cardiovasculares com Crystal Architecture™, HeartAssist™, Strain+, AutoEF, StressEcho, ArterialAnalysis™ e AutoIMT+.',
		heroi: U('86439e46-b39a-4b8d-b1d3-22089a0d3606'),
		numeros: [],
		catalogos: [],
		tecnologia: {
			titulo: 'Qualidade de imagem que dá confiança ao diagnóstico.',
			lead: 'A Crystal Architecture™ combina processamento 2D melhorado com sinal de cor detalhado, para que o foco fique no doente e não na manipulação do sistema.',
			pontos: [
				['camadas', 'Crystal Architecture™', 'Imagem nítida e de alta resolução nos exames de todos os dias.'],
				['coracao', 'Ferramentas semiautomáticas', 'Guiam o utilizador até um diagnóstico rigoroso.'],
				['toque', 'Interface simplificada', 'Funções inteligentes que melhoram a rotina de exames.']
			],
			imagem: [U('f2fb4440-9553-45a1-837f-ebf3219e5354'), 'Imagem cardíaca de um sistema cardiovascular Samsung']
		},
		ferramentas: {
			titulo: 'Ferramentas dedicadas à cardiologia',
			lead: 'Quantificação da função ventricular, ecocardiografia de sobrecarga e avaliação vascular.',
			cartoes: [
				['Ecocardiografia', 'IA', U('1f662e5b-9155-4305-af0a-f859929a6cf8'), 'HeartAssist™', 'Classifica as vistas cardíacas, escolhe as medições e apresenta os resultados.'],
				['Ventrículo esquerdo', 'Strain', U('35b8e52d-649a-4171-898f-803e966cd330'), 'Strain+', 'Mede a contractilidade global e segmentar do VE, com três vistas e Bull’s Eye num ecrã quádruplo.'],
				['Ventrículo esquerdo', 'FE', U('daf7f7b3-741d-4918-a1c3-de4afe2edff6'), 'AutoEF', 'Calcula a fração de ejeção a partir de três pontos do ventrículo esquerdo.'],
				['Sobrecarga', 'Eco', U('22dfc05c-7270-4615-8877-1a2fd7e34823'), 'StressEcho', 'Pontuação e relatório da contractilidade em protocolos de esforço, farmacológico, diastólico e programável.'],
				['Vascular', 'Carótida', U('cc9b6e03-2bb2-4d8e-952d-13ac260305e8'), 'ArterialAnalysis™', 'Rigidez, espessura íntima-média e velocidade da onda de pulso da carótida comum.'],
				['Vascular', 'IMT', U('962574a4-5c37-452d-a2b3-126560f85f22'), 'AutoIMT+', 'Espessura íntima-média das paredes anterior e posterior da carótida, num clique.']
			],
			nota: 'Conteúdo da linha cardiovascular da Samsung; as ferramentas disponíveis variam entre o CV7, o CV6 e o CV5 e consoante as opções escolhidas.'
		},
		blocos: [
			{
				id: 'fluxo', menu: 'Fluxo de trabalho', tom: 'claro',
				titulo: 'Um fluxo de trabalho redesenhado.',
				lead: 'Menos teclas, várias ações numa só e definições por protocolo para um exame mais simples.',
				cartoes: [
					[U('93536b14-0609-436c-ab17-ffa262b0584a'), 'EzExam+™', 'Protocolos predefinidos para os exames de rotina.'],
					[U('899f1448-9494-473b-92cb-df339246813b'), 'EzCompare™', 'Exame anterior e atual lado a lado, com as mesmas definições.'],
					[U('d6fc96ea-85d5-4ed3-b230-33bee7b28d35'), 'Vista expandida', 'Imagens e cines ampliados na proporção que preferir.'],
					[U('4dd4a8ad-b79a-4334-83d3-694e084e28ab'), 'QuickPreset', 'Combinações de sonda e preset num só clique.'],
					[U('eab87116-b1ad-4f70-b67c-6f5abe010f40'), 'TouchEdit', 'Funções mais usadas na primeira página do ecrã tátil.'],
					[U('c75ab9ae-bdf4-44df-842b-1742339e8e9d'), 'SonoSync™', 'Partilha de imagem em tempo real, voz e controlo remoto entre locais.']
				]
			},
			{
				id: 'design', menu: 'Design', tom: 'escuro',
				titulo: 'Pronto para o ritmo do serviço.',
				lead: 'Ecrã ajustável, bateria e botões programáveis.',
				cartoes: [
					[U('d3581392-9625-4cc9-b404-971d83e97ec3'), 'Ecrã tátil inclinável', 'Ajusta-se ao ângulo de visão de cada utilizador.'],
					[U('03b6a20f-9880-4a8b-9588-b651f3dfcc27'), 'BatteryAssist™', 'Exames quando a corrente falha temporariamente.'],
					[U('2169d32e-f7b4-45d1-8618-299ca336bec6'), 'Botões contextuais', 'Funções mais usadas junto ao trackball.']
				]
			}
		]
	}
];
