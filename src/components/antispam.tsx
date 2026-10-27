import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      remove: (id: string) => void;
    };
  }
}

export function Antispam({ siteKey, attempt }: { siteKey: string; attempt: number }) {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let widget: string | undefined;
    let disposed = false;
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    const render = () => {
      if (!disposed && container.current && window.turnstile) {
        container.current.textContent = "";
        widget = window.turnstile.render(container.current, {
          sitekey: siteKey,
          action: "contact",
          language: "fr",
          size: "flexible",
        });
      }
    };
    if (window.turnstile) render();
    else {
      script.addEventListener("load", render);
      document.head.appendChild(script);
    }
    return () => {
      disposed = true;
      script.removeEventListener("load", render);
      if (widget && window.turnstile) window.turnstile.remove(widget);
      script.remove();
    };
  }, [siteKey, attempt]);
  return <div ref={container} className="min-h-16" aria-label="Vérification antispam" />;
}
