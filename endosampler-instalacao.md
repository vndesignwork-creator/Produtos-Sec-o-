# Instalar a página melhorada da Microcureta Endosampler em speculum.pt

**Resultado:** quem abrir a ficha da Endosampler vê o cabeçalho, o login, o carrinho e o formulário "Peça mais informações" da loja, tal como hoje. A diferença é que vê também:

- a descrição curta nova;
- a fotografia oficial da MedGyn;
- as secções Características, Pensada ao pormenor, Modelos e Especificações, no lugar do texto traduzido automaticamente.

## O que enviar para o servidor

Envie estes ficheiros da pasta `speculum-site`:

| Ficheiro | Para onde (no servidor) |
|---|---|
| `endosampler.php` | `public_html/endosampler.php` |
| `images/products/endosampler-cureta-seringa.webp` | `public_html/images/products/` |
| `images/products/endosampler-montada.webp` | `public_html/images/products/` |
| `images/products/endosampler-ponta.webp` | `public_html/images/products/` |
| `images/products/endosampler-ii-ponta.webp` | `public_html/images/products/` |
| `images/products/endosampler-ficha-capa.webp` | `public_html/images/products/` |

Os passos no cPanel:

1. Entre no **cPanel** e abra o **Gestor de Ficheiros** (File Manager).
2. Entre na pasta `public_html`.
3. Clique em **Carregar** (Upload) e envie o `endosampler.php`.
4. Ainda dentro de `public_html`, crie a pasta `images`, e dentro dela a pasta `products`. Se já existirem, use as que lá estão.
5. Entre em `images/products` e carregue as 5 imagens.
6. Para confirmar, abra https://www.speculum.pt/endosampler.php no navegador. Deve ver a ficha da loja já com as secções novas. Nesta fase, a ficha antiga continua igual para toda a gente.

## Fazer a ficha antiga abrir a página nova (redirecionamento)

> **Não use o ecrã "Redirecionamentos" do cPanel para isto.** Esse ecrã não deixa pôr uma exceção, e é precisa uma. A página nova carrega a ficha antiga com `?embed=1`, e esse pedido não pode ser redirecionado, senão a página fica a abrir-se a si própria sem parar.

1. No **Gestor de Ficheiros**, em `public_html`, clique em **Definições** (Settings), no canto superior direito. Marque **Mostrar ficheiros ocultos** e guarde.
2. Clique com o botão direito no ficheiro `.htaccess` e escolha **Transferir** (Download). Assim fica com uma cópia de segurança.
3. Clique com o botão direito no `.htaccess` e escolha **Editar**.
4. Procure a linha `RewriteEngine On`. Cole estas linhas **logo a seguir** a ela:

```apache
# Endosampler: a ficha antiga abre a página melhorada (exceto quando é a própria página nova a pedi-la)
RewriteCond %{QUERY_STRING} !(^|&)embed=1(&|$)
RewriteRule ^pt/produtos/[^/]+/48457-[^/]*/?$ /endosampler.php [R=302,L]
```

5. Clique em **Guardar alterações**.
6. Abra https://www.speculum.pt/pt/produtos/574-microcuretas/48457-microcureta-endosampler. O endereço deve mudar para `/endosampler.php` e a página deve aparecer com as secções novas.

**Se algo correr mal**, apague as 3 linhas e guarde. O site volta logo a ficar como estava. Também pode carregar outra vez a cópia de segurança do passo 2.

Uso `302` (temporário) de propósito, para se poder desfazer sem problemas. Se ficar tudo bem durante umas semanas, pode trocá-lo por `301`.

## O que verificar depois de instalar

- A ficha mostra a descrição nova, com a lista de pontos, e a foto da cureta com a seringa.
- O botão **Peça mais informações**, o login e o carrinho funcionam como antes.
- Por baixo aparecem Características, o painel escuro Pensada ao pormenor e Modelos e referências. O cartão "Associado a:" não tapa nenhuma destas secções.
- Os Downloads (PDF MY0022720) continuam lá.
- Um clique noutro produto ou no menu abre essa página normalmente, e o endereço na barra muda.
- Se a ficha da loja não carregar, aparece um aviso com um link para a página original, e as secções novas continuam visíveis.

## Limitações a saber

- **Google:** o texto novo é acrescentado pelo navegador do visitante, dentro de uma moldura. Por isso o Google pode continuar a indexar sobretudo o texto antigo da ficha. Para isso mudar de vez, o texto tem de ser alterado na própria ficha, ou seja, na base de dados/Access que alimenta o catálogo.
- **Se a ficha da loja mudar de estrutura**, por exemplo com um novo desenho do site, a página continua a mostrar as secções novas. Pode, no entanto, deixar de trocar a descrição curta ou a foto. Nada parte; só deixa de haver substituição.
- **Atualizar o texto:** os textos estão todos dentro do `endosampler.php`, nas partes `descHtml` (descrição curta) e `html` (secções). Basta editar e voltar a carregar o ficheiro.
