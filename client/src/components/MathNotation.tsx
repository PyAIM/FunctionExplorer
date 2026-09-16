import { type KeyboardEvent, type RefObject } from "react";
import type { Challenge } from "@/lib/activities";

function formatText(value: string) {
  const parts = value.split(/(\^\(?-?\d+\)?|\^\{?-?\d+\}?|\b(?:infinity|inf)\b|\bsqrt\b)/gi);
  return parts.map((part, index) => {
    if (/^\^/.test(part)) return <sup key={`${part}-${index}`}>{part.replace(/^\^\{?/, "").replace(/\}$/, "")}</sup>;
    if (/^(infinity|inf)$/i.test(part)) return <span key={`${part}-${index}`}>∞</span>;
    if (/^sqrt$/i.test(part)) return <span key={`${part}-${index}`}>√</span>;
    return part;
  });
}

export function MathLine({ children }: { children: string }) {
  return <div className="math-line">{formatText(children)}</div>;
}

export function PiecewiseNotation({ definition }: { definition: NonNullable<Challenge["piecewise"]> }) {
  return <div className="piecewise-card" aria-label={`${definition.label} piecewise function`}>
    <span className="piecewise-label">{formatText(definition.label)}</span>
    <span className="piecewise-brace" aria-hidden="true">&#123;</span>
    <div className="piecewise-cases">{definition.cases.map((item, index) => <div className="piecewise-case" key={`${item.expression}-${index}`}><span>{formatText(item.expression)}</span><span>if {formatText(item.condition)}</span></div>)}</div>
  </div>;
}

export function MathInputTools({ inputRef, value, onChange }: { inputRef: RefObject<HTMLInputElement | null>; value: string; onChange: (value: string) => void }) {
  const insert = (symbol: string) => {
    const input = inputRef.current;
    if (!input) return;
    const start = input.selectionStart ?? value.length;
    const end = input.selectionEnd ?? value.length;
    const next = `${value.slice(0, start)}${symbol}${value.slice(end)}`;
    onChange(next);
    requestAnimationFrame(() => { input.focus(); input.setSelectionRange(start + symbol.length, start + symbol.length); });
  };
  const shortcuts = ["∞", "−∞", "∪", "(", ")", "[", "]", "≤", "≥"];
  return <div className="math-input-tools" aria-label="Math symbols"><span>Insert</span>{shortcuts.map((symbol) => <button type="button" key={symbol} onMouseDown={(event) => event.preventDefault()} onClick={() => insert(symbol)}>{symbol}</button>)}</div>;
}

export function handleAnswerKey(event: KeyboardEvent<HTMLInputElement>, submit: () => void) {
  if (event.key === "Enter") submit();
}
