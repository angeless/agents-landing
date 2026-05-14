import { useTranslations } from "next-intl";
import { ArrowRight, MessageSquare, Mail } from "lucide-react";
// Note: lucide-react ≥v0.300 移除了 brand icons (Github 等) — 用通用
// MessageSquare 表 issue tracker 概念，避免商标合规问题

/**
 * Wishlist 投票页 — placeholder
 *
 * Section 4 Wishlist CTA 跳转目标。brief §12.5 OQ10 ANSWERED 说后期 WS-4
 * 决定具体 form 实现（Notion / Tally / Typeform），现在做 placeholder
 * 双 channel：
 *   - email: hello@agents.ngzr.net (Resend Verified domain — outbound;
 *     inbound 需 CF Email Routing 单独配，未 done 时 mailto: 邮件会 bounce)
 *   - GitHub Issues: 在 angeless/agent-cluster-manager 留 label=mcp-wishlist
 *
 * 等 V1.10 release 完工后，可替换为真 form embed。
 */
export default function WishlistPage() {
  const t = useTranslations("WishlistPage");
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl space-y-10 animate-fade-in">
        <header className="text-center space-y-4">
          <div
            className="mono-chip-neon inline-flex items-center gap-2 px-3 py-1 rounded-full border"
            style={{
              borderColor: "var(--cosmic-border)",
              backgroundColor: "var(--cosmic-panel)",
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full pulse-dot"
              style={{ backgroundColor: "var(--cosmic-neon)" }}
            />
            {t("eyebrow")}
          </div>
          <h1
            className="font-bold tracking-tight leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.03em",
              color: "var(--cosmic-text-primary)",
            }}
          >
            {t("title")}
          </h1>
          <p
            className="text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: "var(--cosmic-text-secondary)" }}
          >
            {t("subtitle")}
          </p>
        </header>

        <div
          className="rounded-md border p-6 space-y-3"
          style={{
            backgroundColor: "var(--cosmic-panel)",
            borderColor: "var(--cosmic-ghost)",
          }}
        >
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--cosmic-text-secondary)" }}
          >
            {t("body1")}
          </p>
          <p
            className="font-mono text-sm"
            style={{ color: "var(--cosmic-text-primary)" }}
          >
            {t("candidates")}
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--cosmic-text-muted)" }}
          >
            {t("body2")}
          </p>
        </div>

        <div className="space-y-4">
          <div className="mono-chip-neon">{t("channelsLabel")}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="mailto:hello@agents.ngzr.net?subject=MCP%20Server%20Wishlist%20Vote&body=%E6%88%91%E6%9C%80%E6%83%B3%E7%9C%8B%E5%88%B0%20...%20%E4%BD%9C%E4%B8%BA%20MCP%20server%E3%80%82%0A%0A%E4%B8%9A%E5%8A%A1%E5%9C%BA%E6%99%AF%EF%BC%9A%0A"
              className="group rounded-md border p-5 transition-all hover:scale-[1.02] hover:border-cosmic-neon/50"
              style={{
                backgroundColor: "var(--cosmic-panel-elevated)",
                borderColor: "var(--cosmic-ghost)",
              }}
            >
              <Mail
                className="w-6 h-6 mb-3"
                style={{ color: "var(--cosmic-neon)" }}
              />
              <div
                className="text-sm font-semibold mb-1"
                style={{ color: "var(--cosmic-text-primary)" }}
              >
                {t("emailLabel")}
              </div>
              <div
                className="text-xs"
                style={{ color: "var(--cosmic-text-secondary)" }}
              >
                hello@agents.ngzr.net
              </div>
              <div
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium transition-all group-hover:gap-2"
                style={{ color: "var(--cosmic-neon)" }}
              >
                {t("emailCta")} <ArrowRight className="w-3 h-3" />
              </div>
            </a>

            <a
              href="https://github.com/angeless/agent-cluster-manager/issues/new?title=MCP+Server+Wishlist+Vote&labels=mcp-wishlist&body=%23+%E6%88%91%E6%83%B3%E7%9C%8B%E5%88%B0%E5%93%AA%E4%B8%AA%20SaaS%20%E4%B8%8A%E6%9E%B6%20MCP%20server%0A%0A**SaaS%20%E5%90%8D%E7%A7%B0**%EF%BC%9A%20%0A%0A**%E4%B8%9A%E5%8A%A1%E5%9C%BA%E6%99%AF**%EF%BC%9A%20%0A%0A**%E4%BC%98%E5%85%88%E7%BA%A7%E7%90%86%E7%94%B1**%EF%BC%9A%20%0A"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-md border p-5 transition-all hover:scale-[1.02] hover:border-cosmic-neon/50"
              style={{
                backgroundColor: "var(--cosmic-panel-elevated)",
                borderColor: "var(--cosmic-ghost)",
              }}
            >
              <MessageSquare
                className="w-6 h-6 mb-3"
                style={{ color: "var(--cosmic-neon)" }}
              />
              <div
                className="text-sm font-semibold mb-1"
                style={{ color: "var(--cosmic-text-primary)" }}
              >
                {t("githubLabel")}
              </div>
              <div
                className="text-xs"
                style={{ color: "var(--cosmic-text-secondary)" }}
              >
                angeless/agent-cluster-manager
              </div>
              <div
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium transition-all group-hover:gap-2"
                style={{ color: "var(--cosmic-neon)" }}
              >
                {t("githubCta")} <ArrowRight className="w-3 h-3" />
              </div>
            </a>
          </div>
        </div>

        <div className="text-center">
          <a
            href="/"
            className="text-sm hover:underline"
            style={{ color: "var(--cosmic-text-secondary)" }}
          >
            {t("backToHome")}
          </a>
        </div>
      </div>
    </main>
  );
}
