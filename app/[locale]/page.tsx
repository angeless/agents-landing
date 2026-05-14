import { useTranslations } from "next-intl";

/**
 * V1-A Landing 主页 — Task 4.2 A1 阶段（Hero + Footer）
 *
 * 后续 A2/A3 commit 将补充：
 * - Section 2 三 persona 卡
 * - Section 3 工具治理（5 个 MCP 官方 server logo + 中心-星座 motif）
 * - Section 4 Roadmap 三段 + 征集中段
 * - Section 5 About（zh + en 纯文字）
 * - Section 6 FAQ（5 条）
 *
 * 视觉规范见 brief §12（ACM 主仓 docs/product/v1-a-landing-brief.md v3 frozen）。
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Footer />
    </>
  );
}

/* ============================================================
   Hero Section — Brief §12.2 Asset Defense 主基底 + §12.5 OQ8 浮动 3 卡
   ============================================================ */

function HeroSection() {
  const t = useTranslations("HomePage");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-24">
      {/* 中央径向光晕（brief §12.3 软光晕装饰） */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,217,255,0.08) 0%, transparent 60%)",
        }}
      />

      {/* 浮动 3 张「AI 公司」卡（brief §12.5 OQ8） */}
      <LifeCard />
      <TourismCard />
      <CreateCard />

      {/* Hero 中心文案（z-10 压在浮动卡之上） */}
      <div className="relative z-10 max-w-3xl text-center space-y-6 animate-fade-in">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
          style={{ color: "var(--acm-text-primary)" }}
        >
          {t("headline")}
        </h1>
        <p
          className="text-base md:text-lg lg:text-xl leading-relaxed"
          style={{ color: "var(--acm-text-secondary)" }}
        >
          {t("subhead")}
        </p>
        <p
          className="text-sm italic"
          style={{ color: "var(--acm-text-secondary)" }}
        >
          {t("forWhom")}
        </p>
        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/apply"
            className="neon-glow inline-block px-8 py-3 rounded-md font-medium transition-transform hover:scale-105"
            style={{
              backgroundColor: "var(--acm-accent)",
              color: "var(--acm-on-accent)",
            }}
          >
            {t("cta")}
          </a>
          <a
            href="#features"
            className="inline-block px-8 py-3 rounded-md font-medium border transition-colors hover:bg-white/5"
            style={{
              borderColor: "var(--acm-border-light)",
              color: "var(--acm-text-primary)",
            }}
          >
            {t("ctaSecondary")}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Floating Company Cards — Brief §12.5 OQ8 1:1 取自 playbook.yaml
   ============================================================ */

function LifeCard() {
  const t = useTranslations("HomePage.heroCards.life");
  return (
    <CompanyCard
      title={t("title")}
      tasks={[t("task1"), t("task2"), t("task3")]}
      tag={t("tag")}
      positionClass="hidden md:block absolute top-[10%] left-[3%] lg:left-[6%]"
    />
  );
}

function TourismCard() {
  const t = useTranslations("HomePage.heroCards.tourism");
  return (
    <CompanyCard
      title={t("title")}
      tasks={[t("task1"), t("task2"), t("task3"), t("task4")]}
      tag={t("tag")}
      positionClass="hidden md:block absolute top-[14%] right-[3%] lg:right-[6%]"
    />
  );
}

function CreateCard() {
  const t = useTranslations("HomePage.heroCards.create");
  return (
    <div
      className="hidden lg:block absolute bottom-[10%] left-1/2 -translate-x-1/2 max-w-[280px] rounded-lg border p-4 animate-slide-in-up neon-glow"
      style={{
        backgroundColor: "var(--acm-bg-panel)",
        borderColor: "var(--acm-border-light)",
      }}
    >
      <div
        className="text-sm font-semibold mb-2"
        style={{ color: "var(--acm-accent)" }}
      >
        {t("title")}
      </div>
      <ul
        className="text-xs space-y-1 mb-3"
        style={{ color: "var(--acm-text-secondary)" }}
      >
        <li>· {t("line1")}</li>
        <li>· {t("line2")}</li>
        <li>· {t("line3")}</li>
      </ul>
      <a
        href="/apply"
        className="text-xs font-medium hover:underline"
        style={{ color: "var(--acm-accent)" }}
      >
        {t("cta")}
      </a>
      <div
        className="text-xs mt-2"
        style={{ color: "var(--acm-text-secondary)" }}
      >
        {t("tag")}
      </div>
    </div>
  );
}

function CompanyCard({
  title,
  tasks,
  tag,
  positionClass,
}: {
  title: string;
  tasks: string[];
  tag: string;
  positionClass: string;
}) {
  return (
    <div
      className={`${positionClass} max-w-[260px] rounded-lg border p-4 animate-slide-in-up neon-glow`}
      style={{
        backgroundColor: "var(--acm-bg-panel)",
        borderColor: "var(--acm-border-light)",
      }}
    >
      <div
        className="text-sm font-semibold mb-2"
        style={{ color: "var(--acm-text-primary)" }}
      >
        {title}
      </div>
      <ul
        className="text-xs space-y-1 mb-3"
        style={{ color: "var(--acm-text-secondary)" }}
      >
        {tasks.map((task, i) => (
          <li key={i}>· {task}</li>
        ))}
      </ul>
      <div
        className="text-xs"
        style={{ color: "var(--acm-text-secondary)" }}
      >
        {tag}
      </div>
    </div>
  );
}

/* ============================================================
   Footer — brief §6 信任信号 (c) Built with Claude Code + Open Core
   ============================================================ */

function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer
      className="border-t py-8 px-6 text-center text-xs space-y-2"
      style={{
        borderColor: "var(--acm-border-faint)",
        color: "var(--acm-text-secondary)",
      }}
    >
      <p>{t("openCore")}</p>
      <p>
        {t("builtWith")}
        {" · "}
        <a
          href="https://github.com/angeless/agent-cluster-manager"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
          style={{ color: "var(--acm-accent)" }}
        >
          {t("github")}
        </a>
      </p>
    </footer>
  );
}
