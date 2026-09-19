# 轻帧 LiteFrame — Design System

## Brand and scope
- 简体中文：轻帧；繁體中文：輕幀；其他语言：LiteFrame。
- 标语：让图片轻一点，让表达完整一点。
- 正式站点：https://piczip.ajutx.com/。
- 定位：免费开源、设备本地处理的轻量图片工具；压缩、转换、缩放、裁剪。
- 品牌名称集中在 `src/brand.ts`；站点地址集中在 `src/locale-config.ts`。
- 不展示桌面版推广、试用、下载、对比；保留 Pic Smaller 来源及 MIT 署名。
- 路由、部署项目名、本地设置键与图像处理引擎不因品牌改版改变。

## Visual tokens
| Token | Value | Use |
|---|---|---|
| Background | #F7F9FC | 雾白页面 |
| Surface | #FFFFFF | 面板、弹窗、导航 |
| Foreground | #182230 | 标题与正文 |
| Muted | #5C6B80 | 辅助文本 |
| Action | #2563EB | 主按钮、焦点、图标 |
| Action hover | #1D4ED8 | 按钮悬停 |
| Action soft | #EFF6FF | 轻强调 |
| Border | #E2E8F0 | 分隔线 |
| Success | #15803D | 仅成功状态 |
| Warning | #9A6700 | 原文件保留等提醒 |
| Destructive | #C2414B | 失败与删除 |

- 所有组件引用 `src/main.scss` 中语义化变量；不另设组件品牌色。
- 系统无衬线字体：Segoe UI / PingFang SC / Microsoft YaHei；不加载远程字体。
- 8px 间距体系；面板 16px 圆角、按钮 10px 圆角；细边框、轻阴影。
- 动效 150–200ms；尊重 prefers-reduced-motion。无渐变背景、厚重装饰或卡通形象。

## Assets
- `public/logo.svg`：两枚错位圆角取景框，右上开口；浅蓝底、蓝色线条。
- `public/logo-mono.svg`：currentColor 单色版本。
- `public/favicon.svg` / `public/favicon.png` / `public/apple-touch-icon.png`：浏览器及设备图标。
- `public/social-card.png`：1200×630 分享卡片；`public/logo.png` 为兼容资源。

## Layout and behavior
- 顶部：Logo、功能、隐私、语言；小屏折叠菜单。
- 首屏：简短介绍直接接工作台；添加图片后收起眉题并缩小标题。
- 工作台：左侧上传/结果，右侧设置。980px 及以下设置转为抽屉，关闭时不可聚焦；支持 Escape、焦点循环与回焦。
- 上传：真实可聚焦的「选择图片」「选择文件夹」按钮；拖放与粘贴；不支持目录选择 API 时使用目录文件输入。
- 状态：处理中、已完成、失败、原文件保留，文字与颜色同时传达。
- 下半部：六项能力、三步流程、浅蓝隐私说明；不重复设置大幅行动按钮。
- 375px / 768px / 1440px 检查空状态、结果、设置、对比视图。

## Accessibility and compatibility
- 操作目标不少于 44px；正文对比度达到 WCAG AA；明确 focus-visible。
- 下拉框保留 Radix 键盘语义；设置抽屉不抢夺其弹层的 Escape。
- 图像引擎、默认参数、批量作用范围和设置应用时机保持原行为。
- 中英文与繁体中文首页文案独立；其他语言保留工作区翻译，首页回退英文。

维护 Logo SVG 后，运行 `npm run brand:assets` 重新生成兼容 PNG、favicon 与分享卡片；域名取自统一站点配置。
