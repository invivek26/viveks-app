import { describe, expect, test } from "bun:test";

import { getWork, portfolio } from "#/content/portfolio";

describe("portfolio content", () => {
  test("keeps canonical work routes and public links valid", () => {
    expect(getWork("gamestock")?.name).toBe("GameStock");
    expect(getWork("zen-shuttles")?.name).toBe("Zen Shuttles");
    const zenRecognition = getWork("zen-shuttles")?.recognition ?? [];
    expect(zenRecognition.reduce((total, award) => total + award.amount, 0)).toBe(31_000);
    expect(zenRecognition.reduce((total, award) => total + award.awardCount, 0)).toBe(4);
    expect(portfolio.stats.find(({ value }) => value === "20K+")?.label).toBe("GameStock users");
    expect(new Set(portfolio.work.map(({ slug }) => slug)).size).toBe(portfolio.work.length);
    expect(
      portfolio.openSource.every(
        ({ github, npm }) => github.startsWith("https://") && npm.startsWith("https://"),
      ),
    ).toBe(true);
  });
});
