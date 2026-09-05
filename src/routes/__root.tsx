import { HeadContent, Link, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";

import { SiteShell } from "#/components/site-shell";
import { portfolio } from "#/content/portfolio";
import appCss from "#/styles.css?url";

const themeScript = `
  (() => {
    try {
      const saved = localStorage.getItem('viveks-theme:v1');
      const theme = saved === 'dark' || saved === 'light'
        ? saved
        : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', theme === 'dark');
      document.documentElement.style.colorScheme = theme;
    } catch {}
  })();
`;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolio.person.name,
  jobTitle: "Founder and CTO",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    addressCountry: "US",
  },
  email: `mailto:${portfolio.person.email}`,
  url: "https://viveks.app",
  image: "https://viveks.app/vivek.jpg",
  description: portfolio.person.summary,
  knowsAbout: [
    "Product engineering",
    "React Native",
    "Realtime systems",
    "Payments",
    "Developer tools",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Arizona State University",
  },
  sameAs: [portfolio.social.github, portfolio.social.linkedin],
  worksFor: {
    "@type": "Organization",
    name: "GameStock",
    url: "https://gamestock.com",
  },
};

const structuredDataJson = JSON.stringify(structuredData).replaceAll("<", "\\u003c");

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: `${portfolio.person.name} — Founder, CTO, and product engineer` },
      {
        name: "description",
        content:
          "Founder and CTO of GameStock and Zen Shuttles. Product engineer building mobile, payments, realtime systems, and open-source React Native tools.",
      },
      { name: "theme-color", content: "#f4f1e8" },
      { name: "color-scheme", content: "light dark" },
      { name: "author", content: portfolio.person.name },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:site_name", content: portfolio.person.name },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://viveks.app/social-card.png" },
      { property: "og:image:alt", content: `${portfolio.person.name}, founder and CTO` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://viveks.app/social-card.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "preload", href: "/vivek.jpg", as: "image", type: "image/jpeg" },
      { rel: "me", href: portfolio.social.github },
      { rel: "me", href: portfolio.social.linkedin },
    ],
  }),
  component: () => (
    <SiteShell>
      <Outlet />
    </SiteShell>
  ),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
});

function NotFound() {
  return (
    <section className="shell empty-state">
      <p className="eyebrow">404 · Detour</p>
      <h1>This route doesn’t go anywhere.</h1>
      <p>The useful paths are still right where they should be.</p>
      <Link className="text-link" to="/">
        Return home
      </Link>
    </section>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{ __html: structuredDataJson }}
          type="application/ld+json"
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
