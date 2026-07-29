# 数据 Schema 说明

> **本项目所有数据遵循此 schema，缺字段视为该数据点不可信，宁缺勿编。**
> 最后对齐：2026-07-29（与 `data/*.json` 实际字段一致）

## 通用约定

- 所有数值字段为 `number`（人民币元/月、人、%、美元、亿元等）
- 所有时间字段为 `YYYY-MM` 或 `YYYY-MM-DD` 字符串
- 所有数据点必须带 `source`（来源名）+ `url`（原始链接）
- 不允许出现主观评价字段（"好/差/建议"等）
- 不允许修改历史值（只能新增数据点，不能覆盖过去）
- 可选字段：`note`（备注，需简短客观）、`scope`（数据口径 / 范围）、`as_of`（截止时间）

---

## 1. overview.json - 总览指标

```json
{
  "meta": {
    "version": "2026.07.26",
    "last_updated": "2026-07-26",
    "update_policy": "事件驱动，重大变化 7 日内更新"
  },
  "kpi_cards": [
    {
      "id": "ai_job_yoy_2025",
      "label": "AI 岗位新发同比增速",
      "value": 74.1,
      "unit": "%",
      "as_of": "2025全年",
      "delta_vs_prev_year": 37.6,
      "note": "可选：补充口径说明（如'断层领先，唯一破10万'）",
      "source": "BOSS直聘《2026人才趋势报告》",
      "url": "https://new.qq.com/rain/a/20260123A063C500"
    }
  ],
  "key_charts": {
    "ai_job_yoy_timeseries": "data/jobs.json#ai_job_yoy",
    "llm_salary_timeseries": "data/salary.json#llm_algo_avg_monthly",
    "ai_filing_cumulative": "data/policies.json#filing_cumulative"
  }
}
```

**字段说明**：
- `delta_vs_prev_year`：相对上一年的变化（不是 `delta_vs_prev`！）
- `delta_2026_h1`、`yoy_pct` 等场景化前缀也可使用
- `as_of`：数据截止时间（如 "2025全年" / "截至 2026-06-30"）

---

## 2. jobs.json - 岗位供需

```json
{
  "meta": {
    "last_updated": "YYYY-MM-DD",
    "scope": "中国 AI 就业市场（含大模型、AI应用开发、CV、NLP、机器人算法、具身智能、智能体等岗位）"
  },
  "ai_job_yoy": {
    "title": "AI 岗位新发职位数同比增速（BOSS直聘口径）",
    "unit": "%",
    "source": "BOSS直聘《2026人才趋势报告》",
    "url": "https://...",
    "data": [
      { "date": "2023", "value": 8.5 },
      { "date": "2024", "value": 36.5 },
      { "date": "2025", "value": 74.1 },
      { "date": "2026-Q1", "value": 1200, "scope": "AI 整体 (脉脉口径)", "note": "1-2月同比+12倍" }
    ]
  },
  "supply_demand_ratio": {
    "title": "...",
    "unit": "ratio",
    "source": "...",
    "url": "https://...",
    "data": [
      { "date": "2023", "value": 1.73, "scope": "大模型整体" }
    ]
  }
}
```

**字段约定**：
- 时序数据用 `date`（字符串，灵活格式：`YYYY` / `YYYY-MM` / `YYYY-MM-DD` / `YYYY-Q1` / `YYYY-H1`）
- 横截面数据用 `subfield` / `job` / `company` / `city` 等业务字段
- `scope` 区分不同口径（"AI 整体" / "大模型" / "具身智能" / "智驾" 等）

---

## 3. salary.json - 薪资

```json
{
  "meta": {
    "last_updated": "YYYY-MM-DD",
    "scope": "中国 AI 岗位薪资，单位：人民币元/月（除非另注）"
  },
  "llm_algo_avg_monthly": {
    "title": "大模型算法岗平均月薪（脉脉口径）",
    "unit": "元/月",
    "source": "脉脉高聘人才智库...",
    "data": [
      { "date": "2024-H1", "value": 67500, "scope": "大模型算法岗" }
    ]
  },
  "by_experience_2025spring_zhilian": {
    "title": "...",
    "data": [
      { "years": "1-3年", "avg_monthly_cny": 21410 }
    ]
  },
  "extreme_high_salary_2025_2026": {
    "title": "...",
    "unit": "年薪(万元)",
    "data": [
      { "company": "字节跳动", "job": "...", "annual_cny_wan": 128, "year": "2026" }
    ]
  }
}
```

**字段约定**：
- 多数字段用 `avg_monthly_cny`（人民币元/月）
- 极端高薪样本用 `annual_cny_wan`（年薪万元）或 `monthly_cny`
- 校招/应届生中位数用 `median_monthly_cny` + `scope: "校招中位数"`

---

## 4. companies.json - 公司

```json
{
  "meta": { "last_updated": "YYYY-MM-DD" },
  "top_hiring_2024h1": {
    "title": "...",
    "source": "脉脉《2024大模型人才报告》",
    "url": "https://...",
    "data": [
      { "rank": 1, "company": "字节跳动", "hiring_index": 104.92 }
    ]
  },
  "six_tigers_2024": {
    "title": "AI 大模型\"六小虎\"2024年融资",
    "source": "...",
    "url": "https://...",
    "data": [
      {
        "name": "智谱AI",
        "rounds": 3,
        "total_funding_cny_yi": 40,
        "valuation_cny_yi": 200,
        "note": "9月+12月合并约30亿"
      }
    ]
  }
}
```

**字段约定**：
- `total_funding_cny_yi` / `total_funding_usd_yi`：区分人民币 / 美元
- `ipo_status`：IPO 进展描述（聆讯 / 挂牌 / 市值等）
- `field`：业务方向（"大模型" / "具身智能" / "智驾" / "低空经济" 等）

---

## 5. policies.json - 政策

```json
{
  "meta": { "last_updated": "YYYY-MM-DD" },
  "national": [
    {
      "date": "2023-07-13",
      "title": "《生成式人工智能服务管理暂行办法》",
      "issuer": "国家网信办、发改委、教育部...",
      "scope": "向境内公众提供生成式 AI 服务",
      "key_points": [
        "算法备案制（而非审核许可制）",
        "分类分级监管"
      ],
      "url": "https://..."
    }
  ],
  "filing_cumulative": {
    "title": "生成式 AI 服务备案累计数（国家网信办）",
    "unit": "款",
    "source": "国家互联网信息办公室",
    "url": "https://...",
    "data": [
      { "date": "2025-12", "value": 748, "note": "2025年新增446款" }
    ]
  },
  "local": [
    {
      "date": "2025-03",
      "city": "苏州",
      "title": "《支持人工智能领域人才发展的若干措施》",
      "issuer": "苏州市",
      "items": 9,
      "url": "https://..."
    }
  ]
}
```

**字段约定**：
- 国家级政策用 `national`，地方用 `local` + `city`
- `key_points` 用数组（3-5 条要点）
- 备案数据时序用 `filing_cumulative.data[]`

---

## 6. events.json - 重大事件时间线

```json
{
  "meta": { "last_updated": "YYYY-MM-DD" },
  "events": [
    {
      "date": "2025-01-27",
      "category": "model_release",
      "title": "DeepSeek-R1 发布",
      "issuer": "DeepSeek（可选）",
      "summary": "DeepSeek 开源模型 R1 以低成本达到接近 GPT-o1 性能；7天内用户突破1亿",
      "url": "https://...",
      "source": "多家媒体"
    }
  ]
}
```

**字段约定**：
- `category` 必填，可选值：
  - `policy`（政策）
  - `report`（行业报告）
  - `funding`（融资）
  - `model_release`（模型发布）
  - `hiring`（招聘动态）
  - `ipo`（IPO 进展）
  - 其他类型请先在 README / 此文档登记
- `summary` 限 100 字内，只写事实
- **不使用** `impact` 字段（避免主观判断，事实本身已经传递信息）

---

## 7. cities.json - 城市

```json
{
  "meta": { "last_updated": "YYYY-MM-DD" },
  "ai_development_index_top10_2024": {
    "title": "中国 AI 发展指数 TOP10 城市",
    "source": "智联招聘+北大国发院...",
    "url": "https://...",
    "data": [
      { "rank": 1, "city": "北京", "score_index": 100, "note": "四个维度全部第一" }
    ]
  },
  "ai_penetration_by_city_2026": {
    "title": "2026 春招新发 AI 岗位城市渗透率",
    "unit": "%",
    "data": [
      { "city": "北京", "ai_penetration_pct": 30.17, "rank": 1 }
    ]
  }
}
```

---

## 8. global.json - 海外（仅影响国内市场的重大动作）

```json
{
  "meta": {
    "last_updated": "YYYY-MM-DD",
    "scope": "仅记录对中国 AI 就业市场有重大影响/直接关联的海外事件"
  },
  "global_market": {
    "title": "全球 AI 产业规模",
    "source": "IDC（信通院《人工智能发展报告2024》引用）",
    "url": "https://...",
    "data": [
      { "date": "2024", "value": 6233, "unit": "亿美元", "yoy_pct": 21.5 }
    ]
  },
  "china_us_salary_gap": {
    "title": "中美 AI 工程师薪资差距",
    "source": "脉脉高聘人才智库",
    "data": [
      { "metric": "AI 工程师 中美薪酬差", "ratio": 2 }
    ]
  }
}
```

---

## 数据更新流程

1. **日常监测**：每天检索关键词（DeepSeek、月之暗面、智谱、AI 招聘、生成式AI 备案 等）
2. **筛选标准**：
   - 同比变化 > 10%
   - 重大政策发布
   - 大模型/重要工具发布
   - 头部公司重大招聘/裁员/融资事件
3. **入库**：
   - 在对应 JSON 文件**追加**新数据点（不覆盖）
   - 更新 `meta.last_updated`
   - 在 README 的 Changelog 中记录
4. **Git commit**：每次更新一个独立 commit

## 数据质量优先级

- **A 级**（官方/政府/上市公司财报/招聘平台官方报告）
- **B 级**（权威媒体引用 + 原文链接）
- **C 级**（单一来源、未交叉验证）—— 标注但不展示
- **D 级**（道听途说）—— 不入库

## 历史变更

- **2026-07-29**：与 `data/*.json` 实际字段对齐（`delta_vs_prev` → `delta_vs_prev_year`、移除 `impact`、补充 `note` / `scope` / `as_of` 等实际使用字段）
- **2026-07-25**：初版
