# Como pôr a página dos monitores no site

Precisa de poder enviar ficheiros para o servidor do speculum.pt (o acesso que a GoFox ou quem trata do site usa).

**Antes de começar:** faça uma cópia do ficheiro `monitoresdesinaisvitais.html` que já está no servidor. Se algo correr mal, volta a pô-lo.

Escolha **uma** das duas formas.

---

## Forma A — Ficheiro + imagens (a mais limpa)

1. Envie o ficheiro **`monitoresdesinaisvitais.html`** para o mesmo sítio onde está a página actual.
2. Ao lado dele, crie uma pasta **`images`** e, dentro, uma pasta **`products`**.
3. Dentro de `products`, ponha estes 12 ficheiros (e só estes):
   - `edan-ix-serie.png`
   - `ix-angulo.jpg`
   - `ix-app-cchd.png`
   - `ix-app-ecg.png`
   - `ix-app-ews.png`
   - `ix-app-gcs.png`
   - `ix-cnbp.png`
   - `ix-conectividade.png`
   - `ix-detalhe.jpg`
   - `ix-ecra-tatil.jpg`
   - `ix-enfermaria.jpg`
   - `ix-ifast.png`

## Forma B — Só um ficheiro (mais rápida)

Aqui só há **um** ficheiro para enviar. As imagens não precisam de ir para o servidor, porque esta versão vai buscá-las a um serviço externo.

**Porque é preciso mudar o nome?** O endereço da página é o nome do ficheiro. A página que já está no ar chama-se `monitoresdesinaisvitais.html`. Se enviar o ficheiro com o nome `-cdn`, cria-se uma página nova com outro endereço, e a antiga fica como está. Dando-lhe o nome certo, ele substitui a antiga.

**O mais simples é mudar o nome no seu computador, antes de enviar:**

1. Encontre o ficheiro **`monitoresdesinaisvitais-cdn.html`** no seu computador.
2. Clique nele com o botão direito e escolha **Mudar o nome** (ou clique nele uma vez e carregue em **F2**).
3. Apague o `-cdn`, para ficar só **`monitoresdesinaisvitais.html`**, e carregue em **Enter**.
4. Envie esse ficheiro para o servidor, para **o mesmo sítio onde está a página actual**.
5. Quando o programa avisar que **já existe um ficheiro com esse nome**, escolha **Substituir** (ou "Overwrite").

*Se o Windows não mostrar o `.html` no fim do nome, não se preocupe: apague só o `-cdn`, e o resto fica como está.*

**Já tinha guardado a cópia da página antiga?** Faça-o antes do passo 5. É o seu seguro: se algo correr mal, volta a pôr essa cópia.

---

## Confirmar que ficou bem

1. Abra **www.speculum.pt/monitoresdesinaisvitais.html**.
2. Carregue em **Ctrl + F5** para ignorar a memória do navegador.
3. Percorra a página. Todas as imagens têm de aparecer.

**Se aparecerem ícones de imagem partida:** na Forma A, as imagens estão no sítio errado. Confirme que a pasta `images` está ao lado do ficheiro. Se não conseguir resolver, use a Forma B.
