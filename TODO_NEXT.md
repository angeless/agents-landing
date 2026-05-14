---
session_id: cc:2026-05-14-agents-landing-cosmic-lab-and-ab-test
parent_session_id: cc:2026-05-14-agents-landing-bootstrap
source: claude-code
last_updated: 2026-05-14
---

# TODO_NEXT — agents-landing repo

## 上次停在 (2026-05-14 evening session)

- **prod live**: https://agents.ngzr.net/zh + /en (经 ACM agents-router worker)
- **Worker Version**: `eeeec488` (Wishlist fix deploy)
- **branches**:
  - `main` HEAD `4885a36` (PR #1 merged: variant payload from 7bbdcf1)
  - `chore-variant-tracking-payload-2026-05-14` HEAD `f0a799c` (含 3 个未 merge 进 main 的 commits — 但已 deploy 到 prod)
- **未 merge 到 main 的 commits**（在 chore branch）：
  - `f0a799c` fix(wishlist): 建 placeholder page (mailto + GitHub Issues 双 channel)
  - `cb6d22a` fix(apply): truncate referrer_url to backend Pydantic 500 cap
  - `8396f7c` feat(experiment): middleware random variant assignment + cookie persistence

## 今日 (2026-05-14) 产出

### 视觉重做：Cosmic Lab v2.0 (commit ea895b4)
- 加 `DESIGN.md` spec (Cosmic Lab tokens + prose, design.md format)
- 重写 `app/globals.css` (cosmic CSS vars + utilities)
- 重写 `page.tsx` (cosmic-hero-bg + SVG orbit/dots + 6 section visual hooks)
- 调性参照：LayerZero / Anthropic claude.ai / Replicate

### A/B Hero test 基础 (commit 9dab566 + 7bbdcf1 + 8396f7c)
- 3 个 Hero variant copy in zh + en JSON
  - A "Data Punch"   — 93% AI Agent 项目卡 POC→生产
  - B "OpenClaw 对比" — OpenClaw 1 agent / ACM 一支自愈军团
  - C "OPC empowerment" — 一人 N 家 AI 公司 / AgentOps 基座
- `useSearchParams` 读 `?v=` + `normalizeVariant()` whitelist 防御
- Apply payload 加 variant + variant_session_id (localStorage UUID) + referrer_url
- `middleware.ts` wrap next-intl: 检测无 ?v= → 随机选 A/B/C + cookie 锁 30 天 + server rewrite (URL 浏览器栏保持 /zh 干净)

### Section 2-6 文案 OPC 调研重写 (commit b7f1598)
- Section 2: 砍 B/C persona，OPC laser focus (Scaling Indie / Digital Nomad / Indie Operator)
- Section 3: title 改 "AgentOps Stack"，cap2 改 "AgentOps 治理"
- Section 4: future tag 改 "持续演进 V1.X+ 持续探索"
- Section 5: line1 "我也是 OPC"，line4 加 Pieter Levels $3.5M ARR 共鸣
- Section 6: F2 改对标 OpenClaw / Cursor agent，F3 删 "70% 完成 + 30%" 自伤数字

### Wishlist fix (commit f0a799c)
- 建 `app/[locale]/wishlist/page.tsx` placeholder
- 双 channel：mailto:hello@agents.ngzr.net + GitHub Issues (label=mcp-wishlist)
- `WishlistPage` namespace zh + en 10 keys

### Apply form bug fix (commit 4f8071d + cb6d22a)
- `intent` → `intended_use` payload key (pre-existing bug，backend deploy 前没暴露)
- `referrer_url` truncate 到 500 字符 (匹配 backend Pydantic Field(max_length=500))

## 已完成功能 (5 个 ship-ready 路由)

| 路由 | 文件 | 功能 |
|---|---|---|
| `/` | next-intl middleware redirect → `/zh` 或 `/en` | i18n auto-detection |
| `/zh` `/en` | `app/[locale]/page.tsx` (~700 行) | 主页 6 段 + 3 Hero variant + 浮动卡 + SVG orbit |
| `/zh/apply` `/en/apply` | `app/[locale]/apply/page.tsx` (~330 行) | 申请表单 + 蜜罐 + variant payload + cohort UUID |
| `/zh/over-capacity` `/en/over-capacity` | `app/[locale]/over-capacity/page.tsx` (~50 行) | 限流页 |
| `/zh/wishlist` `/en/wishlist` | `app/[locale]/wishlist/page.tsx` (~140 行) | MCP wishlist placeholder |
| `/robots.txt` | `public/robots.txt` | SEO 索引规则 |

i18n messages 覆盖：HomePage / variantA/B/C / Section2-6 / ApplyPage / OverCapacity / WishlistPage / Footer (zh + en)

## 下一步（按优先级）

### 🟢 立刻可做（不需 backend，不需 review）

- [ ] **PO hard reload 浏览器** (`Cmd+Shift+R`) 验证 Section 2-6 polish 真 live
- [ ] **PO 发统一 URL 到 1-2 个渠道**测试（如即刻 / 知乎 / Twitter）
  - 推荐 URL: `https://agents.ngzr.net/zh` (server 自动随机分流)
  - 备用强制 URL: `?v=A` `?v=B` `?v=C` 给特定渠道精准 attribution
- [ ] **观察 Worker logs** 看渠道流量 (Cloudflare dashboard → Workers → agents-landing → Logs)

### 🟡 chore branch merge to main

`chore-variant-tracking-payload-2026-05-14` 上还有 3 个 commits 未进 main：
```
git checkout main
git merge chore-variant-tracking-payload-2026-05-14
git push origin main
```

或者建 PR review 后 merge — 推荐。否则 main 跟 prod 漂移。

### 🟡 V1.10 release deps（PO 并行 session）

backend variant 字段 (ACM 主仓 commit `29f6f99`) 在 V1.10 分支 ready，等：
- ACM V1.10 rebase onto main (重命名 migration 033→038, 034→039)
- ci_verify + cross-audit + PR + merge to main
- Deploy to prod (ssh acm-prod / acm-deploy)
- Migration 038 + 039 跑通
- Restart api-gateway
- 1-2 周后数据回收：`SELECT variant, COUNT(*) FROM waitlist_applications GROUP BY variant`

### 🟢 短期 polish (可在 chore session 做)

| 任务 | 说明 | 触发时机 |
|---|---|---|
| Cloudflare Email Routing 配 hello@agents.ngzr.net inbound forward | 现在 mailto: 邮件会 bounce | 上线前补 |
| `/wishlist` 替换为真 form (Notion / Tally / Typeform) | 现在是 placeholder | V1.10 release 后或 PO 决策 form 提供方时 |
| Section 4 future segment 完全砍 vs 重 frame | brief v3 frozen 但 OPC research 建议砍 | 等数据回收后跟 brief v4 一起做 |
| Mobile responsive 边缘 case 测试 | 浮动 3 卡 mobile 是否 stack 正常 | 流量起来后看 |
| Worker A/B traffic split sanity check | Math.random() CF 跨地区 distribution 验证 | 数据回收后 |

### ⚪ 长期 (brief v4 升级)

等 A/B 数据回收（1-2 周）后：
- 胜出 variant 写进 brief v4 §4 Hero copy
- §2 persona OPC laser focus
- §3 用 AgentOps / 自愈 / Multi-Agent Orchestration 词汇
- §5 Section 6 F2 改 OpenClaw 对比 / F3 删 70%
- 加 §13 引用 `opc-market-research.md` 作 evidence trail
- 加 §14 A/B test 数据回收 summary
- 同步漂移项见 `docs/product/opc-market-research.md` §7 表格

## 注意事项（本项目特有约束）

- **Brief v3 frozen 跟实际 landing 漂移大** — 等数据回收写 v4 同步
- **prod 跑的是 chore branch 状态**（不是 main）— 因为 wrangler deploy 用本地 build
- **CF Pages auto-deploy 未配** — push main 不会触发 deploy，仍需手动 `npm run deploy`
- **Backend deploy = V1.10 full release** — 不是小 hotfix，是大工作
- **mailto:hello@agents.ngzr.net inbound 会 bounce** — Resend 只 outbound，需 CF Email Routing 单独配
- **AGENTS.md 警告** — Next.js 16 不在训练数据里，写代码前先读 `node_modules/next/dist/docs/`
- **bash cwd 重置** — 每次 Bash 命令 cwd 重置回 ACM worktree，操作 agents-landing 要 `cd ~/agents-landing`

## 跨 repo 引用

- ACM 主仓 brief v3 (frozen 2026-05-13):
  `https://github.com/angeless/agent-cluster-manager/blob/test-v-1-10-landing-invite/docs/product/v1-a-landing-brief.md`
- ACM 主仓 OPC 市场调研 v1.0:
  `https://github.com/angeless/agent-cluster-manager/blob/test-v-1-10-landing-invite/docs/product/opc-market-research.md`
- ACM 主仓 backend variant code (V1.10):
  `https://github.com/angeless/agent-cluster-manager/blob/test-v-1-10-landing-invite/services/api-gateway/app/routers/waitlist.py`
- ACM 主仓 migration 034 (要 rebase 时改 039):
  `https://github.com/angeless/agent-cluster-manager/blob/test-v-1-10-landing-invite/db/migrations/034_waitlist_variant_tracking.sh`
- ACM 主仓 worker router:
  `https://github.com/angeless/agent-cluster-manager/blob/test-v-1-10-landing-invite/workers/agents-router/src/index.ts`
- DESIGN.md spec (本 repo):
  `https://github.com/angeless/agents-landing/blob/chore-variant-tracking-payload-2026-05-14/DESIGN.md`

## Session 2026-05-14 evening 成果汇总

- **15 commits** 跨 2 个 repo (10 agents-landing + 5 ACM 主仓)
- **~2200 行实质代码** (page.tsx + apply + wishlist + globals.css + i18n + middleware + DESIGN.md + opc-research.md)
- **5 ship-ready routes × 2 locales = 10 page**
- **3 Hero variants** live + random middleware + cookie persistence
- **OPC 市场调研 273 行 doc** + 12 sources 引用
- **Backend variant code** ready in V1.10 branch (migration 034 + repo + Pydantic + router + tests 24/24 pass)
- **Brief v3 vs 实际 landing 对比** 18 维度表格输出
