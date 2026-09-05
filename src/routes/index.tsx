import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Calendar, Download, MapPin } from "lucide-react";

import { HeroSignal } from "#/components/hero-signal";
import { Button } from "#/components/ui/button";
import { portfolio } from "#/content/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${portfolio.person.name} — I build products that move` },
      {
        name: "description",
        content:
          "Founder, CTO, and product engineer behind GameStock, Zen Shuttles, and open-source React Native tools.",
      },
      { property: "og:title", content: `${portfolio.person.name} — I build products that move` },
      { property: "og:description", content: portfolio.person.summary },
    ],
    links: [{ rel: "canonical", href: "https://viveks.app/" }],
  }),
  component: Home,
});

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="section-heading reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="shell hero">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">Founder · CTO · Product engineer</p>
          <h1>
            I build products
            <span>that move.</span>
          </h1>
          <p className="hero-summary">{portfolio.person.summary}</p>
          <div className="hero-actions">
            <Button asChild className="primary-button" size="lg">
              <a href="#work">
                Explore selected work <ArrowRight aria-hidden="true" />
              </a>
            </Button>
            <Button asChild className="secondary-button" size="lg" variant="outline">
              <Link to="/connect">
                Connect <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="hero-meta">
            <span>
              <MapPin aria-hidden="true" /> San Francisco, CA
            </span>
            <span className="availability-dot">Building GameStock</span>
          </div>
        </div>

        <div className="portrait-wrap reveal">
          <div className="portrait-frame">
            <img
              alt="Vivek Indlebele smiling in an office"
              height="1080"
              src="/vivek.jpg"
              width="1080"
            />
          </div>
          <div className="portrait-note">
            <span>Currently</span>
            <strong>Founder & CTO at GameStock</strong>
          </div>
        </div>

        <HeroSignal />
      </section>

      <section aria-label="Selected outcomes" className="proof-strip">
        <dl className="shell stats-grid">
          {portfolio.stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="shell section" id="work">
        <SectionHeading
          copy="Two companies, one recurring job: turn a messy real-world system into a product people trust."
          eyebrow="Selected work"
          title="Built from zero, measured in the real world."
        />
        <div className="work-grid">
          {portfolio.work.map((work, index) => (
            <article className={`work-card work-${work.accent} reveal`} key={work.slug}>
              <div className="work-card-topline">
                <span>0{index + 1}</span>
                <span>{work.period}</span>
              </div>
              <div>
                <p className="work-descriptor">{work.descriptor}</p>
                <h3>{work.name}</h3>
                <p>{work.summary}</p>
              </div>
              <div className="work-card-proof">
                <strong>{work.heroMetric}</strong>
                <span>{work.heroLabel}</span>
              </div>
              <Link
                className="card-link"
                data-analytics="work_opened"
                data-analytics-label={work.name}
                params={{ slug: work.slug }}
                to="/work/$slug"
              >
                Read the story <ArrowRight aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="method-section">
        <div className="shell section">
          <SectionHeading
            eyebrow="How I build"
            title="Across the whole product, without losing the thread."
          />
          <ol className="capability-list">
            {portfolio.capabilities.map((capability) => (
              <li className="reveal" key={capability.number}>
                <span>{capability.number}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell section open-source-preview">
        <SectionHeading
          copy="Small native modules for problems I wanted solved properly."
          eyebrow="Open source"
          title="The useful parts escape into packages."
        />
        <div className="package-stack">
          {portfolio.openSource.map((item) => (
            <article className="package-row reveal" key={item.packageName}>
              <div>
                <span className="package-name">{item.packageName}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
              <div className="package-stat">
                <strong>{item.downloads}</strong>
                <span>downloads</span>
              </div>
              <a
                aria-label={`${item.name} on npm`}
                data-analytics="npm_package_opened"
                data-analytics-label={item.packageName}
                href={item.npm}
                rel="noreferrer"
                target="_blank"
              >
                <ArrowUpRight aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
        <Link className="text-link" to="/open-source">
          Try the interactive demos <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="shell section now-section">
        <div className="now-card reveal">
          <p className="eyebrow">Now</p>
          <h2>Building markets, native interactions, and the systems behind both.</h2>
          <p>
            I’m leading GameStock and maintaining open-source React Native packages. I’m always
            interested in ambitious products, strange technical problems, and people who care about
            craft.
          </p>
          <div className="now-actions">
            <Button asChild className="primary-button" size="lg">
              <Link to="/connect">
                Start a conversation <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <a
              className="download-link"
              data-analytics="resume_downloaded"
              download
              href="/vivek-resume.pdf"
            >
              <Download aria-hidden="true" /> Download résumé
            </a>
            <a
              className="download-link"
              data-analytics="calendly_opened"
              href={portfolio.person.calendly}
              rel="noreferrer"
              target="_blank"
            >
              <Calendar aria-hidden="true" /> Find a time
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
