import React from "react";

interface BtcDominanceBarProps {
  dominance: number; // e.g. 56.5
  width?: number;
  height?: number;
}

const BtcDominanceBar: React.FC<BtcDominanceBarProps> = ({
  dominance,
  width = 680,
  height = 360,
}) => {
  // Margins: leave left margin enough to place Y tick labels OUTSIDE the chart
  const margin = { top: 30, right: 24, bottom: 48, left: 100 };

  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  // Y domain
  const minY = 35;
  const maxY = 65; // top baseline

  // ticks and the zones requested (top -> bottom)
  const yTicks = [65, 60, 55, 50, 45, 35];

  const zones = [
    { min: 60, max: 65, color: "#16C784", label: "BTC season — capital flows mainly to Bitcoin, alts lag." },
    { min: 55, max: 60, color: "#93D900", label: "Altspot / ETH rotation — reduce BTC exposure, allocate to top alts." },
    { min: 50, max: 55, color: "#F3D42F", label: "Altseason brewing — mid & low caps pumping." },
    { min: 45, max: 50, color: "#EA8C00", label: "Full euphoria — memecoins flying; TAKE-PROFIT zone." },
    { min: 35,  max: 45, color: "#EA3943", label: "Below 45% — high risk / final stage." },
  ];

  // map a percent value to SVG y coordinate inside plotting area
  const valueToY = (v: number) => {
    const clamped = Math.max(minY, Math.min(maxY, v));
    const ratio = (clamped - minY) / (maxY - minY); // 0..1
    // invert because SVG y=0 at top
    return margin.top + (1 - ratio) * plotHeight;
  };

  // Bar geometry
  const barWidth = Math.max(24, plotWidth * 0.6); // bar takes ~60% of inner width
  const barX = margin.left + (plotWidth - barWidth) / 2;
  const barTopY = valueToY(dominance);
  const barBottomY = margin.top + plotHeight;
  const barHeight = Math.max(0, barBottomY - barTopY);

  return (
    <div style={{ width, height, position: "relative", userSelect: "none" }}>
      <svg width={width} height={height} style={{ display: "block" }}>
        {/* defs: drop shadow for bar */}
        <defs>
          <filter id="barShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* --- Background zones: drawn inside plotting area exactly --- */}
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {zones.map((z, i) => {
            const yTop = ((maxY - z.max) / (maxY - minY)) * plotHeight;
            const yBottom = ((maxY - z.min) / (maxY - minY)) * plotHeight;
            const h = yBottom - yTop;
            const labelY = yTop + h / 2;

            return (
              <g key={i}>
                <rect x={0} y={yTop} width={plotWidth} height={h} fill={z.color} />
                <text
                  x={plotWidth / 2}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: 12, fontWeight: 600, fill: "#0b1b2b" }}
                >
                  {z.label}
                </text>
              </g>
            );
          })}
        </g>

        {/* --- Axes --- */}
        {/* Y axis line */}
        <line
          x1={margin.left}
          y1={margin.top}
          x2={margin.left}
          y2={margin.top + plotHeight}
          stroke="#babcbcff"
          strokeWidth={1}
        />
        {/* X axis line */}
        <line
          x1={margin.left}
          y1={margin.top + plotHeight}
          x2={margin.left + plotWidth}
          y2={margin.top + plotHeight}
          stroke="#babcbcff"
          strokeWidth={1}
        />

        {/* Y ticks and labels (labels outside left of the plot) */}
        {yTicks.map((tick, i) => {
          const y = valueToY(tick);
          return (
            <g key={i}>
              <line x1={margin.left - 6} y1={y} x2={margin.left} y2={y} stroke="#E6EDF3" strokeWidth={1} />
              <text
                x={margin.left - 10}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                style={{ fontSize: 12, fill: "#E6EDF3" }}
              >
                {tick}%
              </text>
            </g>
          );
        })}

        {/* --- Bar: translucent with shadow --- */}
        <g>
          <rect
            x={barX}
            y={barTopY}
            width={barWidth}
            height={barHeight}
            fill="rgba(179, 181, 180, 0.3)"
            rx={3}
            ry={3}
            filter="url(#barShadow)"
          />
          <rect
            x={barX}
            y={barTopY}
            width={barWidth}
            height={barHeight}
            fill="none"
            stroke="rgba(255, 255, 255, 0.77)"
            strokeWidth={1}
            rx={3}
            ry={3}
          />
        </g>

        {/* BTC label centered on x-axis */}
        <text
          x={margin.left + plotWidth / 2}
          y={margin.top + plotHeight + 26}
          textAnchor="middle"
          style={{ fontSize: 13, fontWeight: 600, fill: "#E6EDF3" }}
        >
          BTC {dominance.toFixed(1)}%
        </text>

      </svg>
    </div>
  );
};

export default BtcDominanceBar;
