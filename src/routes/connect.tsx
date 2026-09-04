import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Calendar, Coffee, Github, Linkedin, Mail, MapPin } from "lucide-react";

import { portfolio } from "#/content/portfolio";

export const Route = createFileRoute("/connect")({
  head: () => ({
    meta: [
      { title: "Connect — Vivek Indlebele" },
      {
        name: "description",
        content:
          "Connect with Vivek Indlebele by email, Calendly, LinkedIn, GitHub, or over coffee in San Francisco.",
      },
    ],
    links: [{ rel: "canonical", href: "https://viveks.app/connect" }],
  }),
  component: Connect,
});

const options = [
  {
    title: "Start with an email",
    detail: "Best for a product, technical problem, collaboration, or introduction.",
    label: portfolio.person.email,
    href: `mailto:${portfolio.person.email}`,
    event: "email_clicked",
    icon: Mail,
  },
  {
    title: "Find a time",
    detail: "Book a conversation directly when synchronous is easier.",
    label: "Open Calendly",
    href: portfolio.person.calendly,
    event: "calendly_opened",
    icon: Calendar,
  },
  {
    title: "Follow the work",
    detail: "Code, packages, experiments, and the occasional useful rabbit hole.",
    label: "GitHub",
    href: portfolio.social.github,
    event: "github_opened",
    icon: Github,
  },
  {
    title: "Professional context",
    detail: "Experience, mutual connections, and updates from the companies I’m building.",
    label: "LinkedIn",
    href: portfolio.social.linkedin,
    event: "linkedin_opened",
    icon: Linkedin,
  },
];

function Connect() {
  return (
    <div className="shell inner-page connect-page">
      <header className="page-intro connect-intro">
        <p className="eyebrow">Connect</p>
        <h1>Good conversations usually start with a specific curiosity.</h1>
        <p>
          Tell me what you’re building, what is stubbornly broken, or what you cannot stop thinking
          about. I read every thoughtful note.
        </p>
      </header>

      <div className="connect-grid">
        {options.map(({ icon: Icon, ...option }) => (
          <a
            className="connect-card"
            data-analytics={option.event}
            href={option.href}
            key={option.title}
            rel="noreferrer"
            target={option.href.startsWith("mailto:") ? undefined : "_blank"}
          >
            <span className="connect-icon">
              <Icon aria-hidden="true" />
            </span>
            <div>
              <h2>{option.title}</h2>
              <p>{option.detail}</p>
              <strong>
                {option.label} <ArrowUpRight aria-hidden="true" />
              </strong>
            </div>
          </a>
        ))}
      </div>

      <aside className="coffee-note">
        <Coffee aria-hidden="true" />
        <div>
          <p className="eyebrow">In San Francisco?</p>
          <h2>I’m down for a cup of coffee.</h2>
          <p>
            Somewhere walkable, an hour without a pitch deck, and a conversation worth continuing.
            I’m based in San Francisco and usually around the city.
          </p>
          <span>
            <MapPin aria-hidden="true" /> San Francisco, California
          </span>
        </div>
      </aside>
    </div>
  );
}
