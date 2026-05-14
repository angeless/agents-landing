import { useTranslations } from "next-intl";
import { Folder, Globe, Database, Brain, Monitor, Shield } from "lucide-react";

/**
 * V1-A Landing 主页 — Task 4.2 A1 + A2（Hero + Footer + Section 2 + Section 3）
 *
 * 后续 A3 commit 将补充：
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
      <Section2 />
      <Section3 />
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
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,217,255,0.08) 0%, transparent 60%)",
        }}
      />

      <LifeCard />
      <TourismCard />
      <CreateCard />

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
   Section 2 — 三类受众（Brief §5 Section 2）
   ============================================================ */

function Section2() {
  const t = useTranslations("Section2");
  return (
    <section className="py-20 px-6" id="features">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12 space-y-3">
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "var(--acm-text-primary)" }}
          >
            {t("title")}
          </h2>
          <p style={{ color: "var(--acm-text-secondary)" }}>{t("subtitle")}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PersonaCard
            title={t("personaB.title")}
            desc={t("personaB.desc")}
          />
          <PersonaCard
            title={t("personaC.title")}
            desc={t("personaC.desc")}
          />
          <PersonaCard
            title={t("personaD.title")}
            desc={t("personaD.desc")}
          />
        </div>
      </div>
    </section>
  );
}

function PersonaCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div
      className="rounded-lg border p-6 animate-fade-in"
      style={{
        backgroundColor: "var(--acm-bg-panel)",
        borderColor: "var(--acm-border-light)",
      }}
    >
      <h3
        className="text-lg font-semibold mb-3"
        style={{ color: "var(--acm-text-primary)" }}
      >
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--acm-text-secondary)" }}
      >
        {desc}
      </p>
    </div>
  );
}

/* ============================================================
   Section 3 — 核心能力 + 5 MCP server 中心-星座 motif
   Brief §5 Section 3 + §12.5 OQ10 + §12.2 Section 3 视觉决策
   ============================================================ */

function Section3() {
  const t = useTranslations("Section3");
  return (
    <section className="relative py-20 px-6 canvas-grid">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Title */}
        <header className="text-center space-y-3">
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "var(--acm-text-primary)" }}
          >
            {t("title")}
          </h2>
          <p
            className="text-base"
            style={{ color: "var(--acm-text-secondary)" }}
          >
            {t("subtitle")}
          </p>
        </header>

        {/* 3 个核心能力 bullet */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CapabilityBullet title={t("cap1Title")} desc={t("cap1Desc")} />
          <CapabilityBullet title={t("cap2Title")} desc={t("cap2Desc")} />
          <CapabilityBullet title={t("cap3Title")} desc={t("cap3Desc")} />
        </div>

        {/* MCP 工具治理：中心 ACM Hub + 5 server logo */}
        <div className="pt-8 space-y-8">
          <div className="text-center space-y-2">
            <h3
              className="text-xl md:text-2xl font-semibold"
              style={{ color: "var(--acm-text-primary)" }}
            >
              {t("mcpHeadline")}
            </h3>
          </div>

          {/* ACM Hub badge */}
          <div className="flex justify-center">
            <div
              className="inline-flex flex-col items-center px-6 py-4 rounded-full border-2 neon-glow"
              style={{
                backgroundColor: "var(--acm-bg-panel)",
                borderColor: "var(--acm-accent)",
              }}
            >
              <Shield
                className="w-8 h-8 mb-1"
                style={{ color: "var(--acm-accent)" }}
              />
              <div
                className="text-sm font-bold"
                style={{ color: "var(--acm-accent)" }}
              >
                {t("hubLabel")}
              </div>
              <div
                className="text-xs"
                style={{ color: "var(--acm-text-secondary)" }}
              >
                {t("hubSubtitle")}
              </div>
            </div>
          </div>

          {/* 5 MCP server cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <MCPServerCard server="filesystem" Icon={Folder} />
            <MCPServerCard server="fetch" Icon={Globe} />
            <MCPServerCard server="sqlite" Icon={Database} />
            <MCPServerCard server="memory" Icon={Brain} />
            <MCPServerCard server="puppeteer" Icon={Monitor} />
          </div>

          {/* footnote + link */}
          <div className="pt-4 text-center space-y-2 max-w-2xl mx-auto">
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--acm-text-secondary)" }}
            >
              {t("mcpFootnote")}
            </p>
            <a
              href="https://github.com/modelcontextprotocol/servers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-medium hover:underline"
              style={{ color: "var(--acm-accent)" }}
            >
              {t("mcpLink")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilityBullet({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="space-y-2 animate-slide-in-up">
      <h3
        className="text-base font-semibold"
        style={{ color: "var(--acm-text-primary)" }}
      >
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--acm-text-secondary)" }}
      >
        {desc}
      </p>
    </div>
  );
}

/**
 * MCP Server card with risk badge.
 * Risk badge color mapping (brief §12.5 OQ10):
 *   low → gray   medium → blue   high → orange
 */
function MCPServerCard({
  server,
  Icon,
}: {
  server: "filesystem" | "fetch" | "sqlite" | "memory" | "puppeteer";
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}) {
  const t = useTranslations(`Section3.servers.${server}`);
  const tRisk = useTranslations("Section3.riskLabel");
  const risk = t("risk") as "low" | "medium" | "high";

  const riskStyle = {
    low: { backgroundColor: "#6b728033", color: "#9ca3af" },
    medium: { backgroundColor: "#3b82f633", color: "#60a5fa" },
    high: { backgroundColor: "#f59e0b33", color: "#fbbf24" },
  }[risk];

  return (
    <div
      className="rounded-lg border p-4 text-center space-y-2 transition-transform hover:scale-105"
      style={{
        backgroundColor: "var(--acm-bg-panel)",
        borderColor: "var(--acm-border-light)",
      }}
    >
      <Icon
        className="w-8 h-8 mx-auto"
        style={{ color: "var(--acm-text-primary)" }}
      />
      <div
        className="text-sm font-semibold"
        style={{ color: "var(--acm-text-primary)" }}
      >
        {t("name")}
      </div>
      <div
        className="text-xs"
        style={{ color: "var(--acm-text-secondary)" }}
      >
        {t("desc")}
      </div>
      <div
        className="inline-block text-xs px-2 py-0.5 rounded font-medium"
        style={riskStyle}
      >
        {tRisk(risk)}
      </div>
      {(risk === "high") && (
        <div
          className="text-xs italic"
          style={{ color: "var(--acm-text-secondary)" }}
        >
          ⚠ {t("needsApproval")}
        </div>
      )}
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
