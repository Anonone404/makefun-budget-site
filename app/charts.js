// HomeBase charts: small canvas charts drawn with plain code, no library.
// Every function takes a canvas element and plain data, sizes itself to
// the element's CSS box, and draws crisply on retina screens.

function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const box = canvas.getBoundingClientRect();
  const width = Math.max(50, Math.round(box.width));
  const height = Math.max(50, Math.round(box.height));
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width, height };
}

function money(n) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

// Donut: share of spending per category. `slices` is
// [{ label, value, color }]. Draws the hole label in the middle.
export function drawDonut(canvas, slices, centerLabel, centerValue) {
  const { ctx, width, height } = setupCanvas(canvas);
  const total = slices.reduce((sum, s) => sum + s.value, 0);
  const cx = width / 2;
  const cy = height / 2;
  const outer = Math.min(width, height) / 2 - 6;
  const inner = outer * 0.62;
  if (total <= 0) {
    ctx.beginPath();
    ctx.arc(cx, cy, outer, 0, Math.PI * 2);
    ctx.fillStyle = '#e8e4db';
    ctx.fill();
  } else {
    let angle = -Math.PI / 2;
    for (const slice of slices) {
      const sweep = (slice.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, outer, angle, angle + sweep);
      ctx.closePath();
      ctx.fillStyle = slice.color;
      ctx.fill();
      angle += sweep;
    }
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(cx, cy, inner, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }
  ctx.fillStyle = '#6d675c';
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(centerLabel, cx, cy - 4);
  ctx.fillStyle = '#23272f';
  ctx.font = 'bold 20px system-ui, sans-serif';
  ctx.fillText(centerValue, cx, cy + 18);
}

// Horizontal bars: one row per item, label on the left, value at the end.
// `items` is [{ label, value, max, color }]; bars scale against `max`.
export function drawBars(canvas, items) {
  const { ctx, width, height } = setupCanvas(canvas);
  const rowHeight = 34;
  const labelWidth = 118;
  const valueWidth = 64;
  const barArea = width - labelWidth - valueWidth - 8;
  const max = Math.max(1, ...items.map((i) => i.max));
  ctx.font = '13px system-ui, sans-serif';
  items.forEach((item, i) => {
    const y = i * rowHeight + 8;
    ctx.fillStyle = '#23272f';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(item.label, 0, y + 10);
    const barWidth = Math.max(2, (item.value / max) * barArea);
    ctx.fillStyle = '#ece5d3';
    ctx.fillRect(labelWidth, y, barArea, 20);
    ctx.fillStyle = item.color;
    ctx.fillRect(labelWidth, y, barWidth, 20);
    ctx.fillStyle = '#23272f';
    ctx.textAlign = 'right';
    ctx.fillText(money(item.value), width, y + 10);
  });
  void height;
}

// Vertical bars: monthly trend. `items` is [{ label, value, color }].
// Draws a light baseline and a value label above each bar.
export function drawColumns(canvas, items) {
  const { ctx, width, height } = setupCanvas(canvas);
  const padTop = 26;
  const padBottom = 22;
  const max = Math.max(1, ...items.map((i) => i.value));
  const plotHeight = height - padTop - padBottom;
  const slot = width / items.length;
  const barWidth = Math.min(44, slot * 0.55);
  ctx.strokeStyle = '#ddd5c3';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, height - padBottom + 0.5);
  ctx.lineTo(width, height - padBottom + 0.5);
  ctx.stroke();
  ctx.font = '12px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  items.forEach((item, i) => {
    const x = i * slot + slot / 2;
    const barHeight = (item.value / max) * plotHeight;
    const y = height - padBottom - barHeight;
    ctx.fillStyle = item.color;
    ctx.fillRect(x - barWidth / 2, y, barWidth, barHeight);
    ctx.fillStyle = '#23272f';
    ctx.fillText(money(item.value), x, y - 11);
    ctx.fillStyle = '#6d675c';
    ctx.fillText(item.label, x, height - padBottom + 11);
  });
}
