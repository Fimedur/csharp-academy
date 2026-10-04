// Animations for advanced lessons.
import { Terminal } from './shared';

/* ───────────── LINQ pipeline ───────────── */
const SRC = [5, 2, 8, 1, 9, 4];
export const linq = {
  code: `int[] nums = { 5, 2, 8, 1, 9, 4 };
var result = nums
    .Where(n => n > 3)
    .Select(n => n * 10)
    .OrderBy(n => n)
    .ToList();`,
  steps: (() => {
    const s = [];
    s.push({ line: 1, caption: 'Start with an array of six numbers.', state: { cur: null, verdict: {}, where: [], select: [], sorted: null } });
    s.push({ line: 2, caption: 'Lines 2–5 only BUILD a query. Nothing runs yet — LINQ is lazy (deferred execution).', state: { cur: null, verdict: {}, where: [], select: [], sorted: null, lazy: true } });
    const verdict = {};
    const where = [];
    const select = [];
    SRC.forEach((n, i) => {
      const pass = n > 3;
      verdict[i] = pass ? 'pass' : 'fail';
      if (pass) {
        where.push(n);
        select.push(n * 10);
        s.push({ line: 4, caption: `ToList pulls ${n}: Where(${n} > 3) ✔ → Select(${n} * 10) = ${n * 10}. Items stream through one at a time.`, state: { cur: i, verdict: { ...verdict }, where: [...where], select: [...select], sorted: null } });
      } else {
        s.push({ line: 3, caption: `ToList pulls ${n}: Where(${n} > 3) ✘ — filtered out, Select never sees it.`, state: { cur: i, verdict: { ...verdict }, where: [...where], select: [...select], sorted: null } });
      }
    });
    const sorted = [...select].sort((a, b) => a - b);
    s.push({ line: 5, caption: 'OrderBy must see every item before it can sort, then yields them in order.', state: { cur: null, verdict: { ...verdict }, where: [...where], select: [...select], sorted } });
    s.push({ line: 6, caption: `ToList() stores the result: [${sorted.join(', ')}].`, state: { cur: null, verdict: { ...verdict }, where: [...where], select: [...select], sorted, done: true } });
    return s;
  })(),
  View: ({ state }) => (
    <div className="linq">
      <div className="lq-stage">
        <div className="lq-label">nums</div>
        <div className="lq-items">
          {SRC.map((n, i) => (
            <span key={i} className={`chip ${state.cur === i ? 'cur' : ''} ${state.verdict[i] || ''}`}>{n}</span>
          ))}
        </div>
      </div>
      <div className={`lq-pipe ${state.lazy ? 'lazy' : ''}`}>▼ Where(n =&gt; n &gt; 3)</div>
      <div className="lq-stage">
        <div className="lq-label">where</div>
        <div className="lq-items">{state.where.map((n, i) => <span key={i} className="chip pass">{n}</span>)}</div>
      </div>
      <div className={`lq-pipe ${state.lazy ? 'lazy' : ''}`}>▼ Select(n =&gt; n * 10)</div>
      <div className="lq-stage">
        <div className="lq-label">select</div>
        <div className="lq-items">{state.select.map((n, i) => <span key={i} className="chip blue">{n}</span>)}</div>
      </div>
      <div className={`lq-pipe ${state.lazy ? 'lazy' : ''}`}>▼ OrderBy(n =&gt; n)</div>
      <div className={`lq-stage result ${state.done ? 'done' : ''}`}>
        <div className="lq-label">result</div>
        <div className="lq-items">{(state.sorted || []).map((n) => <span key={n} className="chip gold">{n}</span>)}</div>
      </div>
    </div>
  ),
};

/* ───────────── Async / await timeline ───────────── */
export const asyncAwait = {
  code: `async Task<string> FetchAsync(string name, int ms)
{
    await Task.Delay(ms);   // simulates network I/O
    return name;
}
var t1 = FetchAsync("Users", 2000);
var t2 = FetchAsync("Orders", 3000);
Console.WriteLine("Doing other work...");
var results = await Task.WhenAll(t1, t2);
Console.WriteLine("All done in ~3s");`,
  steps: [
    { line: 6, caption: 'Start t1. FetchAsync runs until its first await, then hands back an unfinished Task immediately.', state: { t: 0, started: ['t1'], out: [] } },
    { line: 7, caption: 'Start t2 right away — both are now "in flight" at the same time.', state: { t: 0, started: ['t1', 't2'], out: [] } },
    { line: 8, caption: 'The main thread is NOT blocked, so it can do other work while waiting.', state: { t: 0.3, started: ['t1', 't2'], out: ['Doing other work...'], free: true } },
    { line: 9, caption: 'await Task.WhenAll pauses this method (not the thread!) until both tasks finish.', state: { t: 1, started: ['t1', 't2'], out: ['Doing other work...'], waiting: true } },
    { line: 4, caption: 't1 ("Users") completes at 2s.', state: { t: 2, started: ['t1', 't2'], done: ['t1'], out: ['Doing other work...'], waiting: true } },
    { line: 4, caption: 't2 ("Orders") completes at 3s.', state: { t: 3, started: ['t1', 't2'], done: ['t1', 't2'], out: ['Doing other work...'], waiting: true } },
    { line: 10, caption: 'Both done after ~3s total — not 5s like running them one after another.', state: { t: 3, started: ['t1', 't2'], done: ['t1', 't2'], out: ['Doing other work...', 'All done in ~3s'], compare: true } },
  ],
  View: ({ state }) => {
    const MAX = 5;
    const pct = (x) => `${(x / MAX) * 100}%`;
    const lane = (id, label, dur) => {
      const started = state.started.includes(id);
      const done = (state.done || []).includes(id);
      const w = started ? Math.min(state.t, dur) : 0;
      return (
        <div className="lane">
          <div className="lane-label">{label}</div>
          <div className="lane-track">
            <div className="lane-ghost" style={{ width: pct(dur) }} />
            <div className={`lane-bar ${done ? 'done' : ''}`} style={{ width: pct(w) }}>{done ? '✓' : started ? '⏳' : ''}</div>
          </div>
        </div>
      );
    };
    return (
      <div className="v-col">
        <div className="timeline">
          <div className="lane">
            <div className="lane-label">Main</div>
            <div className="lane-track">
              <div className={`lane-bar main ${state.free ? 'work' : ''}`} style={{ width: pct(state.t) }}>
                {state.free ? 'other work' : state.waiting ? 'awaiting (thread free)' : ''}
              </div>
            </div>
          </div>
          {lane('t1', 't1 Users', 2)}
          {lane('t2', 't2 Orders', 3)}
          {state.compare && (
            <div className="lane">
              <div className="lane-label muted">Sequential</div>
              <div className="lane-track"><div className="lane-bar bad" style={{ width: pct(5) }}>5s if awaited one by one</div></div>
            </div>
          )}
          <div className="track-overlay">
            <div className="ticks">{[0, 1, 2, 3, 4, 5].map((s) => <span key={s} style={{ left: pct(s) }}>{s}s</span>)}</div>
            <div className="now" style={{ left: pct(state.t) }} />
          </div>
        </div>
        <Terminal lines={state.out} small />
      </div>
    );
  },
};

/* ───────────── Generics ───────────── */
export const generics = {
  code: `class Box<T>
{
    public T Value { get; }
    public Box(T value) => Value = value;
}
var a = new Box<int>(42);
var b = new Box<string>("hi");
var c = new Box<bool>(true);
var d = new Box<int>("oops"); // ❌`,
  steps: [
    { line: 1, caption: 'Box<T> is a template. T is a placeholder that will be filled with a real type.', state: { boxes: [] } },
    { line: 6, caption: 'Box<int>: the compiler replaces every T with int. Value is an int.', state: { boxes: [{ t: 'int', v: '42', c: 'c1' }] } },
    { line: 7, caption: 'The same class, now with T = string.', state: { boxes: [{ t: 'int', v: '42', c: 'c1' }, { t: 'string', v: '"hi"', c: 'c2' }] } },
    { line: 8, caption: 'And with T = bool. One definition, many type-safe versions.', state: { boxes: [{ t: 'int', v: '42', c: 'c1' }, { t: 'string', v: '"hi"', c: 'c2' }, { t: 'bool', v: 'true', c: 'c3' }] } },
    { line: 9, caption: 'Type safety: a Box<int> only accepts ints. This is caught at COMPILE time — no runtime surprises.', state: { boxes: [{ t: 'int', v: '42', c: 'c1' }, { t: 'string', v: '"hi"', c: 'c2' }, { t: 'bool', v: 'true', c: 'c3' }], err: true } },
  ],
  View: ({ state }) => (
    <div className="v-col">
      <div className="gen-template">
        <span>Box&lt;<b className="tslot">T</b>&gt;</span>
        <small>T Value</small>
      </div>
      <div className="gen-row">
        {state.boxes.map((b) => (
          <div key={b.t} className={`gen-box ${b.c}`}>
            <div className="gen-type">Box&lt;{b.t}&gt;</div>
            <div className="gen-val">{b.v}</div>
          </div>
        ))}
        {state.err && (
          <div className="gen-box err">
            <div className="gen-type">Box&lt;int&gt;</div>
            <div className="gen-val">"oops"</div>
            <div className="gen-err">CS1503: cannot convert string to int</div>
          </div>
        )}
      </div>
    </div>
  ),
};
