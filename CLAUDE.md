@AGENTS.md

---

# agents-landing — ACM V1-A 内测 Landing

> 项目类型：纯 Next.js 15 静态 landing 项目
> 部署目标：Cloudflare Pages auto-deploy from `main` branch
> 上线域名：`agents.ngzr.net`（路由由 ACM 主仓的 `workers/agents-router/` worker 分发）

## 项目定位

本 repo 是 ACM (Agent Cluster Manager) V1-A 内测的 **公开 landing + invite funnel**。

- 招募对象：B 平台 PM / C AI 教育者 / D 一人公司（详见 brief §2）
- 不追求高转化率，追求"招到对的人"
- 5 个页面：`/`（hero+特性+FAQ）/ `/apply`（申请表单）/ `/over-capacity`（限流页）/ `/zh` / `/en`（i18n）

## 与 ACM 主仓的关系

| 内容 | 在哪里 |
|---|---|
| **本 repo**（agents-landing） | Next.js 15 + Tailwind + next-intl，纯静态 landing |
| Brief 真值源（v3 frozen 2026-05-13） | ACM 主仓 `docs/product/v1-a-landing-brief.md`（请通过 GitHub raw URL 或 worktree clone 访问） |
| Implementation plan | ACM 主仓 `docs/dev-plans/impl-plan-v1.10.0-landing-invite.md`（Task 4.x 是本 repo 范围） |
| Router worker（路径分流） | ACM 主仓 `workers/agents-router/`（独立 CF Worker，**不在本 repo**） |
| API endpoint（`/apply` 提交目标） | ACM 主仓 api-gateway `:8080`（via CF Worker → Hetzner） |
| Web console（`/app/*`） | ACM 主仓 `services/web-console/`（via CF Worker → Hetzner） |
| Design System utility | 计划 port from ACM 主仓 `services/web-console/app/globals.css` |

## 关键决策（已锁，brief v3 frozen）

| 决策 | 值 | 来源 |
|---|---|---|
| Hero copy zh | "24 小时运转的 AI 公司，从这里开始。" | brief §4 ✅ FROZEN 2026-05-12 |
| Hero copy en | "An operating system for AI-native operations." | brief §4 ✅ FROZEN 2026-05-12 |
| Hero 浮动 3 卡 | 民宿公司 / 旅游公司 / + 你的 AI 公司（**company 心智单元**，非 agent） | brief §12.5 OQ8 ✅ ANSWERED |
| MCP 工具治理 logo | 5 个真值 server（filesystem/fetch/sqlite/memory/puppeteer），不假装支持 | brief §12.5 OQ10 ✅ ANSWERED |
| 主 CTA zh / en | 「加入种子用户」/ "Get Beta Access" | brief §4 |
| i18n | next-intl + `/zh` `/en` 路由 | brief §12.5 OQ9 + PO 2026-05-13 |
| Repo 可见性 | Public | PO 2026-05-13 |
| Author photo | **不放** | brief §10 OQ6 ANSWERED |
| 调性 | zh 偏叙事 / en 偏克制技术 | brief §7 |
| 不放 | 具体模型名 / 客户 logos / 模糊 pricing / video / chat widget / newsletter | brief §8 |

## 治理流程（简化版，参考 ACM 七阶段）

本 repo 体量小，不需要完整 7 阶段。每次工作遵循：

1. **Phase 1 计划**：读 brief / impl-plan，确认 Task 编号（4.1-4.5）+ 范围
2. **Phase 2 编码**：分 section 提交（hero / persona / 工具 / roadmap / about / FAQ 各自 commit）
3. **Phase 3 验证**：`npm run build` 通过 + `tsc --noEmit` 无错 + Lighthouse score
4. **Phase 4 commit + push**：CF Pages 自动 deploy preview

## 当前进度

详见 `TODO_NEXT.md`。

## 不做（克制清单）

- ❌ 不引入 shadcn/ui（landing 简单，Tailwind utility 够用）
- ❌ 不引入额外 UI 库（FontAwesome / Material UI 等）
- ❌ 不在本 repo 写后端逻辑（apply 表单提交 → `/api/*` → ACM api-gateway）
- ❌ 不在本 repo 写 router 逻辑（在 ACM 主仓 `workers/agents-router/`）
- ❌ 不写 SLA 硬承诺（brief §9 决策："我们尽快审核" 而非 "48h"）
- ❌ 不放 emoji 滥用（中文 ≤2 个 / 英文 0 个）
