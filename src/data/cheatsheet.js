export const CHEATSHEET = [
  {
    category: 'Basics',
    items: [
      { title: 'Print', code: `Console.WriteLine("Hello");\nConsole.Write("No newline");` },
      { title: 'Read input', code: `string? line = Console.ReadLine();\nint n = int.Parse(line!);` },
      { title: 'Comments', code: `// single line\n/* multi\n   line */\n/// <summary>XML doc</summary>` },
      { title: 'String interpolation', code: `string msg = $"{name} is {age} years old";\nstring path = @"C:\\temp\\file.txt"; // verbatim` },
    ],
  },
  {
    category: 'Types & Variables',
    items: [
      { title: 'Value types', code: `int i = 42;  long l = 42L;\ndouble d = 3.14;  float f = 3.14f;\ndecimal m = 9.99m;  bool b = true;\nchar c = 'A';` },
      { title: 'Reference types', code: `string s = "text";\nobject o = 123;\nint[] arr = { 1, 2, 3 };` },
      { title: 'var / const / readonly', code: `var x = 10;            // inferred int\nconst int Max = 100;    // compile-time\nreadonly int id;        // set in constructor` },
      { title: 'Nullable', code: `int? maybe = null;\nstring? name = null;\nint len = name?.Length ?? 0;  // null-conditional + coalescing\nname ??= "default";` },
      { title: 'Conversions', code: `int n = int.Parse("42");\nbool ok = int.TryParse("x", out int r);\ndouble d = (double)n;     // cast\nstring s = n.ToString();` },
    ],
  },
  {
    category: 'Control Flow',
    items: [
      { title: 'if / else', code: `if (x > 0) { }\nelse if (x < 0) { }\nelse { }` },
      { title: 'Ternary', code: `string r = x > 0 ? "pos" : "non-pos";` },
      { title: 'switch expression', code: `string size = n switch\n{\n    < 10 => "small",\n    < 100 => "medium",\n    _ => "large"\n};` },
      { title: 'Loops', code: `for (int i = 0; i < 10; i++) { }\nwhile (cond) { }\ndo { } while (cond);\nforeach (var item in items) { }` },
      { title: 'Pattern matching', code: `if (obj is string s && s.Length > 0) { }\nif (shape is Circle { R: > 10 }) { }` },
    ],
  },
  {
    category: 'Methods',
    items: [
      { title: 'Definition', code: `static int Add(int a, int b) => a + b;\nvoid Log(string msg, int level = 1) { }` },
      { title: 'ref / out / params', code: `void Inc(ref int x) => x++;\nbool Try(out int v) { v = 1; return true; }\nint Sum(params int[] n) => n.Sum();` },
      { title: 'Lambdas & delegates', code: `Func<int, int> sq = x => x * x;\nAction<string> say = s => Console.WriteLine(s);\nPredicate<int> even = n => n % 2 == 0;` },
      { title: 'Local functions', code: `int Outer() {\n    return Helper(2);\n    int Helper(int x) => x * 10;\n}` },
    ],
  },
  {
    category: 'OOP',
    items: [
      { title: 'Class', code: `class Person\n{\n    public string Name { get; set; }\n    public Person(string name) => Name = name;\n    public override string ToString() => Name;\n}` },
      { title: 'Record', code: `public record Point(int X, int Y);\nvar p2 = p1 with { X = 5 };` },
      { title: 'Inheritance', code: `class Dog : Animal\n{\n    public override string Speak() => "Woof";\n}` },
      { title: 'Interface', code: `interface IShape { double Area(); }\nclass Sq : IShape { public double Area() => 4; }` },
      { title: 'Abstract / sealed / static', code: `abstract class Base { public abstract void Run(); }\nsealed class Final { }\nstatic class Utils { public static int Two() => 2; }` },
      { title: 'Access modifiers', code: `public       // everyone\nprivate      // this class only\nprotected    // class + subclasses\ninternal     // same assembly` },
    ],
  },
  {
    category: 'Collections',
    items: [
      { title: 'List<T>', code: `var list = new List<int> { 1, 2 };\nlist.Add(3); list.Remove(1);\nlist.Count; list.Contains(2);` },
      { title: 'Dictionary', code: `var d = new Dictionary<string, int>();\nd["a"] = 1;\nd.TryGetValue("a", out var v);\nforeach (var (k, val) in d) { }` },
      { title: 'HashSet / Queue / Stack', code: `var set = new HashSet<int> { 1, 2 };\nvar q = new Queue<int>(); q.Enqueue(1); q.Dequeue();\nvar s = new Stack<int>(); s.Push(1); s.Pop();` },
      { title: 'Collection expressions (C# 12)', code: `int[] a = [1, 2, 3];\nList<int> b = [..a, 4];` },
    ],
  },
  {
    category: 'LINQ',
    items: [
      { title: 'Filter / map / sort', code: `var r = items\n    .Where(x => x.Active)\n    .Select(x => x.Name)\n    .OrderBy(n => n)\n    .ToList();` },
      { title: 'Aggregates', code: `nums.Sum(); nums.Average();\nnums.Max(); nums.Count(n => n > 5);\nnums.Any(n => n < 0); nums.All(n => n > 0);` },
      { title: 'Single items', code: `nums.First(); nums.FirstOrDefault();\nnums.Single(n => n == 3);\nnums.Last();` },
      { title: 'Grouping / paging', code: `people.GroupBy(p => p.City);\nnums.Skip(10).Take(5);\nnums.Distinct();` },
    ],
  },
  {
    category: 'Errors & Async',
    items: [
      { title: 'try / catch / finally', code: `try { Risky(); }\ncatch (IOException ex) when (ex.HResult == 5) { }\ncatch (Exception ex) { Log(ex); throw; }\nfinally { Cleanup(); }` },
      { title: 'using', code: `using var stream = File.OpenRead("a.txt");\n// disposed at end of scope` },
      { title: 'async / await', code: `async Task<string> GetAsync()\n{\n    using var http = new HttpClient();\n    return await http.GetStringAsync(url);\n}` },
      { title: 'Parallel tasks', code: `var results = await Task.WhenAll(t1, t2, t3);\nawait Task.Delay(1000);` },
    ],
  },
];
