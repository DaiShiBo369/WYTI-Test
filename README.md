# WYTI 未央专业选择测试

WYTI 是一个面向未央书院学生的专业倾向测试网页应用。  
项目采用纯前端静态站点方案（`index.html` + `test.js`），通过 Supabase 存储测评结果，并在结果页与分享图中展示数据可视化。

## 技术栈总览

- 前端基础：`HTML5` + `CSS3` + `Vanilla JavaScript (IIFE)`
- UI 体系：`Tailwind CSS (CDN)` + 自定义样式动画
- 图标与字体：`Font Awesome` + `Google Fonts (Inter)`
- 图表可视化：`Chart.js`（网页雷达图）
- 数据存储：`Supabase`（REST API + RPC）
- 分享图生成：浏览器 `Canvas API`（前端本地生成 PNG）
- 二维码生成：第三方二维码 API（多提供商回退）
- 分享能力：`Web Share API`（支持时直接分享文件）+ 本地下载回退
- 部署形态：静态站点（可配 GitHub Pages / 任意静态托管）

## 核心功能

- 题库作答与动态计分（五维能力模型：M/D/P/S/V）
- 单专业与交叉专业推荐
- 结果页可视化：
  - 五维条形图
  - 雷达图（当前结果 + 历史回答均值）
  - Top 匹配度排行
  - 优势维度与发展建议
- 一键生成分享图（含头像/徽章/能力标签/二维码/历史均值雷达叠加）
- 结果上传与访客计数（Supabase）

## 项目结构

```text
WYTI/
├─ index.html              # 页面结构、Tailwind 配置、CDN 依赖
├─ test.js                 # 题库、算法、渲染、数据库交互、分享图逻辑
├─ images/                 # 吉祥物、徽章、背景图等静态资源
├─ CNAME                   # 自定义域名（如使用 GitHub Pages）
└─ README.md
```

## 本地运行

本项目是纯静态页面，无需构建。

1. 在项目目录启动任意静态服务器（推荐）：
   - Python: `python -m http.server 8080`
2. 浏览器访问：
   - `http://localhost:8080`

说明：
- 页面内有 HTTP -> HTTPS 自动跳转逻辑，但 `localhost/127.0.0.1` 不会跳转，便于本地调试。

## 关键依赖（CDN）

- `https://cdn.tailwindcss.com`
- `https://cdn.jsdelivr.net/npm/chart.js`
- `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`
- `https://fonts.googleapis.com/css2?family=Inter...`

## 数据层（Supabase）

`test.js` 中通过 `RESULT_UPLOAD_CONFIG` 管理 Supabase 配置：

- `supabaseUrl`
- `supabaseAnonKey`
- `tableName`（默认 `wyti_results`）
- `countRpcName`（访客计数 RPC）
- `averageRpcName`（历史均值 RPC，默认 `get_wyti_average_scores`）

### 数据写入

- 结果页计算完成后，会将结果 payload 写入 Supabase 表
- 包含推荐结果、五维分数、题目顺序、用户答案等字段

### 历史均值（推荐数据库预聚合）

当前实现优先走 RPC 获取历史平均分用于雷达图叠加。  
建议在数据库端定时刷新聚合缓存（如 `pg_cron`），避免前端实时聚合。

建议提供 RPC：

- `get_wyti_results_count`：返回总记录数（访客计数）
- `get_wyti_average_scores`：返回 M/D/P/S/V 平均值（历史回答均值）

## 分享图机制

分享图由 `buildShareImageBlob()` 在前端 Canvas 中生成，主要特点：

- 固定画布尺寸与分区布局
- 当前能力雷达 + 历史回答均值雷达叠加
- 单专业与交叉专业徽章两种布局
- 二维码颜色与目标链接可配置
- 生成后优先调用 `Web Share API`，不支持则自动下载 PNG

调试入口（浏览器控制台）：

- `generateShareImageTest(overrides?)`：仅生成测试分享图
- `debugShareAverageScores()`：检查历史均值接口返回

## 配置建议

- 生产环境建议开启数据库端聚合缓存，关闭前端回退聚合
- 匿名 key 仅保留必要权限，避免开放明细读取
- 若使用第三方二维码 API，建议保留双提供商回退

## 参与者

- 网页前后端逻辑：[@DaiShiBo369](https://github.com/DaiShiBo369)
- 问卷内容与 UI 设计：[@Swimming07236](https://github.com/Swimming07236)
- 后期网页调整：[@GaryHaoyuLiu](https://github.com/GaryHaoyuLiu)、[@mrsoscar20070315-creator](https://github.com/mrsoscar20070315-creator)
