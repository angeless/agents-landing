import { useTranslations } from "next-intl";
import {
  Folder,
  Globe,
  Database,
  Brain,
  Monitor,
  Shield,
  Briefcase,
  Sparkles,
  Compass,
  ArrowRight,
} from "lucide-react";

/**
 * V1-A Landing 主页 — v2.0 redesign per DESIGN.md "Cosmic Lab"
 *
 * 调性：Black-space brutalism + AI-native cosmic glow
 * 参照：LayerZero / Anthropic claude.ai / Replicate
 * 见根目录 DESIGN.md 完整 spec + rationale
 */
type Variant = "A" | "B" | "C";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ v?: string }>;
}) {
  const { v } = await searchParams;
  const variant: Variant = v === "B" || v === "C" ? v : "A";

  return (
    <>
      <HeroSection variant={variant} />
      <CosmicDivider />
      <Section2 />
      <CosmicDivider />
      <Section3 />
      <CosmicDivider />
      <Section4 />
      <CosmicDivider />
      <Section5 />
      <CosmicDivider />
      <Section6 />
      <Footer variant={variant} />
    </>
  );
}

function CosmicDivider() {
  return <hr className="cosmic-divider mx-auto max-w-6xl" />;
}

/* ============================================================
   COSMIC DECORATION (SVG) — Hero floating orbits + dots
   ============================================================ */

function CosmicDecoration() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1440 900"
    >
      <defs>
        <radialGradient id="dot-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00d9ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Scattered dots */}
      {[
        [120, 180, 1.5],
        [240, 720, 2],
        [380, 120, 1],
        [540, 640, 1.5],
        [780, 200, 1],
        [920, 740, 2],
        [1080, 160, 1.5],
        [1280, 580, 1],
        [1320, 300, 1.5],
        [180, 460, 1],
      ].map(([x, y, r], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill="url(#dot-grad)"
          opacity={0.4 + (i % 3) * 0.15}
        />
      ))}

      {/* Orbit arcs (subtle) */}
      <ellipse
        cx="720"
        cy="450"
        rx="540"
        ry="220"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.04"
        strokeWidth="1"
        strokeDasharray="2 8"
      />
      <ellipse
        cx="720"
        cy="450"
        rx="360"
        ry="140"
        fill="none"
        stroke="#00d9ff"
        strokeOpacity="0.08"
        strokeWidth="1"
        strokeDasharray="3 6"
      />
    </svg>
  );
}

/* ============================================================
   HERO SECTION — Cosmic Lab 主基底 + 浮动 3 张 AI 公司卡
   ============================================================ */

function HeroSection({ variant }: { variant: Variant }) {
  const t = useTranslations("HomePage");
  const variantNs = `HomePage.variant${variant}` as "HomePage.variantA";
  const tv = useTranslations(variantNs);

  return (
    <section className="cosmic-hero-bg relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-32">
      <CosmicDecoration />

      <LifeCard />
      <TourismCard />
      <CreateCard variant={variant} />

      <div className="relative z-10 max-w-4xl text-center space-y-10 animate-fade-in">
        {/* Top eyebrow chip */}
        <div className="flex justify-center">
          <span
            className="mono-chip-neon inline-flex items-center gap-2 px-3 py-1 rounded-full border"
            style={{ borderColor: "var(--cosmic-border)", backgroundColor: "var(--cosmic-panel)" }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full pulse-dot"
              style={{ backgroundColor: "var(--cosmic-neon)" }}
            />
            {tv("eyebrow")}
          </span>
        </div>

        {/* Display headline with neon-highlight keywords (variant-specific) */}
        <h1
          className="font-bold tracking-tight leading-[0.95]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            letterSpacing: "-0.04em",
            color: "var(--cosmic-text-primary)",
          }}
        >
          {tv.rich("headlinePart1", {
            neon: (chunks) => <span className="neon-highlight">{chunks}</span>,
          })}
          <br />
          {tv.rich("headlinePart2", {
            neon: (chunks) => <span className="neon-highlight">{chunks}</span>,
          })}
        </h1>

        {/* Subhead (variant-specific) */}
        <p
          className="max-w-2xl mx-auto leading-relaxed"
          style={{
            fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
            color: "var(--cosmic-text-secondary)",
          }}
        >
          {tv("subhead")}
        </p>

        {/* For whom */}
        <p
          className="text-sm"
          style={{ color: "var(--cosmic-text-muted)" }}
        >
          {t("forWhom")}
        </p>

        {/* CTAs — propagate ?v= so apply page can attribute A/B variant */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
          <a
            href={`/apply?v=${variant}`}
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded font-medium transition-all hover:scale-[1.03]"
            style={{
              backgroundColor: "var(--cosmic-neon)",
              color: "var(--cosmic-ink)",
              boxShadow: "0 0 32px #00d9ff50, 0 8px 24px #00000050",
            }}
          >
            {t("cta")}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#features"
            className="inline-block px-8 py-3.5 rounded font-medium border transition-colors hover:bg-white/5"
            style={{
              borderColor: "var(--cosmic-border)",
              color: "var(--cosmic-text-primary)",
            }}
          >
            {t("ctaSecondary")}
          </a>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 pt-12">
          <Stat value={t("stat1Value")} label={t("stat1Label")} />
          <span className="hidden md:inline" style={{ color: "var(--cosmic-text-muted)" }}>·</span>
          <Stat value={t("stat2Value")} label={t("stat2Label")} />
          <span className="hidden md:inline" style={{ color: "var(--cosmic-text-muted)" }}>·</span>
          <Stat value={t("stat3Value")} label={t("stat3Label")} />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div
        className="text-2xl font-bold"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--cosmic-text-primary)",
        }}
      >
        {value}
      </div>
      <div className="mono-chip mt-1">{label}</div>
    </div>
  );
}

/* ============================================================
   FLOATING AI COMPANY CARDS — brief §12.5 OQ8
   ============================================================ */

function LifeCard() {
  const t = useTranslations("HomePage.heroCards.life");
  return (
    <CompanyCard
      title={t("title")}
      tasks={[t("task1"), t("task2"), t("task3")]}
      tag={t("tag")}
      positionClass="hidden lg:block absolute top-[18%] left-[3%] xl:left-[6%]"
      delay="100ms"
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
      positionClass="hidden lg:block absolute top-[22%] right-[3%] xl:right-[6%]"
      delay="200ms"
    />
  );
}

function CreateCard({ variant }: { variant: Variant }) {
  const t = useTranslations("HomePage.heroCards.create");
  return (
    <div
      className="hidden xl:block absolute bottom-[12%] left-1/2 -translate-x-1/2 max-w-[280px] rounded-md border p-5 animate-slide-in-up neon-glow"
      style={{
        animationDelay: "300ms",
        backgroundColor: "var(--cosmic-panel-elevated)",
        borderColor: "var(--cosmic-border)",
      }}
    >
      <div className="mono-chip-neon mb-3">{t("title")}</div>
      <ul
        className="text-sm space-y-1.5 mb-4 leading-relaxed"
        style={{ color: "var(--cosmic-text-secondary)" }}
      >
        <li>· {t("line1")}</li>
        <li>· {t("line2")}</li>
        <li>· {t("line3")}</li>
      </ul>
      <a
        href={`/apply?v=${variant}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium hover:gap-2 transition-all"
        style={{ color: "var(--cosmic-neon)" }}
      >
        {t("cta")} <ArrowRight className="w-3.5 h-3.5" />
      </a>
      <div className="mono-chip mt-3 pt-3 border-t" style={{ borderColor: "var(--cosmic-ghost)" }}>
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
  delay,
}: {
  title: string;
  tasks: string[];
  tag: string;
  positionClass: string;
  delay: string;
}) {
  return (
    <div
      className={`${positionClass} max-w-[260px] rounded-md border p-5 animate-slide-in-up neon-glow`}
      style={{
        animationDelay: delay,
        backgroundColor: "var(--cosmic-panel-elevated)",
        borderColor: "var(--cosmic-ghost)",
      }}
    >
      <div
        className="text-sm font-semibold mb-3"
        style={{ color: "var(--cosmic-text-primary)" }}
      >
        {title}
      </div>
      <ul
        className="text-xs space-y-1.5 mb-3 leading-relaxed"
        style={{ color: "var(--cosmic-text-secondary)" }}
      >
        {tasks.map((task, i) => (
          <li key={i}>· {task}</li>
        ))}
      </ul>
      <div className="mono-chip pt-3 border-t" style={{ borderColor: "var(--cosmic-ghost)" }}>
        {tag}
      </div>
    </div>
  );
}

/* ============================================================
   SECTION 2 — 三类受众
   ============================================================ */

function Section2() {
  const t = useTranslations("Section2");
  const personas = [
    { key: "personaB", Icon: Briefcase },
    { key: "personaC", Icon: Sparkles },
    { key: "personaD", Icon: Compass },
  ] as const;

  return (
    <section
      id="features"
      className="py-32 px-6"
      style={{ backgroundColor: "var(--cosmic-ink)" }}
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-20 max-w-3xl">
          <div className="mono-chip-neon mb-4">{t("eyebrow")}</div>
          <h2
            className="font-bold tracking-tight mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
              color: "var(--cosmic-text-primary)",
            }}
          >
            {t("title")}
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--cosmic-text-secondary)" }}
          >
            {t("subtitle")}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map(({ key, Icon }, i) => (
            <PersonaCard
              key={key}
              Icon={Icon}
              label={t(`${key}.label`)}
              title={t(`${key}.title`)}
              desc={t(`${key}.desc`)}
              delay={`${i * 100}ms`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PersonaCard({
  Icon,
  label,
  title,
  desc,
  delay,
}: {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  title: string;
  desc: string;
  delay: string;
}) {
  return (
    <div
      className="rounded-md border p-8 animate-slide-in-up"
      style={{
        animationDelay: delay,
        backgroundColor: "var(--cosmic-panel)",
        borderColor: "var(--cosmic-ghost)",
      }}
    >
      <Icon
        className="w-8 h-8 mb-6"
        style={{ color: "var(--cosmic-neon)" }}
      />
      <div className="mono-chip mb-3">{label}</div>
      <h3
        className="text-xl font-semibold mb-3 leading-tight"
        style={{ color: "var(--cosmic-text-primary)" }}
      >
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--cosmic-text-secondary)" }}
      >
        {desc}
      </p>
    </div>
  );
}

/* ============================================================
   SECTION 3 — 核心能力 + 5 MCP server (中心-星座 motif)
   ============================================================ */

function Section3() {
  const t = useTranslations("Section3");
  return (
    <section
      className="py-32 px-6 canvas-grid"
      style={{ backgroundColor: "var(--cosmic-panel)" }}
    >
      <div className="max-w-6xl mx-auto space-y-20">
        <header className="max-w-3xl">
          <div className="mono-chip-neon mb-4">{t("eyebrow")}</div>
          <h2
            className="font-bold tracking-tight mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
              color: "var(--cosmic-text-primary)",
            }}
          >
            {t("title")}
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--cosmic-text-secondary)" }}
          >
            {t("subtitle")}
          </p>
        </header>

        {/* 3 capability bullets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <CapabilityBullet num="01" title={t("cap1Title")} desc={t("cap1Desc")} />
          <CapabilityBullet num="02" title={t("cap2Title")} desc={t("cap2Desc")} />
          <CapabilityBullet num="03" title={t("cap3Title")} desc={t("cap3Desc")} />
        </div>

        {/* ACM Hub + 5 MCP server constellation */}
        <div className="pt-12 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="mono-chip-neon">{t("mcpEyebrow")}</div>
            <h3
              className="font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                color: "var(--cosmic-text-primary)",
              }}
            >
              {t("mcpHeadline")}
            </h3>
          </div>

          {/* ACM Hub badge */}
          <div className="flex justify-center">
            <div
              className="inline-flex flex-col items-center px-8 py-5 rounded-full border-2"
              style={{
                backgroundColor: "var(--cosmic-panel-elevated)",
                borderColor: "var(--cosmic-neon)",
                boxShadow: "0 0 40px #00d9ff30, inset 0 0 20px #00d9ff10",
              }}
            >
              <Shield
                className="w-10 h-10 mb-2"
                style={{ color: "var(--cosmic-neon)" }}
              />
              <div
                className="text-base font-bold tracking-wide"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--cosmic-neon)",
                }}
              >
                {t("hubLabel")}
              </div>
              <div className="mono-chip mt-0.5">{t("hubSubtitle")}</div>
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
          <div className="text-center max-w-2xl mx-auto space-y-3 pt-6">
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--cosmic-text-secondary)" }}
            >
              {t("mcpFootnote")}
            </p>
            <a
              href="https://github.com/modelcontextprotocol/servers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium hover:gap-2 transition-all"
              style={{ color: "var(--cosmic-neon)" }}
            >
              {t("mcpLink")} <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilityBullet({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="space-y-3 animate-slide-in-up">
      <div
        className="text-3xl font-bold"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--cosmic-neon)",
          opacity: 0.6,
        }}
      >
        {num}
      </div>
      <h3
        className="text-lg font-semibold leading-snug"
        style={{ color: "var(--cosmic-text-primary)" }}
      >
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--cosmic-text-secondary)" }}
      >
        {desc}
      </p>
    </div>
  );
}

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
    low: { backgroundColor: "#4a4f5833", color: "#8a8f98" },
    medium: { backgroundColor: "#3b82f633", color: "#60a5fa" },
    high: { backgroundColor: "#f59e0b33", color: "#fbbf24" },
  }[risk];

  return (
    <div
      className="rounded-md border p-5 text-center space-y-3 transition-all hover:-translate-y-1 hover:border-cosmic-neon/40"
      style={{
        backgroundColor: "var(--cosmic-panel-elevated)",
        borderColor: "var(--cosmic-ghost)",
      }}
    >
      <Icon
        className="w-7 h-7 mx-auto"
        style={{ color: "var(--cosmic-text-primary)" }}
      />
      <div
        className="text-sm font-semibold"
        style={{ color: "var(--cosmic-text-primary)" }}
      >
        {t("name")}
      </div>
      <div
        className="text-xs leading-relaxed"
        style={{ color: "var(--cosmic-text-muted)" }}
      >
        {t("desc")}
      </div>
      <div
        className="inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded"
        style={riskStyle}
      >
        {tRisk(risk)}
      </div>
      {risk === "high" && (
        <div
          className="mono-chip pt-2 border-t"
          style={{ borderColor: "var(--cosmic-ghost)", color: "var(--cosmic-warning)" }}
        >
          ⚠ {t("needsApproval")}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   SECTION 4 — Roadmap 三段 + Wishlist
   ============================================================ */

function Section4() {
  const t = useTranslations("Section4");
  return (
    <section
      id="roadmap"
      className="py-32 px-6"
      style={{ backgroundColor: "var(--cosmic-ink)" }}
    >
      <div className="max-w-6xl mx-auto space-y-16">
        <header className="max-w-3xl">
          <div className="mono-chip-neon mb-4">{t("eyebrow")}</div>
          <h2
            className="font-bold tracking-tight mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
              color: "var(--cosmic-text-primary)",
            }}
          >
            {t("title")}
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--cosmic-text-secondary)" }}
          >
            {t("subtitle")}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <RoadmapColumn
            namespace="Section4.now"
            itemKeys={["item1", "item2", "item3", "item4", "item5", "item6", "item7"]}
            withPulse
          />
          <RoadmapColumn
            namespace="Section4.soon"
            itemKeys={["item1", "item2", "item3", "item4", "item5", "item6", "item7"]}
          />
          <RoadmapColumn
            namespace="Section4.future"
            itemKeys={["item1", "item2", "item3", "item4", "item5"]}
          />
        </div>

        <Wishlist />
      </div>
    </section>
  );
}

function RoadmapColumn({
  namespace,
  itemKeys,
  withPulse = false,
}: {
  namespace: string;
  itemKeys: string[];
  withPulse?: boolean;
}) {
  const t = useTranslations(namespace);
  return (
    <div className="space-y-5">
      <div className="space-y-2 pb-4 border-b" style={{ borderColor: "var(--cosmic-ghost)" }}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{t("emoji")}</span>
          <h3
            className="text-base font-semibold tracking-tight"
            style={{ color: "var(--cosmic-text-primary)" }}
          >
            {t("label")}
          </h3>
        </div>
        <div className="mono-chip pl-9">{t("tag")}</div>
      </div>
      <ul className="space-y-3">
        {itemKeys.map((key) => (
          <li
            key={key}
            className="text-sm leading-relaxed flex items-start gap-3"
            style={{ color: "var(--cosmic-text-secondary)" }}
          >
            {withPulse ? (
              <span
                className="pulse-dot mt-1.5 inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: "var(--cosmic-neon)" }}
              />
            ) : (
              <span
                className="mt-2 inline-block w-1 h-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: "var(--cosmic-text-muted)" }}
              />
            )}
            <span>{t(key)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Wishlist() {
  const t = useTranslations("Section4.wishlist");
  return (
    <div
      className="rounded-md border p-8 max-w-3xl mx-auto space-y-4 animate-fade-in"
      style={{
        backgroundColor: "var(--cosmic-panel)",
        borderColor: "var(--cosmic-border)",
        boxShadow: "0 0 32px #00d9ff10",
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className="pulse-dot inline-block w-2 h-2 rounded-full"
          style={{ backgroundColor: "var(--cosmic-neon)" }}
        />
        <div className="mono-chip-neon">{t("eyebrow")}</div>
      </div>
      <h3
        className="text-xl font-semibold leading-tight"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--cosmic-text-primary)",
        }}
      >
        {t("title")}
      </h3>
      <p
        className="text-base leading-relaxed"
        style={{ color: "var(--cosmic-text-secondary)" }}
      >
        {t("desc")}
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
        {t("footnote")}
      </p>
      <a
        href="/wishlist"
        className="inline-flex items-center gap-1.5 text-sm font-medium hover:gap-2 transition-all"
        style={{ color: "var(--cosmic-neon)" }}
      >
        {t("cta")} <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

/* ============================================================
   SECTION 5 — About (作者自述)
   ============================================================ */

function Section5() {
  const t = useTranslations("Section5");
  return (
    <section
      id="about"
      className="py-32 px-6"
      style={{ backgroundColor: "var(--cosmic-panel)" }}
    >
      <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in">
        <div className="mono-chip-neon">{t("eyebrow")}</div>
        <h2
          className="font-bold tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            letterSpacing: "-0.02em",
            color: "var(--cosmic-text-primary)",
          }}
        >
          {t("title")}
        </h2>

        {/* Vertical accent line */}
        <div className="flex justify-center">
          <div
            className="w-px h-12"
            style={{
              background: "linear-gradient(to bottom, var(--cosmic-neon), transparent)",
            }}
          />
        </div>

        <div
          className="text-lg md:text-xl leading-relaxed space-y-3"
          style={{ color: "var(--cosmic-text-secondary)" }}
        >
          <p>{t("line1")}</p>
          <p>{t("line2")}</p>
          <p>{t("line3")}</p>
          <p
            className="pt-2 font-medium"
            style={{ color: "var(--cosmic-text-primary)" }}
          >
            {t("line4")}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 6 — FAQ
   ============================================================ */

function Section6() {
  const t = useTranslations("Section6");
  const faqKeys = ["F1", "F2", "F3", "F4", "F8"] as const;
  return (
    <section
      id="faq"
      className="py-32 px-6"
      style={{ backgroundColor: "var(--cosmic-ink)" }}
    >
      <div className="max-w-3xl mx-auto space-y-16">
        <header className="max-w-2xl">
          <div className="mono-chip-neon mb-4">{t("eyebrow")}</div>
          <h2
            className="font-bold tracking-tight mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
              color: "var(--cosmic-text-primary)",
            }}
          >
            {t("title")}
          </h2>
          <p
            className="text-sm italic"
            style={{ color: "var(--cosmic-text-muted)" }}
          >
            {t("numberingNote")}
          </p>
        </header>

        <div className="space-y-10">
          {faqKeys.map((key) => (
            <FAQItem
              key={key}
              num={key}
              q={t(`${key}.q`)}
              a={t(`${key}.a`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ num, q, a }: { num: string; q: string; a: string }) {
  return (
    <div
      className="pl-6 border-l-2 space-y-3 animate-fade-in"
      style={{ borderColor: "var(--cosmic-ghost)" }}
    >
      <div className="flex items-start gap-3">
        <span
          className="mono-chip-neon mt-1.5 flex-shrink-0"
          style={{ fontSize: "0.8125rem" }}
        >
          {num}
        </span>
        <h3
          className="text-lg md:text-xl font-semibold leading-snug"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--cosmic-text-primary)",
          }}
        >
          {q}
        </h3>
      </div>
      <p
        className="text-sm leading-relaxed pl-12"
        style={{ color: "var(--cosmic-text-secondary)" }}
      >
        {a}
      </p>
    </div>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */

function Footer({ variant }: { variant: Variant }) {
  const t = useTranslations("Footer");
  return (
    <footer
      className="border-t py-12 px-6"
      style={{
        borderColor: "var(--cosmic-ghost)",
        backgroundColor: "var(--cosmic-ink)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 text-center">
        <p
          className="text-sm"
          style={{ color: "var(--cosmic-text-secondary)" }}
        >
          {t("openCore")}
        </p>
        {/* A/B test debug indicator — 部署后用于 PO 识别当前 variant */}
        <div
          className="mono-chip-neon inline-flex items-center gap-2 px-3 py-1 rounded-full border"
          style={{ borderColor: "var(--cosmic-border)", backgroundColor: "var(--cosmic-panel)" }}
        >
          HERO VARIANT: {variant}
        </div>
        <div className="mono-chip flex items-center gap-2">
          {t("builtWith")}
          <span style={{ color: "var(--cosmic-text-muted)" }}>·</span>
          <a
            href="https://github.com/angeless/agent-cluster-manager"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-colors"
            style={{ color: "var(--cosmic-neon)" }}
          >
            {t("github")}
          </a>
        </div>
      </div>
    </footer>
  );
}
