<?php
/**
 * SPECULUM — Microcureta Endosampler | página PHP com a ficha da loja e conteúdo melhorado.
 * Instalar em https://www.speculum.pt/endosampler.php
 *
 * Como funciona:
 *  - Mostra a ficha original da loja (login, carrinho, formulário "Peça mais informações")
 *    numa moldura (iframe) com ?embed=1, para o .htaccess não a redirecionar de volta.
 *  - Troca a descrição curta, a fotografia principal e a secção "Especificações"
 *    (texto da MedGyn traduzido automaticamente) pelo conteúdo verificado da
 *    microcureta-endosampler.html.
 *
 * Diferenças em relação à kosmos.php:
 *  - Se o servidor bloquear a moldura, o aviso aparece e o conteúdo novo mostra-se por baixo.
 *  - Se esta página abrir dentro de outra moldura, sai para a janela principal (sem páginas aninhadas).
 *  - Se o visitante for para outra página dentro da moldura, a janela inteira acompanha-o
 *    (a barra de endereço fica certa e o conteúdo da Endosampler não fica pendurado).
 *  - As imagens são todas da speculum.pt (pasta images/products ao lado deste ficheiro).
 *
 * Compatível com PHP 5.6. Fontes dos textos: ficha MY0022720.pdf; medgyn.com (página do
 * produto, folheto ENDOSAMP-PF4 2024 e catálogo 2026), verificadas em 2026-11-20.
 */
header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: private, no-store, max-age=0');
header('X-Content-Type-Options: nosniff');

$produtoId   = '48457-';
$produtoPath = '/pt/produtos/574-microcuretas/48457-microcureta-endosampler';
$produtoUrl  = 'https://www.speculum.pt' . $produtoPath;
$iframeUrl   = $produtoPath . '?embed=1';   // relativo: tem de ser do mesmo domínio que esta página

// Endereço absoluto da pasta das imagens (a ficha da loja tem <base href>, por isso um caminho
// relativo apontaria para outro sítio). Por omissão: images/products ao lado desta página.
$https   = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443);
$host    = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'www.speculum.pt';
$pasta   = rtrim(str_replace('\\', '/', dirname(isset($_SERVER['SCRIPT_NAME']) ? $_SERVER['SCRIPT_NAME'] : '/')), '/');
$imgBase = ($https ? 'https://' : 'http://') . $host . $pasta . '/images/products/';

function e($s) { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }
?>
<!DOCTYPE html>
<html lang="pt-PT">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Microcureta Endosampler – Amostragem endometrial | SPECULUM</title>
  <meta name="description" content="Microcureta Endosampler da MedGyn para amostragem do tecido endometrial sem anestesia: cureta semirrígida de 3 mm, seringa de 10 ml com mola de bloqueio, caixas de 25 unidades.">
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #fff; font-family: Arial, Helvetica, sans-serif; }
    #site-original { display: block; border: 0; width: 100%; height: 100vh; background: #fff; }
    #aviso { display: none; max-width: 1100px; margin: 25px auto; padding: 20px; border: 1px solid #cbd7df; background: #f5f9fc; color: #17364c; line-height: 1.6; }
    #aviso a { color: #0876aa; font-weight: 700; }
    .acesso-direto { position: absolute; left: -9999px; }
    .acesso-direto:focus { position: fixed; top: 0; left: 0; z-index: 99; background: #fff; padding: 10px; }
  </style>
</head>
<body>
  <a class="acesso-direto" href="<?php echo e($produtoUrl); ?>">Abrir a página original do produto</a>
  <div id="aviso" role="status">Não foi possível apresentar a ficha da loja nesta página. Para ver o preço, o carrinho e o formulário de contacto, <a href="<?php echo e($produtoUrl); ?>" target="_top">abra a página original da Microcureta Endosampler</a>.</div>
  <iframe id="site-original"
          src="<?php echo e($iframeUrl); ?>"
          title="SPECULUM: ficha da Microcureta Endosampler"
          loading="eager"></iframe>
  <noscript><p style="max-width:1100px;margin:20px auto;padding:0 18px">Esta página precisa de JavaScript. <a href="<?php echo e($produtoUrl); ?>">Abrir a página original da Microcureta Endosampler</a>.</p></noscript>
  <script>
  (function () {
    'use strict';

    // Correção: nunca ficar dentro de outra moldura (evita páginas aninhadas).
    if (window.top !== window.self) {
      try { window.top.location.replace(window.location.href); } catch (_) {}
      return;
    }

    var PRODUTO_ID = <?php echo json_encode($produtoId); ?>;
    var IMG = <?php echo json_encode($imgBase); ?>;
    var frame = document.getElementById('site-original');
    var aviso = document.getElementById('aviso');

    var FONTS = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap';

    // ---------- Estilos (tudo dentro de #es-extra / [data-es], para não mexer no resto da loja) ----------
    var css = [
      '#es-extra{--es-text:#173043;--es-muted:#607481;--es-line:#dfe7eb;--es-soft:#f4f7f9;--es-shadow:0 10px 28px rgba(0,36,58,.08);',
      '  --nt-i-d:#00527f;--nt-i-l:#008cc2;--nt-i-w:#fff;color:var(--es-text);font-family:"Plus Jakarta Sans",Arial,sans-serif;clear:both;text-align:left}',
      '#es-extra *{box-sizing:border-box}',
      // Sem antecessor: dentro de <use> o Chrome não aplica seletores como "#es-extra .nt-i-d".
      '.nt-i-d{fill:var(--nt-i-d)}.nt-i-l{fill:var(--nt-i-l)}.nt-i-w{fill:var(--nt-i-w)}',
      '.es-i-sd{fill:none;stroke:var(--nt-i-d);stroke-linecap:round;stroke-linejoin:round}',
      '.es-i-sl{fill:none;stroke:var(--nt-i-l);stroke-linecap:round;stroke-linejoin:round}',
      '.es-i-sw{fill:none;stroke:var(--nt-i-w)}',
      '#es-extra img{max-width:100%;padding:0;border:0;border-radius:0;box-shadow:none;background:transparent}',
      '#es-extra h2,#es-extra h3,#es-extra h4,#es-extra p,#es-extra figure{margin:0;padding:0;text-transform:none;letter-spacing:normal}',
      '#es-extra .es-sec{padding:64px 0}',
      '#es-extra .es-sec+.es-sec{border-top:0}',
      '#es-extra .es-soft{background:var(--es-soft);border-radius:24px;padding:56px 40px}',
      '#es-extra .es-dark{background:radial-gradient(circle at 50% -10%,rgba(0,144,190,.14),transparent 40%),#020817;color:#fff;border-radius:24px;padding:56px 40px;',
      '  --nt-i-d:#12dcff;--nt-i-l:#fff;--nt-i-w:#101c30}',
      '#es-extra .es-kicker{display:inline-flex;align-items:center;gap:9px;margin-bottom:14px;color:#087fa8;font-family:Montserrat,sans-serif;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}',
      '#es-extra .es-kicker:before{content:"";width:24px;height:2px;background:currentColor}',
      '#es-extra .es-title{font-family:Montserrat,sans-serif;font-size:clamp(28px,3.6vw,44px);font-weight:800;line-height:1.08;letter-spacing:-.035em;color:inherit;text-align:left}',
      '#es-extra .es-dark .es-title{text-align:center}',
      '#es-extra .es-lead{max-width:820px;margin-top:18px;color:#586d7a;font-size:17px;line-height:1.72}',
      '#es-extra .es-grid2{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}',
      '#es-extra .es-feats{display:grid;margin-top:26px}',
      '#es-extra .es-feat{display:grid;grid-template-columns:48px 1fr;gap:14px;padding:15px 0;border-bottom:1px solid var(--es-line)}',
      '#es-extra .es-feat:last-child{border-bottom:0}',
      '#es-extra .es-ico svg{width:42px;height:42px;display:block}',
      '#es-extra .es-feat h3{margin-bottom:5px;font-family:Montserrat,sans-serif;font-size:17px;font-weight:700;color:var(--es-text)}',
      '#es-extra .es-feat p{color:#617581;font-size:14px;line-height:1.65}',
      '#es-extra .es-photo{padding:24px;border:1px solid var(--es-line);border-radius:23px;background:#fff;box-shadow:var(--es-shadow)}',
      '#es-extra .es-photo img{display:block;width:100%;height:auto}',
      '#es-extra .es-caption{margin-top:12px;color:var(--es-muted);font-size:13px;line-height:1.6}',
      '#es-extra .es-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:19px;margin-top:34px}',
      '#es-extra .es-card{padding:22px;border:1px solid #23324a;border-radius:17px;background:linear-gradient(145deg,#111d31,#091425)}',
      '#es-extra .es-card .es-ico svg{width:52px;height:52px}',
      '#es-extra .es-card h3{margin:16px 0 8px;font-family:Montserrat,sans-serif;font-size:17px;font-weight:700;color:#fff}',
      '#es-extra .es-card p{color:#9eb6ca;font-size:14px;line-height:1.65}',
      '#es-extra .es-models,#es-extra .es-specwrap{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:19px}',
      '#es-extra .es-models{margin-top:34px}',
      '#es-extra .es-specwrap{margin-top:19px;align-items:stretch}',
      '#es-extra .es-model{display:grid;grid-template-columns:170px 1fr;align-items:center;overflow:hidden;border:1px solid var(--es-line);border-radius:18px;background:#fff;box-shadow:var(--es-shadow)}',
      '#es-extra .es-model-img{position:relative;align-self:stretch;min-height:180px;border-right:1px solid var(--es-line)}',
      '#es-extra .es-model-img img{position:absolute;inset:14px;width:calc(100% - 28px);height:calc(100% - 28px);object-fit:contain}',
      '#es-extra .es-model-body{padding:20px 22px}',
      '#es-extra .es-code{color:#087fa8;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}',
      '#es-extra .es-model h3{margin:6px 0 8px;font-family:Montserrat,sans-serif;font-size:20px;font-weight:700;color:var(--es-text)}',
      '#es-extra .es-model p{color:#617581;font-size:14px;line-height:1.6}',
      '#es-extra .es-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}',
      '#es-extra .es-chips span{padding:4px 9px;border-radius:8px;color:#00527f;background:#e8f6fa;font-size:12px;font-weight:800}',
      '#es-extra .es-spec,#es-extra .es-doc{padding:24px 26px;border:1px solid var(--es-line);border-radius:18px;background:#fff;box-shadow:var(--es-shadow)}',
      '#es-extra .es-spec h3{margin-bottom:10px;font-family:Montserrat,sans-serif;font-size:18px;font-weight:700;color:var(--es-text)}',
      '#es-extra .es-spec table{width:100%;margin:0;border-collapse:collapse;font-size:14px}',
      '#es-extra .es-spec th,#es-extra .es-spec td{padding:10px 0;border:0;border-top:1px solid var(--es-line);text-align:left;vertical-align:top;background:transparent;line-height:1.5}',
      '#es-extra .es-spec tr:first-child th,#es-extra .es-spec tr:first-child td{border-top:0}',
      '#es-extra .es-spec th{width:38%;padding-right:16px;color:var(--es-muted);font-weight:700}',
      '#es-extra .es-doc{display:grid;grid-template-rows:minmax(0,1fr) auto;gap:16px;color:inherit;text-decoration:none;transition:.2s ease}',
      '#es-extra .es-doc:hover{transform:translateY(-3px);border-color:#9fd7ea}',
      '#es-extra .es-doc img{width:100%;height:100%;min-height:160px;object-fit:cover;object-position:top center;border:1px solid var(--es-line);border-radius:10px;background:#fff}',
      '#es-extra .es-doc span{display:block;color:#087fa8;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}',
      '#es-extra .es-doc strong{display:block;margin-top:6px;font-family:Montserrat,sans-serif;font-size:16px;color:var(--es-text)}',
      '#es-extra .es-doc em{display:block;margin-top:8px;color:#005a85;font-style:normal;font-size:13px;font-weight:700}',
      '[data-es-desc]{font-family:"Plus Jakarta Sans",Arial,sans-serif;color:#173043;font-size:15px;line-height:1.7;margin:14px 0}',
      '[data-es-desc] p,[data-es-desc] li,[data-es-desc] strong{color:#173043}',
      '[data-es-desc] p{margin:0 0 12px;font-size:15px}',
      // A loja empurra o rodapé para o fundo da janela; dentro da moldura (que já tem a altura certa)
      // isso cria um espaço vazio cada vez maior. Aqui não é preciso.
      '#grid-wrap-footer{margin-top:0!important}',
      // Botão "Voltar atrás" da loja (history.go(-1)): removido a pedido; dentro da moldura também não funciona bem.
      '.item-collection-detail a.amore-pdetails,.item-collection-detail p:has(> a.amore-pdetails){display:none}',
      '[data-es-desc] ul{margin:0 0 12px;padding-left:20px;list-style:disc}',
      '[data-es-desc] li{margin:0 0 4px}',
      '@media (max-width:991px){#es-extra .es-grid2,#es-extra .es-models,#es-extra .es-specwrap{grid-template-columns:1fr}#es-extra .es-cards{grid-template-columns:1fr 1fr}#es-extra .es-soft,#es-extra .es-dark{padding:44px 24px}}',
      '@media (max-width:620px){#es-extra .es-cards{grid-template-columns:1fr}#es-extra .es-model{grid-template-columns:1fr}#es-extra .es-model-img{min-height:160px;border-right:0;border-bottom:1px solid var(--es-line)}#es-extra .es-spec th{display:block;width:auto;padding-bottom:2px}#es-extra .es-spec td{display:block;padding-top:0;border-top:0}#es-extra .es-sec{padding:44px 0}}'
    ].join('\n');

    // ---------- Ícones (mesmos símbolos es-i-* da microcureta-endosampler.html) ----------
    var icons = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
    <!-- Ginecologia: símbolo feminino com cruz médica -->
    <symbol id="es-i-gyn" viewBox="0 0 48 48">
      <circle class="nt-i-d" cx="24" cy="17" r="14"/>
      <circle class="nt-i-w" cx="24" cy="17" r="8.5"/>
      <rect class="nt-i-l" x="21.6" y="11" width="4.8" height="12" rx="1.2"/>
      <rect class="nt-i-l" x="18" y="14.6" width="12" height="4.8" rx="1.2"/>
      <rect class="nt-i-d" x="21.25" y="29" width="5.5" height="16" rx="2.75"/>
      <rect class="nt-i-d" x="15" y="34.5" width="18" height="5.5" rx="2.75"/>
    </symbol>
    <!-- Citologia e histologia: microscópio -->
    <symbol id="es-i-micro" viewBox="0 0 48 48">
      <rect class="nt-i-d" x="7" y="40" width="34" height="5" rx="2.5"/>
      <path class="nt-i-d" d="M28 40 H35 C43 33 43 20 34.5 13.5 L30.5 18 C36.5 23 36.5 31 31 36 H28 Z"/>
      <rect class="nt-i-d" x="9" y="31" width="22" height="4.5" rx="2.25"/>
      <g transform="rotate(-32 22 17)">
        <rect class="nt-i-d" x="17.5" y="6" width="9" height="20" rx="2.5"/>
        <rect class="nt-i-l" x="16" y="2" width="12" height="6" rx="2"/>
        <rect class="nt-i-l" x="19.5" y="25" width="5" height="4.5" rx="1"/>
      </g>
    </symbol>
    <!-- Raspagem e aspiração: seringa -->
    <symbol id="es-i-syr" viewBox="0 0 48 48">
      <g transform="rotate(-45 24 24)">
        <rect class="nt-i-d" x="0" y="22.75" width="7" height="2.5" rx="1.25"/>
        <rect class="nt-i-d" x="5.5" y="20.5" width="5" height="7" rx="1.5"/>
        <rect class="nt-i-d" x="10" y="17" width="21" height="14" rx="2.5"/>
        <rect class="nt-i-l" x="12.5" y="19.5" width="10" height="9" rx="1.5"/>
        <rect class="nt-i-w" x="15" y="17" width="1.8" height="4.5"/>
        <rect class="nt-i-w" x="19" y="17" width="1.8" height="4.5"/>
        <rect class="nt-i-d" x="30" y="13" width="3.5" height="22" rx="1.75"/>
        <rect class="nt-i-l" x="33" y="21.5" width="8" height="5"/>
        <rect class="nt-i-l" x="40" y="15" width="4.5" height="18" rx="2.25"/>
      </g>
    </symbol>
    <!-- Amostra sem contaminação: tubo de amostra fechado -->
    <symbol id="es-i-tube" viewBox="0 0 48 48">
      <path class="nt-i-d" d="M16.5 12 H31.5 V35.5 a7.5 7.5 0 0 1 -15 0 Z"/>
      <path class="nt-i-w" d="M20.5 15.5 H27.5 V35.5 a3.5 3.5 0 0 1 -7 0 Z"/>
      <path class="nt-i-l" d="M20.5 25 H27.5 V35.5 a3.5 3.5 0 0 1 -7 0 Z"/>
      <rect class="nt-i-l" x="13.5" y="3" width="21" height="10" rx="3"/>
      <rect class="nt-i-w" x="18.5" y="5.5" width="2" height="5" rx="1"/>
      <rect class="nt-i-w" x="23" y="5.5" width="2" height="5" rx="1"/>
      <rect class="nt-i-w" x="27.5" y="5.5" width="2" height="5" rx="1"/>
    </symbol>
    <!-- Cânula semirrígida de 3 mm: cureta curva graduada -->
    <symbol id="es-i-cannula" viewBox="0 0 48 48">
      <path class="es-i-sd" stroke-width="7" d="M10 38 L28.5 19.5 Q34 14 41.5 12.5"/>
      <path class="es-i-sl" stroke-width="7" d="M35.5 14.3 Q38.5 13 41.5 12.5"/>
      <path class="es-i-sw" stroke-width="7" stroke-dasharray="1.6 4.4" d="M14 34 L27 21"/>
      <rect class="nt-i-d" x="2.5" y="35.5" width="10" height="10" rx="2.5" transform="rotate(45 7.5 40.5)"/>
    </symbol>
    <!-- Curva e abertura cortante: ponta da cureta com a janela -->
    <symbol id="es-i-slot" viewBox="0 0 48 48">
      <g transform="rotate(30 24 24)">
        <rect class="nt-i-d" x="15" y="3" width="18" height="50" rx="9"/>
        <path class="nt-i-w" d="M24 10 C29 10 29.5 15 28.2 21.5 L24 33 L19.8 21.5 C18.5 15 19 10 24 10 Z"/>
        <path class="nt-i-l" d="M24 13.5 C26.6 13.5 26.8 16.5 26 21 L24 27 L22 21 C21.2 16.5 21.4 13.5 24 13.5 Z"/>
      </g>
    </symbol>
    <!-- Sem refluxo: cadeado (mola de bloqueio) -->
    <symbol id="es-i-lock" viewBox="0 0 48 48">
      <path class="es-i-sl" stroke-width="5.5" d="M15.5 22 V16 a8.5 8.5 0 0 1 17 0 V22"/>
      <rect class="nt-i-d" x="8" y="20" width="32" height="24" rx="5"/>
      <circle class="nt-i-w" cx="24" cy="30" r="4"/>
      <rect class="nt-i-w" x="22.25" y="31" width="3.5" height="7.5" rx="1.75"/>
    </symbol>
</defs></svg>`;
    var ico = function (id) { return '<div class="es-ico"><svg aria-hidden="true"><use href="#' + id + '"/></svg></div>'; };

    // ---------- Descrição curta (substitui o texto "Para recolha de células…") ----------
    var descHtml = `
      <p>Microcureta da MedGyn para recolha de tecido endometrial <strong>sem anestesia</strong>, em consultório ou ambulatório. A amostra serve tanto o diagnóstico citológico como o histológico.</p>
      <ul>
        <li>Cureta semirrígida e curva de <strong>3 mm</strong>, que minimiza o risco de perfuração</li>
        <li>Abertura cortante na ponta, para amostrar todas as áreas da cavidade endometrial</li>
        <li>Seringa de <strong>10 ml</strong> com mola de bloqueio, que impede o refluxo da amostra</li>
        <li>Estéril, de uso único</li>
      </ul>
      <p>Disponível com um orifício (Endosampler) ou dois (Endosampler II).</p>`;

    // ---------- Secções (substituem a secção "Especificações" da loja) ----------
    var html = `
      <div id="es-extra">
        ${icons}
        <section class="es-sec" aria-labelledby="es-caracteristicas">
          <div class="es-grid2">
            <div>
              <span class="es-kicker">Características</span>
              <h2 class="es-title" id="es-caracteristicas">Uma amostra mais fiável, numa só inserção.</h2>
              <p class="es-lead">O desenho exclusivo da Endosampler™ dá mais precisão e uma amostra mais fiável do que os dispositivos tradicionais de amostragem endometrial.</p>
              <div class="es-feats">
                <div class="es-feat">${ico('es-i-gyn')}<div><h3>Uso ginecológico de rotina</h3><p>Pensada para a consulta: recolha de tecido endometrial sem anestesia, que reduz o desconforto da paciente.</p></div></div>
                <div class="es-feat">${ico('es-i-micro')}<div><h3>Citologia e histologia</h3><p>A amostra recolhida serve tanto o diagnóstico citológico como o histológico.</p></div></div>
                <div class="es-feat">${ico('es-i-syr')}<div><h3>Raspagem e aspiração</h3><p>Facilita tanto a raspagem do endométrio como a aspiração do tecido.</p></div></div>
                <div class="es-feat">${ico('es-i-tube')}<div><h3>Amostra sem contaminação</h3><p>O sistema “fechado” evita a contaminação da amostra endometrial.</p></div></div>
              </div>
            </div>
            <div>
              <figure class="es-photo"><img src="${IMG}endosampler-montada.webp" alt="Endosampler montada: a cureta curva ligada à seringa" width="1400" height="1195" loading="lazy"></figure>
              <p class="es-caption">A Endosampler é composta por uma cureta semirrígida e curva de 3 mm, com marcas graduadas bem visíveis, e por uma seringa de 10 ml com mola de bloqueio.</p>
            </div>
          </div>
        </section>

        <section class="es-dark" aria-labelledby="es-desenho">
          <h2 class="es-title" id="es-desenho">Pensada ao pormenor.</h2>
          <div class="es-cards">
            <article class="es-card">${ico('es-i-cannula')}<h3>Cânula semirrígida de 3 mm</h3><p>Fácil de introduzir e firme o suficiente para minimizar o risco de perfuração.</p></article>
            <article class="es-card">${ico('es-i-slot')}<h3>Curva e abertura cortante</h3><p>A cureta curva, com abertura cortante na ponta, permite amostrar melhor todas as áreas da cavidade endometrial.</p></article>
            <article class="es-card">${ico('es-i-lock')}<h3>Sem refluxo da amostra</h3><p>Uma mola de bloqueio na seringa impede o refluxo da amostra recolhida. Para retirar a amostra, basta desarmar o mecanismo.</p></article>
          </div>
        </section>

        <section class="es-sec" aria-labelledby="es-modelos">
          <div class="es-soft">
            <span class="es-kicker">Modelos e referências</span>
            <h2 class="es-title" id="es-modelos">Um ou dois orifícios de aspiração.</h2>
            <p class="es-lead">A Endosampler II tem dois orifícios, para uma aspiração ainda mais fácil. Ambos os modelos são fornecidos em caixas de 25 unidades.</p>
            <div class="es-models">
              <article class="es-model">
                <div class="es-model-img"><img src="${IMG}endosampler-ponta.webp" alt="Ponta da Endosampler, com um orifício" width="566" height="410" loading="lazy"></div>
                <div class="es-model-body"><span class="es-code">MedGyn 022720</span><h3>Endosampler</h3><p>Um orifício cortante na ponta da cureta. É o modelo da referência Speculum MY0022720.</p><div class="es-chips"><span>1 orifício</span><span>3 mm</span><span>25 / caixa</span></div></div>
              </article>
              <article class="es-model">
                <div class="es-model-img"><img src="${IMG}endosampler-ii-ponta.webp" alt="Ponta da Endosampler II, com dois orifícios" width="618" height="439" loading="lazy"></div>
                <div class="es-model-body"><span class="es-code">MedGyn 022722</span><h3>Endosampler II</h3><p>Dois orifícios de aspiração na ponta, para uma amostra maior com menos força, e mais conforto para a paciente.</p><div class="es-chips"><span>2 orifícios</span><span>3 mm</span><span>25 / caixa</span></div></div>
              </article>
            </div>
            <div class="es-specwrap">
              <div class="es-spec">
                <h3>Especificações</h3>
                <table><tbody>
                  <tr><th scope="row">Referência Speculum</th><td>MY0022720</td></tr>
                  <tr><th scope="row">Fabricante</th><td>MedGyn</td></tr>
                  <tr><th scope="row">Indicação</th><td>Amostragem do tecido endometrial para diagnóstico citológico e histológico</td></tr>
                  <tr><th scope="row">Cureta</th><td>Semirrígida e curva, 3 mm, com abertura cortante na ponta e marcas graduadas</td></tr>
                  <tr><th scope="row">Seringa</th><td>10 ml, com mola de bloqueio contra o refluxo da amostra</td></tr>
                  <tr><th scope="row">Anestesia</th><td>Não necessária</td></tr>
                  <tr><th scope="row">Utilização</th><td>Estéril, de uso único</td></tr>
                  <tr><th scope="row">Embalagem</th><td>25 unidades</td></tr>
                </tbody></table>
              </div>
              <a class="es-doc" href="https://www.speculum.pt/files/files/pdfs/MY0022720.pdf" target="_blank" rel="noopener">
                <img src="${IMG}endosampler-ficha-capa.webp" alt="" width="1080" height="720" loading="lazy">
                <div><span>Ficha técnica · PDF</span><strong>Microcureta Endosampler — MY0022720</strong><em>Abrir documento →</em></div>
              </a>
            </div>
          </div>
        </section>
      </div>`;

    // ---------- Altura da moldura ----------
    // O cartão "Associado a:" da loja fica por cima do fim do conteúdo (no computador).
    // Reserva espaço por baixo dos Downloads para não tapar as nossas secções.
    function reserveRelated(doc) {
      var rel = doc.querySelector('.related-wrapper');
      var dl = doc.querySelector('.content-download');
      if (!rel || !dl) return;
      var absoluto = doc.defaultView.getComputedStyle(rel).position === 'absolute';
      var espaco = absoluto ? Math.max(rel.offsetHeight, 440) + 30 : 0;
      if (dl.getAttribute('data-es-pad') !== String(espaco)) {
        dl.style.paddingBottom = espaco ? espaco + 'px' : '';
        dl.setAttribute('data-es-pad', String(espaco));
      }
    }

    function adjustHeight() {
      try {
        var doc = frame.contentDocument;
        if (!doc || !doc.body) return;
        reserveRelated(doc);
        var h = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight, 700);
        frame.style.height = h + 'px';
      } catch (_) {}
    }

    function addHead(doc) {
      if (doc.getElementById('es-css')) return;
      var link = doc.createElement('link');
      link.rel = 'stylesheet'; link.href = FONTS; link.id = 'es-fonts';
      doc.head.appendChild(link);
      var style = doc.createElement('style');
      style.id = 'es-css';
      style.textContent = css;
      doc.head.appendChild(style);
    }

    // Troca a descrição curta: o bloco .description dentro dos detalhes do produto
    // que contém o texto original. Devolve true se conseguiu (ou se já estava trocada).
    function replaceDescription(doc) {
      if (doc.querySelector('[data-es-desc]')) return true;
      var blocks = doc.querySelectorAll('.item-collection-detail .description');
      for (var i = 0; i < blocks.length; i++) {
        var t = (blocks[i].textContent || '').toLowerCase();
        if (t.indexOf('endometrial') > -1 && !blocks[i].querySelector('form,.click-to-ask-information')) {
          blocks[i].innerHTML = descHtml;
          blocks[i].setAttribute('data-es-desc', '1');
          return true;
        }
      }
      return false;
    }

    // Troca a fotografia principal (é um fundo CSS) pela imagem oficial da MedGyn.
    function replacePhoto(doc) {
      var ph = doc.querySelector('.detail-product-image');
      if (!ph || ph.getAttribute('data-es-photo')) return;
      ph.style.backgroundImage = 'url("' + IMG + 'endosampler-cureta-seringa.webp")';
      ph.style.backgroundSize = 'contain';
      ph.style.backgroundRepeat = 'no-repeat';
      ph.style.backgroundPosition = 'center';
      ph.setAttribute('data-es-photo', '1');
      ph.setAttribute('role', 'img');
      ph.setAttribute('aria-label', 'Cureta Endosampler, curva e graduada, ao lado da seringa de 10 ml');
    }

    // Substitui o conteúdo da secção "Especificações" da loja pelas nossas secções.
    // Se essa secção não existir, coloca-as antes do rodapé.
    function placeInFrame(doc) {
      if (doc.getElementById('es-extra')) return true;
      var wrap = doc.createElement('div');
      wrap.innerHTML = html.trim();
      var extra = wrap.firstElementChild;
      var specs = doc.querySelector('.content-specifications .main-inner');
      if (specs) {
        specs.innerHTML = '';
        specs.appendChild(extra);
      } else {
        var footer = doc.querySelector('footer, .footer');
        if (!footer || !footer.parentNode) return false;
        var inner = doc.createElement('div');
        inner.className = 'main-inner';
        inner.appendChild(extra);
        footer.parentNode.insertBefore(inner, footer);
      }
      if (extra.getBoundingClientRect().height === 0) { extra.parentNode.removeChild(extra); return false; }
      var imgs = extra.querySelectorAll('img');
      for (var i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener('load', adjustHeight);
        imgs[i].addEventListener('error', adjustHeight);
      }
      return true;
    }

    // Plano B: a moldura não deixa mexer (ou foi bloqueada). Mostra o aviso e o conteúdo por baixo.
    function fallback() {
      aviso.style.display = 'block';
      if (document.getElementById('es-extra')) return;
      addHead(document);
      var wrap = document.createElement('div');
      wrap.style.cssText = 'max-width:1240px;margin:0 auto;padding:0 18px';
      wrap.innerHTML = html.trim();
      frame.parentNode.insertBefore(wrap, frame.nextSibling);
    }

    var enhanced = false;
    function enhance() {
      var doc, loc;
      try {
        doc = frame.contentDocument;
        loc = frame.contentWindow.location;
        if (!doc || !doc.body) throw new Error('Página não acessível');
      } catch (err) {
        console.warn('Ficha da loja não acessível; a mostrar o conteúdo por baixo:', err);
        fallback();
        return;
      }

      // Correção: se o visitante foi para outra página dentro da moldura, a janela acompanha-o.
      if (loc.pathname.indexOf(PRODUTO_ID) === -1) {
        var destino = loc.href.replace(/([?&])embed=1(&|$)/, '$1').replace(/[?&]$/, '');
        window.location.href = destino;
        return;
      }

      // Página bloqueada pelo servidor ou vazia (ex.: erro): usa o plano B.
      if (!doc.querySelector('.item-collection-detail')) { fallback(); return; }

      addHead(doc);
      replacePhoto(doc);
      [0, 400, 1200, 2500].forEach(function (ms) {
        setTimeout(function () {
          try { if (replaceDescription(frame.contentDocument)) adjustHeight(); } catch (_) {}
        }, ms);
      });
      if (!placeInFrame(doc)) fallback();
      enhanced = true;
      adjustHeight();
      if (typeof ResizeObserver !== 'undefined' && !doc.body.getAttribute('data-es-ro')) {
        doc.body.setAttribute('data-es-ro', '1');
        new ResizeObserver(adjustHeight).observe(doc.body);
      }
    }

    // Rede de segurança: se ao fim de 6 s a moldura não carregou ou não foi melhorada, plano B.
    setTimeout(function () { if (!enhanced) fallback(); }, 6000);

    frame.addEventListener('load', enhance);
    window.addEventListener('resize', adjustHeight);
  })();
  </script>
</body>
</html>
