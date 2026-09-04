import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";

import { Button } from "#/components/ui/button";
import { portfolio } from "#/content/portfolio";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Résumé — Vivek Indlebele Narasimha Prasad" },
      {
        name: "description",
        content:
          "Résumé of Vivek Indlebele Narasimha Prasad, founder, CTO, and product software engineer.",
      },
    ],
    links: [{ rel: "canonical", href: "https://viveks.app/resume" }],
  }),
  component: Resume,
});

function Resume() {
  return (
    <article className="shell inner-page resume-page">
      <header className="resume-header">
        <div>
          <p className="eyebrow">Résumé</p>
          <h1>{portfolio.person.name}</h1>
          <p>{portfolio.person.headline}</p>
        </div>
        <Button asChild className="primary-button" size="lg">
          <a data-analytics="resume_downloaded" download href="/vivek-resume.pdf">
            Download PDF <Download aria-hidden="true" />
          </a>
        </Button>
      </header>

      <div className="resume-contact" aria-label="Contact links">
        <span>{portfolio.person.location}</span>
        <a href={`mailto:${portfolio.person.email}`}>
          <Mail aria-hidden="true" /> {portfolio.person.email}
        </a>
        <a href={portfolio.social.linkedin} rel="noreferrer" target="_blank">
          <Linkedin aria-hidden="true" /> LinkedIn
        </a>
        <a href={portfolio.social.github} rel="noreferrer" target="_blank">
          <Github aria-hidden="true" /> GitHub
        </a>
      </div>

      <section className="resume-summary">
        <h2>Summary</h2>
        <p>
          Hands-on founder and software engineer building production systems across mobile, backend,
          payments, analytics, and release engineering. Co-founded two startups, scaled GameStock
          past 20K accounts, and maintains React Native packages with 16K+ cumulative npm downloads.
        </p>
      </section>

      <section className="resume-section">
        <h2>Experience</h2>
        <div className="resume-entries">
          {portfolio.work.map((work) => (
            <article className="resume-entry" key={work.slug}>
              <header>
                <div>
                  <h3>{work.name}</h3>
                  <p>{work.role}</p>
                </div>
                <div>
                  <strong>{work.period}</strong>
                  <span>{work.location}</span>
                </div>
              </header>
              <p>{work.summary}</p>
              <ul>
                {work.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2>Selected open source</h2>
        <div className="resume-packages">
          {portfolio.openSource.map((item) => (
            <article key={item.packageName}>
              <h3>
                <a href={item.github} rel="noreferrer" target="_blank">
                  {item.name} <ArrowUpRight aria-hidden="true" />
                </a>
              </h3>
              <p>{item.description}</p>
              <span>{item.downloads} npm downloads</span>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-section resume-two-column">
        <div>
          <h2>Education</h2>
          {portfolio.education.map((item) => (
            <article className="education-entry" key={item.degree}>
              <h3>{item.degree}</h3>
              <p>{item.school}</p>
              <span>
                {item.period} · {item.detail}
              </span>
            </article>
          ))}
        </div>
        <div>
          <h2>Technical skills</h2>
          {Object.entries(portfolio.skills).map(([group, skills]) => (
            <div className="skill-group" key={group}>
              <h3>{group}</h3>
              <p>{skills.join(", ")}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
