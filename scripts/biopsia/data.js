// Imagens '@1-535-…' (todas as guias Aspen, endocavitárias e convexas/lineares): site oficial da Aspen Surgical (fabricante), aspensurgical.com/Product/1-535-xxxx,
// guardadas em images/products/biopsia/. Imagens 'leapmed-…': site oficial da Leapmed (www.leapmed.com),
// as mesmas que a página antiga carregava de lá por http.
// Dados extraídos de https://www.speculum.pt/biopsia.html (novembro de 2026), revistos para pt-PT.
const P = 'https://www.speculum.pt/pt/produtos/';
const IMG = 'https://www.speculum.pt/images/';

const D0 = 'Só a guia de biópsia descartável';
const L35 = 'Guia + protetor de sonda em látex 3,5 × 20 cm, gel estéril e elásticos';
const L26 = 'Guia + protetor de sonda em látex 2,6 × 20 cm, gel estéril e elásticos';
const L20 = 'Guia + protetor de sonda em látex 2,0 × 20 cm, gel estéril e elásticos';
const S4 = 'Guia + protetor de sonda macio 4"–1,25" × 12", gel estéril e elásticos';
const S52 = 'Guia + protetor de sonda macio 5"–2" × 24", gel estéril e elásticos';
const SF = 'Guia + protetor SlimFit™ com PullUp™ e protetor macio 4"–1,25" × 12", gel estéril e elásticos';
const SFo = 'Guia + protetor SlimFit™ com PullUp™, gel estéril e elásticos';
const SF48 = 'Guia + protetor SlimFit™ 4"–1,25" × 48" e protetor macio 4"–1,25" × 12", gel estéril e elásticos';

const BOX24 = '24 kits estéreis por caixa';

const XT = ['1 suporte multiângulo reutilizável (não estéril)',
  '5 kits Sterile Director XT™ multicalibre: guia, insertos de calibre (8,5F, 14–18G, 20–23G), protetor macio PullUp™ 14 × 122 cm, gel estéril e 2 elásticos'];
const MULTI = (n, cal) => ['1 suporte multiângulo reutilizável (não estéril)',
  `${n} guias de agulha estéreis Sterile Director™ (${cal})`,
  `${n} kits de protetor macio PullUp™ 14 × 122 cm com gel estéril e 2 elásticos`];
const SINGLE = (n, cal) => ['1 suporte de ângulo único reutilizável (não estéril)',
  `${n} kits Sterile Director™ (${cal}): guia, protetor macio PullUp™ 14 × 122 cm, gel estéril e 2 elásticos`];

const guias = [
  // ---------- Samsung · endocavitárias ----------
  { brands: ['samsung'], probe: 'endo', img: ['@1-535-5275.webp'], compat: 'Samsung EV2-10A', kits: [['1-535-5275', D0]] },
  { brands: ['samsung'], probe: 'endo', img: ['@1-535-5295.webp'], compat: 'Samsung EA2-11B', kits: [['1-535-5295', D0]] },
  { brands: ['samsung'], probe: 'endo', img: ['@1-535-5580.webp', '@1-535-5590.webp'], compat: 'Samsung EA2-11AR, EA2-11AV',
    kits: [['1-535-5580', 'Guia de biópsia descartável, versão curta'], ['1-535-5590', 'Guia de biópsia descartável, versão longa']] },
  { brands: ['samsung'], probe: 'endo', img: ['@1-535-5260.webp'], compat: 'Samsung E3-12A', kits: [['1-535-5260', D0], ['1-535-5261', SF]] },
  { brands: ['samsung'], probe: 'endo', img: ['@1-535-5505.webp'], compat: 'Samsung 3D5-8EK, 3D5-9EK', kits: [['1-535-5505', D0]] },
  { brands: ['samsung'], probe: 'endo', img: ['@1-535-5144.webp'], compat: 'Samsung EV4-9/10ED, ER4-9/10ED, EC4-9, EVN4-9, EC4-9/10ED, EV4-9, ER4-9, EC4-9/10R',
    url: P + '514-guias-de-biopsia/49171-guia-biopsia-samsung-h60-evn4-9',
    kits: [['1-535-5144', D0], ['1-535-5146', L35], ['1-535-5149', S4], ['1-535-5183', SF48]] },
  { brands: ['samsung'], probe: 'endo', img: ['@1-535-5145.webp'], compat: 'Samsung BCC4-9', kits: [['1-535-5145', D0], ['1-535-5147', L20], ['1-535-5151', S52]] },
  { brands: ['samsung'], probe: 'endo', img: ['@1-535-5250.webp'], compat: 'Samsung NEV4-9ES, NER4-9ES', kits: [['1-535-5250', D0]] },
  { brands: ['samsung'], probe: 'endo', img: ['@1-535-9000.webp'], compat: 'Samsung EC4-9IS, EC4-9ES, ER4-9ES, 10R EV/140D',
    url: P + '515-guias-de-biopsia/44166-guia-biopsia-ec4-9es-samsungmedison',
    kits: [['1-535-9000', D0], ['1-535-9001', L35], ['1-535-9002', S4], ['1-535-9003', L26], ['1-535-9005', SF]] },
  { brands: ['samsung'], probe: 'endo', img: ['@1-535-5154.webp'], compat: 'Samsung 3D4-9, 3DEC4-9, 3D4-9ES, 3DEC4-9ES', kits: [['1-535-5154', D0]] },
  { brands: ['samsung'], probe: 'endo', img: ['@1-535-5070.webp'], compat: 'Samsung EV3-10B, V5-9', kits: [['1-535-5070', D0], ['1-535-5071', L35]] },
  { brands: ['samsung'], probe: 'endo', img: ['@1-535-5055.webp'], compat: 'Samsung VR5-9', kits: [['1-535-5055', D0], ['1-535-5056', L35], ['1-535-5058', S4], ['1-535-5059', SF]] },

  // ---------- Samsung · convexas e lineares ----------
  { brands: ['samsung'], probe: 'conv', img: ['@1-535-7285.webp'], compat: 'Samsung LA4-18A, LA4-18AD', kit: ['1-535-7285', XT] },
  { brands: ['samsung'], probe: 'conv', img: ['@1-535-7197.webp'], compat: 'Samsung LA4-18B, LA4-18BD', kit: ['1-535-7197', XT] },
  { brands: ['samsung'], probe: 'conv', img: ['@1-535-7196.webp'], compat: 'Samsung CA1-7S', kit: ['1-535-7196', XT] },
  { brands: ['samsung'], probe: 'conv', img: ['@1-535-7265.webp'], compat: 'Samsung CF4-9', kit: ['1-535-7265', XT] },
  { brands: ['samsung'], probe: 'conv', img: ['@1-535-7164.webp'], compat: 'Samsung SC1-6', kit: ['1-535-7164', MULTI(24, '6 de cada: 16G, 18G, 22G, 25G')] },
  { brands: ['samsung'], probe: 'conv', img: ['@1-535-7167.webp'], compat: 'Samsung CA1-7A, CA1-7AD',
    kitsList: [['1-535-7180', MULTI(6, '2 de cada: 16G, 18G, 22G')], ['1-535-7167', MULTI(36, '6 de cada: 14G, 16G, 18G, 20G, 22G, 25G')]] },
  { brands: ['samsung'], probe: 'conv', img: ['@1-535-7179.webp'], compat: 'Samsung CF2-8, CA2-8A, CA2-8AD, CA2-9A, CA2-9AD',
    kitsList: [['1-535-7166', MULTI(24, '6 de cada: 16G, 18G, 22G, 25G')], ['1-535-7179', MULTI(6, '2 de cada: 16G, 18G, 22G')]] },
  { brands: ['samsung'], probe: 'conv', img: ['@1-535-7165.webp'], compat: 'Samsung LF5-13, LA3-16A', kit: ['1-535-7165', MULTI(24, '6 de cada: 16G, 18G, 20G, 22G')] },
  { brands: ['samsung'], probe: 'conv', img: ['@1-535-7172.webp'], compat: 'Samsung LF5-13, LA3-16A, LA3-16AD', kit: ['1-535-7172', MULTI(24, '6 de cada: 16G, 18G, 20G, 22G')] },
  { brands: ['samsung'], probe: 'conv', img: ['@1-535-7168.webp'], compat: 'Samsung CV1-8A, CV1-8AD', kit: ['1-535-7168', MULTI(36, '6 de cada: 14G, 16G, 18G, 20G, 22G, 25G')] },
  { brands: ['samsung'], probe: 'conv', img: ['@1-535-7181.webp'], compat: 'Samsung LA2-9A',
    kit: ['1-535-7181', ['1 suporte multiângulo reutilizável (não estéril)', '6 guias de agulha estéreis Retrofit™ (2 de cada: 18G, 20G, 22G)', '6 kits de protetor macio estéril 14 × 122 cm com gel estéril e 2 elásticos']] },
  { brands: ['samsung'], probe: 'conv', img: ['@1-535-7457.webp'], compat: 'Samsung C2-8', kit: ['1-535-7457', SINGLE(24, '8 de cada: 16G, 18G, 22G')] },
  { brands: ['samsung'], probe: 'conv', img: ['@1-535-7461.webp'], compat: 'Samsung LN5-12, LE5-12', kit: ['1-535-7461', SINGLE(24, '8 de cada: 16G, 18G, 22G')] },
  { brands: ['samsung'], probe: 'conv', img: ['@1-535-7162.webp'], compat: 'Samsung L3-12A, LA3-14A, LA3-14AD, L5-13/50', kit: ['1-535-7162', MULTI(24, '6 de cada: 16G, 18G, 20G, 22G')] },
  { brands: ['samsung'], probe: 'conv', img: ['@1-535-7250.webp'], compat: 'Samsung VN4-8', kit: ['1-535-7250', MULTI(24, '6 de cada: 20G, 21G, 22G, 25G')] },
  { brands: ['samsung'], probe: 'conv', img: ['@1-535-7154.webp'], compat: 'Samsung C2-5',
    kit: ['1-535-7154', ['1 suporte de ângulo único reutilizável (não estéril)', '24 guias de agulha estéreis Sterile Director™ (6 de cada: 16G, 18G, 20G, 22G)', '24 kits de protetor macio PullUp™ 14 × 122 cm com gel estéril e 2 elásticos']] },

  // ---------- GE · endocavitárias ----------
  { brands: ['ge'], probe: 'endo', img: ['@1-535-5055.webp'], compat: 'GE Healthcare E8C, E721, E8C-RS, E72, IC5-9-D, IC5-9H, MTZ, MZ',
    also: 'ECM E610P, Samsung VR5-9', url: P + '514-guias-de-biopsia/45706-guia-biopsia-ge-e8ce72e721ic5-9h',
    kits: [['#5055', D0, P + '514-guias-de-biopsia/45706-guia-biopsia-ge-e8ce72e721ic5-9h'], ['#5056', L35, P + '514-guias-de-biopsia/45707-guia-biopsia-ge-e8c-gelpreservelastic'], ['#5058', S4], ['#5059', SF]] },
  { brands: ['ge'], probe: 'endo', img: ['@1-535-5145.webp'], compat: 'GE Healthcare IC5-9-RS',
    also: 'Esaote EC123, EC1123, SE3123, SE3133, TRT12, IVT12 · Philips E6509 · Siemens BE9-4 · Samsung BCC4-9 · Pie Medical C7-4R8TRD · Terason 8EC4',
    kits: [['#5145', D0], ['#5147', L20], ['#5148', S4], ['#5151', S52], ['#5152', SF]] },
  { brands: ['ge'], probe: 'endo', img: ['@1-535-5070.webp'], compat: 'GE Healthcare RIC5-9-D, RIC5-9H, RIC6-12-D, RIC5-9W-D, RIC5-9W-RS',
    also: 'Samsung V5-9 · Mindray DE10-3U',
    kits: [['#5070', D0], ['#5071', L35], ['#5072', S4], ['#5073', L26], ['#5074', 'Guia + protetor em látex 2,6 × 20 cm e protetor macio 4"–1,25" × 12", gel estéril e elásticos'], ['#5076', SFo], ['#5077', SF]] },
  { brands: ['ge'], probe: 'endo', img: ['@1-535-5046.webp'], compat: 'GE Healthcare 618E', box: '25 kits estéreis por caixa', kits: [['#5046', D0]] },
  { brands: ['ge'], probe: 'endo', img: ['@1-535-5014.webp'], compat: 'GE Healthcare BE9C, BE9CS',
    kits: [['#5014', 'Guia + protetor em látex 2,0 × 20 cm e protetor macio 5"–2" × 24", com elásticos']] },
  { brands: ['ge'], probe: 'endo', img: ['@leapmed-ge-ic9.webp'], compat: 'GE IC9', title: 'Guia endocavitária descartável',
    note: 'Ponta arredondada para maior conforto nos procedimentos endovaginais e endorretais. Aceita instrumentos de 16–18G.' },
  { brands: ['ge', 'samsung', 'mindray'], probe: 'endo', img: ['@leapmed-endo-e8c.webp', '@leapmed-endo-ric.webp'], compat: 'GE E8C, E8C-RS, E8CS, IC5-9-D, IC5-9H · GE RIC5-9-D, RIC6-12-D, RIC5-9W-RS',
    also: 'Samsung VR5-9, EV3-10B, V5-9 · Mindray DE10-3U', title: 'Endo-guias descartáveis, versões normal e curta',
    note: 'Alternativa às guias acima. Ponta arredondada, abertura larga para inserção rápida da agulha com pouca luz. Aceita 16–18G.' },

  // ---------- Hitachi · endocavitárias ----------
  { brands: ['hitachi'], probe: 'endo', img: ['@1-535-5380.webp'], compat: 'Hitachi EUP-V33, EUP-CC31, EUP-CC531, EUP-V12, EUP-V33W, EUP-V53W, EZU-PA5V, C41V, CC41R, CC41R1',
    url: P + '515-guias-de-biopsia/49802-guia-biopsia-eup-v53wpresgelel',
    kits: [['1-535-5380', D0], ['1-535-5381', S4, P + '515-guias-de-biopsia/49802-guia-biopsia-eup-v53wpresgelel'], ['1-535-5382', 'Guia + protetores em látex 3,5 × 20 cm e 2,0 × 20 cm, gel estéril e elásticos']] },
  { brands: ['hitachi'], probe: 'endo', img: ['@1-535-5250.webp'], compat: 'Hitachi-Aloka UST-679', kits: [['1-535-5250', D0]] },
  { brands: ['hitachi'], probe: 'endo', img: ['@1-535-5370.webp'], compat: 'Hitachi C41V1, EUP-V73W', kits: [['1-535-5370', D0], ['1-535-5372', L35], ['1-535-5373', S4], ['1-535-5371', SF]] },

  // ---------- Toshiba e Siemens · endocavitárias ----------
  { brands: ['toshiba', 'siemens'], probe: 'endo', img: ['@leapmed-ec9-4-pvt661.webp'], compat: 'Toshiba PVT-661VT, PVT-651VT · Siemens EC9-4 (S1000, S2000, S3000, Antares)',
    title: 'Guia de biópsia para sonda endocavitária', url: P + '515-guias-de-biopsia/49794-guia-biopsia-pvt-661vt651vt' },
  { brands: ['toshiba'], probe: 'endo', img: ['@leapmed-pvt781.webp'], compat: 'Toshiba PVT-781VT, PVU-781VT, PVT-781VTE, PVU-781VTE', title: 'Guia de biópsia para sonda endocavitária' },
  { brands: ['siemens'], probe: 'endo', img: ['@leapmed-ec9-4-g40.webp', '@leapmed-ec9-4-short.webp'], compat: 'Siemens EC9-4, EV9-4 (Sonoline G40, X150, X300)', title: 'Guia de biópsia endocavitária, versões normal e curta',
    url: P + '514-guias-de-biopsia/49659-guia-biopsia-ec9-4ev9-4g40x150x300' },
  { brands: ['siemens', 'samsung', 'hitachi'], probe: 'endo', img: ['@leapmed-ec10-5w.webp'], compat: 'Siemens EC10-5w',
    also: 'Samsung E3-12A, NEV4-9ES, NER4-9ES · Alpinion E3-10 · BK 8819, E10C4, 9019 · Carestream E10C4 · Philips BP10-5ec, C9-4ec · Hitachi-Aloka UST-679',
    title: 'Guia de biópsia para sonda endocavitária' },
  { brands: ['siemens', 'esaote'], probe: 'endo', img: ['@leapmed-ec1123.webp', '@leapmed-ec1123-short.webp'], compat: 'Siemens EC1123 · Esaote EC1123, EC123, SE3123, SE3133', title: 'Guia de biópsia endocavitária (3,8), versões normal e curta' },
  { brands: ['siemens'], probe: 'endo', img: ['@leapmed-mc9-4.webp'], compat: 'Siemens 9MC3, EC9-4W, MC9-4, 9EC4', title: 'Guia curta para sonda endocavitária' },
];

const nm = (s) => s;
const agulhas = {
  mama: [
    ['Agulha para pistola Fast Gun', '14G × 15 cm', 'SWFSC1410.jpg', '52582-agulha-biopsia-pfast-gun-14gx15cm'],
    ['Agulha para pistola Fast Gun', '16G × 15 cm', 'SWFSC1410.jpg', '52583-agulha-biopsia-pfast-gun-16gx15cm'],
    ['Agulha para pistola Fast Gun', '18G × 15 cm', 'SWFSC1410.jpg', '52553-agulha-biopsia-pfast-gun-18gx15cm'],
    ['Agulha para pistola Magnum', '14G × 10 cm', 'SWSC1410B.jpg', '52548-agulha-biopsia-pmagnum-14gx10cm'],
    ['Agulha para pistola Magnum', '16G × 10 cm', 'SWSC1610B.jpg', '52537-agulha-biopsia-pmagnum-16gx10cm'],
    ['Agulha para pistola Magnum', '18G × 10 cm', 'SWSC1810B.jpg', '52555-agulha-biopsia-pmagnum-18gx10cm'],
  ],
  prostata: [
    ['Agulha para pistola Fast Gun', '18G × 20 cm', 'SWFSC1410.jpg', '52533-agulha-biopsia-pfast-gun-18gx20cm'],
    ['Agulha para pistola Magnum', '18G × 20 cm', 'SWSC1820B.jpg', '52530-agulha-biopsia-pmagnum-18gx20cm'],
    ['Agulha para pistola Magnum', '18G × 30 cm', 'RMUM18300.jpg', '52585-agulha-biopsia-pmagnum-18gx30cm'],
    ['Agulha Chiba', '18G × 20 cm', 'SWCCH1820.jpg', '52494-agulha-biopsia-chiba-18gx20cm'],
    ['Agulha Chiba', '20G × 15 cm', 'SWCCH2015.jpg', '52505-agulha-biopsia-chiba-20gx15cm'],
    ['Agulha Chiba', '20G × 20 cm', 'SWCCH2020.jpg', '52498-agulha-biopsia-chiba-20gx20cm'],
    ['Agulha Chiba', '22G × 20 cm', 'SWCCH2220.jpg', '52531-agulha-biopsia-chiba-22gx20cm'],
    ['Agulha Chiba', '22G × 25 cm', 'SWCCH2225.jpg', '52546-agulha-biopsia-chiba-22gx25cm'],
  ],
};
const pistolas = {
  mama: [
    ['Pistola descartável Multicore', '14G × 11 cm', 'SWMLC1411.jpg', '44666-pistola-biopsia-desc-multicore-14gx11cm'],
    ['Pistola descartável Multicore', '16G × 11 cm', 'SWMLC1611.jpg', '44668-pistola-biopsia-desc-multicore-16gx11cm'],
    ['Pistola descartável Multicore', '18G × 15 cm', 'SWMLC1815.jpg', '44669-pistola-biopsia-desc-multicore-18gx15cm'],
    ['Pistola descartável Primo Cut', '18G × 15 cm', null, '51262-pistola-biopsia-desc-primo-cut-18gx150m'],
  ],
  prostata: [
    ['Pistola descartável Multicore', '16G × 20 cm', 'SWMLC1620.jpg', '49885-pistola-biopsia-desc-multicore-16gx20cm'],
    ['Pistola descartável Multicore', '18G × 20 cm', 'SWMLC1820.jpg', '44670-pistola-biopsia-desc-multicore-18gx20cm'],
    ['Pistola descartável Multicore', '18G × 25 cm', 'SWMLC1825.jpg', '44671-pistola-biopsia-desc-multicore-18gx25cm'],
  ],
};

module.exports = { guias, agulhas, pistolas, P, IMG, BOX24 };
