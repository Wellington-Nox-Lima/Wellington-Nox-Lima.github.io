# Wellington José de Lima · Portfólio

Site pessoal em `Next.js 15 + React 19 + Tailwind CSS 3`, exportado como estático e publicado no GitHub Pages.

## Estrutura

```text
app/          layout (fontes, metadados, script de tema), página e ícone
components/   uma seção por arquivo (Hero, Results, Deliveries, Method, Timeline, Contact)
data/         portfolio.ts: todo o texto do site
public/       og.png (imagem de compartilhamento) e imagens dos projetos
```

## Editar o conteúdo

Todo o texto fica em `data/portfolio.ts`. Os componentes só cuidam da apresentação.

O site apresenta resultados (antes → hoje) do trabalho todo, não atividade e não só a migração. Número só
entra com fonte: tempos medidos na operação, código, spec ou levantamento em produção. Sem detalhe técnico:
o que é específico entra como uma linha na lista da sua área.

O site é público: não entram números de PR, nomes de produto interno, de clientes ou de concorrentes.

## Identidade visual

- Fontes: Geist e Geist Mono (`next/font/google`, baixadas no build).
- Cores: tokens em `app/globals.css` (`--bg`, `--surface`, `--ink`, `--muted`, `--line`, `--accent`…), com
  versão clara e escura. O tema segue o sistema até a pessoa escolher no botão do cabeçalho.
- Monograma WL em `components/Logo.tsx` e `app/icon.svg`.
- `public/og.png` é a imagem que aparece ao compartilhar o link (1200×630).

## Executar localmente

```bash
npm ci
npm run dev
```

## Build de produção

```bash
npm run build
```

Gera o site estático em `out/`.

## Publicação

O workflow `.github/workflows/deploy-pages.yml` publica a cada push na `main`
(Settings › Pages › Source: GitHub Actions).
