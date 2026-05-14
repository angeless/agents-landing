import { useTranslations } from "next-intl";

/**
 * V1-A Landing 主页 — i18n 骨架版（Task 4.1 B 阶段）
 *
 * 当前为最小骨架，仅渲染 Hero copy 验证 next-intl 路由可工作。
 * Task 4.2 将填充完整 6 段：Hero + 三 persona + 工具治理 + Roadmap + About + FAQ。
 * 视觉规范见 brief §12（ACM 主仓 docs/product/v1-a-landing-brief.md）。
 */
export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <main className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-8">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          {t("headline")}
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 leading-relaxed">
          {t("subhead")}
        </p>
        <p className="text-sm text-zinc-500 italic">{t("forWhom")}</p>
        <div className="pt-4">
          <a
            href="/apply"
            className="inline-block px-6 py-3 bg-cyan-400 text-black font-medium rounded hover:bg-cyan-300 transition"
          >
            {t("cta")}
          </a>
        </div>
        <p className="text-xs text-zinc-600 pt-12">{t("placeholder")}</p>
      </div>
    </main>
  );
}
