# Portfolio

一个展示平面设计作品的现代极简风格作品集网站。

## 风格方向

- **蓝白配色** — 主色 `#2563EB`，背景纯白，辅以柔和的石板灰
- **编辑式排版** — 强烈的字号层级、大号粗体标题、`clamp()` 流式字号
- **瑞士设计美学** — 几何装饰、非对称布局、克制的动效
- **手作质感** — 精心编排的视觉节奏、大量留白

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS 4 |
| 动画 | GSAP (滚动动画、视差)、Framer Motion (入场动效) |
| 内容 | MDX (gray-matter + next-mdx-remote) |
| 数据 | Supabase (留言系统) |
| 通知 | Sonner (Toast) |
| 部署 | Vercel |

## 功能

- **作品集** — 7 个设计作品，覆盖 5 个分类（品牌设计、海报设计、人像修图、AI 视觉创作、版式设计），每件作品拥有独立案例研究页面
- **MDX 内容系统** — 作品数据通过 frontmatter 管理，设计过程用 Markdown 编写，支持按作品定制字体/配色描述
- **分类筛选** — `/works` 页面支持按分类过滤，中文优先展示
- **Before/After 对比** — 人像修图作品配备拖拽滑块对比组件，原始图像与精修效果直观对比
- **留言板** — 访客可提交留言，支持作者认证、精选展示、多级回复，数据持久化至 Supabase
- **悬浮返回按钮** — 作品详情页滚动时显示毛玻璃胶囊返回按钮
- **响应式设计** — 12 列网格系统，`dvh` 视口单位、安全区域兼容、触摸目标 ≥44px
- **渐进式动画** — Framer Motion 入场动效 + GSAP 滚动驱动视差与 clipPath 动画

## 页面结构

```
/              首页 — Hero + 按分类展示精选作品 + CTA
/works         作品列表 — 分类筛选 + 网格画廊
/works/[slug]  作品详情 — 案例研究（Hero → 概述 → 画廊 → 修图对比 → 字体 → 色彩 → 设计过程）
/about         关于页 — 设计理念 + 方向 + 经历 + 技能
/thoughts      留言板 — 留言提交 + 精选展示 + 作者回复
/contact       联系方式
/api/feedback  留言 API — 提交 / 精选管理 / 作者回复 / 清理
```

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

需要配置 `.env.local`：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
REPLY_SECRET=your_admin_key
```

## 项目结构

```
├── src/
│   ├── app/            # App Router 路由页面 + API 路由
│   ├── components/
│   │   ├── cards/      # ProjectCard
│   │   ├── interactive/# BeforeAfterSlider 对比滑块
│   │   ├── layout/     # Navbar、Footer、Container、Grid、FloatingBackLink 等
│   │   ├── sections/   # 作品详情各区块（Hero、Overview、Gallery、Typography 等）
│   │   └── ui/         # Button、Card、CategoryFilter 基础组件
│   ├── lib/            # MDX 工具、分类定义、Supabase 客户端
│   └── types/          # TypeScript 类型定义
├── content/works/      # 7 个作品的 MDX 内容文件
├── data/               # 本地数据文件（feedback.json）
├── public/images/      # 静态图片资源
├── scripts/            # 辅助脚本
└── supabase/           # 数据库迁移文件 (5 个 migration)
```

## 许可

MIT
