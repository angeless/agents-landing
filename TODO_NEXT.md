---
session_id: cc:2026-05-14-agents-landing-bootstrap
parent_session_id: cc:2026-05-13-acm-v1.10-brief-freeze
source: claude-code
---

# TODO_NEXT — agents-landing repo

## 上次停在

- **版本**：pre-v0.1.0（尚无 VERSION 文件，待 CF Pages 部署后建议打 v0.1.0 tag）
- **分支**：main（唯一分支，CF Pages auto-deploy 目标）
- **最后完成**：WS-4 Task 4.1 → 4.5 全部 done（2026-05-14 session）
- **commits**：
  - `66054f9` Initial commit from Create Next App
  - `9881c38` chore: add next-intl for i18n
  - `b37c827` docs: CLAUDE.md + TODO_NEXT.md (Task 4.1 D)
  - `866f4f9` feat(i18n): next-intl bilingual scaffold (Task 4.1 B)
  - `a89268d` feat(design): port ACM Design System utility (Task 4.1 C)
  - `e01e339` feat(landing): Hero + Footer (Task 4.2 A1)
  - `c54ae32` feat(landing): Section 2 + Section 3 (Task 4.2 A2)
  - `24f6969` feat(landing): Section 4/5/6 (Task 4.2 A3)
  - `0cc2c36` feat(landing): apply + over-capacity + robots.txt (Task 4.3+4.4+4.5)

## 已完成功能

| 路由 | 文件 | 功能 |
|---|---|---|
| `/` | redirect via middleware → `/zh` 或 `/en` | next-intl 自动语言协商 |
| `/zh` `/en` | `app/[locale]/page.tsx` (~600 行) | 主页 6 段（Hero + Section 2-6 + Footer） |
| `/zh/apply` `/en/apply` | `app/[locale]/apply/page.tsx` (~280 行) | 申请表单 + 蜜罐 + thank-you |
| `/zh/over-capacity` `/en/over-capacity` | `app/[locale]/over-capacity/page.tsx` (~50 行) | 限流页 |
| `/robots.txt` | `public/robots.txt` | SEO 索引规则 |

i18n messages 完整覆盖：HomePage / Section2-6 / ApplyPage / OverCapacity / Footer。zh + en 同步对照。

## 下一步（按优先级）

### 🟡 高优先级：CF Pages 部署 + 7-path smoke test

**需要 PO 手动操作 Cloudflare dashboard**（CLI 也可用 wrangler 配，但 dashboard 更直观）：

1. 登录 Cloudflare → Pages → Create a project → Connect to Git → 选 `angeless/agents-landing`
2. 配置：
   - Framework preset: `Next.js`
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Root directory: `/`
   - Environment vars: 无（暂无）
3. Save and Deploy → 等首次 build 完成 → 拿到 `agents-landing.pages.dev` URL
4. 验证 preview URL：访问 `/zh`、`/en`、`/zh/apply` 看视觉是否符合 brief §12

部署完后回 ACM 主仓做：
5. `workers/agents-router/wrangler.toml` 里把 `agents-landing.pages.dev` 写到 origin 配置
6. `cd workers/agents-router && npx wrangler deploy` → bind 到 `agents.ngzr.net/*`
7. 跑 7-path smoke test（README 已有 script）：
   - `/` → CF Pages landing
   - `/apply` → CF Pages apply
   - `/faq` → CF Pages (现在 #faq 是 anchor，待确认是否需要单独 page)
   - `/app` `/app/*` → Hetzner web-console
   - `/api/v1/health` → Hetzner api-gateway
   - `/health` → Hetzner api-gateway smoke

### 🟢 中优先级：本地 preview 验证视觉

PO 在 deploy 前可以本地跑一次 dev server：
```bash
cd ~/agents-landing
npm run dev
# 浏览器开 http://localhost:3000 → 自动 redirect 到 /zh
# 也可访问 http://localhost:3000/en
```

重点看：
- Hero 浮动 3 卡布局是否符合 brief §12.2 / §12.5 OQ8 视觉
- Section 3 ACM Hub + 5 MCP server cards + risk badge
- Section 4 Roadmap 3 段 + Wishlist
- 移动端响应式（resize 浏览器窗口）

### ⚪ 低优先级：后续 polish

| 任务 | 说明 | 触发时机 |
|---|---|---|
| 中心-星座 motif 真正圆形 SVG 布局 | Section 3 当前 5 server 是 grid，brief 期望是中心-星座 圆形 | 视觉 polish 阶段 |
| sitemap.xml 生成 | robots.txt 已引用，但文件没生成 | 上线前补 |
| favicon 自定义 | 当前用 create-next-app 默认 favicon | 上线前换 |
| /wishlist 表单实现 | Roadmap 段提到的 "提名 + 投票" CTA，链接目前是 dead | 视用户反馈决定是否做 |
| 解决 lockfiles warning | `/Users/angelwang/package-lock.json` 僵尸文件 + Next.js workspace root | 单独 chore 任务 |
| middleware → proxy 升级 | Next.js 16 弃用 middleware.ts，等 next-intl 跟进 | 等 next-intl 出 Next 16 兼容版 |
| `npm audit fix` | 2 moderate vulns | 上线前单独评估 |
| Light mode toggle UI | globals.css 已支持 `.light` class，但无 toggle UI | 视用户反馈决定 |

## 注意事项（本项目特有约束）

- **Brief v3 frozen** —— 所有文案 1:1 取自 brief，不要"凭印象"加内容（吸取 OQ10 飞书钉钉教训）
- **MCP server logo 5 个真值** —— filesystem / fetch / sqlite / memory / puppeteer，对应 `configs/mcp_server_catalog.json`，不假装支持飞书/钉钉
- **company 心智单元** —— Hero 浮动卡 = AI 公司，不是 agent
- **i18n transcreation 非直译** —— zh 偏叙事 / en 偏克制技术（brief §7）
- **不写硬 SLA** —— "尽快审核" 而非 "48 小时回复"（audit W29 决策）
- **AGENTS.md 警告** —— Next.js 16 不是训练数据里的 Next.js，写代码前先读 `node_modules/next/dist/docs/`
- **CF Pages 自动 deploy** —— push main 即 trigger build，不需要手动 deploy
- **bash cwd 重置** —— `~/agents-landing` 操作每次新 Bash 命令都要 `cd ~/agents-landing` 或 `git -C ...`

## 跨 repo 引用

- 主仓 brief 真值源（v3 frozen 2026-05-13）：
  `https://github.com/angeless/agent-cluster-manager/blob/test-v-1-10-landing-invite/docs/product/v1-a-landing-brief.md`
- 主仓 impl-plan：
  `https://github.com/angeless/agent-cluster-manager/blob/test-v-1-10-landing-invite/docs/dev-plans/impl-plan-v1.10.0-landing-invite.md`
- Router worker（路由架构 + 7-path smoke test 脚本）：
  `https://github.com/angeless/agent-cluster-manager/tree/test-v-1-10-landing-invite/workers/agents-router`
- Spike notes（CF SSL/TLS + Origin Cert 决策）：
  `(本地 only) /Users/angelwang/agent-cluster-manager/spike-notes.local.md`

## Session 2026-05-14 成果

- 9 commits push 上 remote
- ~1500 行实质代码（page.tsx ~880 + apply ~280 + over-capacity ~50 + globals.css ~210 + messages ~300 + i18n config ~40 + robots.txt + docs）
- 5 个 routes ship-ready（home / apply / over-capacity 各 zh + en）
- npm run build 全程通过（9 static pages 生成）
- Brief v3 frozen → page.tsx 文案 1:1 落地，零漂移
