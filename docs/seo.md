# 搜索与爬虫配置

生产站点为 https://piczip.ajutx.com，部署目标是 Cloudflare Worker `pic-smaller`，不是 Pages。

## 内容与索引约定

- 9 种语言各自拥有完整首页文案、H1、标题、描述及 5 条 FAQ；`src/seo-copy.ts` 是 SEO/FAQ 的共同数据源。FAQ 正文与 JSON-LD 不分别维护。
- `src/structured-data.ts` 输出 WebSite、WebApplication、FAQPage；按 Next.js 文档在初始 HTML 中使用普通 script 并转义 `<`。不添加虚构评价，也不保证 FAQ 富结果。
- 根首页输出完整英文 HTML，canonical 指向 `/en-US/`。启用 JavaScript 时按保存的偏好或浏览器语言跳转。禁用存储时回退到浏览器语言；不进行爬虫 UA 特判。
- 每个语言地址自指 canonical，互相声明 hreflang，x-default 指向 `/en-US/`；页脚真实链接允许无 JavaScript 抓取。
- `trailingSlash: true` 让静态导出生成语言目录的 `index.html`，避免规范地址被 Cloudflare 反向跳转到无斜杠地址。旧无斜杠地址仍可跳转到规范地址。
- robots 的 `User-Agent: * / Allow: /` 对所有遵守规则的搜索与训练爬虫开放。sitemap 仅列 9 个规范语言地址，不重复列根首页。没有可靠内容修改时间时不伪造 lastmod。
- 图片仅在设备本地处理；应用资源请求和同意后的可选访问统计仍可使用网络。导入格式不等于导出格式，也不保证所有输入均能原格式压缩。
- 分享图片、Google/Bing 验证标记和现有 GA4 同意流程保持不变。

## 验证与发布（PowerShell）

```powershell
npm run lint
npm test
npm run build
$env:PLAYWRIGHT_CHANNEL='msedge'
$env:CI='1'
npm run test:browser
npm run build:pages
```

静态导出在部署前也应使用 Worker 本地预览验证，而不只测试 Next.js 服务：

```powershell
# 独立终端启动，仅本地预览
npx wrangler dev --port 8787
# 在另一终端运行
$env:PLAYWRIGHT_BASE_URL='http://localhost:8787'
npx playwright test tests/browser/seo.spec.ts
Remove-Item Env:PLAYWRIGHT_BASE_URL
```

确认自定义域名绑定 `piczip.ajutx.com → pic-smaller / production`，记录当前生产版本并审阅待发布差异，然后：

```powershell
npx wrangler deployments list
npx wrangler deploy
pwsh -File scripts/verify-seo.ps1
```

验证脚本将生产页面与当前 `out` 的标题、H1 和 JSON-LD 对比，检查普通请求和 Googlebot、Bingbot、OAI-SearchBot、PerplexityBot 标识下的全部语言页、robots、sitemap、404，共 65 次响应。UA 模拟只能验证本机请求得到的响应，不能证明真实爬虫 IP 的访问或平台已收录。

如果上线验收失败，可用 `npx wrangler rollback <发布前记录的版本 ID>` 回退；不要使用过期的历史版本号猜测当前回滚点。

不自动操作 Search Console / Bing Webmaster 的账号或 sitemap 提交。允许抓取不代表已经收录，也不保证排名或 AI 引用。

## 2026-09-20 发布验收（SEO & GEO 深度优化上线）

- 已实时核对域名绑定：`piczip.ajutx.com → pic-smaller / production`。
- 最新上线版本：`df613ea4-1d47-4a26-bd85-085fb84b59db`。
- 本次上线前版本（回滚点）：`48c1129a-21fd-4d74-895e-0a4b2c3cf7cb`。
- 包含落地内容：
  - AI 友好标准接口 `/llms.txt` 与 `/llms-full.txt`。
  - robots.ts 显式放行主流 AI 抓取代理（GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, cohere-ai）并指向 sitemap。
  - Schema.org 结构化数据补充 GitHub 官方开源仓库 `sameAs` 实体关联、`softwareRequirements` 与 `featureList`。
  - 页面高密度事实：新增 7 种格式与 Wasm 算法引擎技术规格表（#specs）及主流工具客观对比表（#comparison），全 9 种多语言支持。
- lint、普通构建、静态导出通过；31 项单元测试通过。
- Edge 普通服务回归 31 项通过，Worker 静态环境回归 31 项通过；包含图片导入、压缩、转换、缩放、裁剪、下载及分析同意流程。
- 静态环境和生产域名的 HTTP 抓取验证各 65 项通过：规范语言 URL 直接 200，robots/sitemap 可读，未知路径返回 404。
- 生产域名额外通过 17 项 SEO 浏览器测试：无 JavaScript 正文/FAQ/JSON-LD、语言跳转和切换、受限存储、3 种视口及波斯语文本方向、旧 URL 跳转、验证文件与隐私页访问。
- 预发布检查修复了规范尾斜杠 URL 的反向跳转，以及语言菜单在客户端初始化前被点击而未打开的问题。
- 未修改 Cloudflare 安全规则；未提交/推送 Git；未操作站长平台提交。
