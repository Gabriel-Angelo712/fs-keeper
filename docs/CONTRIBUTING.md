# Contribuindo com a fs-keeper

Obrigado por querer contribuir! Este documento explica como fazer isso.

## Código de conduta
Seja respeitoso. Não é tolerado comportamento tóxico.

## Como reportar bugs
Abra uma issue com:
    1. Passos para reproduzir.
    2. Comportamento esperado vs atual.
    3. Versão do Node: `node -v`.
    4. Sistema Operacional.

## Como sugerir features
Abra uma issue com tag `enhancement` explicando o problema e a solução proposta.

## Padrão de commits
O projecto utiliza convenção de commits para mater o histórico limpo:
    - `feat:` nova funcionalidade
    - `fix:` correção de bug
    - `docs:` mudança na documentação
    - `refactor:` refatoração (sem mudar o comportamento de nenhuma feature)

Ex: `feat: adiciona flag --recursive`

Rodando o projeto localmente
```bash
    git clone https://github.com/Gabriel-Angelo712/fs-keeper.git
    cd fs-keeper
    npm link
    fs-keeper ./<Nome_Do_Diretório>