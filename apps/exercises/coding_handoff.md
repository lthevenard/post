# Coding Handoff — Decision Theory Exercises App

Este documento resume o estado atual do app de exercícios e serve como contexto inicial para retomar o desenvolvimento em outro chat.

## Estado atual (resumo)
- App principal: `/Users/lucasthevenard/Repo/post/apps/exercises/`
- Entrypoint: `/Users/lucasthevenard/Repo/post/apps/exercises/index.js`
- Estilos: `/Users/lucasthevenard/Repo/post/apps/exercises/styles.css`
- Registro do app no site: `/Users/lucasthevenard/Repo/post/apps/apps.json`

A home atualmente contempla 8 cards (7 modalidades + Sobre), com suporte para ocultar/exibir via arquivo de configuração.

## Módulos existentes
- DUI (métodos):
  - `/Users/lucasthevenard/Repo/post/apps/exercises/modules/dui/dui_methods.js`
- DUI (novo exercício):
  - `/Users/lucasthevenard/Repo/post/apps/exercises/modules/dui/build_table.js`
- DUI (placeholder):
  - `/Users/lucasthevenard/Repo/post/apps/exercises/modules/dui/optimism.js`
- DUR (árvores):
  - `/Users/lucasthevenard/Repo/post/apps/exercises/modules/dur/solve_trees.js`
- DUR (valor esperado/loterias):
  - `/Users/lucasthevenard/Repo/post/apps/exercises/modules/dur/expected_value.js`
- Game (Nash):
  - `/Users/lucasthevenard/Repo/post/apps/exercises/modules/game/nash_equilibrium.js`
- Game (placeholder):
  - `/Users/lucasthevenard/Repo/post/apps/exercises/modules/game/classic_games.js`
- Shared:
  - `/Users/lucasthevenard/Repo/post/apps/exercises/modules/shared/ui.js`
  - `/Users/lucasthevenard/Repo/post/apps/exercises/modules/shared/utils.js`
  - `/Users/lucasthevenard/Repo/post/apps/exercises/modules/shared/decision_tree.js`
  - `/Users/lucasthevenard/Repo/post/apps/exercises/modules/shared/exercise_visibility.js`

## Novo controle de publicação (mostrar/ocultar cards da home)
Arquivo de configuração:
- `/Users/lucasthevenard/Repo/post/apps/exercises/modules/shared/exercise_visibility.js`

Chave principal:
- `HOME_CARD_VISIBILITY`

Exemplo:
```js
export const HOME_CARD_VISIBILITY = {
  dui: true,
  dui_build_table: true,
  dui_optimism: false,
  dur: true,
  ev: true,
  game: true,
  game_classic: false,
  about: true,
};
```

Comportamento implementado:
- Se `false`, o card não aparece na home.
- Navegação para painel oculto é bloqueada no `setMainPanel` (fallback para `home`).
- Não remove o painel do DOM; apenas suprime acesso pela interface e por chamadas de navegação internas.

## Home / UI
- Home com visual "night" + camada de vidro fosco e formas orgânicas.
- Header escuro aplicado também nas páginas internas (com ajustes de sombra no interno).
- Botão "Selecionar outro exercício" com hover roxo escuro e borda iluminada.
- Cantos e contornos do app respeitando o container arredondado.

## Seed e reprodutibilidade
- Seed continua obrigatória nos exercícios que já usam aleatoriedade.
- Modo auto/manual com seed de 5 dígitos nos painéis relevantes.
- Sempre usar `createSeededRng` de `/Users/lucasthevenard/Repo/post/apps/exercises/modules/shared/utils.js` para preservar reprodutibilidade.

## Exercício DUR: Valor Esperado (estado atual)
- Suporta múltiplas modalidades:
  - Avaliar uma Loteria
  - Encontre o Payoff
  - Encontre as Probabilidades
  - Proponha uma Loteria
- Ajustes já implementados:
  - enunciados PT/EN e placeholders iniciais de abas
  - estrutura de caixa para problema/solução
  - caixa explicativa de valor esperado e caixa extra de desvio padrão
  - correções de layout para evitar overflow de LaTeX
  - alinhamentos e cores específicas para `Ve`, `x`, `p1`, `p2`

## Exercício DUR: Árvore de Decisão (estado atual)
- Aba Exercício com título "Problema" + enunciado + árvore em caixa.
- Aba Solução com:
  - caixa "Árvore Resolvida"
  - caixa separada "Cálculo da solução"
  - subtítulos condicionais (mostra somente quando há nós daquele tipo)
  - organização de resultado final conforme empate/indiferença
- Ajustes de responsividade para árvore e conteúdo em LaTeX.

## Exercício DUI: Métodos de Solução (estado atual)
- Métodos implementados:
  - Maximin (com léxico)
  - Minimax (arrependimento, com léxico)
  - Regra de Otimismo-Pessimismo
  - Princípio da Razão Insuficiente
- Explicações dinâmicas em caixas recolhíveis (PT/EN).

## Exercício DUI: Construa a Tabela (estado atual)
- Arquivo de textos: `/Users/lucasthevenard/Repo/post/apps/exercises/modules/dui/build_table.js`
- Fluxo implementado:
  - escolha entre Tabela 3x3 e Tabela 4x4 (radio)
  - geração de tabela editável
  - no 4x4, campo extra de nível de otimismo (0 a 1)
  - botão "Verificar Resposta" desabilitado até preenchimento válido
- Aba "Verificar Resposta":
  - retângulo central de status "Certo"/"Errado"
  - card de solução com decisão encontrada por método
  - frase final dinâmica explicando acerto/erro (empates e decisões duplicadas)
  - caixas de explicação dos métodos (reaproveitadas de DUI métodos)
- Estilo do retângulo de status:
  - grande, até 500px, sem cantos arredondados
  - sombra reduzida
  - animação lenta de variação de tom verde/vermelho

## Placeholders criados (ainda sem lógica completa)
- DUI: Nível de Otimismo (`dui_optimism`)
- Game: Jogos Clássicos (`game_classic`)

## Convenções de implementação acordadas
- Não alterar fora de `apps/exercises/` sem pedido explícito.
- Manter paridade desktop/mobile nas caixas de explicação e subtabs.
- Ao trocar de exercício pelo botão de retorno, limpar estado gerado e inputs.

## Arquivos mais frequentes para continuar o trabalho
- `/Users/lucasthevenard/Repo/post/apps/exercises/index.js`
- `/Users/lucasthevenard/Repo/post/apps/exercises/styles.css`
- `/Users/lucasthevenard/Repo/post/apps/exercises/modules/dui/dui_methods.js`
- `/Users/lucasthevenard/Repo/post/apps/exercises/modules/dui/build_table.js`
- `/Users/lucasthevenard/Repo/post/apps/exercises/modules/dur/expected_value.js`
- `/Users/lucasthevenard/Repo/post/apps/exercises/modules/dur/solve_trees.js`
- `/Users/lucasthevenard/Repo/post/apps/exercises/modules/shared/exercise_visibility.js`

## Próximo passo sugerido
- Implementar a lógica completa de validação/solução para os placeholders `dui_optimism` e `game_classic`, mantendo o mesmo padrão de UX usado nos demais exercícios.
