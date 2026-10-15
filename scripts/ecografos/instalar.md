# Como pôr as páginas dos ecógrafos no site speculum.pt

Este pacote atualiza a página **Ecógrafos** e a página do **R20**, e acrescenta uma página para cada modelo Samsung.

Para o fazer, precisa de poder enviar ficheiros para o servidor do speculum.pt. É o mesmo acesso que a GoFox, ou quem trata do site, usa para pôr páginas como a `ecografos.html` ou a `monitoresdesinaisvitais.html`. O programa pode ser o FileZilla ou outro do mesmo género.

---

## O que vai no pacote

Dentro da pasta **`site`** está tudo o que vai para o servidor, já arrumado como deve ficar.

| Ficheiro | Endereço no site | O que é |
|---|---|---|
| `ecografos.html` | www.speculum.pt/ecografos.html | Lista dos ecógrafos (**substitui** a atual) |
| `rs20.html` | www.speculum.pt/rs20.html | Página do R20 (**substitui** a atual) |
| `samsung-hera-z20.html` | www.speculum.pt/samsung-hera-z20.html | HERA Z20 (nova) |
| `samsung-q10-evo.html` | www.speculum.pt/samsung-q10-evo.html | Q10 EVO (nova) |
| `samsung-v8.html` | www.speculum.pt/samsung-v8.html | V8 (nova) |
| `samsung-v7.html` | www.speculum.pt/samsung-v7.html | V7 (nova) |
| `samsung-v6.html` | www.speculum.pt/samsung-v6.html | V6 (nova) |
| `samsung-v5.html` | www.speculum.pt/samsung-v5.html | V5 (nova) |
| `samsung-hs40.html` | www.speculum.pt/samsung-hs40.html | HS40 (nova) |
| `samsung-hs30.html` | www.speculum.pt/samsung-hs30.html | HS30 (nova) |
| `samsung-cv.html` | www.speculum.pt/samsung-cv.html | Gama CV: CV7, CV6 e CV5 (nova) |
| pasta `images/ecografos` | — | Imagens das páginas acima, organizadas por modelo |
| pasta `images/products` | — | Imagens da página do R20 |

---

## Passo 1 — Guardar uma cópia do que lá está

Antes de mexer em nada, descarregue do servidor para o seu computador estes dois ficheiros, que vão ser substituídos:

- `ecografos.html`
- `rs20.html`

Guarde-os numa pasta com a data de hoje. É o seu seguro: se algo correr mal, basta voltar a pô-los no servidor.

## Passo 2 — Enviar os ficheiros

1. No servidor, abra a pasta onde está o `ecografos.html` atual. É a raiz do site, a mesma pasta onde está o `rs20.html`.
2. No seu computador, abra a pasta **`site`** do pacote.
3. Selecione **tudo** o que está dentro de `site`, ou seja, os 11 ficheiros `.html` e a pasta `images`, e envie para essa pasta do servidor.
4. O programa vai avisar que já existem alguns ficheiros com o mesmo nome:
   - Para **`ecografos.html`** e **`rs20.html`**, escolha **Substituir** (ou "Overwrite").
   - Se perguntar pela pasta **`images`**, escolha **juntar** ou **substituir** os ficheiros. Isto só acrescenta as pastas `ecografos` e alguns ficheiros `r20-…` dentro de `products`, e não apaga nada do que já lá está.

**Importante:** a pasta `images` tem de ficar **ao lado** dos ficheiros `.html`, e não dentro de outra pasta. No servidor deve ficar assim:

```
(raiz do site)
├── ecografos.html
├── rs20.html
├── samsung-hera-z20.html
├── samsung-…html
└── images
    ├── ecografos
    │   ├── comum
    │   ├── cv
    │   ├── hera-z20
    │   ├── hs30
    │   ├── hs40
    │   ├── lista
    │   ├── q10-evo
    │   ├── v5
    │   ├── v6
    │   ├── v7
    │   └── v8
    └── products
        ├── r20-cabos-flex.webp
        ├── r20-ecografo-frontal.webp
        ├── r20-ergo-corpo-inteiro.webp
        ├── r20-ergo-vista-frontal.webp
        └── r20-hero-studio.png
```

---

## Passo 3 — Confirmar que ficou bem

1. Abra **www.speculum.pt/ecografos.html** e carregue em **Ctrl + F5**, para o navegador não mostrar a versão guardada.
2. Na lista devem aparecer **12 ecógrafos**, todos com fotografia: HERA Z20, Q10 EVO, R20, V8, V7, V6, V5, HS40, HS30, CV7, CV6 e CV5.
3. Experimente os filtros por área clínica, no topo da lista.
4. Em cada cartão, clique na **seta →**. Deve abrir a página do modelo, com as imagens todas. O outro botão (↗) abre a página oficial do modelo no site da Samsung.
5. Abra **www.speculum.pt/rs20.html** e confirme que o menu e o rodapé são iguais aos do resto do site.
6. Veja também uma ou duas páginas no telemóvel.

**Se aparecerem imagens partidas:** a pasta `images` não ficou no sítio certo. Confirme que está ao lado dos ficheiros `.html`, como no esquema acima, e que lá dentro há as pastas `ecografos` e `products`.

---

## Bom saber

- **Catálogos em PDF e botões "Site oficial":** levam a ficheiros e páginas do site da Samsung e de catálogos já existentes no speculum.pt. Não é preciso enviar PDFs.
- **Menu "Produtos":** nestas páginas leva a www.speculum.pt/pt/produtos, como no menu atual.
- **RS85 Prestige e HERA W10 Elite:** deixaram de aparecer na lista de ecógrafos, e o pacote não tem página para eles.
- **Páginas antigas** como `hs40.html` e `hs40obgyn.html`: este pacote não lhes mexe e continuam como estão. A nova lista de ecógrafos já não aponta para elas.

## Se for preciso voltar atrás

1. Volte a enviar para o servidor as cópias do `ecografos.html` e do `rs20.html` guardadas no Passo 1, substituindo as novas.
2. Pode apagar as páginas `samsung-….html` e a pasta `images/ecografos`. Ninguém chega a elas sem a nova lista de ecógrafos.
3. Os ficheiros `r20-…` em `images/products` podem ficar, porque não interferem com nada.
