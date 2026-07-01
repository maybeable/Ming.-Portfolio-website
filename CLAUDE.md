\### CLAUDE.md

\# 项目概述

这是一个用于展示平面设计作品的现代极简风格作品集网站。



技术栈：

\- Next.js 16 App Router（Proxy 中间件使用 `src/proxy.ts` 默认导出）

\- TypeScript

\- TailwindCSS

\- shadcn/ui

\- Framer Motion

\- MDX 内容系统



部署目标：- Vercel



网站风格应为：

\- 极简

\- 优雅

\- 高级感

\- 编辑式排版风格

\- 蓝白配色

\- 强烈的排版层次

\- 舒朗的布局

\- 流畅的动画



避免：

\- 廉价的渐变

\- 过度装饰的界面

\- 复杂的仪表盘

\- 过多的阴影

\- 通用的 AI 生成布局



\# 设计系统

\## 颜色

主蓝色：

\#2563EB

辅助蓝色：

\#3B82F6

背景色：

\#FFFFFF

柔和背景色：

\#F8FAFC

主文字色：

\#0F172A

辅助文字色：

\#475569

边框色：

\#E2E8F0

悬停色：

\#DBEAFE



\# 排版

使用强烈的排版层次。

首选字体：

\- Inter

\- Geist

\- SF Pro Display

规则：

\- 使用大号粗体主标题

\- 干净的间距

\- 极简的文本块

\- 编辑式排版风格

避免：

\- 过小的文字

\- 密集的段落

\- 随意的字号



\# 布局规则

使用：

\- 12 列响应式网格

\- 最大宽度：1440px

\- 充裕的留白

\- 大面积的区块间距

\- 不对称的现代布局

间距体系：

\- 基于 8px 网格系统

\- 区块内边距：桌面端 120px

\- 卡片圆角：20px



\# 动画规则

使用 Framer Motion。

动画应做到：

\- 微妙

\- 流畅

\- 高级

\- 缓慢的缓动效果

避免：

\- 弹跳

\- 浮夸的运动

\- 夸张的效果

首选动画：

\- 向上淡入

\- 不透明度过渡

\- 轻微缩放

\- 交错显示



\# 组件

创建可复用的组件。

首选结构：

/components

&#x20; /ui

&#x20; /layout

&#x20; /sections

&#x20; /cards

重要的可复用组件：

\- Navbar（导航栏）

\- HeroSection（主视觉区）

\- ProjectCard（项目卡片）

\- MasonryGallery（瀑布流画廊）

\- Footer（页脚）

\- SectionTitle（区块标题）

\- AnimatedContainer（带动画的容器）



\# 作品集结构

作品集页面应包含：

\- 主视觉图

\- 项目概述

\- 设计过程

\- 排版展示

\- 色彩方案

\- 样机展示

\- 最终视觉呈现

每个项目页面都应给人感觉像是一个高级的设计案例研究。



\# 图片规则

图片应：

\- 使用 next/image

\- 保持统一的宽高比

\- 懒加载

\- 支持模糊占位符

避免：

\- 拉伸变形的图片

\- 不一致的图片尺寸

\- 杂乱的画廊



\# 代码规则

始终：

\- 使用 TypeScript

\- 使用函数式组件

\- 尽可能使用异步服务端组件

\- 保持组件模块化

\- 保持文件整洁

避免：

\- 巨大的组件文件

\- 重复的 UI 逻辑

\- 内联样式

\- 硬编码的布局数值



\# 安全与认证

\## 认证体系

\- 管理认证通过 HTTP-only cookie `admin_token` 实现，密钥仅存储在服务端 `REPLY_SECRET`

\- 服务端：`src/lib/auth.ts` 提供 `isAdmin()`（Server Component 用）和 `getAdminKey()`（API Route 用）

\- 登录入口：`/api/auth/login`（POST `{ key }`），登出：`/api/auth/logout`（POST 无 body）

\- 客户端组件只需 `isAdmin` prop 判断管理员状态，不传递密钥本身

\- 页面底部 `AdminEntry` 组件提供隐式登录入口（仅非管理员时可见）

\## Supabase 客户端

\- `src/lib/supabase/server.ts` 导出两个客户端：

  - `supabase`：公共只读 + 公开插入（anon key，受 RLS 保护）

  - `supabaseAdmin`：管理写操作（service_role）——仅用于 reply/manage/pin/cleanup

\- 页面和公共 GET 用 `supabase`，后台增删改用 `supabaseAdmin`

\## API Route 安全

\- 所有 `request.json()` 前先检查 `checkBodySize()`（上限 10KB，在 `src/lib/api-guards.ts`）

\- 公开 mutating endpoint 必须检查 `checkSameOrigin()`（验证 Origin 头）

\- 管理 endpoint 的认证从 cookie 中读取 `admin_token`，不从 body 取 key

\## 安全响应头

全局 headers（`next.config.ts`）：

\- CSP（script-src 允许 challenges.cloudflare.com 用于 Turnstile）

\- HSTS 2 年、X-Frame-Options DENY、X-Content-Type-Options nosniff、Referrer-Policy strict-origin-when-cross-origin

\## 代理（Proxy）

\- Next.js 16 使用 `src/proxy.ts` 默认导出（不是 `middleware.ts`）

\- 生产环境通过 `x-vercel-secret` 头校验 Cloudflare 转发，密钥存 `CF_ORIGIN_SECRET` 环境变量

\## 环境变量红线

以下变量勿动（已在 Vercel 和 .env.local 配置）：

\- `SUPABASE_URL`、`SUPABASE_SERVICE_ROLE_KEY`

\- `NEXT_PUBLIC_SUPABASE_ANON_KEY`（公共只读）

\- `REPLY_SECRET`（管理密钥）

\- `CF_ORIGIN_SECRET`（Cloudflare 回源密钥）

\- `TURNSTILE_SECRET_KEY`、`NEXT_PUBLIC_TURNSTILE_SITE_KEY`


\# 错误处理

\- 全局 `src/app/error.tsx` — 运行时错误回退页，提供重试按钮

\- 全局 `src/app/not-found.tsx` — 自定义 404 页面

\- 关键异步路由有 `loading.tsx`：`/works/[slug]`、`/thoughts`

\- API route 异常时返回中文错误信息，不暴露堆栈

\# MDX 校验

\- `getProject()` 入口做路径穿越防护（拒 `..`、`/`、`\`）

\- 必填字段查验：title、category、year、cover、hero、description、images

\- 新增 MDX 文件时留意必填字段，缺失会在编译时抛错误


\# 可访问性

确保：

\- 语义化 HTML

\- 键盘可访问性

\- 足够的对比度

\- 响应式设计



\# 性能

优化目标：

\- Lighthouse 评分 90 分以上

\- 图片优化

\- 最小化客户端 JavaScript

\- 优先服务端渲染



\# SEO

包含：

\- 元数据

\- OpenGraph 标签

\- 网站地图

\- 语义化标题



\# 风格方向

视觉方向应类似：

\- 现代瑞士设计

\- Apple 编辑式页面

\- 极简作品集工作室

\- 高端创意机构网站

\##参考风格

参考 Awwwards 风格的极简作品集设计，

保持蓝白配色，

使用大量留白，

强调排版与视觉节奏，

不要生成廉价 SaaS 风格页面。



关注重点：

\- 留白

\- 排版

\- 视觉节奏

\- 干净的动效

\- 高级感



\# 重要提醒

在生成任何页面之前：

1\. 首先考虑布局层次

2\. 优先考虑视觉平衡

3\. 保持一致的间距

4\. 复用组件

5\. 保持界面极简

网站给人的感觉应该是精心手作，而非 AI 生成的。

