import { useEffect, useMemo, useState } from 'react';
import CodeBlock from './CodeBlock';

/**
 * Generic step-by-step animation player.
 * An animation module provides:
 *   code:   C# source shown on the left
 *   params: optional [{ key, label, min, max, default }] sliders
 *   steps:  array of { line, caption, state } OR a function(params) returning that array
 *   View:   React component receiving { state } and drawing the visual
 */
export default function AnimationPlayer({ anim }) {
  const initialParams = useMemo(
    () => Object.fromEntries((anim.params || []).map((p) => [p.key, p.default])),
    [anim]
  );
  const [params, setParams] = useState(initialParams);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const steps = useMemo(
    () => (typeof anim.steps === 'function' ? anim.steps(params) : anim.steps),
    [anim, params]
  );
  const code = typeof anim.code === 'function' ? anim.code(params) : anim.code;
  const current = steps[Math.min(step, steps.length - 1)];
  const atEnd = step >= steps.length - 1;

  // Reset when animation or params change
  useEffect(() => {
    setStep(0);
    setPlaying(false);
  }, [anim, params]);

  // Auto-advance while playing
  useEffect(() => {
    if (!playing) return;
    if (atEnd) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setStep((s) => s + 1), 1700 / speed);
    return () => clearTimeout(t);
  }, [playing, step, atEnd, speed]);

  const togglePlay = () => {
    if (atEnd) setStep(0);
    setPlaying((p) => !p);
  };

  const View = anim.View;

  return (
    <div className="anim-player">
      {anim.params && (
        <div className="anim-params">
          {anim.params.map((p) => (
            <label key={p.key}>
              {p.label}: <strong>{params[p.key]}</strong>
              <input
                type="range"
                min={p.min}
                max={p.max}
                value={params[p.key]}
                onChange={(e) => setParams({ ...params, [p.key]: Number(e.target.value) })}
              />
            </label>
          ))}
        </div>
      )}

      <div className="anim-grid">
        <div className="anim-code">
          <CodeBlock code={code} activeLine={current.line} compact />
        </div>
        <div className="anim-stage">
          <View state={current.state} />
        </div>
      </div>

      <div className="anim-caption" key={step}>
        <span className="step-badge">Step {step + 1}/{steps.length}</span>
        {current.caption}
      </div>

      <div className="anim-controls">
        <button onClick={() => { setPlaying(false); setStep(0); }} title="Restart">⏮</button>
        <button onClick={() => { setPlaying(false); setStep((s) => Math.max(0, s - 1)); }} disabled={step === 0} title="Previous step">◀</button>
        <button className="primary" onClick={togglePlay}>
          {playing ? '❚❚ Pause' : atEnd ? '↻ Replay' : '▶ Play'}
        </button>
        <button onClick={() => { setPlaying(false); setStep((s) => Math.min(steps.length - 1, s + 1)); }} disabled={atEnd} title="Next step">▶</button>
        <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))} aria-label="Speed">
          <option value={0.5}>0.5×</option>
          <option value={1}>1×</option>
          <option value={2}>2×</option>
        </select>
      </div>

      <div className="anim-dots">
        {steps.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === step ? 'on' : ''} ${i < step ? 'past' : ''}`}
            onClick={() => { setPlaying(false); setStep(i); }}
            aria-label={`Go to step ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
