import type { BreathingDiagramId } from "@/kidscreen/practices";

const ink = "hsl(var(--tint-teal-ink))";
const fill = "hsl(var(--tint-teal))";
const muted = "hsl(var(--muted-foreground))";
const accent = "hsl(var(--tint-coral-ink))";

function SlowBreathing() {
  return (
    <svg viewBox="0 0 280 120" className="w-full h-auto" aria-hidden>
      <defs>
        <marker id="slow-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={ink} />
        </marker>
        <marker id="slow-arrow-muted" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={muted} />
        </marker>
      </defs>
      <rect x="8" y="28" width="108" height="52" rx="12" fill={fill} stroke={ink} strokeWidth="1.5" />
      <text x="62" y="48" textAnchor="middle" fill={ink} fontSize="11" fontWeight="600">
        Вдох
      </text>
      <text x="62" y="66" textAnchor="middle" fill={muted} fontSize="13" fontWeight="500">
        1 → 2 → 3 → 4
      </text>

      <path d="M124 54 H148" stroke={ink} strokeWidth="2" markerEnd="url(#slow-arrow)" />

      <rect x="156" y="28" width="116" height="52" rx="12" fill={fill} stroke={ink} strokeWidth="1.5" />
      <text x="214" y="48" textAnchor="middle" fill={ink} fontSize="11" fontWeight="600">
        Выдох
      </text>
      <text x="214" y="66" textAnchor="middle" fill={muted} fontSize="13" fontWeight="500">
        4 → 3 → 2 → 1
      </text>

      <path
        d="M214 88 C 214 100, 62 100, 62 88"
        fill="none"
        stroke={muted}
        strokeWidth="1.5"
        strokeDasharray="4 3"
        markerEnd="url(#slow-arrow-muted)"
      />
      <text x="140" y="112" textAnchor="middle" fill={muted} fontSize="11">
        повтори 4 раза
      </text>
    </svg>
  );
}

function HandBreathing() {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-auto" aria-hidden>
      {/* palm */}
      <path
        d="M40 118 Q40 95 55 88 L70 82 Q85 78 100 82 L115 88 Q130 95 130 118 Z"
        fill={fill}
        stroke={ink}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* finger trace: up = inhale, down = exhale */}
      {[
        { x: 52, h: 38 },
        { x: 72, h: 48 },
        { x: 92, h: 54 },
        { x: 112, h: 48 },
        { x: 132, h: 38 },
      ].map(({ x, h }, i) => (
        <g key={i}>
          <path
            d={`M${x} 82 V${82 - h} M${x - 4} ${82 - h + 6} L${x} ${82 - h} L${x + 4} ${82 - h + 6}`}
            fill="none"
            stroke={accent}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={`M${x} ${82 - h} V82 M${x - 4} ${82 - 6} L${x} 82 L${x + 4} ${82 - 6}`}
            fill="none"
            stroke={ink}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}
      <text x="28" y="52" fill={accent} fontSize="10" fontWeight="600">
        ↑ вдох
      </text>
      <text x="148" y="72" fill={ink} fontSize="10" fontWeight="600">
        ↓ выдох
      </text>
      <text x="100" y="134" textAnchor="middle" fill={muted} fontSize="10">
        обведи ладонь пальцем · 2–3 раза
      </text>
    </svg>
  );
}

function BoxBreathing() {
  const cx = 100;
  const cy = 68;
  const s = 52;
  return (
    <svg viewBox="0 0 200 140" className="w-full h-auto" aria-hidden>
      <defs>
        <marker id="box-arrow" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill={ink} />
        </marker>
      </defs>
      <rect
        x={cx - s}
        y={cy - s}
        width={s * 2}
        height={s * 2}
        rx="8"
        fill="none"
        stroke={ink}
        strokeWidth="2.5"
      />
      {/* direction arrows on sides */}
      <path d={`M${cx - s + 16} ${cy - s} H${cx + s - 16}`} stroke={accent} strokeWidth="2" markerEnd="url(#box-arrow)" />
      <path d={`M${cx + s} ${cy - s + 16} V${cy + s - 16}`} stroke={ink} strokeWidth="2" markerEnd="url(#box-arrow)" />
      <path d={`M${cx + s - 16} ${cy + s} H${cx - s + 16}`} stroke={accent} strokeWidth="2" markerEnd="url(#box-arrow)" />
      <path d={`M${cx - s} ${cy + s - 16} V${cy - s + 16}`} stroke={ink} strokeWidth="2" markerEnd="url(#box-arrow)" />

      <text x={cx} y={cy - s - 8} textAnchor="middle" fill={accent} fontSize="10" fontWeight="600">
        вдох · 4
      </text>
      <text x={cx + s + 10} y={cy + 4} textAnchor="start" fill={muted} fontSize="10" fontWeight="600">
        пауза · 4
      </text>
      <text x={cx} y={cy + s + 16} textAnchor="middle" fill={accent} fontSize="10" fontWeight="600">
        выдох · 4
      </text>
      <text x={cx - s - 10} y={cy + 4} textAnchor="end" fill={muted} fontSize="10" fontWeight="600">
        пауза · 4
      </text>

      <text x={cx} y={132} textAnchor="middle" fill={muted} fontSize="10">
        повтори 3 раза
      </text>
    </svg>
  );
}

function ReliefBreathing() {
  return (
    <svg viewBox="0 0 240 120" className="w-full h-auto" aria-hidden>
      <defs>
        <marker id="relief-arrow" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5 Z" fill={muted} />
        </marker>
      </defs>
      {/* inhale */}
      <circle cx="52" cy="44" r="22" fill={fill} stroke={ink} strokeWidth="1.5" />
      <ellipse cx="52" cy="46" rx="6" ry="4" fill="none" stroke={ink} strokeWidth="1.5" />
      <path d="M52 50 Q48 56 44 54" fill="none" stroke={ink} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M52 50 Q56 56 60 54" fill="none" stroke={ink} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M52 28 V14 M48 18 L52 14 L56 18" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="52" y="82" textAnchor="middle" fill={accent} fontSize="10" fontWeight="600">
        вдох носом
      </text>

      <path d="M108 50 H132" stroke={muted} strokeWidth="1.5" markerEnd="url(#relief-arrow)" />

      {/* exhale */}
      <circle cx="188" cy="44" r="22" fill={fill} stroke={ink} strokeWidth="1.5" />
      <ellipse cx="188" cy="50" rx="8" ry="5" fill="none" stroke={ink} strokeWidth="1.5" />
      <path d="M188 58 V72 M184 68 L188 72 L192 68" stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* shoulders dropping */}
      <path d="M174 78 Q188 74 202 78" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
      <text x="188" y="96" textAnchor="middle" fill={ink} fontSize="10" fontWeight="600">
        выдох, плечи вниз
      </text>

      <text x="120" y="114" textAnchor="middle" fill={muted} fontSize="10">
        повтори 4 раза
      </text>
    </svg>
  );
}

const DIAGRAMS: Record<BreathingDiagramId, () => JSX.Element> = {
  slow: SlowBreathing,
  hand: HandBreathing,
  box: BoxBreathing,
  relief: ReliefBreathing,
};

interface BreathingDiagramProps {
  id: BreathingDiagramId;
  title: string;
}

const BreathingDiagram = ({ id, title }: BreathingDiagramProps) => {
  const Diagram = DIAGRAMS[id];
  return (
    <figure className="rounded-xl bg-muted/40 p-3 md:p-4 space-y-2">
      <figcaption className="font-semibold text-foreground text-sm md:text-base">{title}</figcaption>
      <div className="rounded-lg bg-card/80 p-2 md:p-3" role="img" aria-label={title}>
        <Diagram />
      </div>
    </figure>
  );
};

export default BreathingDiagram;
