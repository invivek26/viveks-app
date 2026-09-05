# Repository guidance

- Use Bun for dependency management and scripts. Commit `bun.lock`.
- Treat `src/content/portfolio.ts` as the canonical source for reusable profile data, metrics, roles, dates, and links; do not introduce a second content store.
- Do not edit `src/routeTree.gen.ts`; regenerate it with `bun run generate-routes`.
- Use Oxfmt and Oxlint. Do not add Prettier, ESLint, or Biome.
- Prefer semantic HTML, native browser behavior, and CSS over JavaScript or new dependencies.
- Preserve keyboard access, visible focus, reduced-motion behavior, and mobile layouts.
- Analytics must remain anonymous, cookieless, and free of session replay or personal profiles.
- Before shipping, run `bun run check`, `bun run test`, `bun run qa`, `bun run build`, and `bun run doctor`.
