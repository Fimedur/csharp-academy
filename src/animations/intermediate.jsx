// Animations for intermediate lessons.
import { Terminal } from './shared';

/* ───────────── Classes & Objects ───────────── */
export const classes = {
  code: `class Car
{
    public string Brand;
    public int Speed;
    public Car(string brand) => Brand = brand;
    public void Accelerate(int amt) => Speed += amt;
}

var a = new Car("Toyota");
var b = new Car("Tesla");
a.Accelerate(30);
b.Accelerate(50);
a.Accelerate(20);`,
  steps: [
    { line: 1, caption: 'The class Car is a blueprint: it describes fields (Brand, Speed) and methods. No car exists yet.', state: { objs: [], bp: true } },
    { line: 9, caption: '"new Car(\"Toyota\")" builds an object on the heap and runs the constructor. Variable a points to it.', state: { objs: [{ id: 'a', brand: 'Toyota', speed: 0, hot: true }] } },
    { line: 10, caption: 'A second, completely separate object. b points to it.', state: { objs: [{ id: 'a', brand: 'Toyota', speed: 0 }, { id: 'b', brand: 'Tesla', speed: 0, hot: true }] } },
    { line: 11, caption: 'Calling a method on a changes only a\'s data.', state: { objs: [{ id: 'a', brand: 'Toyota', speed: 30, hot: true }, { id: 'b', brand: 'Tesla', speed: 0 }] } },
    { line: 12, caption: 'b has its own Speed field.', state: { objs: [{ id: 'a', brand: 'Toyota', speed: 30 }, { id: 'b', brand: 'Tesla', speed: 50, hot: true }] } },
    { line: 13, caption: 'a.Speed goes from 30 to 50. Same blueprint, independent state — that\'s the point of objects.', state: { objs: [{ id: 'a', brand: 'Toyota', speed: 50, hot: true }, { id: 'b', brand: 'Tesla', speed: 50 }] } },
  ],
  View: ({ state }) => (
    <div className="cls">
      <div className="blueprint">
        <div className="bp-title">📐 class Car</div>
        <div>string Brand</div>
        <div>int Speed</div>
        <div className="bp-m">Accelerate(int)</div>
      </div>
      <div className="heap">
        <div className="stack-label">Heap (objects)</div>
        {state.objs.length === 0 && <div className="muted">no objects yet</div>}
        {state.objs.map((o) => (
          <div key={o.id} className={`obj ${o.hot ? 'hot' : ''}`}>
            <div className="obj-ref">{o.id} →</div>
            <div className="obj-body">
              <div className="obj-title">🚗 Car</div>
              <div>Brand = <b>"{o.brand}"</b></div>
              <div>Speed = <b key={o.speed} className="pop">{o.speed}</b></div>
              <div className="speedo"><div style={{ width: `${Math.min(100, o.speed)}%` }} /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

/* ───────────── Inheritance & polymorphism ───────────── */
export const inheritance = {
  code: `class Animal { public virtual string Speak() => "..."; }
class Dog : Animal { public override string Speak() => "Woof!"; }
class Cat : Animal { public override string Speak() => "Meow!"; }

Animal[] pets = { new Dog(), new Cat(), new Animal() };
foreach (Animal pet in pets)
    Console.WriteLine(pet.Speak());`,
  steps: [
    { line: 1, caption: 'Animal is the base class. Speak() is virtual, so subclasses may override it.', state: { active: 'Animal', out: [] } },
    { line: 2, caption: 'Dog inherits from Animal (": Animal") and overrides Speak.', state: { active: 'Dog', out: [] } },
    { line: 3, caption: 'Cat also inherits from Animal with its own Speak.', state: { active: 'Cat', out: [] } },
    { line: 5, caption: 'An Animal[] can hold Dogs and Cats — every Dog IS an Animal.', state: { arr: true, out: [] } },
    { line: 7, caption: 'pet is declared as Animal, but the object is really a Dog → Dog.Speak() runs.', state: { arr: true, cur: 0, active: 'Dog', out: ['Woof!'] } },
    { line: 7, caption: 'Next object is a Cat → Cat.Speak() runs. Same line of code, different behavior: polymorphism!', state: { arr: true, cur: 1, active: 'Cat', out: ['Woof!', 'Meow!'] } },
    { line: 7, caption: 'A plain Animal uses the base implementation.', state: { arr: true, cur: 2, active: 'Animal', out: ['Woof!', 'Meow!', '...'] } },
  ],
  View: ({ state }) => {
    const node = (n, say) => (
      <div className={`tree-node ${state.active === n ? 'on' : ''}`}>
        <b>{n}</b>
        <small>Speak() → "{say}"</small>
      </div>
    );
    const pets = ['Dog', 'Cat', 'Animal'];
    return (
      <div className="v-col">
        <div className="tree">
          {node('Animal', '...')}
          <div className="tree-lines"><span /><span /></div>
          <div className="tree-kids">{node('Dog', 'Woof!')}{node('Cat', 'Meow!')}</div>
        </div>
        {state.arr && (
          <div className="pets">
            <span className="muted">pets:</span>
            {pets.map((p, i) => (
              <div key={p} className={`pet ${state.cur === i ? 'cur' : ''}`}>
                {['🐶', '🐱', '🐾'][i]} {p}
              </div>
            ))}
          </div>
        )}
        <Terminal lines={state.out} small />
      </div>
    );
  },
};

/* ───────────── Collections ───────────── */
export const collections = {
  code: `var list = new List<string>();
list.Add("apple");
list.Add("banana");
list.Add("cherry");
list.Remove("banana");
var stock = new Dictionary<string, int>();
stock["apple"] = 5;
stock["cherry"] = 12;
stock["apple"] = 7;
Console.WriteLine(stock["cherry"]);`,
  steps: [
    { line: 1, caption: 'An empty List<string>. It will grow as needed.', state: { list: [], dict: null } },
    { line: 2, caption: 'Add appends to the end.', state: { list: ['apple'], hotL: 0, dict: null } },
    { line: 3, caption: 'Count is now 2.', state: { list: ['apple', 'banana'], hotL: 1, dict: null } },
    { line: 4, caption: 'Count is now 3.', state: { list: ['apple', 'banana', 'cherry'], hotL: 2, dict: null } },
    { line: 5, caption: 'Remove deletes "banana"; later items shift left, so "cherry" is now at index 1.', state: { list: ['apple', 'cherry'], removed: 'banana', dict: null } },
    { line: 6, caption: 'A Dictionary maps unique keys to values.', state: { list: ['apple', 'cherry'], dict: [] } },
    { line: 7, caption: 'Key "apple" → 5.', state: { list: ['apple', 'cherry'], dict: [['apple', 5]], hotK: 'apple' } },
    { line: 8, caption: 'Key "cherry" → 12.', state: { list: ['apple', 'cherry'], dict: [['apple', 5], ['cherry', 12]], hotK: 'cherry' } },
    { line: 9, caption: 'Keys are unique — assigning to an existing key REPLACES its value (5 → 7).', state: { list: ['apple', 'cherry'], dict: [['apple', 7], ['cherry', 12]], hotK: 'apple' } },
    { line: 10, caption: 'Lookup by key is very fast — no need to scan every entry.', state: { list: ['apple', 'cherry'], dict: [['apple', 7], ['cherry', 12]], hotK: 'cherry', out: ['12'] } },
  ],
  View: ({ state }) => (
    <div className="v-col">
      <div className="coll">
        <div className="stack-label">List&lt;string&gt; · Count = {state.list.length}</div>
        <div className="coll-list">
          {state.list.length === 0 && <div className="muted">[ ]</div>}
          {state.list.map((x, i) => (
            <div key={x} className={`li ${state.hotL === i ? 'hot' : ''}`}>
              <small>[{i}]</small>{x}
            </div>
          ))}
          {state.removed && <div className="li removed">{state.removed}</div>}
        </div>
      </div>
      {state.dict && (
        <div className="coll">
          <div className="stack-label">Dictionary&lt;string, int&gt;</div>
          <div className="dict">
            {state.dict.length === 0 && <div className="muted">{'{ }'}</div>}
            {state.dict.map(([k, v]) => (
              <div key={k} className={`kv ${state.hotK === k ? 'hot' : ''}`}>
                <span className="k">"{k}"</span><span className="arrow">→</span><span className="v" key={v}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <Terminal lines={state.out || []} small />
    </div>
  ),
};

/* ───────────── Exceptions ───────────── */
export const exceptions = {
  code: `static int ParseAge(string text)
{
    return int.Parse(text);
}
static void Register(string input)
{
    int age = ParseAge(input);
    Console.WriteLine($"Age: {age}");
}
try
{
    Register("abc");
}
catch (FormatException ex)
{
    Console.WriteLine("Invalid age!");
}
finally
{
    Console.WriteLine("Done.");
}`,
  steps: [
    { line: 10, caption: 'Enter the try block — exceptions thrown inside can be caught below.', state: { stack: ['Main (try)'], exAt: null, out: [] } },
    { line: 12, caption: 'Call Register("abc") → a frame is pushed.', state: { stack: ['Main (try)', 'Register'], exAt: null, out: [] } },
    { line: 7, caption: 'Register calls ParseAge("abc").', state: { stack: ['Main (try)', 'Register', 'ParseAge'], exAt: null, out: [] } },
    { line: 3, caption: '💥 "abc" is not a number! int.Parse THROWS a FormatException.', state: { stack: ['Main (try)', 'Register', 'ParseAge'], exAt: 2, out: [] } },
    { line: 7, caption: 'ParseAge has no catch, so its frame is abandoned and the exception bubbles up to Register.', state: { stack: ['Main (try)', 'Register'], exAt: 1, out: [] } },
    { line: 8, caption: 'Register has no catch either — line 8 never runs. Keep bubbling…', state: { stack: ['Main (try)', 'Register'], exAt: 1, skipped: true, out: [] } },
    { line: 14, caption: 'Main\'s try has a matching catch (FormatException). Caught! 🎣', state: { stack: ['Main (try)'], exAt: 0, caught: true, out: [] } },
    { line: 16, caption: 'The catch block handles the error gracefully instead of crashing.', state: { stack: ['Main (try)'], caught: true, out: ['Invalid age!'] } },
    { line: 20, caption: 'finally always runs — perfect for cleanup.', state: { stack: ['Main'], out: ['Invalid age!', 'Done.'] } },
  ],
  View: ({ state }) => (
    <div className="v-col">
      <div className="stack">
        <div className="stack-label">Call stack ↑ top</div>
        {[...state.stack].map((f, i) => ({ f, i })).reverse().map(({ f, i }) => (
          <div key={f} className={`frame ${state.exAt === i ? (state.caught ? 'caught' : 'boom') : ''}`}>
            <div className="frame-name">{f}</div>
            {state.exAt === i && (
              <div className={`ex-badge ${state.caught ? 'ok' : ''}`}>
                {state.caught ? '🎣 caught FormatException' : '💥 FormatException'}
              </div>
            )}
          </div>
        ))}
      </div>
      <Terminal lines={state.out} small />
    </div>
  ),
};
