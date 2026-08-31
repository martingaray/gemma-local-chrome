/**
 * Donut Progress — reusable SVG ring capacity indicator.
 * Pure native SVG, no libraries, no raster images.
 *
 * Usage:
 *   const donut = createDonut({ size: 36, stroke: 4, label: 'Context used' });
 *   parent.appendChild(donut.el);
 *   donut.set(68); // percentage 0–100
 *
 * - Starts at 12 o'clock, fills clockwise, rounded caps.
 * - Center shows "68%". Color: 0–50 green, 51–80 amber, 81–100 red.
 * - Animated (CSS transition ~400ms). ARIA + <title> for screen readers.
 * - Fully parametric: size, stroke, fontSize, colors, track color.
 */

const SVG_NS = 'http://www.w3.org/2000/svg';

const DEFAULT_COLORS = [
  { max: 50, color: '#16A34A' },  // healthy
  { max: 80, color: '#D97706' },  // warning
  { max: 100, color: '#DC2626' }, // critical
];

export const createDonut = ({
  size = 36,
  stroke = 4,
  fontSize = 0,           // 0 = auto (28% of size)
  colors = DEFAULT_COLORS,
  trackColor = '#E2E8F0',
  textColor = 'currentColor',
  label = 'Usage',
} = {}) => {
  const radius = (size - stroke) / 2;
  const center = size / 2;

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('role', 'meter');
  svg.setAttribute('aria-valuemin', '0');
  svg.setAttribute('aria-valuemax', '100');
  svg.style.display = 'block';

  const title = document.createElementNS(SVG_NS, 'title');
  svg.appendChild(title);

  const circle = (cls) => {
    const c = document.createElementNS(SVG_NS, 'circle');
    c.setAttribute('cx', center);
    c.setAttribute('cy', center);
    c.setAttribute('r', radius);
    c.setAttribute('fill', 'none');
    c.setAttribute('stroke-width', stroke);
    c.setAttribute('pathLength', '100');
    c.setAttribute('class', cls);
    svg.appendChild(c);
    return c;
  };

  const track = circle('donut-track');
  track.setAttribute('stroke', trackColor);

  const progress = circle('donut-progress');
  progress.setAttribute('stroke-linecap', 'round');
  // Start at 12 o'clock, clockwise.
  progress.setAttribute('transform', `rotate(-90 ${center} ${center})`);
  progress.setAttribute('stroke-dasharray', '0 100');
  progress.style.transition = 'stroke-dasharray 0.4s ease, stroke 0.4s ease';

  const text = document.createElementNS(SVG_NS, 'text');
  text.setAttribute('x', '50%');
  text.setAttribute('y', '50%');
  text.setAttribute('dominant-baseline', 'central');
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('font-size', fontSize || Math.round(size * 0.28));
  text.setAttribute('font-family', 'system-ui, sans-serif');
  text.setAttribute('fill', textColor);
  svg.appendChild(text);

  const colorFor = (pct) =>
    (colors.find((c) => pct <= c.max) || colors[colors.length - 1]).color;

  const set = (pct) => {
    const value = Math.max(0, Math.min(100, Math.round(pct)));
    progress.setAttribute('stroke-dasharray', `${value} 100`);
    progress.setAttribute('stroke', colorFor(value));
    text.textContent = `${value}%`;
    svg.setAttribute('aria-valuenow', value);
    svg.setAttribute('aria-label', `${label}: ${value}%`);
    title.textContent = `${label}: ${value}%`;
  };

  set(0);
  return { el: svg, set };
};
