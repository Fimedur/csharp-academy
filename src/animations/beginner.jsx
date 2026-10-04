// Animations for beginner lessons.
import { Terminal } from './shared';

/* ───────────── Hello World ───────────── */
export const hello = {
  code: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
        Console.WriteLine("Welcome to C#");
    }
}`,
  steps: [
    { line: 1, caption: '"using System;" imports the System namespace so we can use Console.', state: { phase: 'compile', output: [] } },
    { line: 3, caption: 'A class groups code together. Every C# program lives inside at least one class.', state: { phase: 'compile', output: [] } },
    { line: 5, caption: 'The .NET runtime starts the program by calling Main — the entry point.', state: { phase: 'run', output: [] } },
    { line: 7, caption: 'Console.WriteLine prints text and a new line to the console.', state: { phase: 'run', output: ['Hello, World!'] } },
    { line: 8, caption: 'Statements run top to bottom, one after another.', state: { phase: 'run', output: ['Hello, World!', 'Welcome to C#'] } },
    { line: 9, caption: 'When Main reaches its closing brace, the program exits.', state: { phase: 'done', output: ['Hello, World!', 'Welcome to C#'] } },
  ],
  View: ({ state }) => (
    <div className="v-col">
      <div className="pipeline-mini">
        {['compile', 'run', 'done'].map((p, i) => (
          <div key={p} className={`pm-node ${state.phase === p ? 'on' : ''}`}>
            {['📝 Compile', '▶ Run Main()', '✅ Exit'][i]}
          </div>
        ))}
      </div>
      <Terminal lines={state.output} />
    </div>
  ),
};

/* ───────────── Variables ───────────── */
const TYPE_COLOR = { int: 'c1', string: 'c2', bool: 'c3', var: 'c4' };
export const variables = {
  code: `int age = 25;
string name = "Jack";
bool isStudent = true;
age = age + 1;
var city = "Dhaka";`,
  steps: [
    { line: 0, caption: 'Memory starts empty. Each variable will get its own labelled box.', state: { vars: [] } },
    { line: 1, caption: 'Declare an int named age and store 25 in it.', state: { vars: [{ type: 'int', name: 'age', value: '25', hot: true }] } },
    { line: 2, caption: 'A string holds text. Strings use double quotes.', state: { vars: [{ type: 'int', name: 'age', value: '25' }, { type: 'string', name: 'name', value: '"Jack"', hot: true }] } },
    { line: 3, caption: 'A bool can only be true or false.', state: { vars: [{ type: 'int', name: 'age', value: '25' }, { type: 'string', name: 'name', value: '"Jack"' }, { type: 'bool', name: 'isStudent', value: 'true', hot: true }] } },
    { line: 4, caption: 'Reassigning: read age (25), add 1, write 26 back into the same box. The type stays int.', state: { vars: [{ type: 'int', name: 'age', value: '26', hot: true }, { type: 'string', name: 'name', value: '"Jack"' }, { type: 'bool', name: 'isStudent', value: 'true' }] } },
    { line: 5, caption: 'var lets the compiler infer the type — city becomes a string.', state: { vars: [{ type: 'int', name: 'age', value: '26' }, { type: 'string', name: 'name', value: '"Jack"' }, { type: 'bool', name: 'isStudent', value: 'true' }, { type: 'string', name: 'city', value: '"Dhaka"', hot: true, inferred: true }] } },
  ],
  View: ({ state }) => (
    <div className="mem">
      <div className="mem-title">Memory</div>
      <div className="mem-grid">
        {state.vars.length === 0 && <div className="muted">(empty)</div>}
        {state.vars.map((v) => (
          <div key={v.name} className={`mem-box ${TYPE_COLOR[v.type]} ${v.hot ? 'hot' : ''}`}>
            <div className="mem-type">{v.inferred ? 'var → ' : ''}{v.type}</div>
            <div className="mem-val" key={v.value}>{v.value}</div>
            <div className="mem-name">{v.name}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ───────────── Conditions ───────────── */
export const conditions = {
  params: [{ key: 'score', label: 'score', min: 0, max: 100, default: 72 }],
  code: ({ score }) => `int score = ${score};
if (score >= 90)
    Console.WriteLine("A");
else if (score >= 70)
    Console.WriteLine("B");
else
    Console.WriteLine("Keep practicing");`,
  steps: ({ score }) => {
    const s = [];
    const base = { score, c1: 'idle', c2: 'idle', out: null };
    s.push({ line: 1, caption: `Store ${score} in score. Drag the slider to try other values!`, state: { ...base } });
    const c1 = score >= 90;
    s.push({ line: 2, caption: `Check: is ${score} >= 90? → ${c1}`, state: { ...base, c1: c1 ? 'true' : 'false' } });
    if (c1) {
      s.push({ line: 3, caption: 'The first condition is true, so print "A" and skip every other branch.', state: { ...base, c1: 'true', out: 'A' } });
      return s;
    }
    const c2 = score >= 70;
    s.push({ line: 4, caption: `First was false, so try the next one: is ${score} >= 70? → ${c2}`, state: { ...base, c1: 'false', c2: c2 ? 'true' : 'false' } });
    if (c2) {
      s.push({ line: 5, caption: 'This condition is true → print "B". The else is skipped.', state: { ...base, c1: 'false', c2: 'true', out: 'B' } });
      return s;
    }
    s.push({ line: 7, caption: 'No condition was true, so the else block runs.', state: { ...base, c1: 'false', c2: 'false', out: 'Keep practicing' } });
    return s;
  },
  View: ({ state }) => {
    const { score, c1, c2, out } = state;
    const node = (label, st) => <div className={`flow-cond ${st}`}>{label}<span className="flow-res">{st === 'true' ? '✔ true' : st === 'false' ? '✘ false' : ''}</span></div>;
    return (
      <div className="flow">
        <div className="flow-start">score = {score}</div>
        <div className="flow-arrow">↓</div>
        <div className="flow-row">
          {node('score >= 90 ?', c1)}
          <span className={`flow-branch ${out === 'A' ? 'on' : ''}`}>→ "A"</span>
        </div>
        <div className={`flow-arrow ${c1 === 'false' ? 'on' : ''}`}>↓ false</div>
        <div className="flow-row">
          {node('score >= 70 ?', c2)}
          <span className={`flow-branch ${out === 'B' ? 'on' : ''}`}>→ "B"</span>
        </div>
        <div className={`flow-arrow ${c2 === 'false' ? 'on' : ''}`}>↓ false</div>
        <div className={`flow-else ${out === 'Keep practicing' ? 'on' : ''}`}>else → "Keep practicing"</div>
        <Terminal lines={out ? [out] : []} small />
      </div>
    );
  },
};

/* ───────────── Loops ───────────── */
export const loops = {
  params: [{ key: 'n', label: 'N (loop limit)', min: 1, max: 6, default: 4 }],
  code: ({ n }) => `int sum = 0;
for (int i = 0; i < ${n}; i++)
{
    sum += i;
    Console.WriteLine($"i={i}, sum={sum}");
}
Console.WriteLine("Done!");`,
  steps: ({ n }) => {
    const s = [];
    let sum = 0;
    const out = [];
    s.push({ line: 1, caption: 'Start with sum = 0.', state: { n, i: null, sum, cond: null, out: [...out] } });
    s.push({ line: 2, caption: 'Initializer: int i = 0 runs once, before the first iteration.', state: { n, i: 0, sum, cond: null, out: [...out] } });
    for (let i = 0; i < n; i++) {
      s.push({ line: 2, caption: `Condition: ${i} < ${n} is true → enter the loop body.`, state: { n, i, sum, cond: true, out: [...out] } });
      sum += i;
      s.push({ line: 4, caption: `sum += i → sum is now ${sum}.`, state: { n, i, sum, cond: true, out: [...out], hotSum: true } });
      out.push(`i=${i}, sum=${sum}`);
      s.push({ line: 5, caption: 'Print the current values.', state: { n, i, sum, cond: true, out: [...out] } });
      s.push({ line: 2, caption: `Iterator: i++ → i becomes ${i + 1}.`, state: { n, i: i + 1, sum, cond: null, out: [...out] } });
    }
    s.push({ line: 2, caption: `Condition: ${n} < ${n} is false → exit the loop.`, state: { n, i: n, sum, cond: false, out: [...out] } });
    out.push('Done!');
    s.push({ line: 7, caption: 'Execution continues after the loop.', state: { n, i: n, sum, cond: false, out: [...out], done: true } });
    return s;
  },
  View: ({ state }) => (
    <div className="v-col">
      <div className="loop-track">
        {Array.from({ length: state.n }, (_, k) => (
          <div key={k} className={`loop-cell ${state.i === k ? 'cur' : ''} ${state.i > k ? 'done' : ''}`}>{k}</div>
        ))}
        <div className={`loop-cell exit ${state.i === state.n ? 'cur' : ''}`}>exit</div>
      </div>
      <div className="loop-stats">
        <div className="stat"><span>i</span><b key={state.i}>{state.i ?? '—'}</b></div>
        <div className={`stat ${state.hotSum ? 'hot' : ''}`}><span>sum</span><b key={state.sum}>{state.sum}</b></div>
        <div className={`stat cond ${state.cond === true ? 'yes' : state.cond === false ? 'no' : ''}`}>
          <span>i &lt; {state.n}</span><b>{state.cond === null ? '…' : String(state.cond)}</b>
        </div>
      </div>
      <Terminal lines={state.out} small />
    </div>
  ),
};

/* ───────────── Arrays ───────────── */
export const arrays = {
  code: `int[] nums = { 4, 8, 15, 16, 23 };
nums[2] = 42;
int total = 0;
for (int i = 0; i < nums.Length; i++)
    total += nums[i];
Console.WriteLine(total);`,
  steps: (() => {
    const s = [];
    let cells = [4, 8, 15, 16, 23];
    s.push({ line: 1, caption: 'An array of 5 ints is created. Each slot has an index starting at 0.', state: { cells, ptr: null, total: null } });
    cells = [4, 8, 42, 16, 23];
    s.push({ line: 2, caption: 'nums[2] means "the 3rd slot" (index 2). 15 is replaced by 42.', state: { cells, ptr: 2, changed: 2, total: null } });
    s.push({ line: 3, caption: 'total starts at 0.', state: { cells, ptr: null, total: 0 } });
    let total = 0;
    cells.forEach((v, i) => {
      total += v;
      s.push({ line: 5, caption: `i = ${i}: add nums[${i}] (${v}) → total = ${total}`, state: { cells, ptr: i, total } });
    });
    s.push({ line: 4, caption: 'i = 5 is not < nums.Length (5), so the loop ends. Valid indexes are 0..4.', state: { cells, ptr: 5, total } });
    s.push({ line: 6, caption: `Print the total: ${total}.`, state: { cells, ptr: null, total, out: [String(total)] } });
    return s;
  })(),
  View: ({ state }) => (
    <div className="v-col">
      <div className="arr">
        {state.cells.map((v, i) => (
          <div key={i} className={`arr-cell ${state.ptr === i ? 'cur' : ''} ${state.changed === i ? 'changed' : ''}`}>
            <div className="arr-val" key={v}>{v}</div>
            <div className="arr-idx">[{i}]</div>
          </div>
        ))}
        <div className={`arr-cell ghost ${state.ptr === 5 ? 'cur bad' : ''}`}>
          <div className="arr-val">✕</div>
          <div className="arr-idx">[5]</div>
        </div>
      </div>
      <div className="loop-stats">
        <div className="stat"><span>Length</span><b>{state.cells.length}</b></div>
        <div className="stat hot"><span>total</span><b key={state.total}>{state.total ?? '—'}</b></div>
      </div>
      <Terminal lines={state.out || []} small />
    </div>
  ),
};

/* ───────────── Methods / call stack ───────────── */
const frame = (name, vars, extra = {}) => ({ name, vars, ...extra });
export const methods = {
  code: `static int Square(int x)
{
    return x * x;
}
static int SumOfSquares(int a, int b)
{
    return Square(a) + Square(b);
}
int result = SumOfSquares(3, 4);
Console.WriteLine(result);`,
  steps: [
    { line: 9, caption: 'Main calls SumOfSquares(3, 4). Main\'s frame is at the bottom of the call stack.', state: { stack: [frame('Main', { result: '?' })] } },
    { line: 7, caption: 'A new frame is PUSHED for SumOfSquares with parameters a = 3, b = 4.', state: { stack: [frame('Main', { result: '?' }), frame('SumOfSquares', { a: 3, b: 4 }, { hot: true })] } },
    { line: 3, caption: 'SumOfSquares calls Square(3) → another frame is pushed on top.', state: { stack: [frame('Main', { result: '?' }), frame('SumOfSquares', { a: 3, b: 4 }), frame('Square', { x: 3 }, { hot: true })] } },
    { line: 3, caption: 'Square returns 3 * 3 = 9. Its frame is about to be POPPED.', state: { stack: [frame('Main', { result: '?' }), frame('SumOfSquares', { a: 3, b: 4 }), frame('Square', { x: 3 }, { ret: 9 })] } },
    { line: 7, caption: 'Back in SumOfSquares with 9. Now call Square(4).', state: { stack: [frame('Main', { result: '?' }), frame('SumOfSquares', { a: 3, b: 4, 'Square(a)': 9 }), frame('Square', { x: 4 }, { hot: true })] } },
    { line: 3, caption: 'Square returns 4 * 4 = 16.', state: { stack: [frame('Main', { result: '?' }), frame('SumOfSquares', { a: 3, b: 4, 'Square(a)': 9 }), frame('Square', { x: 4 }, { ret: 16 })] } },
    { line: 7, caption: 'SumOfSquares computes 9 + 16 = 25 and returns it.', state: { stack: [frame('Main', { result: '?' }), frame('SumOfSquares', { a: 3, b: 4 }, { ret: 25 })] } },
    { line: 9, caption: 'Its frame is popped; Main stores 25 in result.', state: { stack: [frame('Main', { result: 25 }, { hot: true })] } },
    { line: 10, caption: 'Print 25. Each method had its own local variables — they never clashed.', state: { stack: [frame('Main', { result: 25 })], out: ['25'] } },
  ],
  View: ({ state }) => (
    <div className="v-col">
      <div className="stack">
        <div className="stack-label">Call stack ↑ top</div>
        {[...state.stack].reverse().map((f, i) => (
          <div key={f.name + (state.stack.length - i)} className={`frame ${f.hot ? 'hot' : ''} ${f.ret !== undefined ? 'returning' : ''}`}>
            <div className="frame-name">{f.name}()</div>
            <div className="frame-vars">
              {Object.entries(f.vars).map(([k, v]) => <span key={k}>{k} = <b>{String(v)}</b></span>)}
            </div>
            {f.ret !== undefined && <div className="ret-bubble">return {f.ret}</div>}
          </div>
        ))}
      </div>
      <Terminal lines={state.out || []} small />
    </div>
  ),
};
