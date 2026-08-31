# Catálogo de produtos — recolha automática

Recolhe o catálogo completo de `speculum.pt` e atualiza `produtos-catalogo.html`
(as duas pastas acima). Corre sozinho todas as segundas-feiras via
`.github/workflows/atualizar-catalogo.yml` — não é preciso pedir a atualização
manualmente, a não ser que se queira forçar uma recolha fora do calendário (no
separador **Actions** do repositório no GitHub, botão "Run workflow").

## Como corre

Três passos, cada um lê o que o anterior gravou em `build/` (pasta ignorada pelo
git — são dados intermédios, não o resultado final):

```bash
cd scripts/catalogo
node 1-scrape.mjs   # lista os produtos de cada categoria → build/catalogo.json
node 2-refs.mjs     # vai a cada ficha buscar a referência → build/refs.json
node 3-montar.mjs   # gera os dados finais e escreve produtos-catalogo.html
```

`2-refs.mjs` grava progressivamente e retoma de onde ficou se for interrompido
(chaves já lidas em `build/refs.json` não se repetem). Nos ~4.600 produtos
atuais, a recolha completa demora uns 15–20 minutos, sobretudo por causa deste
passo — uma ficha de cada vez, com concorrência baixa de propósito, para não
sobrecarregar o servidor da Speculum.

## O que fica editorial, não é dado da origem

O `speculum.pt` não classifica produtos por **área clínica** (Exame, Ecografia,
Obstetrícia, Biópsia, Anestesia, Cirurgia) — isso é atribuído em `3-montar.mjs`,
no mapa `AREA`, a partir do **tipo de artigo**. O tipo de artigo, esse sim, vem
da origem: é lido do próprio endereço da ficha
(`.../354-especulos/...` → "Espéculos"), passado por `acentos.mjs` porque a
origem escreve tudo sem acentos.

Se aparecer um tipo novo sem entrada em `acentos.mjs`, o script não falha —
mostra o nome tal como veio (sem acento, com maiúscula só na primeira letra).
Vale a pena rever de vez em quando se apareceram tipos novos por classificar.

## Como a página é montada

`produtos-catalogo.html` tem três blocos marcados com comentários HTML:

```html
<!-- CATALOGO:MAIN --> ... <!-- /CATALOGO:MAIN -->     conteúdo da página (cartões vêm à parte, no bloco DADOS)
<!-- CATALOGO:DADOS --> ... <!-- /CATALOGO:DADOS -->   os ~550 KB de dados dos produtos
<!-- CATALOGO:JS --> ... <!-- /CATALOGO:JS -->         lógica de filtros e paginação (não é tocada por 3-montar.mjs)
```

`3-montar.mjs` substitui o conteúdo entre `CATALOGO:MAIN` e `CATALOGO:DADOS` por
regex — não por número de linha — por isso continua a funcionar mesmo que
alguém edite outra parte do ficheiro entretanto (cabeçalho, rodapé, CSS). Só
não se deve editar à mão o que fica *dentro* desses dois blocos, porque a
próxima execução substitui tudo.

O aviso de desatualização que aparece na própria página (quando o catálogo
ao vivo em speculum.pt já não bate certo com os dados gravados) é um bloco à
parte, fora destes marcadores — fica em `produtos-catalogo.html`, não aqui.
