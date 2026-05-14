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

function ApplyFormContent() {
  const t = useTranslations("ApplyPage");
  const searchParams = useSearchParams();
  // Hero A/B test variant tracking — null if no ?v=, otherwise "A"/"B"/"C"
  // backend WaitlistApplyRequest schema 暂未加 variant 字段，Pydantic 默认 extra='ignore'
  // 会静默丢弃 (不 break 提交)。等 ACM 主仓 backend variant chip 任务完成后启用真存。
  const variant = searchParams.get("v");
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
          variant, // Hero A/B test — null / "A" / "B" / "C"
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
