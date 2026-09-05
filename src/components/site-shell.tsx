import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github, Linkedin, Mail, Terminal } from "lucide-react";
import type { ReactNode } from "react";

import { Analytics } from "#/components/analytics";
import { ThemeToggle } from "#/components/theme-toggle";
import { portfolio } from "#/content/portfolio";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <Link aria-label={`${portfolio.person.name}, home`} className="wordmark" to="/">
            <img alt="" className="wordmark-image" height="80" src="/vivek.jpg" width="80" />
            <span className="wordmark-name">{portfolio.person.name}</span>
          </Link>
          <nav aria-label="Primary navigation" className="primary-nav">
            <a href="/#work">Work</a>
            <Link to="/open-source">Open source</Link>
            <Link to="/resume">Résumé</Link>
          </nav>
          <div className="header-actions">
            <Link className="header-connect" to="/connect">
              Connect <ArrowUpRight aria-hidden="true" />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <div className="shell footer-grid">
          <div>
            <p className="footer-kicker">Let’s make something useful.</p>
            <a className="footer-email" href={`mailto:${portfolio.person.email}`}>
              {portfolio.person.email}
            </a>
          </div>
          <div className="footer-links">
            <a
              data-analytics="github_opened"
              href={portfolio.social.github}
              rel="noreferrer"
              target="_blank"
            >
              <Github aria-hidden="true" /> GitHub
            </a>
            <a
              data-analytics="linkedin_opened"
              href={portfolio.social.linkedin}
              rel="noreferrer"
              target="_blank"
            >
              <Linkedin aria-hidden="true" /> LinkedIn
            </a>
            <a data-analytics="email_clicked" href={`mailto:${portfolio.person.email}`}>
              <Mail aria-hidden="true" /> Email
            </a>
            <a
              data-analytics="terminal_opened"
              href={portfolio.social.terminal}
              rel="noreferrer"
              target="_blank"
            >
              <Terminal aria-hidden="true" /> Terminal
            </a>
          </div>
          <p className="footer-note">© 2026 {portfolio.person.name}</p>
        </div>
      </footer>
      <Analytics />
    </>
  );
}
