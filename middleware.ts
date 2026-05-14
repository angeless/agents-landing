import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/**
 * Hero A/B test — random variant assignment with cookie persistence.
 *
 * 设计目标：用户访问 https://agents.ngzr.net/zh （无 ?v= 参数）→ middleware
 * 在 server-side **rewrite**（不是 redirect）URL 加 ?v=X，浏览器地址栏保持
 * 干净的 /zh。Cookie 锁定 30 天，second visit 看同 variant，避免 confuse。
 *
 * 与 frontend apply form `acm_variant_sid` (localStorage UUID) 配合：
 *   - cookie acm_variant   → 锁定本浏览器看哪个 Hero variant (30 天)
 *   - localStorage UUID    → 同一访客多次提交 share 一个 cohort ID (dedup)
 *
 * 显式 `?v=X` 始终被尊重（share link 仍可强制指定 variant）。
 * 注：variants 严格匹配 backend Pydantic `Literal['A','B','C']` whitelist。
 */
const VARIANTS = ["A", "B", "C"] as const;
type Variant = (typeof VARIANTS)[number];
const COOKIE_NAME = "acm_variant";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function pickRandomVariant(): Variant {
  return VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
}

function isValidVariant(v: string | undefined): v is Variant {
  return v !== undefined && (VARIANTS as readonly string[]).includes(v);
}

export default function middleware(req: NextRequest): NextResponse {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // 只在 locale-prefixed pages 上做随机分流。Root `/` 让 next-intl 先做
  // accept-language → /zh 或 /en redirect；/apply、/over-capacity 等不需要
  // variant 分流（它们的内容跟 Hero variant 无关）。
  const isLocalizedHomeOrSegment =
    pathname === "/zh" || pathname === "/en";

  // 已带 ?v= 的请求直接走 next-intl（share link / hand-edit / 强制覆盖场景）
  const hasExplicitVariant = url.searchParams.has("v");

  if (isLocalizedHomeOrSegment && !hasExplicitVariant) {
    // 检查 cookie；无效或缺失就随机选
    const existing = req.cookies.get(COOKIE_NAME)?.value;
    const variant: Variant = isValidVariant(existing)
      ? existing
      : pickRandomVariant();

    // Server-side rewrite — 浏览器地址栏保持原 URL，但 SSR 用 ?v=variant
    // 渲染 Hero。React Server Component 读 searchParams 拿到 variant。
    url.searchParams.set("v", variant);
    const response = NextResponse.rewrite(url);

    // Set / refresh cookie (sliding window: 每次访问续 30 天)
    response.cookies.set({
      name: COOKIE_NAME,
      value: variant,
      maxAge: COOKIE_MAX_AGE_SECONDS,
      path: "/",
      sameSite: "lax",
      // httpOnly: false — 不设，因为后续可能要 frontend JS 读出 variant 调试
      // secure 在 prod (https) 自动启用，dev (http://localhost) 也能用
    });
    return response;
  }

  // 其他情况走 next-intl middleware（locale 检测 + 路由）
  return intlMiddleware(req);
}

export const config = {
  // 匹配除 api / _next / static / dotfiles 之外的所有路径
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
