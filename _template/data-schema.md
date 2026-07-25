# 数据 Schema 说明

> **本项目所有数据遵循此 schema，缺字段视为该数据点不可信，宁缺勿编。**

## 通用约定

- 所有数值字段为 `number`（人民币元/月、人、%、美元、亿元等）
- 所有时间字段为 `YYYY-MM` 或 `YYYY-MM-DD` 字符串
- 所有数据点必须带 `source`（来源名）+ `collected_at`（采集时间）+ `url`（原始链接）
- 不允许出现主观评价字段（"好/差/建议"等）
- 不允许修改历史值（只能新增数据点，不能覆盖过去）

---

## 1. overview.json - 总览指标

```json
{
  "meta": {
    "version": "2026-07-25",
    "last_updated": "2026-07-25",
    "next_scheduled_review": "2026-08-25",
    "update_policy": "事件驱动：监测到重大变化（同比>10%或新政发布）后 7 日内更新"
  },
  "kpi_cards": [
    {
      "id": "ai_job_yoy_growth",
      "label": "AI 岗位新发同比增速",
      "value": 74.1,
      "unit": "%",
      "as_of": "2025全年",
      "delta_vs_prev": 37.6,
      "source": "BOSS直聘《2026人才趋势报告》",
      "url": "https://new.qq.com/rain/a/20260123A063C500"
    }
  ]
}
```

## 2. jobs.json - 岗位供需

```json
{
  "meta": { "last_updated": "YYYY-MM-DD" },
  "supply_demand_ratio_timeseries": [
    { "date": "2023-01", "value": 1.73, "scope": "大模型", "source": "..." }
  ],
  "growth_rate_timeseries": [
    { "date": "2023-01", "value": 8.5, "scope": "AI整体岗位", "source": "..." }
  ],
  "top_jobs_2024h1": [
    { "rank": 1, "name": "自然语言处理", "growth_pct": 111, "source": "..." }
  ],
  "skill_demand_split": [
    { "skill": "机器学习", "pct": 78, "source": "..." }
  ]
}
```

## 3. salary.json - 薪资

```json
{
  "meta": { "last_updated": "YYYY-MM-DD" },
  "by_job_timeseries": [
    { "date": "2023-01", "job": "大模型算法", "avg_monthly_cny": 45812, "source": "..." }
  ],
  "by_experience_2025spring": [
    { "years": "1-3", "avg_monthly_cny": 21410, "source": "..." }
  ],
  "by_city_2025": [
    { "city": "北京", "avg_monthly_cny": 27397, "source": "..." }
  ],
  "fresh_grad_2025": {
    "bachelor_avg": 8783,
    "master_avg": 11154,
    "phd_avg": 20550,
    "source": "..."
  }
}
```

## 4. companies.json - 公司

```json
{
  "meta": { "last_updated": "YYYY-MM-DD" },
  "top_hiring": [
    { "company": "字节跳动", "hiring_index": 104.92, "scope": "大模型", "source": "..." }
  ],
  "six_tigers_2024": [
    { "name": "智谱AI", "rounds": 4, "total_funding_cny_yi": 40, "valuation_cny_yi": 200, "source": "..." }
  ],
  "six_tigers_2025": [
    { "name": "智谱AI", "rounds": 5, "total_funding_cny_yi": 30, "source": "..." }
  ]
}
```

## 5. policies.json - 政策

```json
{
  "meta": { "last_updated": "YYYY-MM-DD" },
  "national": [
    { "date": "2023-07-13", "title": "《生成式人工智能服务管理暂行办法》", "issuer": "国家网信办等7部门", "url": "..." }
  ],
  "local": [
    { "date": "2025-03", "city": "苏州", "title": "《支持人工智能领域人才发展的若干措施》", "items": 9, "url": "..." }
  ]
}
```

## 6. events.json - 重大事件时间线

```json
{
  "meta": { "last_updated": "YYYY-MM-DD" },
  "events": [
    {
      "date": "2025-01-27",
      "category": "model_release",
      "title": "DeepSeek-R1 发布",
      "summary": "...",
      "impact": "...",
      "url": "...",
      "source": "..."
    }
  ]
}
```

## 7. cities.json - 城市

```json
{
  "meta": { "last_updated": "YYYY-MM-DD" },
  "ai_development_index_top10_2024": [
    { "rank": 1, "city": "北京", "score_index": 100, "source": "..." }
  ],
  "ai_jobs_share_pct": [
    { "city": "深圳", "share_pct": 10, "source": "..." }
  ]
}
```

## 8. global.json - 海外（仅影响国内市场的重大动作）

```json
{
  "meta": { "last_updated": "YYYY-MM-DD" },
  "events": [
    { "date": "2025-01-27", "company": "DeepSeek", "title": "R1 模型发布", "impact_on_cn_market": "..." }
  ]
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
   - 在 README 的 changelog 中记录
4. **Git commit**：每次更新一个独立 commit

## 数据质量优先级

- **A 级**（官方/政府/上市公司财报/招聘平台官方报告）
- **B 级**（权威媒体引用 + 原文链接）
- **C 级**（单一来源、未交叉验证）—— 标注但不展示
- **D 级**（道听途说）—— 不入库
