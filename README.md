# Portfolio

一个展示平面设计作品的现代极简风格作品集网站。

## 风格方向

- **蓝白配色** — 主色 `#2563EB`，背景纯白，辅以柔和的石板灰
- **编辑式排版** — 强烈的字号层级、大号粗体标题、充裕的留白
- **瑞士设计美学** — 几何装饰、非对称布局、克制的动效
- **手作质感** — 噪点纹理覆盖层、精心编排的视觉节奏

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS 4 |
| 动画 | Framer Motion |
| 内容 | MDX (next-mdx-remote) |
| 数据 | Supabase (留言系统) |
| 部署 | Vercel |

## 功能

- **作品集** — 7 个设计作品，每个作品拥有独立案例研究页面（Hero → 概述 → 画廊 → 字体 → 色彩 → 设计过程）
- **MDX 内容系统** — 作品数据通过 frontmatter 管理，设计过程用 Markdown 编写
- **留言板** — 访客可提交留言，支持精选展示，数据持久化至 Supabase
- **响应式设计** — 12 列网格系统，桌面/平板/移动端适配
- **渐进式动画** — 滚动触发淡入上移，微妙的交互动效

## 页面结构

```
/             首页 — Hero + 精选作品 + CTA
/works        作品列表
/works/[slug] 作品详情（案例研究）
/about        关于页
/thoughts     留言板
/contact      联系方式
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
```

## 项目结构

```
src/
├── app/            # 路由页面
├── components/
│   ├── cards/      # 作品卡片
│   ├── layout/     # 导航栏、页脚、容器、网格
│   ├── sections/   # 作品详情各区块组件
│   └── ui/         # Button、Card 基础组件
├── lib/            # MDX 工具、Supabase 客户端
└── content/works/  # MDX 作品内容
```

## 许可

MIT
