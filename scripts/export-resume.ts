import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "@playwright/test";

const root = fileURLToPath(new URL("..", import.meta.url));
const output = process.argv[2] ?? join(root, "public/vivek-resume.pdf");
const url = "http://127.0.0.1:4176/resume";
const server = Bun.spawn(
  [process.execPath, "run", "preview", "--port", "4176", "--host", "127.0.0.1"],
  { cwd: root, stderr: "pipe", stdout: "pipe" },
);

async function waitForServer(attempt = 0): Promise<void> {
  try {
    if ((await fetch(url)).ok) return;
  } catch {
    // The preview server is still starting.
  }

  if (attempt === 39) throw new Error("Preview server did not start");
  await Bun.sleep(250);
  await waitForServer(attempt + 1);
}

try {
  await waitForServer();

  await mkdir(dirname(output), { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    format: "Letter",
    outline: true,
    path: output,
    preferCSSPageSize: true,
    printBackground: true,
    tagged: true,
  });
  await browser.close();
  console.log(output);
} finally {
  server.kill();
  await server.exited;
}
