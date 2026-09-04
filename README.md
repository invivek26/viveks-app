# viveks.app

The personal site of [Vivek Indlebele Narasimha Prasad](https://viveks.app): founder, CTO, and product engineer.

Built with TanStack Start, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Bun, Oxlint, and Oxfmt. Deployed on Vercel.

## Develop

```bash
bun ci
bun run dev
```

## Verify

```bash
bun run check
bun test
bun run build
bun run doctor
```

## Customize

All public content lives in [`src/content/portfolio.ts`](src/content/portfolio.ts). Replace that file plus the personal
assets in `public/` to adapt the site for someone else. Layout, routes, metadata, and the web resume read from the same
typed content module.

Optional PostHog values are documented in `.env.example`. Analytics loads after the page becomes interactive, stays
cookieless, disables person profiles and session replay, and captures only explicitly named interactions.

## Delivery

Pull requests run Oxfmt, Oxlint, TypeScript, tests, a production build, and React Doctor. Vercel creates preview
deployments for branches and publishes `main` to production.

## License

Code is available under the [MIT License](LICENSE). Personal content, identity, resume, photography, and brand assets are
excluded; see [NOTICE.md](NOTICE.md).
