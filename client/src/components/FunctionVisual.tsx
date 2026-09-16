import type { ReactElement } from "react";
import type { VisualType } from "@/lib/activities";

const Grid = () => (
  <>
    <defs>
      <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
        <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(133,191,234,.15)" strokeWidth="1" />
      </pattern>
      <filter id="glow"><feGaussianBlur stdDeviation="2.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
    <line x1="50%" y1="12" x2="50%" y2="208" stroke="#6c8caf" strokeWidth="1.5" />
    <line x1="16" y1="50%" x2="304" y2="50%" stroke="#6c8caf" strokeWidth="1.5" />
  </>
);

function Mapping() {
  return <svg viewBox="0 0 320 220" className="visual-svg" role="img" aria-label="Mapping diagram showing inputs with exactly one output"><Grid />
    <text x="52" y="32" fill="#89a6c5" fontSize="12">inputs</text><text x="220" y="32" fill="#89a6c5" fontSize="12">outputs</text>
    {[68, 110, 152].map((y, i) => <g key={y}><circle cx="70" cy={y} r="16" fill="#102a45" stroke="#38d6ff" /><text x="66" y={y + 5} fill="white" fontSize="13">{i + 1}</text></g>)}
    {[88, 142].map((y, i) => <g key={y}><circle cx="252" cy={y} r="18" fill="#2d2147" stroke="#c490ff" /><text x="248" y={y + 5} fill="white" fontSize="13">{String.fromCharCode(65 + i)}</text></g>)}
    <path d="M87 68 C140 68 170 88 232 88" stroke="#48e0bb" strokeWidth="3" fill="none" markerEnd="url(#arrow)" />
    <path d="M87 110 C140 110 170 142 232 142" stroke="#48e0bb" strokeWidth="3" fill="none" />
    <path d="M87 152 C140 152 170 142 232 142" stroke="#48e0bb" strokeWidth="3" fill="none" />
    <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8Z" fill="#48e0bb" /></marker></defs>
  </svg>;
}

function Domain() {
  return <svg viewBox="0 0 320 220" className="visual-svg" role="img" aria-label="Square root curve ending at x equals five"><Grid />
    <path d="M54 62 Q88 102 115 128 T178 171" fill="none" stroke="#42dcff" strokeWidth="5" filter="url(#glow)" />
    <circle cx="54" cy="62" r="6" fill="#42dcff" /><line x1="54" y1="62" x2="54" y2="191" stroke="#ffbd48" strokeDasharray="4 4" /><text x="42" y="207" fill="#ffcf7a" fontSize="12">−3</text>
    <text x="184" y="172" fill="#89a6c5" fontSize="12">y ≥ 0</text>
  </svg>;
}

function Piecewise() {
  return <svg viewBox="0 0 320 220" className="visual-svg" role="img" aria-label="Piecewise graph with open and closed circles"><Grid />
    <path d="M42 62 L160 138" fill="none" stroke="#c490ff" strokeWidth="5" /><circle cx="160" cy="138" r="7" fill="#0f1d32" stroke="#c490ff" strokeWidth="4" />
    <path d="M160 158 Q215 70 286 42" fill="none" stroke="#49e1b9" strokeWidth="5" /><circle cx="160" cy="158" r="7" fill="#49e1b9" />
    <text x="170" y="151" fill="#a7c2dc" fontSize="12">active rule</text>
  </svg>;
}

function Terrain() {
  return <svg viewBox="0 0 320 220" className="visual-svg" role="img" aria-label="Graph with local and global extrema"><Grid />
    <path d="M26 163 C60 75 81 82 109 129 S152 184 177 100 S228 37 294 91" fill="none" stroke="#ffbd48" strokeWidth="5" filter="url(#glow)" />
    <circle cx="72" cy="91" r="6" fill="#ffbd48" /><circle cx="151" cy="169" r="6" fill="#48e0bb" /><circle cx="228" cy="57" r="7" fill="#ff7d6e" />
    <text x="235" y="50" fill="#ff9a8d" fontSize="11">global max</text><text x="118" y="188" fill="#75f0cc" fontSize="11">local min</text>
  </svg>;
}

function Symmetry() {
  return <svg viewBox="0 0 320 220" className="visual-svg" role="img" aria-label="Even function symmetric about y axis"><Grid />
    <path d="M47 47 Q113 190 160 190 Q207 190 273 47" fill="none" stroke="#c490ff" strokeWidth="5" filter="url(#glow)" />
    <line x1="160" y1="25" x2="160" y2="202" stroke="#ffbd48" strokeDasharray="6 5" /><text x="168" y="43" fill="#ffcf7a" fontSize="12">y-axis symmetry</text>
  </svg>;
}

function Transform() {
  return <svg viewBox="0 0 320 220" className="visual-svg" role="img" aria-label="Parabola shifted horizontally right"><Grid />
    <path d="M51 50 Q95 171 142 171 Q189 171 232 50" fill="none" stroke="#67809c" strokeWidth="3" strokeDasharray="6 5" />
    <path d="M91 50 Q135 171 182 171 Q229 171 272 50" fill="none" stroke="#42dcff" strokeWidth="5" filter="url(#glow)" />
    <path d="M145 197 L201 197" stroke="#ffbd48" strokeWidth="3" /><path d="M201 197 L193 192 M201 197 L193 202" stroke="#ffbd48" strokeWidth="3" /><text x="158" y="188" fill="#ffcf7a" fontSize="12">right 2</text>
  </svg>;
}

function Operations() {
  return <svg viewBox="0 0 320 220" className="visual-svg" role="img" aria-label="Function composition flow"><Grid />
    <rect x="31" y="77" width="72" height="56" rx="12" fill="#102a45" stroke="#42dcff" strokeWidth="2"/><text x="53" y="111" fill="white" fontSize="16">g(x)</text>
    <path d="M107 105 H155" stroke="#48e0bb" strokeWidth="3" /><path d="M155 105 L147 100 M155 105 L147 110" stroke="#48e0bb" strokeWidth="3"/>
    <rect x="159" y="77" width="72" height="56" rx="12" fill="#2d2147" stroke="#c490ff" strokeWidth="2"/><text x="181" y="111" fill="white" fontSize="16">f( )</text>
    <path d="M235 105 H281" stroke="#ffbd48" strokeWidth="3" /><path d="M281 105 L273 100 M281 105 L273 110" stroke="#ffbd48" strokeWidth="3"/>
    <text x="35" y="57" fill="#89a6c5" fontSize="12">input</text><text x="250" y="57" fill="#89a6c5" fontSize="12">output</text><text x="96" y="163" fill="#a7c2dc" fontSize="14">f(g(x))</text>
  </svg>;
}

function Inverse() {
  return <svg viewBox="0 0 320 220" className="visual-svg" role="img" aria-label="Function and inverse reflected over y equals x"><Grid />
    <line x1="52" y1="190" x2="270" y2="30" stroke="#ffbd48" strokeWidth="2" strokeDasharray="6 5" /><text x="227" y="38" fill="#ffcf7a" fontSize="11">y = x</text>
    <path d="M52 169 Q95 170 128 120 T205 66" fill="none" stroke="#42dcff" strokeWidth="5" filter="url(#glow)"/>
    <path d="M61 181 Q91 148 136 119 T259 58" fill="none" stroke="#c490ff" strokeWidth="4" strokeDasharray="7 4"/>
  </svg>;
}

function Quadratic() {
  return <svg viewBox="0 0 320 220" className="visual-svg" role="img" aria-label="Quadratic graph with vertex and intercepts"><Grid />
    <path d="M54 54 Q108 184 160 184 Q212 184 266 54" fill="none" stroke="#ffbd48" strokeWidth="5" filter="url(#glow)"/>
    <circle cx="160" cy="184" r="6" fill="#ffbd48" /><line x1="160" y1="35" x2="160" y2="202" stroke="#ffbd48" strokeDasharray="5 5" opacity=".7"/>
    <text x="169" y="177" fill="#ffcf7a" fontSize="12">vertex</text>
  </svg>;
}

export function FunctionVisual({ type }: { type?: VisualType }) {
  const components: Record<VisualType, ReactElement> = { mapping: <Mapping />, domain: <Domain />, piecewise: <Piecewise />, terrain: <Terrain />, symmetry: <Symmetry />, transform: <Transform />, operations: <Operations />, inverse: <Inverse />, quadratic: <Quadratic /> };
  return <div className="visual-card">{type ? components[type] : <Operations />}</div>;
}
