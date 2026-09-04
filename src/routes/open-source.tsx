import { createFileRoute } from "@tanstack/react-router";

import { PackagePlayground } from "#/components/package-playground";

export const Route = createFileRoute("/open-source")({
  head: () => ({
    meta: [
      { title: "Open source — Vivek Indlebele" },
      {
        name: "description",
        content:
          "Native React Native and Expo packages by Vivek Indlebele, with interactive web demonstrations.",
      },
      { property: "og:title", content: "Open source — Vivek Indlebele" },
      {
        property: "og:description",
        content: "Native interactions packaged for the React Native community.",
      },
    ],
    links: [{ rel: "canonical", href: "https://viveks.app/open-source" }],
  }),
  component: OpenSource,
});

function OpenSource() {
  return (
    <div className="shell inner-page">
      <header className="page-intro">
        <p className="eyebrow">Open source</p>
        <h1>Native interactions, packaged for everyone.</h1>
        <p>
          These began as product problems: Live Activities that took too many manual steps, numbers
          that needed to feel physical, and marquees that had to stay smooth. The reusable answers
          now have more than 16,000 cumulative npm downloads.
        </p>
      </header>
      <PackagePlayground />
    </div>
  );
}
