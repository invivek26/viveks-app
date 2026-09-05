import { expect, test } from "@playwright/test";

test("home stays visible and contained at every viewport", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "I build products that move." })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Vivek Indlebele Narasimha Prasad, home" }),
  ).toBeVisible();
  await expect(page.locator(".wordmark img")).toBeVisible();

  const layout = await page.evaluate(() => ({
    bodyWidth: document.documentElement.scrollWidth,
    hiddenReveals: [...document.querySelectorAll(".reveal")].filter(
      (element) => getComputedStyle(element).opacity === "0",
    ).length,
    viewportWidth: window.innerWidth,
  }));

  expect(layout.bodyWidth).toBeLessThanOrEqual(layout.viewportWidth);
  expect(layout.hiddenReveals).toBe(0);
  await expect(page.getByText("San Francisco, CA", { exact: true })).toHaveCount(1);
});

test("location copy appears only where it adds context", async ({ page }) => {
  await page.goto("/connect");
  await expect(page.getByText(/San Francisco/)).toHaveCount(1);
});

test("theme transition and current-work pulse are deliberate", async ({ page }) => {
  await page.goto("/");
  const wasDark = await page
    .locator("html")
    .evaluate((element) => element.classList.contains("dark"));

  const motion = await page.evaluate(() => {
    const duration = getComputedStyle(document.documentElement)
      .getPropertyValue("--theme-transition-duration")
      .trim();
    return {
      pulse: getComputedStyle(document.querySelector(".availability-dot")!, "::after")
        .animationName,
      themeDuration: Number.parseFloat(duration) * (duration.endsWith("ms") ? 1 : 1_000),
    };
  });

  expect(motion.themeDuration).toBeGreaterThanOrEqual(800);
  expect(motion.pulse).toContain("availability-pulse");

  await page.getByRole("button", { name: "Toggle color theme" }).click();
  await expect
    .poll(() => page.locator("html").evaluate((element) => element.classList.contains("dark")))
    .toBe(!wasDark);
});

test("hero metadata shares one text column", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const textStarts = await page.locator(".hero-meta > span").evaluateAll((rows) =>
    rows.map((row) => {
      const textNode = [...row.childNodes].find(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
      );
      if (!textNode) return Number.NaN;
      const range = document.createRange();
      range.selectNodeContents(textNode);
      return range.getBoundingClientRect().left;
    }),
  );

  expect(textStarts).toHaveLength(2);
  expect(Math.abs((textStarts[0] ?? 0) - (textStarts[1] ?? 0))).toBeLessThanOrEqual(1);
});

test("header keeps the full name on one mobile line", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/");

  const name = page.locator(".wordmark-name");
  await expect(name).toHaveText("Vivek Indlebele Narasimha Prasad");
  const layout = await name.evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    return {
      lineCount: range.getClientRects().length,
      nameRight: range.getBoundingClientRect().right,
      toggleLeft: document.querySelector(".theme-toggle")?.getBoundingClientRect().left ?? 0,
    };
  });

  expect(layout.lineCount).toBe(1);
  expect(layout.nameRight).toBeLessThan(layout.toggleLeft);
});

test("work-card proof labels stay on one line", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/");

  const label = page
    .locator(".work-card")
    .filter({ hasText: "Zen Shuttles" })
    .locator(".work-card-proof span");
  const layout = await label.evaluate((element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    return {
      cardRight: element.closest(".work-card")?.getBoundingClientRect().right ?? 0,
      labelRight: range.getBoundingClientRect().right,
      lineCount: range.getClientRects().length,
    };
  });

  expect(layout.lineCount).toBe(1);
  expect(layout.labelRight).toBeLessThan(layout.cardRight);
});

test("download metrics never collide with their actions", async ({ page }) => {
  await page.goto("/");

  const overlaps = await page.locator(".package-row").evaluateAll((rows) =>
    rows.some((row) => {
      const metric = row.querySelector(".package-stat")?.getBoundingClientRect();
      const action = row.querySelector(":scope > a")?.getBoundingClientRect();
      if (!metric || !action) return true;
      return (
        metric.left < action.right &&
        metric.right > action.left &&
        metric.top < action.bottom &&
        metric.bottom > action.top
      );
    }),
  );

  expect(overlaps).toBe(false);
});

test("case-study technology tags stay compact and contained", async ({ page }) => {
  await page.goto("/work/gamestock");

  const layout = await page.locator(".case-stack li").evaluateAll((tags) => ({
    maxHeight: Math.max(...tags.map((tag) => tag.getBoundingClientRect().height)),
    overflow: tags.some((tag) => tag.getBoundingClientRect().right > window.innerWidth),
  }));

  expect(layout.maxHeight).toBeLessThanOrEqual(40);
  expect(layout.overflow).toBe(false);
});

test("package demos model rolling digits and a kinetic infinite marquee", async ({ page }) => {
  await page.goto("/open-source");
  await page.waitForTimeout(600);

  const reels = page.locator(".digit-reel");
  await expect(reels.first()).toBeVisible();
  const before = await reels.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("style")),
  );
  await page.getByRole("button", { name: "Roll to a new number" }).click();
  await expect(page.locator(".rolling-number")).toHaveAttribute("aria-label", "32,547");
  const after = await reels.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("style")),
  );
  const reelDuration = await reels.first().evaluate((element) => {
    const duration = getComputedStyle(element).transitionDuration;
    return Number.parseFloat(duration) * (duration.endsWith("ms") ? 1 : 1_000);
  });
  expect(after).not.toEqual(before);
  expect(reelDuration).toBeGreaterThanOrEqual(800);

  await expect(page.getByRole("slider")).toHaveCount(0);
  const marquee = page.locator("[data-kinetic-marquee]");
  await expect(marquee).toBeVisible();
  await marquee.scrollIntoViewIfNeeded();
  const track = marquee.locator(".marquee-content");
  const firstTransform = await track.evaluate((element) => getComputedStyle(element).transform);
  await page.waitForTimeout(350);
  const secondTransform = await track.evaluate((element) => getComputedStyle(element).transform);
  expect(secondTransform).not.toBe(firstTransform);

  const box = await marquee.boundingBox();
  expect(box).not.toBeNull();
  if (box) {
    await page.mouse.move(box.x + box.width * 0.7, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.25, box.y + box.height / 2, { steps: 5 });
    await page.mouse.up();
  }
  await page.waitForTimeout(180);
  const releasedTransform = await track.evaluate((element) => getComputedStyle(element).transform);
  expect(releasedTransform).not.toBe(secondTransform);
});
