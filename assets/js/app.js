// 通用应用逻辑：导航高亮、数据加载
(function() {
  // 导航当前页高亮
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a => {
    const href = a.getAttribute('href');
    if ((path === '' && href === 'index.html') || path === href) {
      a.classList.add('active');
    }
  });

  // 数据加载助手
  async function loadJSON(path) {
    const res = await fetch(path + '?v=' + Date.now());
    if (!res.ok) throw new Error('Failed to load ' + path);
    return await res.json();
  }

  // 暴露给页面用
  window.AJ = {
    load: loadJSON,
    formatPct(v) { return (v > 0 ? '+' : '') + v + '%'; },
    formatK(v) { return v >= 10000 ? (v / 10000).toFixed(1) + '万' : v.toString(); },
    formatCNY(v) { return '¥' + v.toLocaleString('zh-CN'); },
    formatUSDbillion(v) { return '$' + v + 'B'; },
  };
})();
