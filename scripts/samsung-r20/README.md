# Página Samsung R20

`samsung-r20.html` é a página `speculum.pt/rs20_4/index.html` com o cabeçalho e o
rodapé trocados pelos nossos. O conteúdo — texto, imagens, secções — é o da
original, sem alterações.

## Como foi construída

```bash
cd scripts/samsung-r20
node construir.mjs        # espera r20.html (cópia da original) na mesma pasta
```

O script vai buscar o esqueleto (cabeçalho, rodapé, pesquisa e correções ao CSS
do site) a `ecografos.html`, e mete o conteúdo da R20 lá dentro.

Não corre sozinho nem está agendado: só é preciso voltar a correr se a página
original mudar. Para isso, descarregar de novo o `r20.html`:

```bash
curl -sL https://www.speculum.pt/rs20_4/index.html -o r20.html
```

## O problema que o script resolve

O CSS da página original é escrito para uma página isolada: tem regras globais
(`*`, `body`, `img`, `a`, `.container`) que dariam cabo do nosso cabeçalho e
rodapé, que por sua vez dependem da `stylesheet.css` do speculum.pt. E ao
contrário, essa `stylesheet.css` ataca o conteúdo da R20.

O script trata dos dois lados:

- **Delimita** todo o CSS da R20 a `#produtos-main`, como nas outras páginas
  nossas, e **deita fora** as regras que só serviam o cabeçalho/rodapé próprios
  dela (`.topbar`, `.site-header`, `.nav`, `.footer`, `.copyright`…).
- **Repõe** o que a `stylesheet.css` do site pisa no conteúdo. Estas foram
  encontradas comparando, elemento a elemento, os estilos calculados nas duas
  páginas — não por adivinhação:

  | O que o site impõe | O que a original espera |
  |---|---|
  | `font-weight:400` nos títulos | negrito por omissão do browser (700) |
  | entrelinha mais curta | `line-height:1.55` herdada do corpo |
  | `letter-spacing:.1px` em todo o texto | `normal`, exceto onde a página declara |
  | `font-size:18px` nos parágrafos | os 16px herdados do corpo |
  | `12px` nos `<small>` | o valor por omissão do browser (~0,83em) |
  | margens dos `<p>` a zero | a margem por omissão (1em) onde não há regra |
  | fontes MiniSans/MiniSerif | Inter (não carregam fora de speculum.pt, ficam invisíveis) |
  | abaixo de 768px, `.container` a 100% !important | a folga lateral da original (36px / 24px) |

Depois de cada alteração, vale a pena comparar de novo com a original: abrir as
duas lado a lado e conferir as alturas de cada secção. Estavam dentro de 1–2px
quando esta página foi feita.

## O que já diverge da original (reaplicar se o script correr de novo)

Estas alterações foram feitas à mão em `samsung-r20.html` depois de gerado. Um
`node construir.mjs` volta a partir da original e apaga-as:

- **Contraste.** O CSS do site impõe cor própria a `<span>` sem classe e a
  `h1`–`h6`, e essa cor ganha sempre à que é herdada do contentor. Ficavam
  quase pretos sobre fundo escuro quatro sítios: o subtítulo da faixa Samsung,
  o `h3` de `.tech-large`, o `h2` do `.cta-box` e a seta dentro do `.btn`.
  Cada um levou cor explícita (`#fff`, ou `color:inherit` no caso do `.btn span`).
- **Selo do topo.** O texto vermelho (`#ff4050`) do selo "Samsung Healthcare ·
  R20 Oficial" passou a branco, e o selo "General Imaging · Ultra-Premium" foi
  removido.
- **`.ergo-image-card`.** Levou `width:100%`. Sem isso o cartão encolhia ao
  tamanho da imagem (~100px) em vez de ocupar a coluna da grelha.
- **Ícones dos 4 cartões.** Os glifos soltos (`◉ ✦ ↗ ⌁`) deram lugar a SVG
  embutido — olho, chip, ciclo e mão — para corresponderem ao texto de cada
  cartão. O Font Awesome do site também funciona aqui (foi testado), mas é
  sólido de mais para o traço fino desta página e prende-nos à versão 4 das
  classes (`fa fa-...`), que uma atualização do site partiria em silêncio.
- **Botões.** O botão azul do topo e o do `.cta-box` (dois botões unidos num só,
  "Agendar demonstração ou falar com um especialista") apontam para
  `https://www.speculum.pt/pt/contactos`, em vez da âncora interna e da
  homepage.
