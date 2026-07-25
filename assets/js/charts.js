// 图表封装：基于 ECharts CDN
// 颜色主题保持与 CSS 变量一致
const CHART_PALETTE = ['#2c5cff', '#16a34a', '#ea580c', '#9333ea', '#0891b2', '#db2777', '#ca8a04', '#0ea5e9'];
const CHART_TEXT = '#5a6477';
const CHART_BG = '#ffffff';

function baseGrid() {
  return { left: 40, right: 24, top: 30, bottom: 36, containLabel: true };
}

function baseTooltip() {
  return {
    trigger: 'axis',
    backgroundColor: 'rgba(26,31,44,0.92)',
    borderColor: 'transparent',
    textStyle: { color: '#fff', fontSize: 12 },
    padding: [8, 12],
    axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(44,92,255,0.05)' } },
  };
}

// 折线图（时间序列）
function renderLineChart(domId, series, opts = {}) {
  const chart = echarts.init(document.getElementById(domId), null, { renderer: 'canvas' });
  const option = {
    color: CHART_PALETTE,
    backgroundColor: CHART_BG,
    textStyle: { color: CHART_TEXT, fontFamily: 'inherit' },
    grid: baseGrid(),
    tooltip: Object.assign({}, baseTooltip(), opts.tooltip || {}),
    legend: {
      data: series.map(s => s.name),
      bottom: 0,
      textStyle: { color: CHART_TEXT, fontSize: 12 },
      itemWidth: 12,
      itemHeight: 8,
    },
    xAxis: {
      type: 'category',
      data: opts.xData || [],
      axisLine: { lineStyle: { color: '#e8ebf0' } },
      axisTick: { show: false },
      axisLabel: { color: CHART_TEXT, fontSize: 12 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#eef0f4', type: 'dashed' } },
      axisLabel: { color: CHART_TEXT, fontSize: 12, ...(opts.yLabelFormatter ? { formatter: opts.yLabelFormatter } : {}) },
    },
    series: series.map((s, i) => ({
      name: s.name,
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { width: 2.5 },
      itemStyle: { color: CHART_PALETTE[i % CHART_PALETTE.length] },
      emphasis: { focus: 'series' },
      data: s.data,
      ...(s.yAxisIndex !== undefined ? { yAxisIndex: s.yAxisIndex } : {}),
      ...(s.label ? { label: { show: true, position: 'top', fontSize: 11, color: CHART_TEXT, formatter: s.label } } : {}),
    })),
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
  return chart;
}

// 柱状图
function renderBarChart(domId, categories, values, opts = {}) {
  const chart = echarts.init(document.getElementById(domId), null, { renderer: 'canvas' });
  const option = {
    color: [CHART_PALETTE[0]],
    backgroundColor: CHART_BG,
    textStyle: { color: CHART_TEXT, fontFamily: 'inherit' },
    grid: baseGrid(),
    tooltip: Object.assign({}, baseTooltip(), {
      formatter: opts.tooltipFormatter || ((p) => `${p[0].name}<br/><b>${p[0].value}</b>${opts.unit || ''}`),
    }),
    xAxis: {
      type: 'category',
      data: categories,
      axisLine: { lineStyle: { color: '#e8ebf0' } },
      axisTick: { show: false },
      axisLabel: { color: CHART_TEXT, fontSize: 12, interval: 0, rotate: opts.rotate || 0 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#eef0f4', type: 'dashed' } },
      axisLabel: { color: CHART_TEXT, fontSize: 12, ...(opts.yLabelFormatter ? { formatter: opts.yLabelFormatter } : {}) },
    },
    series: [{
      type: 'bar',
      data: values,
      barMaxWidth: 36,
      itemStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: CHART_PALETTE[0] },
            { offset: 1, color: 'rgba(44,92,255,0.55)' },
          ],
        },
        borderRadius: [4, 4, 0, 0],
      },
      label: opts.showLabel !== false ? {
        show: true, position: 'top', color: CHART_TEXT, fontSize: 11,
      } : { show: false },
    }],
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
  return chart;
}

// 横向柱状图
function renderHBarChart(domId, items, opts = {}) {
  const chart = echarts.init(document.getElementById(domId), null, { renderer: 'canvas' });
  const categories = items.map(i => i.name);
  const values = items.map(i => i.value);
  const option = {
    color: [CHART_PALETTE[0]],
    backgroundColor: CHART_BG,
    textStyle: { color: CHART_TEXT, fontFamily: 'inherit' },
    grid: { left: 100, right: 40, top: 10, bottom: 30 },
    tooltip: Object.assign({}, baseTooltip(), {
      formatter: (p) => `${p[0].name}<br/><b>${p[0].value}</b>${opts.unit || ''}`,
    }),
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: '#eef0f4', type: 'dashed' } },
      axisLabel: { color: CHART_TEXT, fontSize: 12 },
    },
    yAxis: {
      type: 'category',
      data: categories.reverse(),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: CHART_TEXT, fontSize: 12 },
    },
    series: [{
      type: 'bar',
      data: values.reverse(),
      barMaxWidth: 22,
      itemStyle: {
        color: CHART_PALETTE[0],
        borderRadius: [0, 4, 4, 0],
      },
      label: {
        show: true, position: 'right', color: CHART_TEXT, fontSize: 11,
      },
    }],
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
  return chart;
}

// 饼图
function renderPieChart(domId, data, opts = {}) {
  const chart = echarts.init(document.getElementById(domId), null, { renderer: 'canvas' });
  const option = {
    color: CHART_PALETTE,
    backgroundColor: CHART_BG,
    textStyle: { color: CHART_TEXT, fontFamily: 'inherit' },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(26,31,44,0.92)',
      borderColor: 'transparent',
      textStyle: { color: '#fff', fontSize: 12 },
      formatter: '{b}<br/>{c} ({d}%)',
    },
    legend: {
      orient: 'vertical', right: 10, top: 'center',
      textStyle: { color: CHART_TEXT, fontSize: 12 },
      itemWidth: 10, itemHeight: 8,
    },
    series: [{
      type: 'pie',
      radius: ['45%', '70%'],
      center: ['38%', '50%'],
      avoidLabelOverlap: true,
      itemStyle: { borderRadius: 4, borderColor: '#fff', borderWidth: 2 },
      label: { show: false },
      labelLine: { show: false },
      data: data,
    }],
  };
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
  return chart;
}
