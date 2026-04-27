# Portfolio Profissional

Portfolio em `Next.js + React + Tailwind CSS` com foco em apresentacao tecnica, experiencia pratica e posicionamento profissional para atuacao em sistemas corporativos.

## Estrutura

```text
app/
components/
data/
public/images/
```

## Personalizacao

Edite `data/portfolio.ts` para substituir:

- `[SEU NOME]`
- `[SEU EMAIL]`
- `[SEU LINKEDIN]`
- `[SEU GITHUB]`
- `[SUA LOCALIZACAO]`
- `[ADICIONAR EMPRESA / PERIODO]`
- `[ADICIONAR PERIODO]`

Os textos, projetos, stack e experiencia principal tambem estao centralizados nesse arquivo.

## Executar localmente

```bash
npm install
npm run dev
```

## Build de producao

```bash
npm run build
npm run start
```

## GitHub Pages

O projeto foi preparado para exportacao estatica em `out/` e deploy automatico por GitHub Actions.

### O que ja esta pronto

- `next.config.ts` com `output: "export"`
- suporte a `basePath` automatico para repositorios do GitHub Pages
- workflow em `.github/workflows/deploy-pages.yml`
- assets ajustados para funcionar em `username.github.io/repo`

### Como publicar

1. Suba o projeto para um repositorio no GitHub.
2. Garanta que a branch principal seja `main`.
3. No GitHub, abra `Settings > Pages`.
4. Em `Source`, selecione `GitHub Actions`.
5. Faça push na branch `main`.
6. Aguarde o workflow `Deploy GitHub Pages` terminar.

Se o repositorio for `username.github.io`, o site sera publicado na raiz.
Se o repositorio tiver outro nome, o projeto ja ajusta automaticamente os caminhos para publicar em `/nome-do-repositorio`.
