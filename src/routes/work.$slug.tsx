import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { Button } from "#/components/ui/button";
import { getWork } from "#/content/portfolio";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const work = getWork(params.slug);
    if (!work) throw notFound();
    return work;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Vivek Indlebele` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: `${loaderData.name} — ${loaderData.descriptor}` },
          { property: "og:description", content: loaderData.summary },
        ]
      : [],
    links: loaderData
      ? [{ rel: "canonical", href: `https://viveks.app/work/${loaderData.slug}` }]
      : [],
  }),
  component: WorkCaseStudy,
});

function WorkCaseStudy() {
  const work = Route.useLoaderData();

  return (
    <article className={`case-study case-${work.accent}`}>
      <header className="shell case-hero">
        <Link className="back-link" to="/">
          <ArrowLeft aria-hidden="true" /> All work
        </Link>
        <div className="case-intro">
          <div>
            <p className="eyebrow">{work.descriptor}</p>
            <h1>{work.name}</h1>
            <p className="case-summary">{work.summary}</p>
          </div>
          <div className="case-role">
            <dl>
              <div>
                <dt>Role</dt>
                <dd>{work.role}</dd>
              </div>
              <div>
                <dt>Period</dt>
                <dd>{work.period}</dd>
              </div>
              <div>
                <dt>Based</dt>
                <dd>{work.location}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="case-visual" aria-hidden="true">
          <span>{work.heroMetric}</span>
          <p>{work.heroLabel}</p>
          <div className="case-track" />
        </div>
      </header>

      <section className="shell case-section case-narrative">
        <div>
          <p className="eyebrow">The challenge</p>
          <h2>A real system, not a demo.</h2>
        </div>
        <p>{work.challenge}</p>
      </section>

      <section className="shell case-section case-narrative">
        <div>
          <p className="eyebrow">My contribution</p>
          <h2>Product thinking through production engineering.</h2>
        </div>
        <p>{work.contribution}</p>
      </section>

      <section aria-label="Selected outcomes" className="case-proof">
        <dl className="shell case-stats">
          {work.outcomes.map((outcome) => (
            <div key={outcome.label}>
              <dd>{outcome.value}</dd>
              <dt>{outcome.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="shell case-section case-build">
        <div>
          <p className="eyebrow">What shipped</p>
          <h2>The work behind the outcomes.</h2>
        </div>
        <ul>
          {work.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </section>

      <section className="shell case-section case-stack">
        <div>
          <p className="eyebrow">Selected systems</p>
          <h2>Tools in service of the product.</h2>
        </div>
        <ul aria-label="Technologies">
          {work.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="shell case-cta">
        <div>
          <p className="eyebrow">Go deeper</p>
          <h2>See the public record.</h2>
        </div>
        <div className="case-links">
          {work.links.map((link) => (
            <Button
              asChild
              className="secondary-button"
              key={link.href}
              size="lg"
              variant="outline"
            >
              <a href={link.href} rel="noreferrer" target="_blank">
                {link.label} <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          ))}
        </div>
      </section>
    </article>
  );
}
