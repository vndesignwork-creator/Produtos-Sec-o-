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
