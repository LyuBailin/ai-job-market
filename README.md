# 中国 AI 就业市场数据看板

> 纯前端静态网站，**事实驱动、零主观判断、可追溯** 的中国 AI 就业市场数据看板。

## 项目目标

- 集中展示中国 AI 就业市场的**真实数据**（BOSS直聘、智联招聘、脉脉、信通院、国家网信办 等）
- 海外事件**仅记录**对中国市场有重大影响的部分
- 所有数据带原始来源链接
- 重大事件驱动更新

## 项目结构

```
ai-job-market/
├── index.html                  # 总览仪表盘
├── pages/                      # 10 个子页面
│   ├── jobs.html               # 岗位供需
│   ├── salary.html             # 薪资行情
│   ├── companies.html          # 公司动态
│   ├── cities.html             # 城市分布
│   ├── policies.html           # 政策报告
│   ├── timeline.html           # 大事记
│   ├── global.html             # 海外速览
│   ├── report-llm-market.html  # 📊 中国 LLM 人才市场深度报告（2026 H1）
│   ├── career-guide.html       # 🎯 公开版职业规划指南
│   └── career-personal.html    # ⭐ 个人版职业规划（基于真实背景）
├── data/                       # 全部数据 JSON（事件驱动，append-only）
│   ├── overview.json
│   ├── jobs.json
│   ├── salary.json
│   ├── companies.json
│   ├── events.json
│   ├── policies.json
│   ├── cities.json
│   └── global.json
├── assets/
│   ├── css/style.css
│   ├── js/
│   │   ├── charts.js           # ECharts 图表封装
│   │   └── app.js              # 通用逻辑
│   └── images/                 # 报告封面 / 概念图（cities / ecosystem / report-cover / salary）
├── _template/                  # 数据契约 + 更新工作流
│   ├── data-schema.md
│   └── update-workflow.md
├── .github/workflows/
│   └── deploy.yml              # GitHub Pages 自动部署
├── LICENSE                     # MIT
└── README.md
```

## 数据原则

1. **来源可追溯**：每条数据带 `source` + `url`
2. **append-only**：永远只追加数据点，不覆盖历史
3. **不带主观判断**：禁止写"好/差/建议/趋势分析"等评价
4. **置信度标注**：A（官方/上市公司）/ B（权威媒体+原文）/ C（单一来源）
5. **冲突不收敛**：多源冲突时全部展示，不强行合并

## 重点关注的 AI 岗位方向

- **核心**：通用 LLM、Agent、AI 应用开发
- **扩展**：CV、NLP、深度学习、机器人算法、智能驾驶
- **辅助**：AI 产品经理、AI 数据工程师、MLOps

## 数据更新机制（事件驱动）

详见 `_template/update-workflow.md`：

1. **每日扫描**：检索关键词
2. **筛选标准**：同比 ≥ 10% / 政策发布 / 新模型 / 大额融资 / IPO 进展 / 备案大幅增加
3. **追加入库**：append-only，附 URL
4. **更新 README + Git commit**

## 本地预览

> ⚠️ 路径里如果有空格（Windows 默认安装路径常有），在 PowerShell 里记得用引号包起来。

### 方法 1：Python 内置 HTTP 服务器（推荐）
```powershell
cd "D:\WorkSoftware\MiniMax Code\projects\ai-job-market"
python -m http.server 8000
# 浏览器打开 http://localhost:8000
```

### 方法 2：Node.js
```powershell
cd "D:\WorkSoftware\MiniMax Code\projects\ai-job-market"
npx serve -p 8000
```

### 方法 3：直接打开
双击 `index.html` 即可（部分浏览器对本地 fetch JSON 有限制，建议使用方法 1）。

## 技术栈

- **纯静态**：HTML + CSS + JavaScript
- **图表库**：ECharts 5.4.3（CDN 引入）
- **数据格式**：JSON（fetch API）
- **无构建步骤**：单文件即用

## 局限 & 后续优化

- [ ] 数据源未做自动爬取（受法律/成本限制；当前为"事件驱动 + 手工入库"模式，详见 `_template/update-workflow.md`）
- [ ] 移动端样式已基础适配，可继续优化图表（特别是横向柱状图在小屏的标签）
- [ ] 可加"数据订阅"功能（用户留邮箱，新数据发布时通知）
- [ ] 可加"对比"功能（多岗位 / 多城市 / 多时间维度对比）
- [ ] 时序图可补充更早年份数据点（当前最早到 2023，需追溯历史报告）

## Changelog

### 2026-07-29
- docs: 同步 README 与实际项目结构（10 个页面 / 8 个 JSON / 4 张概念图）
- docs: 修正本地预览路径（`D:\ProgramFiles\…` → 实际 `D:\WorkSoftware\MiniMax Code\…`）
- docs: 补齐 Changelog（之前只到 v1.0，后续 commit 未记录）
- docs: 更新"局限 & 后续优化"段（去除过期条目）
- chore: 添加 MIT LICENSE

### 2026-07-26
- feat: 新增个人版职业规划（`pages/career-personal.html`，基于用户真实背景，35 KB）
- fix(ui): 导航栏 10 链接改用 `📌 更多` 下拉菜单

### 2026-07-26 (早)
- feat: 新增 2026 H1 数据 + LLM 报告 + 公开版职业规划
  - `pages/report-llm-market.html`（28 KB，8 大章节 + 8 张图表）
  - `pages/career-guide.html`（24 KB，3 条差异化路径）
  - 4 张概念图（`assets/images/`：cities / ecosystem / report-cover / salary）
- ci: 添加 GitHub Pages 部署工作流（`pages` 环境，4 步：checkout → configure-pages → upload-artifact → deploy-pages）

### 2026-07-25
- v1.0 初始化
- 完成 7 个 HTML 页面 + 8 个数据 JSON + 1 个图表封装库
- 收集数据点：约 60+ 条权威数据（覆盖岗位增速、薪资、供需比、公司、政策、城市、海外）
- 主要来源：Boss直聘、脉脉、智联招聘、信通院、薪智、锐仕方达、新浪财经
