import { useEffect } from "react";

const token = import.meta.env.VITE_POSTHOG_TOKEN;
const host = import.meta.env.VITE_POSTHOG_HOST ?? "https://us.i.posthog.com";

export function Analytics() {
  useEffect(() => {
    if (!token || import.meta.env.DEV) return;

    const projectToken = token;
    const controller = new AbortController();
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    async function start() {
      const { default: posthog } = await import("posthog-js");
      if (controller.signal.aborted) return;

      posthog.init(projectToken, {
        api_host: host,
        autocapture: false,
        capture_pageview: "history_change",
        cookieless_mode: "always",
        defaults: "2026-05-30",
        disable_session_recording: true,
        person_profiles: "never",
      });

      document.addEventListener(
        "click",
        (event) => {
          const element =
            event.target instanceof Element
              ? event.target.closest<HTMLElement>("[data-analytics]")
              : null;
          if (element?.dataset.analytics) {
            posthog.capture(element.dataset.analytics, { label: element.dataset.analyticsLabel });
          }
        },
        { signal: controller.signal },
      );
    }

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(() => void start().catch(() => {}));
    } else {
      timeoutId = setTimeout(() => void start().catch(() => {}), 1_000);
    }

    return () => {
      controller.abort();
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
