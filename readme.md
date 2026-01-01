# Static Academic Website — Manual de Uso e Estrutura

Este repositório contém o código-fonte do meu site acadêmico estático bilíngue (PT/EN), hospedado via GitHub Pages, com conteúdo totalmente controlado por arquivos JSON.

O site foi projetado para:

- listar projetos de pesquisa, slides, posts de blog e publicações;
- suportar versões em português e inglês;
- manter consistência entre idiomas e entre diferentes tipos de conteúdo;
- permitir crescimento incremental sem alterar o código principal.

Este documento explica como os dados devem ser estruturados e como o site interpreta cada campo.

## Informações preliminares

### Estrutura Geral do Projeto

/
├─ index.html
├─ script.js
├─ styles.css
├─ projects/
│  └─ projects.json
├─ slides/
│  ├─ slides.json
│  └─ <slide-slug>/
│     ├─ index.html
│     └─ slides.pdf
├─ posts/
│  ├─ posts.json
│  └─ pt|en/
│     └─ *.md
├─ publications/
│  └─ publications.json
└─ README.md

### Convenção de Idiomas

Em todos os arquivos JSON, o campo:

``` json
"lang": "pt" | "en"
```


é obrigatório e controla:

- quais itens aparecem em cada versão do site;
- como funciona a troca de idioma.

⚠️ O valor deve ser exatamente "pt" ou "en" (case-sensitive).


### Identificadores: slug vs group

Uma distinção central do site:

- `slug`
    - Identificador técnico
    - Usado em: URLs, rotas (/project?slug=...), correspondência entre arquivos (ex.: slides → projetos)
    - Deve ser único dentro de cada idioma
- `group`
    - Identificador conceitual
    - Usado apenas para parear versões PT/EN do mesmo conteúdo
    - Nunca deve ser usado para rotas ou correspondência funcional

📌 Regra de ouro
- Correspondências funcionais usam `slug`.
- Apenas a troca de idioma usa `group`.

## Estruturas essenciais do site: Projetos, Slides, Posts, Publicações

Todas as funcionalidades do site são controladas via arquivos no formato `json` que listam e oferecem metadados sobre os projetos, slides, posts e publicações. Esses arquivos devem ser geridos manualmente pelo administrador do site.

### `projects/projects.json`

#### Estrutura de cada item

``` json
{
    "group": "regnum",
    "slug": "projeto-regnum",
    "lang": "pt",
    "title": "Regulação em Números",
    "description": "Materiais de apresentação e divulgação das pesquisas desenvolvidas no âmbito do projeto Regulação em Números da FGV Direito Rio.",
    "tags": ["regulação", "pesquisa empírica", "ciência de dados"]
}
```

#### Regras funcionais

- A página /projects lista apenas projetos que:
    1. estão no idioma atual (lang)
    2. possuem ao menos um slide ativo em `slides.json`
        - Para o vínculo ser verificado, `projects.slug` deve ser igual a `slides.project`

Um projeto não aparece se não tiver slides associados.

#### Troca de idioma

- O site procura outro projeto com o mesmo group
- Só redireciona se esse projeto existir e tiver slides

### `slides/slides.json`

Lista os decks de slides associados a projetos.

#### Estrutura de cada item

``` json
{
    "group": "regnum_research_gwrsc",
    "slug": "regnum_research_gwrsc",
    "title": "Academic research summary for GW's Regulatory Studies Center",
    "event": "Presentation at GWRSC – 2025",
    "date": "2025-09-30",
    "html": "regnum_research_gwrsc.html",
    "pdf": "regnum_research_gwrsc.pdf",
    "lang": "en",
    "project": "project-regnum",
    "archive": false
}
```

#### Campos críticos

- `project`
    - DEVE ser exatamente igual a projects.slug
    - Nunca usar group aqui
- `archive`
    - `true` → slide é ignorado em todas as listas

#### Regras funcionais

- A página /projects:
    - só exibe projetos cujo `slug` aparece em `slides.project`
    - exige `lang` igual e `archive !== true`
    - ordena slides por date (string)
        - 📌 Use sempre datas no formato YYYY-MM-DD

### `posts/posts.json`

Controla os posts do blog.

#### Estrutura de cada item

``` json
{
    "group": "2025-09-hello-world",
    "slug": "2025-09-hello-world-pt",
    "title": "Hello, World",
    "date": "2025-09-25",
    "tags": ["regulação", "dados", "participação"],
    "lang": "pt",
    "file": "posts/2025-09-hello-world.pt.md"
}
```

#### Regras funcionais

- A página /blog:
    - filtra apenas por lang
    - exige correspondência exata (slug, lang)
    - faz fetch(file) → o caminho precisa existir
- Troca de idioma:
    - usa group para encontrar a versão correspondente

### `publications/publications.json`

Lista artigos, relatórios, capítulos, repositórios etc.

#### Estrutura de cada item

``` json
{
    "type": "article",
    "title": "The Evolution of Normative Production of the Federal Revenue of Brazil (1988-2020): Empirical Analysis and Regulatory Implications",
    "authors": ["Lucas Thevenard", "Luiz Felipe Monteiro Seixas"],
    "date": "2023-12-11",
    "publication": "DIREITO GV L. Rev.",
    "url": "https://heinonline.org/hol-cgi-bin/get_pdf.cgi?handle=hein.journals/direlaw20&section=16",
    "lang": "en",
    "doi": "https://doi.org/10.1690/2317-6172202414",
    "cv": true
}
```

#### Tipos suportados

- Ordem fixa no site:
    - article
    - book-chapter
    - report
    - op-ed
    - repo

#### Regras funcionais

- O site usa um modo híbrido PT/EN:
    - se existir versão PT e EN do mesmo item → mostra só a do idioma atual
    - se existir só uma versão → mostra em ambos os idiomas
    - Para decidir “o mesmo item”, o site usa a seguinte prioridade:
        - group
        - doi
        - url
        - title (fallback)
            - 📌 Recomendação forte: sempre preencher group.
    - Além disso, a página CV mostra apenas publicações com publications.cv == true

## ✅ Boas Práticas (Checklist)

**Antes de dar deploy:**

[] Todo slides.project existe como projects.slug
[] Idiomas usam apenas "pt" ou "en"
[] Datas seguem YYYY-MM-DD
[] slug ≠ group (não confundir funções)
[] Slides que não devem aparecer estão com "archive": true
[] Posts apontam para arquivos .md existentes
[] Publicações possuem group consistente entre idiomas