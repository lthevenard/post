# Guia rapido para novos exercicios

Este documento descreve onde ficam os modulos e como registrar novos exercicios sem quebrar o comportamento atual do app.

## Estrutura de pastas

- `apps/exercises/modules/dui/`
- `apps/exercises/modules/dur/`
- `apps/exercises/modules/game/`
- `apps/exercises/modules/about/`
- `apps/exercises/modules/shared/`

## Registro (registry)

- DUI: `apps/exercises/modules/dui/registry.js` exporta `DUI_METHODS`.
- DUR: `apps/exercises/modules/dur/registry.js` exporta `DUR_EXERCISES`.
- Game: `apps/exercises/modules/game/registry.js` exporta `GAME_EXERCISES`.

Para adicionar um novo exercicio, primeiro inclua a entrada correspondente no registry do grupo.

## Template

Use o arquivo `apps/exercises/modules/shared/exercise_template.js` como base para criar o modulo do novo exercicio.
Copie o template do grupo desejado (DUI, DUR ou Game) e ajuste os campos.

## Passos sugeridos para um novo exercicio

1. Crie um novo arquivo dentro do grupo correto (ex.: `apps/exercises/modules/dui/meu_metodo.js`).
2. Baseie o arquivo no template apropriado em `apps/exercises/modules/shared/exercise_template.js`.
3. Registre o exercicio no registry do grupo (ex.: `apps/exercises/modules/dui/registry.js`).
4. Atualize o fluxo do app para reconhecer o novo exercicio:
DUI: atualizar `apps/exercises/modules/dui/dui_methods.js` para incluir textos e explicacoes.
DUI: atualizar o bloco de selecao em `apps/exercises/index.js` que escolhe `solve*` e ajustes de tabela.
Game: atualizar `apps/exercises/index.js` para tratar novos tipos de exercicio de jogo.
DUR: criar a UI e o fluxo no `apps/exercises/index.js` quando o modulo estiver pronto.
5. Verifique reprodutibilidade: qualquer aleatoriedade deve usar o RNG com seed (`createSeededRng`).

## Observacoes

- O app ainda usa selecao por `exerciseType` no `apps/exercises/index.js`.
- O registry serve como fonte de verdade para nomes e labels e ajuda a organizar novos exercicios.
- Evite alterar arquivos fora de `apps/exercises/` sem um pedido explicito.
