"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

/**
 * Apply 申请表单 — Task 4.3
 *
 * 字段（brief §9）：
 * - 姓名 / Name
 * - 邮箱 / Email
 * - intent："你想用 ACM 做什么"（审批的核心信号）
 * - 蜜罐 website_url（隐藏，bot 防御）
 *
 * 提交目标：POST /api/v1/landing/apply
 *   → 由 ACM 主仓 workers/agents-router/ 路由到 ACM api-gateway
 *
 * Thank-you 文案：brief §9 line 278 + audit W29 决策 — '我们尽快审核'，不写硬 SLA。
 */
export default function ApplyPage() {
  // useSearchParams 需要 Suspense 包裹（Next.js 15+ 静态优化阶段会 CSR-bailout 警告）
  return (
    <Suspense fallback={null}>
      <ApplyFormContent />
    </Suspense>
  );
}

// Variant whitelist must match backend Pydantic `Literal['A','B','C']`.
// Anything outside this set is normalized to null so a hand-edited URL
// like /zh?v=a or /zh?v=D doesn't trigger ACM-VALIDATION 422 on submit.
const VARIANT_WHITELIST = ["A", "B", "C"] as const;
type Variant = (typeof VARIANT_WHITELIST)[number];

function normalizeVariant(raw: string | null): Variant | null {
  const upper = raw?.toUpperCase();
  return (VARIANT_WHITELIST as readonly string[]).includes(upper ?? "")
    ? (upper as Variant)
    : null;
}

// Variant session ID — opaque client-minted UUID persisted in localStorage
// so the same visitor's repeat submissions share one ID (for backend's
// `COUNT(DISTINCT variant_session_id)` cohort dedup). Created lazily on
// submit to avoid any pre-submit tracking. Returns null in private mode
// / when localStorage is unavailable — submission still works, dedup is
// best-effort.
function getOrCreateVariantSessionId(): string | null {
  try {
    let id = localStorage.getItem("acm_variant_sid");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("acm_variant_sid", id);
    }
    return id;
  } catch {
    return null;
  }
}

function ApplyFormContent() {
  const t = useTranslations("ApplyPage");
  const searchParams = useSearchParams();
  // Hero A/B variant attribution. Backend (migration 039) stores this
  // in waitlist_applications.variant alongside received_at, user_agent,
  // and variant_session_id for one-week cohort analysis.
  const variant = normalizeVariant(searchParams.get("v"));
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);

    // Honeypot：bot 自动填充 website_url 时静默假成功（不暴露反爬逻辑）
    if (formData.get("website_url")) {
      setStatus("success");
      return;
    }

    // Cohort attribution metadata. All three fields are optional on the
    // backend — missing values record NULL in DB without affecting the
    // primary submission.
    const variantSessionId = getOrCreateVariantSessionId();
    // Backend Pydantic max_length=500 on referrer_url (per migration 033).
    // Long referrers (Google advanced-search params, UTM bloat, pre-signed
    // S3 URLs) can exceed this and would 422-reject the entire submission.
    // Truncate client-side so the form always succeeds; analytics loses the
    // tail of the URL, which is acceptable.
    const referrerUrl = document.referrer
      ? document.referrer.slice(0, 500)
      : undefined;

    try {
      const res = await fetch("/api/v1/landing/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          // 注意：form input name 是 "intent" (前端 UI 命名)，但 backend
          // ApplyRequest schema field 是 "intended_use" — payload key
          // 必须用 backend 命名，否则 Pydantic 422 ACM-VALIDATION
          intended_use: formData.get("intent"),
          // ----- A/B Hero variant attribution (backend migration 039) -----
          variant, // normalized null | 'A' | 'B' | 'C'
          variant_session_id: variantSessionId, // null in private mode
          referrer_url: referrerUrl, // undefined when no document.referrer
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <ThankYou />;
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <header className="text-center space-y-3">
          <h1
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: "var(--acm-text-primary)" }}
          >
            {t("title")}
          </h1>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--acm-text-secondary)" }}
          >
            {t("subtitle")}
          </p>
        </header>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Honeypot：CSS 隐藏 + tabindex=-1 + aria-hidden */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
          >
            <label htmlFor="website_url">Website (leave empty)</label>
            <input
              type="text"
              id="website_url"
              name="website_url"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <Field
            label={t("nameLabel")}
            id="name"
            type="text"
            placeholder={t("namePlaceholder")}
            required
          />
          <Field
            label={t("emailLabel")}
            id="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            required
          />
          <TextareaField
            label={t("intentLabel")}
            id="intent"
            placeholder={t("intentPlaceholder")}
            helper={t("intentHelper")}
            required
          />

          {status === "error" && (
            <div
              className="rounded-md border px-4 py-3 text-sm space-y-1"
              style={{
                borderColor: "#ef4444",
                backgroundColor: "#ef444414",
                color: "#fca5a5",
              }}
            >
              <div className="font-semibold">{t("errorTitle")}</div>
              <div className="text-xs">{t("errorBody")}</div>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="neon-glow w-full px-6 py-3 rounded-md font-medium transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              backgroundColor: "var(--acm-accent)",
              color: "var(--acm-on-accent)",
            }}
          >
            {status === "submitting"
              ? t("submitting")
              : status === "error"
                ? t("errorRetry")
                : t("submit")}
          </button>

          <p
            className="text-xs text-center leading-relaxed"
            style={{ color: "var(--acm-text-secondary)" }}
          >
            {t("privacyNote")}
          </p>
        </form>

        <div className="text-center">
          <a
            href="/"
            className="text-xs hover:underline"
            style={{ color: "var(--acm-text-secondary)" }}
          >
            {t("backToHome")}
          </a>
        </div>
      </div>
    </main>
  );
}

/* ============================================================
   Form Fields
   ============================================================ */

function Field({
  label,
  id,
  type,
  placeholder,
  required,
}: {
  label: string;
  id: string;
  type: "text" | "email";
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="block text-sm font-medium"
        style={{ color: "var(--acm-text-primary)" }}
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-md border text-sm transition-colors focus:outline-none focus:border-[color:var(--acm-accent)]"
        style={{
          backgroundColor: "var(--acm-bg-panel)",
          borderColor: "var(--acm-border-light)",
          color: "var(--acm-text-primary)",
        }}
      />
    </div>
  );
}

function TextareaField({
  label,
  id,
  placeholder,
  helper,
  required,
}: {
  label: string;
  id: string;
  placeholder: string;
  helper?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="block text-sm font-medium"
        style={{ color: "var(--acm-text-primary)" }}
      >
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        rows={5}
        required={required}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-md border text-sm transition-colors focus:outline-none focus:border-[color:var(--acm-accent)] resize-none"
        style={{
          backgroundColor: "var(--acm-bg-panel)",
          borderColor: "var(--acm-border-light)",
          color: "var(--acm-text-primary)",
        }}
      />
      {helper && (
        <p
          className="text-xs italic leading-relaxed"
          style={{ color: "var(--acm-text-secondary)" }}
        >
          {helper}
        </p>
      )}
    </div>
  );
}

/* ============================================================
   Thank You Inline View
   ============================================================ */

function ThankYou() {
  const t = useTranslations("ApplyPage");
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md text-center space-y-6 animate-scale-in">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full neon-glow"
          style={{
            backgroundColor: "var(--acm-bg-panel)",
            border: "2px solid var(--acm-accent)",
          }}
        >
          <svg
            className="w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            style={{ color: "var(--acm-accent)" }}
          >
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1
          className="text-2xl md:text-3xl font-bold tracking-tight"
          style={{ color: "var(--acm-text-primary)" }}
        >
          {t("thankYouTitle")}
        </h1>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--acm-text-secondary)" }}
        >
          {t("thankYouBody")}
        </p>
        <a
          href="/"
          className="inline-block text-sm hover:underline"
          style={{ color: "var(--acm-accent)" }}
        >
          {t("backToHome")}
        </a>
      </div>
    </main>
  );
}
