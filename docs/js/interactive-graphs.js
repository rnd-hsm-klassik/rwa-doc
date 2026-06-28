(function () {
  'use strict';

  function initDampingExplorer() {
    if (typeof d3 === 'undefined') {
      window.addEventListener('load', initDampingExplorer);
      return;
    }

    const container = document.getElementById('damping-graph');
    if (!container) return;

    const margin = { top: 30, right: 155, bottom: 58, left: 72 };
    const totalW = 700;
    const totalH = 400;
    const W = totalW - margin.left - margin.right;
    const H = totalH - margin.top - margin.bottom;

    const state = {
      fn:       'exponential',
      factor:   20,
      trim:     2.0,
      dampMin:  0.0,
      dampMax:  1.0,
      minDist:  1.0,
      yMode:    'db'
    };

    const DB_MIN = -60;

    // ── scales ────────────────────────────────────────────────────────────
    const xScale = d3.scaleLinear().domain([0, 50]).range([0, W]);
    let yScale = d3.scaleLinear().domain([0, 1]).range([H, 0]);

    function buildYScale(mode) {
      return mode === 'db'
        ? d3.scaleLinear().domain([DB_MIN, 6]).range([H, 0])
        : d3.scaleLinear().domain([0, 1.3]).range([H, 0]);
    }

    function toY(amplitude) {
      if (state.yMode === 'db') {
        const db = amplitude > 0 ? 20 * Math.log10(amplitude) : DB_MIN;
        return yScale(Math.max(DB_MIN, db));
      }
      return yScale(amplitude);
    }

    // ── SVG root ──────────────────────────────────────────────────────────
    d3.select(container).select('svg').remove();
    const root = d3.select(container)
      .append('svg')
      .attr('viewBox', `0 0 ${totalW} ${totalH}`)
      .attr('width', '100%')
      .style('max-width', `${totalW}px`)
      .style('background', '#ffffff');

    const g = root.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // ── clip path ─────────────────────────────────────────────────────────
    g.append('defs').append('clipPath').attr('id', 'damp-clip')
      .append('rect').attr('width', W).attr('height', H);

    // ── background ────────────────────────────────────────────────────────
    g.append('rect').attr('width', W).attr('height', H).attr('fill', '#ffffff');

    // ── grid ──────────────────────────────────────────────────────────────
    const xGridTicks = [0,10,20,30,40,50];
    g.append('g').selectAll('line').data(xGridTicks).join('line')
      .attr('x1', d => xScale(d)).attr('x2', d => xScale(d))
      .attr('y1', 0).attr('y2', H)
      .attr('stroke', '#cccccc').attr('stroke-width', 0.6).attr('stroke-dasharray', '2,3');

    const yGridG = g.append('g');

    // ── axes ──────────────────────────────────────────────────────────────
    g.append('g')
      .attr('transform', `translate(0,${H})`)
      .call(d3.axisBottom(xScale)
        .tickValues([0, 1, 10, 20, 30, 40, 50])
        .tickFormat(d3.format('d')))
      .call(ax => ax.select('.domain').attr('stroke', '#888'))
      .call(ax => ax.selectAll('.tick line').attr('stroke', '#888'))
      .call(ax => ax.selectAll('.tick text').attr('font-size', '13px').attr('font-family', 'inherit'));

    const yAxisG = g.append('g')
      .call(ax => ax.select('.domain').attr('stroke', '#888'));

    // ── axis labels ───────────────────────────────────────────────────────
    g.append('text')
      .attr('x', W / 2).attr('y', H + 46)
      .attr('text-anchor', 'middle').attr('font-size', '14px').attr('fill', '#333')
      .text('distance (m)');

    const yLabel = g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -H / 2).attr('y', -52)
      .attr('text-anchor', 'middle').attr('font-size', '14px').attr('fill', '#333');

    // ── chart area (clipped) ──────────────────────────────────────────────
    const area = g.append('g').attr('clip-path', 'url(#damp-clip)');

    // reference indicator lines
    const minDistLine = area.append('line')
      .attr('y1', 0).attr('y2', H)
      .attr('stroke', '#3a9a3a').attr('stroke-width', 1.5).attr('stroke-dasharray', '6,4');

    const dampMinLine = area.append('line')
      .attr('x1', 0).attr('x2', W)
      .attr('stroke', '#d07000').attr('stroke-width', 1.5).attr('stroke-dasharray', '6,4');

    const dampMaxLine = area.append('line')
      .attr('x1', 0).attr('x2', W)
      .attr('stroke', '#d07000').attr('stroke-width', 1.5).attr('stroke-dasharray', '6,4');

    // data curves
    const nonPath = area.append('path').attr('fill', 'none').attr('stroke-width', 2);
    const linPath = area.append('path').attr('fill', 'none').attr('stroke-width', 2);
    const expPath = area.append('path').attr('fill', 'none').attr('stroke-width', 2);

    // hover crosshair line (clipped to chart area)
    const hoverLine = area.append('line')
      .attr('y1', 0).attr('y2', H)
      .attr('stroke', '#888').attr('stroke-width', 1).attr('stroke-dasharray', '3,3')
      .attr('pointer-events', 'none').attr('display', 'none');

    // ── reference line labels (outside clip) ─────────────────────────────
    const minDistLabel = g.append('text')
      .attr('font-size', '11px').attr('fill', '#3a9a3a')
      .attr('text-anchor', 'middle').attr('y', -8);

    const dampMinLabel = g.append('text')
      .attr('font-size', '11px').attr('fill', '#d07000')
      .attr('x', W + 6).attr('dominant-baseline', 'middle').text('min');

    const dampMaxLabel = g.append('text')
      .attr('font-size', '11px').attr('fill', '#d07000')
      .attr('x', W + 6).attr('dominant-baseline', 'middle').text('max');

    // ── legend ────────────────────────────────────────────────────────────
    const legend = g.append('g').attr('transform', `translate(${W + 40}, 20)`);

    [
      { label: 'none', bg: 'rgba(155, 155, 155, 0.2)', id: 'leg-non' },
      { label: 'linear',      bg: 'rgba(80,80,210,0.20)', id: 'leg-lin' },
      { label: 'exponential', bg: 'rgba(210,80,80,0.20)', id: 'leg-exp' },
    ].forEach(({ label, bg, id }, i) => {
      const lg = legend.append('g').attr('id', id).attr('transform', `translate(0,${i * 36})`);
      lg.append('rect').attr('width', 100).attr('height', 28).attr('rx', 2).attr('fill', bg);
      lg.append('text').attr('x', 10).attr('y', 19).attr('font-size', '14px').attr('fill', '#555')
        .text(label);
    });

    // ── hover readout panel (below legend) ────────────────────────────────
    // legend: 3 items × 36 px starting at y=20 → bottom at y=128; panel at y=148
    const readout = g.append('g')
      .attr('transform', `translate(${W + 40}, 200)`)
      .attr('display', 'none');

    readout.append('rect')
      .attr('width', 100).attr('height', 72)
      .attr('fill', '#f6f6f6').attr('rx', 3)
      .attr('stroke', '#cccccc').attr('stroke-width', 0.5);

    const rdDist = readout.append('text')
      .attr('x', 8).attr('y', 20).attr('font-size', '13px').attr('fill', '#444');
    const rdExp = readout.append('text')
      .attr('x', 8).attr('y', 42).attr('font-size', '13px').attr('fill', '#cc3333');
    const rdLin = readout.append('text')
      .attr('x', 8).attr('y', 62).attr('font-size', '13px').attr('fill', '#4444cc');

    // ── border box ────────────────────────────────────────────────────────
    g.append('rect').attr('width', W).attr('height', H)
      .attr('fill', 'none').attr('stroke', '#aaaaaa').attr('stroke-width', 0.5);

    // ── math ──────────────────────────────────────────────────────────────
    function amplitude(d, fn, factor, trim, dampMin, dampMax, minDist) {

      const eff = Math.max(d, minDist) + 1; // pd patches adding 1
      let raw;
      if (fn === 'none') {
        raw = 1;
      } else if (fn === 'linear') {
        raw = 1 / eff;
      } else {
        // Pd:
        // [expr abs($f2 * log10($f1))]
        // [expr (100 - $f1)]
        // [dbtorms]
        raw = Math.pow(10, factor * Math.log10(eff) / -20);
      }
      return Math.min(dampMax, Math.max(dampMin, raw * trim));
    }

    function makeCurve(fn, s) {
      const [xMin, xMax] = xScale.domain(); // 0..50
      const pts = [];
      for (let i = 0; i < 400; i++) {
        const d = xMin + (i / 400) * (xMax - xMin);
        pts.push([d, amplitude(d, fn, s.factor, s.trim, s.dampMin, s.dampMax, s.minDist)]);
      }
      console.dir(pts);
      return pts;
    }

    const line = d3.line().x(p => xScale(p[0])).y(p => toY(p[1]));

    // ── y-axis rebuild ────────────────────────────────────────────────────
    function updateYAxis() {
      yScale = buildYScale(state.yMode);

      if (state.yMode === 'db') {
        const ticks = [6, 0, -10, -20, -30, -40, -50, -60];
        yAxisG.call(d3.axisLeft(yScale)
          .tickValues(ticks)
          .tickFormat(d => d + ' dB'))
          .call(ax => ax.select('.domain').attr('stroke', '#888'))
          .call(ax => ax.selectAll('.tick line').attr('stroke', '#888'))
          .call(ax => ax.selectAll('.tick text').attr('font-size', '13px').attr('font-family', 'inherit'));
        yLabel.text('attenuation');
        yGridG.selectAll('line').data(ticks).join('line')
          .attr('x1', 0).attr('x2', W)
          .attr('y1', d => yScale(d)).attr('y2', d => yScale(d))
          .attr('stroke', '#cccccc').attr('stroke-width', 0.6).attr('stroke-dasharray', '2,3');
      } else {
        const ticks = [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1.0];
        yAxisG.call(d3.axisLeft(yScale)
          .tickValues([0, 0.5, 1])
          .tickFormat(d3.format('.1f')))
          .call(ax => ax.select('.domain').attr('stroke', '#888'))
          .call(ax => ax.selectAll('.tick line').attr('stroke', '#888'))
          .call(ax => ax.selectAll('.tick text').attr('font-size', '13px').attr('font-family', 'inherit'));
        yLabel.text('scale');
        yGridG.selectAll('line').data(ticks).join('line')
          .attr('x1', 0).attr('x2', W)
          .attr('y1', d => yScale(d)).attr('y2', d => yScale(d))
          .attr('stroke', '#cccccc').attr('stroke-width', 0.6).attr('stroke-dasharray', '2,3');
      }
    }

    // ── update ────────────────────────────────────────────────────────────
    function update() {
      const s = state;

      updateYAxis();

      // "none" curve
      nonPath
        .attr('d', line([[0,1],[50,1]]))
        .attr('stroke', s.fn === 'none' ? '#484848' : '#999999')
        .attr('stroke-dasharray', s.fn === 'exponential' ? '4,3' : null)
        .attr('display', s.fn === 'none' ? null : 'none');

      // linear curve
      linPath
        .attr('d', line(makeCurve('linear', s)))
        .attr('stroke', s.fn === 'linear' ? '#4444cc' : '#9999dd')
        .attr('stroke-dasharray', s.fn === 'exponential' ? '4,3' : null)
        .attr('display', s.fn === 'none' ? 'none' : null);

      // exponential curve
      expPath
        .attr('d', line(makeCurve('exponential', s)))
        .attr('stroke', '#cc3333')
        .attr('display', s.fn === 'exponential' ? null : 'none');

      // legend opacity
      root.select('#leg-exp').attr('opacity', s.fn === 'exponential' ? 1 : 0.35);
      root.select('#leg-lin').attr('opacity', s.fn === 'none' ? 0.35 : 1);
      root.select('#leg-non').attr('opacity', s.fn === 'none' ? 1 : 0.35);

      // dampMin line — hide at amplitude=0 (would be -inf dB)
      const showMin = s.dampMin > 0.001;
      dampMinLine.attr('y1', toY(s.dampMin)).attr('y2', toY(s.dampMin))
        .attr('display', showMin ? null : 'none');
      dampMinLabel.attr('y', toY(s.dampMin)).attr('display', showMin ? null : 'none');

      // dampMax line — show whenever trim would push the curve above dampMax
      const showMax = s.trim > s.dampMax;
      dampMaxLine.attr('y1', toY(s.dampMax)).attr('y2', toY(s.dampMax))
        .attr('display', showMax ? null : 'none');
      dampMaxLabel.attr('y', toY(s.dampMax)).attr('display', showMax ? null : 'none');

      // minDist line
      const showMD = s.minDist > 1.0;
      if (showMD) {
        const mdx = xScale(Math.min(s.minDist, 49));
        minDistLine.attr('x1', mdx).attr('x2', mdx).attr('display', null);
        minDistLabel.attr('x', mdx).attr('display', null);
      } else {
        minDistLine.attr('display', 'none');
        minDistLabel.attr('display', 'none');
      }

      // value readouts
      setText('factor-val',   s.factor);
      setText('trim-val',     s.trim.toFixed(2));
      setText('damp-min-val', s.dampMin.toFixed(2));
      setText('damp-max-val', s.dampMax.toFixed(2));
      setText('min-dist-val', s.minDist.toFixed(1));
    }

    function setText(id, val) {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    }

    // ── wire controls ─────────────────────────────────────────────────────
    const dampingFnSelect = document.getElementById('damping-fn');
    if (dampingFnSelect) {
      dampingFnSelect.addEventListener('change', function () {
        state.fn = this.value;
        // disable/enable dependent controls
        const off = this.value === 'none';
        ['damping-factor','damping-trim','damping-min','damping-max', 'min-distance'].forEach(id => {
          const el = document.getElementById(id);
          if (el) el.disabled = off;
        });
        update();
      });
    }

    function bind(id, prop, parse) {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', function () {
        state[prop] = parse(this.value);
        // clamp dampMin <= dampMax
        if (prop === 'dampMin' && state.dampMin > state.dampMax) {
          state.dampMax = state.dampMin;
          const mx = document.getElementById('damping-max');
          if (mx) { mx.value = state.dampMax; }
        }
        if (prop === 'dampMax' && state.dampMax < state.dampMin) {
          state.dampMin = state.dampMax;
          const mn = document.getElementById('damping-min');
          if (mn) { mn.value = state.dampMin; }
        }
        update();
      });
    }

    bind('damping-factor', 'factor',  parseFloat);
    bind('damping-trim',   'trim',    parseFloat);
    bind('damping-min',    'dampMin', parseFloat);
    bind('damping-max',    'dampMax', parseFloat);
    bind('min-distance',   'minDist', parseFloat);

    const yModeSelect = document.getElementById('y-mode');
    if (yModeSelect) {
      yModeSelect.addEventListener('change', function () {
        state.yMode = this.value;
        update();
      });
    }

    // ── hover interaction ─────────────────────────────────────────────────
    // Invisible overlay rect on top of everything to capture mouse events.
    g.append('rect')
      .attr('width', W).attr('height', H)
      .attr('fill', 'none').attr('pointer-events', 'all')
      .style('cursor', 'crosshair')
      .on('mousemove', function (event) {
        const [mx] = d3.pointer(event);
        const dist = Math.max(0, xScale.invert(mx));
        const s = state;

        hoverLine.attr('x1', mx).attr('x2', mx).attr('display', null);

        const ampExp = amplitude(dist, 'exponential', s.factor, s.trim, s.dampMin, s.dampMax, s.minDist);
        const ampLin = amplitude(dist, 'linear',      s.factor, s.trim, s.dampMin, s.dampMax, s.minDist);

        let fmt = v => v.toFixed(4);
        if (state.yMode === 'db')
          fmt = v => v > 0 ? (20 * Math.log10(v)).toFixed(1) + ' dB' : '−∞';

        rdDist.text(`d = ${dist.toFixed(1)} m`);
        rdExp.text(`exp: ${fmt(ampExp)}`);
        rdLin.text(`lin: ${fmt(ampLin)}`);

        readout.attr('display', null);
      })
      .on('mouseleave', function () {
        hoverLine.attr('display', 'none');
        readout.attr('display', 'none');
      });

    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDampingExplorer);
  } else {
    initDampingExplorer();
  }
})();
