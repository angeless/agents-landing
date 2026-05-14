import { useTranslations } from "next-intl";

/**
 * Over-Capacity 限流页 — Task 4.4
 *
 * 触发：CF Worker 检测到 ACM api-gateway 限流 → 302 跳此页
 * 内容：友好提示 + 重试 + 返回首页
 *
 * 说明：本页面纯静态，不需要 client-side state（重试只是 reload 当前页）。
 */
export default function OverCapacityPage() {
  const t = useTranslations("OverCapacity");
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md text-center space-y-6 animate-fade-in">
        <h1
          className="text-3xl md:text-4xl font-bold tracking-tight"
          style={{ color: "var(--acm-text-primary)" }}
        >
          {t("title")}
        </h1>
        <p
          className="text-sm leading-relaxed text-left"
          style={{ color: "var(--acm-text-secondary)" }}
        >
          {t("body")}
        </p>
        <ul
          className="text-sm text-left space-y-2 pl-6"
          style={{ color: "var(--acm-text-secondary)" }}
        >
          <li>· {t("option1")}</li>
          <li>· {t("option2")}</li>
        </ul>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <a
            href="/apply"
            className="neon-glow inline-block px-6 py-2.5 rounded-md font-medium text-sm transition-transform hover:scale-105"
            style={{
              backgroundColor: "var(--acm-accent)",
              color: "var(--acm-on-accent)",
            }}
          >
            {t("retry")}
          </a>
          <a
            href="/"
            className="inline-block px-6 py-2.5 rounded-md font-medium text-sm border transition-colors hover:bg-white/5"
            style={{
              borderColor: "var(--acm-border-light)",
              color: "var(--acm-text-primary)",
            }}
          >
            {t("backToHome")}
          </a>
        </div>
      </div>
    </main>
  );
}
