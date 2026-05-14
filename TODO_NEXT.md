---
session_id: cc:2026-05-14-agents-landing-bootstrap
parent_session_id: cc:2026-05-13-acm-v1.10-brief-freeze
source: claude-code
---

# TODO_NEXT — agents-landing repo

## 上次停在

- **版本**：项目初始化阶段（pre-v0.1.0，repo 尚无 VERSION 文件）
- **分支**：main（唯一分支，CF Pages auto-deploy 目标）
- **最后完成**：WS-4 Task 4.1 bootstrap（gh repo create + Next.js 15 + Tailwind + next-intl）
- **commit**：
  - `66054f9` Initial commit from Create Next App
  - `9881c38` chore: add next-intl for i18n

## 下一步（按建议顺序）

### B. i18n 基础设施（推荐先做）

> 把 next-intl 跑通是 Task 4.2-4.4 的前置依赖。

1. 创建 `i18n/request.ts`（next-intl messages loader）
2. 创建 `messages/zh.json`、`messages/en.json`（先放空对象，写到哪个 section 补哪段）
3. 创建 `middleware.ts`（next-intl 路由 middleware）
4. 重组 `app/` → `app/[locale]/`（move layout.tsx + page.tsx）
5. 调整 `next.config.ts`（如需要）
6. 验证：`npm run build` 通过 + `/zh` `/en` 路由可访问
7. commit + push

### C. ACM Design System utility port

> 让 brief §12.6 cheat-sheet 直接可用（`.neon-glow` / `.canvas-grid` / `.pulse-dot` / animation utility）。

1. Read ACM 主仓 `services/web-console/app/globals.css`（294 行）
2. 提取 utility class + keyframe 定义（去掉 web-console 特有的全局样式）
3. 写入本 repo `app/globals.css`（替换 create-next-app 默认）
4. 检查 `tailwind.config.ts` 是否需要补 CSS variable（`--acm-accent` 等）
5. 验证：build 通过，`.neon-glow` className 在 Hero 区域可生效
6. commit + push

### A. Task 4.2 `app/page.tsx`（主页）

> brief §12 视觉规范第一次落代码，~200 行，分 6 个 section commit。

1. Hero 区（black bg + 软光晕 + 主标语 + 副标 + CTA + 3 张浮动公司卡）
2. Section 2 — 三 persona 卡（B/C/D）
3. Section 3 — 核心能力 + 5 MCP server logo（中心-星座 motif）
4. Section 4 — Roadmap 三段时间线 + "征集中"段（投票表单 link）
5. Section 5 — About（zh + en 纯文字段落）
6. Section 6 — FAQ（5 条，不放 F5/F6/F7）
7. Footer（Built with Claude Code + GitHub link）

### Task 4.3 `app/apply/page.tsx`（申请表单）— after 4.2

- 字段：姓名 / 邮箱 / "你想用 ACM 做什么"
- 蜜罐 `website_url`（隐藏 input + 服务端校验）
- 提交目标 `/api/v1/landing/apply`（via CF Worker → ACM api-gateway）
- 成功页文案："我们尽快审核 / We'll review shortly"（**不写 48h 硬 SLA**）

### Task 4.4 `app/over-capacity/page.tsx`（限流页）

- 触发条件：CF Worker 检测到 ACM api-gateway 限流 → 302 跳转此页
- 内容：友好提示 + "稍后再试"按钮

### Task 4.5 `public/robots.txt`

- 排除 `/app/admin`（虽然不在本 repo，但路由会被搜索引擎抓）
- 允许 `/`、`/apply`、`/zh`、`/en`

### CF Pages 部署设置（最后）

- 在 Cloudflare dashboard 创建 Pages project，链接 GitHub repo
- Build command: `npm run build`
- Output directory: `.next`
- Env vars（如有需要）：从 `.env.example` copy（暂无）

## 注意事项（本项目特有约束）

- **Brief v3 frozen** —— 所有文案 1:1 取自 brief，不要"凭印象"加内容（见 v2.2 / v2.4 校准历史）
- **MCP server logo 5 个真值** —— `filesystem` / `fetch` / `sqlite` / `memory` / `puppeteer`，不假装支持飞书/钉钉等
- **company 心智单元** —— Hero 浮动卡 = AI 公司，不是 agent
- **i18n transcreation 非直译** —— zh 偏叙事 / en 偏克制技术（brief §7）
- **不写硬 SLA** —— "尽快审核" 而非 "48 小时回复"（audit W29 决策）
- **AGENTS.md 警告** —— Next.js 15 不是训练数据里的 Next.js，写代码前先读 `node_modules/next/dist/docs/`
- **2 个 npm moderate vulns** —— 已知，landing 上线前单独处理
- **CF Pages 自动 deploy** —— push main 即 trigger build，不需要手动 deploy

## 跨 repo 引用

- 主仓 brief 真值源（v3 frozen 2026-05-13）：
  `https://github.com/angeless/agent-cluster-manager/blob/test-v-1-10-landing-invite/docs/product/v1-a-landing-brief.md`
- 主仓 impl-plan（Task 4.x 完整定义）：
  `https://github.com/angeless/agent-cluster-manager/blob/test-v-1-10-landing-invite/docs/dev-plans/impl-plan-v1.10.0-landing-invite.md`
- Router worker（路由架构 + 7 path smoke test）：
  `https://github.com/angeless/agent-cluster-manager/tree/test-v-1-10-landing-invite/workers/agents-router`
