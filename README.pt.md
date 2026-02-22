# Static Academic Website — Manual de Uso e Estrutura

Leia em: [English](README.en.md)

Este repositório hospeda meu site acadêmico estático bilíngue (PT/EN). O site usa rotas por hash (`#/pt/...`, `#/en/...`), é totalmente orientado a dados via arquivos JSON e Markdown, e é publicado no GitHub Pages. Este documento descreve a estrutura do site e como fazer as atualizações de conteúdo mais comuns (posts, slides, publicações, CV, apps e a ilustração de capa).

## Mapa Rápido do Repositório

```
/
├─ index.html
├─ script.js
├─ styles.css
├─ apps/
│  ├─ apps.json
│  ├─ router.js
│  └─ <app-slug>/
├─ assets/
│  └─ img/
│     ├─ hero_gallery/
│     │  └─ hero.json
│     └─ <current-hero-images>
├─ cv/
│  ├─ cv.pt.md
│  └─ cv.en.md
├─ posts/
│  ├─ posts.json
│  └─ *.md
├─ publications/
│  ├─ articles.json
│  ├─ book-chapters.json
│  ├─ reports.json
│  ├─ op-eds.json
│  └─ repos.json
├─ projects/
│  └─ projects.json
├─ slides/
│  ├─ slides.json
│  ├─ archived/ (crie quando precisar)
│  └─ <slide-slug>/
```

## Apps Hospedados no Site

- Lotteries — [README](apps/lotteries/README.pt.md)

## Conceitos Centrais

### Idiomas

Todo o conteúdo é bilíngue. Em qualquer item JSON que use `lang`, utilize apenas `"pt"` ou `"en"` (case‑sensitive).

O comportamento de troca de idioma depende do tipo de conteúdo:

- Posts e Projetos: usam `group` para encontrar a versão correspondente no outro idioma.
- Publicações e Slides: usam uma **regra híbrida** (descrita abaixo) para mostrar a versão no idioma atual quando ambas existem, ou a única disponível quando só há uma.

### `slug` vs `group`

- `slug`: identificador técnico usado em URLs, nomes de arquivo e rotas. Deve ser único dentro do mesmo idioma.
- `group`: identificador conceitual usado apenas para parear as versões PT/EN do mesmo item.

Regra de ouro: rotas usam `slug`; pareamento de idioma usa `group`.

### Formato de data

Use `YYYY-MM-DD` em tudo (posts, slides, publicações). A ordenação é por data decrescente.

### Regra híbrida (Publicações e Slides)

Se o mesmo item existe em PT e EN, o site mostra apenas a versão do idioma atual. Se existe apenas uma versão, ela aparece em ambos os idiomas.

- Prioridade de chave em publicações: `group` → `doi` → `issn` → `url` → `title`.
- Prioridade de chave em slides: `group` → `slug` → `pdf`.

## Páginas do Site e Como Atualizá‑las

### Home (`#/pt` / `#/en`)

A Home tem três partes principais:

1. Texto de introdução (fixo em `script.js`, dentro de `i18n`).
2. “Ilustração do Mês” (hero image).
3. Posts mais recentes (últimos 3 posts do idioma atual).

#### Atualizando a ilustração de capa

- Edite `assets/img/hero_gallery/hero.json`.
- Adicione os arquivos de imagem:
  - Imagens atuais (ativas) ficam em `assets/img/`.
  - Imagens arquivadas ficam em `assets/img/hero_gallery/`.

Cada item em `hero.json`:

```
{
  "month": "YYYY-MM",
  "archived": false,
  "title": { "pt": "...", "en": "..." },
  "alt": { "pt": "...", "en": "..." },
  "base": { "pt": "filename-pt", "en": "filename-en" },
  "description": { "pt": "...", "en": "..." }
}
```

Notas:

- `base` é o nome do arquivo **sem extensão**. O site acrescenta `.webp` automaticamente.
- Se `archived: true`, a imagem é carregada de `assets/img/hero_gallery/`.
- Se `archived: false`, a imagem é carregada de `assets/img/`.
- Se não houver item do mês atual, o site usa o mais recente.

### Blog (`#/pt/blog`, `#/en/blog`)

Os posts são controlados por `posts/posts.json` e arquivos Markdown em `posts/`.

Exemplo de item:

```
{
  "group": "2026-01-meu-post",
  "slug": "2026-01-meu-post-en",
  "title": "Meu Post",
  "date": "2026-01-25",
  "tags": ["ai", "regulation"],
  "lang": "en",
  "file": "posts/2026-01-meu-post.en.md"
}
```

Regras:

- A lista do blog filtra por `lang`.
- A página do post carrega o Markdown indicado em `file`.
- A troca de idioma usa `group` (se não houver equivalente, redireciona para a lista do blog).

#### Adicionar um novo post

1. Crie um arquivo Markdown em `posts/`.
2. Adicione um item em `posts/posts.json`.

### Slides (`#/pt/slides`, `#/en/slides`)

Os slides são controlados por `slides/slides.json`. Cada slide pode ter um visualizador HTML e um PDF.

Exemplo de item:

```
{
  "group": "minha-palestra-2026",
  "slug": "minha-palestra-2026",
  "title": "Minha Palestra",
  "event": "Conferência 2026",
  "date": "2026-02-10",
  "html": "minha-palestra-2026.html",
  "pdf": "minha-palestra-2026.pdf",
  "lang": "en",
  "project": "project-slug",
  "archive": false
}
```

Regras:

- Um slide só aparece nas listagens **públicas** se `posted !== false` e `hide !== true` (padrão: visível).
- Slides ocultos: `hide: true` (não aparecem em `#/pt/slides` nem na página pública do projeto).
- Slides ativos: `archive: false`.
- Slides arquivados: `archive: true` e aparecem apenas em `#/pt/archived` ou `#/en/archived`.
- Se `pdf_url` existir, ele substitui o PDF local.
- Caminhos locais para slides ativos:
  - HTML: `slides/<slug>/<html>`
  - PDF: `slides/<slug>/<pdf>`
- Caminhos locais para slides arquivados:
  - PDF: `slides/archived/<pdf>`
  - Crie `slides/archived/` na primeira vez que precisar.

#### Área restrita (slides/projetos completos)

Há uma área restrita (não linkada no menu) que lista slides e projetos **incluindo** itens com `hide: true`.

1. Defina `SECRET_PASSWORD_SHA256` em `script.js` (hash SHA-256 em hex).
2. Gere o hash localmente com: `node tools/sha256.mjs "sua senha"`.
3. Acesse (onde `<lang>` é `pt` ou `en`):
   - `#/<lang>/secret`
   - `#/<lang>/secret-slides`
   - `#/<lang>/secret-projects`
   - `#/<lang>/secret-project?slug=<project-slug>`

O acesso é lembrado apenas durante a sessão/aba do navegador.

Obs.: isso não é segurança real (os arquivos continuam acessíveis por URL direta); é apenas “obscuridade” para evitar curiosos.

#### Adicionar um novo slide deck

1. Crie a pasta `slides/<slug>/`.
2. Coloque os arquivos `<html>` e `<pdf>` dentro dela.
3. Adicione um item em `slides/slides.json`.
4. Se o slide pertence a um projeto, defina `project` com o `slug` do projeto.

### Projetos (linkados a partir de Slides)

Projetos são definidos em `projects/projects.json`. A página de Projetos não está mais no menu principal, mas continua existindo e é linkada a partir da página de Slides.

Um projeto só aparece se tiver pelo menos um slide **ativo** com `slides.project === projects.slug`.

Obs.: na página pública, o slide também precisa ser **público** (`posted !== false` e `hide !== true`). Slides com `hide: true` só aparecem na área restrita (ver `script.js`).

Exemplo de item:

```
{
  "group": "regnum",
  "slug": "project-regnum",
  "lang": "en",
  "title": "Regulation in Numbers",
  "description": "...",
  "tags": ["regulation", "data science"]
}
```

### Publicações (`#/pt/publications`, `#/en/publications`)

As publicações são separadas por tipo e armazenadas em arquivos JSON distintos:

- `publications/articles.json`
- `publications/book-chapters.json`
- `publications/reports.json`
- `publications/op-eds.json`
- `publications/repos.json`

`publications/publications.json` é um arquivo legado e não é usado pelo código atual do site.

Todos os itens seguem um schema comum:

```
{
  "type": "article",
  "title": "...",
  "authors": ["..."],
  "date": "YYYY-MM-DD",
  "publication": "...",
  "url": "https://...",
  "lang": "pt",
  "doi": "...",
  "issn": "...",
  "group": "...",
  "cv": true
}
```

Notas:

- `type` deve corresponder ao arquivo onde o item está.
- `group` é fortemente recomendado quando há equivalentes PT/EN.
- Relatórios e capítulos/livros podem incluir `subtype_pt` e `subtype_en`, que aparecem como prefixos no UI.
- A página de Publicações é agrupada por tipo em seções colapsáveis.

### CV (`#/pt/cv`, `#/en/cv`)

A página de CV renderiza arquivos Markdown em `cv/`:

- `cv/cv.pt.md`
- `cv/cv.en.md`

Abaixo do texto do CV, o site mostra “Publicações selecionadas” usando itens com `"cv": true` nos arquivos de publicações. A mesma regra híbrida de idioma se aplica aqui.

### Apps (`#/pt/apps`, `#/en/apps`)

Os apps são listados em `apps/apps.json` e carregados sob demanda por `apps/router.js`. Cada app vive em sua própria pasta e deve exportar uma função `mountApp(mount, { lang })` em `apps/<slug>/index.js`.

Exemplo de item do catálogo:

```
{
  "slug": "lotteries",
  "title": { "pt": "Simulador de Loterias", "en": "Lottery Simulator" },
  "description": { "pt": "...", "en": "..." },
  "tags": { "pt": ["..."], "en": ["..."] },
  "status": "skeleton"
}
```

#### Adicionar um novo app

1. Crie `apps/<slug>/index.js` com `export async function mountApp(mount, { lang }) { ... }`.
2. Coloque quaisquer assets dentro da pasta do app.
3. Registre o app em `apps/apps.json`.
4. Adicione um README específico dentro da pasta do app, se necessário.

## Checklist de Manutenção

- `lang` sempre `pt` ou `en`.
- Datas em `YYYY-MM-DD` e ordenáveis.
- `group` é usado apenas para pareamento de idioma.
- Posts apontam para arquivos Markdown existentes.
- Slides referenciam HTML/PDF existentes ou usam `pdf_url`.
- Projetos só aparecem se tiverem slides ativos.
- Publicações ficam no arquivo do tipo correto.
- Itens do CV são marcados com `"cv": true`.
