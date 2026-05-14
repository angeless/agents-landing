---
version: alpha
name: ACM V1-A Cosmic Lab
description: |
  Black-space brutalism softened by AI-native cosmic glow.
  调性命名 "Cosmic Lab" — 把屏幕当无限黑色空间，cyan neon 是 AI agent 的"生命迹象"，
  浮动卡片是"虚拟公司星座"。参照 LayerZero / Anthropic claude.ai / Replicate。
  反 anti-pattern：不要 cyberpunk 多色霓虹 / 不要 brand pattern / 不要 cards 堆积。

colors:
  ink: "#000000"
  panel: "#0A0A0A"
  panel-elevated: "#141414"
  fog: "#FFFFFF0A"
  ghost: "#FFFFFF14"
  border: "#FFFFFF26"
  text-primary: "#E6E8EB"
  text-secondary: "#8A8F98"
  text-muted: "#4A4F58"
  neon: "#00D9FF"
  neon-warm: "#5EEAD4"
  warning: "#F59E0B"
  danger: "#EF4444"

typography:
  display:
    fontFamily: "Geist, Inter, 'Noto Sans SC', sans-serif"
    fontSize: 5.5rem
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist, Inter, 'Noto Sans SC', sans-serif"
    fontSize: 3rem
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist, Inter, 'Noto Sans SC', sans-serif"
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: "Inter, 'Noto Sans SC', sans-serif"
    fontSize: 1.125rem
    lineHeight: 1.6
  body:
    fontFamily: "Inter, 'Noto Sans SC', sans-serif"
    fontSize: 0.95rem
    lineHeight: 1.6
  caption:
    fontFamily: "Inter, 'Noto Sans SC', sans-serif"
    fontSize: 0.8125rem
    lineHeight: 1.5
  mono-data:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: 0.75rem
    letterSpacing: "0.04em"
    textTransform: uppercase

rounded:
  none: 0
  sm: 4px
  md: 8px
  lg: 16px
  pill: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  "2xl": 96px
  "3xl": 160px

components:
  hero-bg:
    background: "radial-gradient(circle at 50% 30%, #00D9FF14 0%, transparent 50%), #000000"
  glow-ring:
    backgroundColor: "{colors.panel}"
    borderColor: "{colors.neon}"
    rounded: "{rounded.pill}"
  card-floating:
    backgroundColor: "{colors.panel-elevated}"
    borderColor: "{colors.ghost}"
    rounded: "{rounded.md}"
  button-primary:
    backgroundColor: "{colors.neon}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
  badge-risk-low:
    backgroundColor: "#4A4F5833"
    textColor: "{colors.text-secondary}"
  badge-risk-medium:
    backgroundColor: "#3B82F633"
    textColor: "#60A5FA"
  badge-risk-high:
    backgroundColor: "#F59E0B33"
    textColor: "#FBBF24"
---

## Overview

**"Cosmic Lab"** — Black-space brutalism softened by AI-native cosmic glow.

UI 隐喻：把屏幕当成无垠的黑色空间，cyan neon 是 AI agent 在空间里的"生命迹象"，浮动卡片是"虚拟公司星座"，每张卡片是一颗有引力场的星球。

参照对象：
- **LayerZero** — 协议感、克制大字、accent 强调
- **Anthropic claude.ai** — 留白克制 + warm gradient 底色
- **Replicate** — AI lab 感、装饰元素丰富但克制

不像：
- ❌ Coze / n8n — cards 堆积，dashboard 感
- ❌ Stripe / Linear — 多色 brand pattern
- ❌ 90s cyberpunk — 多色霓虹满屏

## Colors

The palette is **mostly dark with single neon accent**.

- **`ink (#000000)`** — 黑色 canvas，象征"无限可能性的空间"
- **`panel (#0A0A0A)`** — 比 ink 略亮，给"显形"的 section/card 底，制造 subtle elevation
- **`panel-elevated (#141414)`** — 浮动卡片，进一步抬起
- **`neon (#00D9FF)`** — **唯一 accent，AI 的"生命迹象"**。**仅**用在：
  - CTA 按钮主色
  - h1 关键词高亮（"24 小时" / "AI-native"）
  - icon strokes
  - border highlight (focus / active)
  - link underline
  - **不要**铺大面积（背景 / 大色块）—— accent 要"稀有"才有力
- **`neon-warm (#5EEAD4)`** — 偶用作 highlight（如 "🟢 live" status），跟 neon 区分给 status 强 identity
- **`text-primary (#E6E8EB)`** — 主文字（比原版 `#d1d5db` 略亮，提升对比）
- **`text-secondary (#8A8F98)`** — 次文字
- **`text-muted (#4A4F58)`** — 注释/meta

WCAG 对比：
- text-primary on ink: **14.5:1** ✓ AAA
- neon on ink: **8.4:1** ✓ AAA
- text-secondary on ink: **5.2:1** ✓ AA

## Typography

**Inter** 是 base sans（中文 fallback Noto Sans SC）。**Geist** 用作 display（大字），**JetBrains Mono** 用作 data/code chip。

Hierarchy 强对比：
- `display 88px` h1 ↔ `body 15px` p — **5.9× 字号差**（制造"巨字海报"戏剧性）
- `letter-spacing: -0.04em` 在 display — 紧凑字距给 brutalist 感
- `mono-data` 用作 metadata chip（"3 AGENTS · 24H HEARTBEAT"）— **跟 sans 区分给数据强 identity**
- 中文 fallback Noto Sans SC — 不混 Inter，避免中英混排"高低不齐"

## Layout

**3 种 section bg 节奏** 轮转避免单调：
1. **Hero** — `hero-bg` (radial gradient + ink) + floating cosmic decoration
2. **Section 2/4/6** — `ink` (pure black, 让浮动装饰可见)
3. **Section 3/5** — `panel (#0A0A0A)` (subtle elevation, 给"屋顶 section"一点抬起)

- **content max-width**: 1200px (`max-w-6xl`)
- **section padding-y**: `spacing.3xl` (160px) — 大量留白
- **divider**: 每两 section 之间 1px `ghost` 横线，不硬切 bg
- **`canvas-grid`** utility 只用在 Section 3（工具治理）作 hint，**不到处铺**

## Elevation & Depth

3 层 depth:

1. **Floor** — ink base
2. **Panel** — `card-floating` with `box-shadow: 0 8px 24px #00000050, 0 0 20px #00D9FF15`
3. **Hero glow ring** — `box-shadow: 0 0 40px #00D9FF30, inset 0 0 20px #00D9FF10`

## Shapes

- buttons / inputs: `rounded.sm` (4px) — sharp edge 给 brutalist / engineer 感
- cards: `rounded.md` (8px)
- ACM Hub / avatar: `rounded.pill` (9999px) — 圆形对应"hub / 中心"隐喻

## Components

(详见 YAML frontmatter)

## Do's and Don'ts

**Do**:
- 在 h1 里把 1-2 个关键词加 `color: {colors.neon}` + `text-shadow` 高亮
- 浮动装饰：SVG dots / 同心圆 / orbit lines 作 cosmic 元素，在 Hero 周围 `absolute` 散布
- 每个 Section 之间用 1px `ghost` divider，不硬切 bg color
- `mono-data` chip 给 metadata 强 identity (`3 AGENTS · 24H HEARTBEAT`)
- 大留白：section `py-3xl` (160px) 不省
- **每个 Section 必须有一个 visual hook** (icon / 大字 / SVG 装饰 / 数字 chip)

**Don't**:
- 不要用渐变彩虹 / 多色 brand pattern
- 不要把 neon 用在大面积 — accent 要稀有
- 不要 mobile 浮动卡 `absolute` 定位 — 改 grid stack（tablet+ 才浮动）
- 不要混用 emoji 当主装饰 — emoji 限制到 status badge（"🟢 live"），不进 hero 主视觉
- 不要文字 + bullet 无视觉锚点堆积 — 每段须有 hook
