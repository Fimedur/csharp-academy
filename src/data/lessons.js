// All lesson content lives here. Each lesson has:
//  - sections: text + optional code explaining the topic
//  - animation: key into src/animations/index.js
//  - quiz: multiple-choice questions (answer = index of correct option)

export const LEVELS = [
  { id: 'beginner', name: 'Beginner', blurb: 'Your first steps: syntax, variables, logic and loops.' },
  { id: 'intermediate', name: 'Intermediate', blurb: 'Object-oriented programming, collections and errors.' },
  { id: 'advanced', name: 'Advanced', blurb: 'LINQ, async/await and generics for real-world code.' },
];

export const LESSONS = [
  // ───────────────────────── BEGINNER ─────────────────────────
  {
    id: 'hello-world',
    level: 'beginner',
    title: 'Hello, World!',
    summary: 'How a C# program is structured and how to print to the console.',
    minutes: 8,
    animation: 'hello',
    sections: [
      {
        heading: 'What is C#?',
        text: 'C# (pronounced "C sharp") is a modern, type-safe, object-oriented language created by Microsoft. It runs on .NET and is used for web apps (ASP.NET), games (Unity), desktop apps, cloud services and more.',
      },
      {
        heading: 'Your first program',
        text: 'Since .NET 6, a program can be just one line thanks to "top-level statements". The compiler wraps it in a Main method for you.',
        code: `Console.WriteLine("Hello, World!");`,
      },
      {
        heading: 'The classic structure',
        text: 'Under the hood, every program has a namespace, a class and a static Main method — the entry point where execution starts.',
        code: `using System;

namespace MyFirstApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, World!");
        }
    }
}`,
      },
      {
        heading: 'Running it',
        text: 'Install the .NET SDK, then run these commands in a terminal: "dotnet new console -n MyFirstApp", "cd MyFirstApp", "dotnet run".',
        code: `dotnet new console -n MyFirstApp
cd MyFirstApp
dotnet run`,
      },
    ],
    quiz: [
      { q: 'Which method is the entry point of a classic C# program?', options: ['Start()', 'Main()', 'Run()', 'Init()'], answer: 1, explain: 'Execution begins in the static Main method.' },
      { q: 'Which line prints text and moves to a new line?', options: ['Console.Print("Hi");', 'print("Hi")', 'Console.WriteLine("Hi");', 'echo "Hi"'], answer: 2, explain: 'Console.WriteLine writes text followed by a line break.' },
      { q: 'What ends most C# statements?', options: ['A colon :', 'A period .', 'A semicolon ;', 'Nothing'], answer: 2, explain: 'Statements end with a semicolon.' },
    ],
  },
  {
    id: 'variables',
    level: 'beginner',
    title: 'Variables & Data Types',
    summary: 'Store values in named boxes and learn the built-in types.',
    minutes: 12,
    animation: 'variables',
    sections: [
      {
        heading: 'What is a variable?',
        text: 'A variable is a named piece of memory that holds a value. In C# every variable has a type, and the type decides what values it can hold.',
        code: `int age = 25;
double price = 19.99;
string name = "Jack";
bool isStudent = true;
char grade = 'A';`,
      },
      {
        heading: 'Common built-in types',
        text: 'int (whole numbers), long (big whole numbers), double / decimal (fractions — use decimal for money), bool (true/false), char (one character), string (text).',
      },
      {
        heading: 'Type inference with var',
        text: 'With var, the compiler figures out the type from the value. The variable is still strongly typed — you just don\'t write the type.',
        code: `var count = 10;        // int
var message = "Hi";    // string
// count = "ten";      // ❌ compile error: count is an int`,
      },
      {
        heading: 'Constants and string interpolation',
        text: 'Use const for values that never change. Use $"..." to put variables inside strings.',
        code: `const double Pi = 3.14159;
string name = "Jack";
int age = 25;
Console.WriteLine($"{name} is {age} years old.");`,
      },
    ],
    quiz: [
      { q: 'Which type is best for storing money values?', options: ['int', 'float', 'decimal', 'char'], answer: 2, explain: 'decimal has high precision and avoids rounding errors with money.' },
      { q: 'What is the type of x in: var x = "hello";', options: ['var', 'object', 'string', 'char'], answer: 2, explain: 'var infers the type from the value; "hello" is a string.' },
      { q: 'How do you write a char literal?', options: ['"A"', "'A'", '`A`', 'A'], answer: 1, explain: 'chars use single quotes, strings use double quotes.' },
      { q: 'What does $"Hi {name}" do?', options: ['Creates a regex', 'String interpolation', 'Declares a constant', 'Nothing special'], answer: 1, explain: 'The $ prefix enables string interpolation.' },
    ],
  },
  {
    id: 'conditions',
    level: 'beginner',
    title: 'Operators & Conditions',
    summary: 'Make decisions with if / else and switch.',
    minutes: 12,
    animation: 'conditions',
    sections: [
      {
        heading: 'Comparison and logical operators',
        text: 'Comparison: == != > < >= <=. Logical: && (and), || (or), ! (not). They all produce a bool.',
        code: `int a = 5, b = 10;
bool bigger = a > b;          // false
bool both = a > 0 && b > 0;   // true
bool notTrue = !true;         // false`,
      },
      {
        heading: 'if / else if / else',
        text: 'The program checks each condition from top to bottom and runs the first block whose condition is true.',
        code: `int score = 72;

if (score >= 90)
    Console.WriteLine("A");
else if (score >= 70)
    Console.WriteLine("B");
else
    Console.WriteLine("Keep practicing");`,
      },
      {
        heading: 'switch expressions',
        text: 'Modern C# has compact switch expressions — great for mapping a value to a result.',
        code: `string day = "Sat";
string type = day switch
{
    "Sat" or "Sun" => "Weekend",
    _ => "Weekday"
};`,
      },
      {
        heading: 'The ternary operator',
        text: 'condition ? valueIfTrue : valueIfFalse — a one-line if/else that returns a value.',
        code: `string label = age >= 18 ? "Adult" : "Minor";`,
      },
    ],
    quiz: [
      { q: 'What does && mean?', options: ['OR', 'AND', 'NOT', 'Equals'], answer: 1, explain: '&& is logical AND — both sides must be true.' },
      { q: 'score = 72. Which branch runs: if (score >= 90) A, else if (score >= 70) B, else C?', options: ['A', 'B', 'C', 'None'], answer: 1, explain: '72 is not ≥ 90, but it is ≥ 70, so B runs.' },
      { q: 'In a switch expression, what does _ mean?', options: ['Error', 'Default / anything else', 'Empty string', 'Null'], answer: 1, explain: 'The discard pattern _ matches anything not matched earlier.' },
    ],
  },
  {
    id: 'loops',
    level: 'beginner',
    title: 'Loops',
    summary: 'Repeat code with for, while, do-while and foreach.',
    minutes: 12,
    animation: 'loops',
    sections: [
      {
        heading: 'The for loop',
        text: 'A for loop has three parts: initializer, condition and iterator. It keeps running while the condition is true.',
        code: `for (int i = 0; i < 5; i++)
{
    Console.WriteLine(i);   // 0 1 2 3 4
}`,
      },
      {
        heading: 'while and do-while',
        text: 'while checks the condition first. do-while runs the body at least once, then checks.',
        code: `int n = 3;
while (n > 0)
{
    Console.WriteLine(n);
    n--;
}

do
{
    Console.WriteLine("Runs at least once");
} while (false);`,
      },
      {
        heading: 'foreach',
        text: 'foreach walks through every item in a collection — the simplest and safest loop for arrays and lists.',
        code: `string[] fruits = { "apple", "banana", "cherry" };
foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}`,
      },
      {
        heading: 'break and continue',
        text: 'break exits the loop immediately. continue skips to the next iteration.',
        code: `for (int i = 0; i < 10; i++)
{
    if (i == 5) break;      // stop at 5
    if (i % 2 == 0) continue; // skip even numbers
    Console.WriteLine(i);   // 1 3
}`,
      },
    ],
    quiz: [
      { q: 'How many times does for (int i = 0; i < 5; i++) run?', options: ['4', '5', '6', 'Forever'], answer: 1, explain: 'i takes values 0,1,2,3,4 — five iterations.' },
      { q: 'Which loop always runs at least once?', options: ['for', 'while', 'do-while', 'foreach'], answer: 2, explain: 'do-while checks its condition after the body.' },
      { q: 'What does continue do?', options: ['Exits the loop', 'Skips to the next iteration', 'Restarts the program', 'Pauses'], answer: 1, explain: 'continue jumps to the next iteration.' },
    ],
  },
  {
    id: 'arrays',
    level: 'beginner',
    title: 'Arrays',
    summary: 'Store many values of the same type in one variable.',
    minutes: 10,
    animation: 'arrays',
    sections: [
      {
        heading: 'Creating arrays',
        text: 'An array has a fixed size. Elements are accessed by index, starting at 0.',
        code: `int[] numbers = { 4, 8, 15, 16, 23 };
string[] names = new string[3]; // 3 empty slots

Console.WriteLine(numbers[0]);      // 4
Console.WriteLine(numbers.Length);  // 5`,
      },
      {
        heading: 'Changing elements',
        text: 'Assign to an index to change it. Using an index outside 0..Length-1 throws IndexOutOfRangeException.',
        code: `numbers[2] = 42;
// numbers[5] = 1; // ❌ IndexOutOfRangeException`,
      },
      {
        heading: 'Looping over arrays',
        text: 'Combine arrays with loops to process every element.',
        code: `int sum = 0;
foreach (int n in numbers)
    sum += n;
Console.WriteLine($"Sum: {sum}");`,
      },
      {
        heading: 'Multi-dimensional arrays',
        text: 'C# supports grids with [,] syntax.',
        code: `int[,] grid = new int[3, 3];
grid[1, 2] = 7;`,
      },
    ],
    quiz: [
      { q: 'What is the index of the first element?', options: ['1', '0', '-1', 'Depends'], answer: 1, explain: 'C# arrays are zero-indexed.' },
      { q: 'int[] a = {1,2,3}; What is a.Length?', options: ['2', '3', '4', '0'], answer: 1, explain: 'Length is the number of elements: 3.' },
      { q: 'What happens with a[10] on a 3-element array?', options: ['Returns 0', 'Returns null', 'IndexOutOfRangeException', 'Array grows'], answer: 2, explain: 'Arrays are fixed-size; invalid indexes throw.' },
    ],
  },
  {
    id: 'methods',
    level: 'beginner',
    title: 'Methods',
    summary: 'Package reusable code into named methods with parameters and return values.',
    minutes: 14,
    animation: 'methods',
    sections: [
      {
        heading: 'Defining a method',
        text: 'A method has a return type, a name and parameters. void means it returns nothing.',
        code: `static int Add(int a, int b)
{
    return a + b;
}

static void Greet(string name)
{
    Console.WriteLine($"Hello, {name}!");
}`,
      },
      {
        heading: 'Calling methods and the call stack',
        text: 'When you call a method, a new "frame" is pushed on the call stack with its parameters and local variables. When it returns, the frame is popped and the result goes back to the caller.',
        code: `int result = Add(2, 3); // 5
Greet("Jack");`,
      },
      {
        heading: 'Optional and named parameters',
        text: 'Parameters can have default values, and callers can name arguments for clarity.',
        code: `static void Order(string item, int qty = 1) { }

Order("Coffee");             // qty = 1
Order(qty: 3, item: "Tea");`,
      },
      {
        heading: 'Expression-bodied methods and overloading',
        text: 'Short methods can use =>. Overloading means several methods with the same name but different parameters.',
        code: `static int Square(int x) => x * x;
static double Square(double x) => x * x;`,
      },
    ],
    quiz: [
      { q: 'What does void mean as a return type?', options: ['Returns null', 'Returns nothing', 'Returns any type', 'Method is empty'], answer: 1, explain: 'void methods do not return a value.' },
      { q: 'What happens to the call stack when a method returns?', options: ['A frame is pushed', 'A frame is popped', 'Nothing', 'The program ends'], answer: 1, explain: 'Returning pops the method\'s frame.' },
      { q: 'Two methods with the same name but different parameters is called…', options: ['Overriding', 'Overloading', 'Hiding', 'Recursion'], answer: 1, explain: 'That is method overloading.' },
    ],
  },

  // ───────────────────────── INTERMEDIATE ─────────────────────────
  {
    id: 'classes',
    level: 'intermediate',
    title: 'Classes & Objects',
    summary: 'Model the real world with classes, properties, constructors and methods.',
    minutes: 15,
    animation: 'classes',
    sections: [
      {
        heading: 'A class is a blueprint',
        text: 'A class describes data (fields/properties) and behavior (methods). An object is one concrete instance created with new.',
        code: `class Car
{
    public string Brand { get; set; }
    public int Speed { get; private set; }

    public Car(string brand)
    {
        Brand = brand;
    }

    public void Accelerate(int amount)
    {
        Speed += amount;
    }
}`,
      },
      {
        heading: 'Creating objects',
        text: 'Each object has its own copy of the data. Changing one does not affect the other.',
        code: `var a = new Car("Toyota");
var b = new Car("Tesla");
a.Accelerate(30);
Console.WriteLine(a.Speed); // 30
Console.WriteLine(b.Speed); // 0`,
      },
      {
        heading: 'Encapsulation',
        text: 'Access modifiers control visibility: public (anyone), private (only inside the class), protected (class + subclasses), internal (same project). Hide data and expose safe methods.',
      },
      {
        heading: 'Records',
        text: 'For simple data objects, a record gives you a constructor, properties, equality and ToString in one line.',
        code: `public record Point(int X, int Y);

var p1 = new Point(1, 2);
var p2 = new Point(1, 2);
Console.WriteLine(p1 == p2); // True (value equality)`,
      },
    ],
    quiz: [
      { q: 'What keyword creates a new object?', options: ['create', 'make', 'new', 'init'], answer: 2, explain: 'new allocates an object and calls its constructor.' },
      { q: 'A private member can be accessed from…', options: ['Anywhere', 'Only inside its class', 'Subclasses only', 'The same namespace'], answer: 1, explain: 'private restricts access to the declaring class.' },
      { q: 'What is a constructor?', options: ['A method that destroys objects', 'A special method that runs when an object is created', 'A static field', 'An interface'], answer: 1, explain: 'Constructors initialize new objects.' },
    ],
  },
  {
    id: 'inheritance',
    level: 'intermediate',
    title: 'Inheritance & Polymorphism',
    summary: 'Reuse code with base classes, override behavior, and program to interfaces.',
    minutes: 15,
    animation: 'inheritance',
    sections: [
      {
        heading: 'Inheritance',
        text: 'A derived class inherits members from a base class using a colon (:). C# supports single class inheritance.',
        code: `class Animal
{
    public string Name { get; set; } = "";
    public virtual string Speak() => "...";
}

class Dog : Animal
{
    public override string Speak() => "Woof!";
}

class Cat : Animal
{
    public override string Speak() => "Meow!";
}`,
      },
      {
        heading: 'Polymorphism',
        text: 'A variable of the base type can hold any derived object. Calling a virtual method runs the most-derived override at runtime.',
        code: `Animal[] pets = { new Dog(), new Cat() };
foreach (Animal pet in pets)
    Console.WriteLine(pet.Speak()); // Woof! Meow!`,
      },
      {
        heading: 'Abstract classes',
        text: 'An abstract class cannot be instantiated and can force derived classes to implement abstract members.',
        code: `abstract class Shape
{
    public abstract double Area();
}

class Circle : Shape
{
    public double R { get; init; }
    public override double Area() => Math.PI * R * R;
}`,
      },
      {
        heading: 'Interfaces',
        text: 'An interface is a contract. A class can implement many interfaces.',
        code: `interface IFlyable { void Fly(); }
interface ISwimmable { void Swim(); }

class Duck : Animal, IFlyable, ISwimmable
{
    public void Fly() => Console.WriteLine("Flying");
    public void Swim() => Console.WriteLine("Swimming");
}`,
      },
    ],
    quiz: [
      { q: 'Which keyword allows a method to be overridden?', options: ['static', 'virtual', 'sealed', 'const'], answer: 1, explain: 'Base methods must be virtual (or abstract) to be overridden.' },
      { q: 'How many base classes can a C# class have?', options: ['0', '1', '2', 'Unlimited'], answer: 1, explain: 'C# has single class inheritance (but many interfaces).' },
      { q: 'Animal a = new Dog(); a.Speak() returns…', options: ['"..."', '"Woof!"', 'Compile error', 'null'], answer: 1, explain: 'Polymorphism calls the Dog override at runtime.' },
      { q: 'Can you write new Shape() if Shape is abstract?', options: ['Yes', 'No'], answer: 1, explain: 'Abstract classes cannot be instantiated.' },
    ],
  },
  {
    id: 'collections',
    level: 'intermediate',
    title: 'Collections: List & Dictionary',
    summary: 'Growable lists and fast key/value lookups.',
    minutes: 12,
    animation: 'collections',
    sections: [
      {
        heading: 'List<T>',
        text: 'A List grows and shrinks automatically. T is the element type.',
        code: `var scores = new List<int> { 90, 75 };
scores.Add(88);
scores.Remove(75);
Console.WriteLine(scores.Count);    // 2
Console.WriteLine(scores.Contains(90)); // True`,
      },
      {
        heading: 'Dictionary<TKey, TValue>',
        text: 'A Dictionary maps unique keys to values with very fast lookup.',
        code: `var ages = new Dictionary<string, int>
{
    ["Jack"] = 25,
    ["Mia"] = 30
};
ages["Leo"] = 19;

if (ages.TryGetValue("Mia", out int miaAge))
    Console.WriteLine(miaAge); // 30`,
      },
      {
        heading: 'Other useful collections',
        text: 'HashSet<T> (unique items), Queue<T> (first-in first-out), Stack<T> (last-in first-out).',
        code: `var queue = new Queue<string>();
queue.Enqueue("first");
queue.Enqueue("second");
Console.WriteLine(queue.Dequeue()); // first

var stack = new Stack<int>();
stack.Push(1); stack.Push(2);
Console.WriteLine(stack.Pop());     // 2`,
      },
    ],
    quiz: [
      { q: 'How do you add an item to a List?', options: ['list.Push(x)', 'list.Add(x)', 'list.Insert()', 'list += x'], answer: 1, explain: 'List<T>.Add appends to the end.' },
      { q: 'Dictionary keys must be…', options: ['Strings', 'Unique', 'Sorted', 'Numbers'], answer: 1, explain: 'Each key can appear only once.' },
      { q: 'Which collection is Last-In-First-Out?', options: ['Queue', 'List', 'Stack', 'HashSet'], answer: 2, explain: 'Stack pops the most recently pushed item.' },
    ],
  },
  {
    id: 'exceptions',
    level: 'intermediate',
    title: 'Exception Handling',
    summary: 'Handle errors gracefully with try / catch / finally.',
    minutes: 10,
    animation: 'exceptions',
    sections: [
      {
        heading: 'try / catch',
        text: 'Code that might fail goes in try. If an exception is thrown, control jumps to a matching catch block.',
        code: `try
{
    int x = int.Parse("abc");
}
catch (FormatException ex)
{
    Console.WriteLine($"Bad input: {ex.Message}");
}`,
      },
      {
        heading: 'Exceptions bubble up',
        text: 'If a method does not catch an exception, it travels up the call stack until some caller catches it. If nobody does, the program crashes.',
      },
      {
        heading: 'finally',
        text: 'finally always runs — whether or not an exception happened. Use it for cleanup. The using statement does this for you with disposable resources.',
        code: `try { /* work */ }
finally { Console.WriteLine("Cleanup"); }

using var file = File.OpenRead("data.txt"); // auto-disposed`,
      },
      {
        heading: 'Throwing your own',
        text: 'Use throw to signal invalid situations.',
        code: `static void Withdraw(decimal amount)
{
    if (amount <= 0)
        throw new ArgumentException("Amount must be positive");
}`,
      },
    ],
    quiz: [
      { q: 'Which block always runs?', options: ['try', 'catch', 'finally', 'throw'], answer: 2, explain: 'finally runs whether or not an exception occurred.' },
      { q: 'What happens to an uncaught exception in a method?', options: ['It is ignored', 'It bubbles up to the caller', 'It returns null', 'It retries'], answer: 1, explain: 'Exceptions propagate up the call stack.' },
      { q: 'int.Parse("abc") throws…', options: ['NullReferenceException', 'FormatException', 'IndexOutOfRangeException', 'Nothing'], answer: 1, explain: '"abc" is not a valid number format.' },
    ],
  },

  // ───────────────────────── ADVANCED ─────────────────────────
  {
    id: 'linq',
    level: 'advanced',
    title: 'LINQ',
    summary: 'Query and transform data with Where, Select, OrderBy and friends.',
    minutes: 15,
    animation: 'linq',
    sections: [
      {
        heading: 'What is LINQ?',
        text: 'Language-Integrated Query lets you filter, transform, sort and aggregate any collection with a fluent, readable syntax.',
        code: `int[] nums = { 5, 2, 8, 1, 9, 4 };

var result = nums
    .Where(n => n > 3)      // 5, 8, 9, 4
    .Select(n => n * 10)    // 50, 80, 90, 40
    .OrderBy(n => n);       // 40, 50, 80, 90`,
      },
      {
        heading: 'Lambdas',
        text: 'n => n > 3 is a lambda — a tiny inline function. Left of => are parameters; right is the expression.',
      },
      {
        heading: 'Common operators',
        text: 'Where (filter), Select (map), OrderBy / OrderByDescending, First / FirstOrDefault, Any / All, Count, Sum / Average / Max, GroupBy, Take / Skip, ToList.',
        code: `var people = new List<Person> { /* ... */ };

var adults = people.Where(p => p.Age >= 18).ToList();
bool anyTeen = people.Any(p => p.Age < 20);
double avg = people.Average(p => p.Age);
var byCity = people.GroupBy(p => p.City);`,
      },
      {
        heading: 'Deferred execution',
        text: 'LINQ queries are lazy: they run only when you enumerate them (foreach, ToList, Count…). Call ToList() to capture results immediately.',
      },
    ],
    quiz: [
      { q: 'Which LINQ method filters items?', options: ['Select', 'Where', 'OrderBy', 'Take'], answer: 1, explain: 'Where keeps items matching a condition.' },
      { q: 'Which LINQ method transforms each item?', options: ['Select', 'Where', 'Any', 'GroupBy'], answer: 0, explain: 'Select projects each element into a new form.' },
      { q: 'When does a LINQ query actually execute?', options: ['When declared', 'When enumerated', 'At compile time', 'Never'], answer: 1, explain: 'Deferred execution: it runs when you iterate or call ToList etc.' },
    ],
  },
  {
    id: 'async',
    level: 'advanced',
    title: 'Async & Await',
    summary: 'Write non-blocking code for I/O like web requests and files.',
    minutes: 15,
    animation: 'async',
    sections: [
      {
        heading: 'Why async?',
        text: 'Waiting for the network or disk wastes a thread. async/await lets the thread do other work while waiting, keeping apps responsive and servers scalable.',
      },
      {
        heading: 'async and await',
        text: 'Mark a method async and return Task or Task<T>. await pauses the method (not the thread) until the task completes.',
        code: `static async Task<string> DownloadAsync(string url)
{
    using var http = new HttpClient();
    string html = await http.GetStringAsync(url);
    return html;
}`,
      },
      {
        heading: 'Running tasks in parallel',
        text: 'Start several tasks and await them together with Task.WhenAll — total time is roughly the slowest task, not the sum.',
        code: `Task<string> a = DownloadAsync("https://a.com");
Task<string> b = DownloadAsync("https://b.com");

string[] pages = await Task.WhenAll(a, b);`,
      },
      {
        heading: 'Rules of thumb',
        text: 'Name async methods with the Async suffix. Avoid async void (except event handlers). Don\'t block with .Result or .Wait() — use await all the way up.',
      },
    ],
    quiz: [
      { q: 'What does await do?', options: ['Blocks the thread', 'Pauses the method until the task completes, freeing the thread', 'Starts a new process', 'Cancels a task'], answer: 1, explain: 'await yields control instead of blocking.' },
      { q: 'Return type for an async method returning an int?', options: ['int', 'async int', 'Task<int>', 'Future<int>'], answer: 2, explain: 'Async methods return Task<T>.' },
      { q: 'Two 2-second downloads with Task.WhenAll take about…', options: ['4 seconds', '2 seconds', '1 second', '0 seconds'], answer: 1, explain: 'They run concurrently, so ≈ the slowest one.' },
    ],
  },
  {
    id: 'generics',
    level: 'advanced',
    title: 'Generics',
    summary: 'Write type-safe code that works with any type.',
    minutes: 12,
    animation: 'generics',
    sections: [
      {
        heading: 'Generic methods',
        text: 'A type parameter <T> lets one method work for many types while staying type-safe.',
        code: `static T Max<T>(T a, T b) where T : IComparable<T>
{
    return a.CompareTo(b) > 0 ? a : b;
}

Max(3, 7);          // 7
Max("pear", "fig"); // "pear"`,
      },
      {
        heading: 'Generic classes',
        text: 'List<T> and Dictionary<TKey,TValue> are generic classes. You can write your own.',
        code: `class Box<T>
{
    public T Value { get; }
    public Box(T value) => Value = value;
}

var intBox = new Box<int>(42);
var strBox = new Box<string>("hi");`,
      },
      {
        heading: 'Constraints',
        text: 'where clauses restrict T: where T : class, where T : struct, where T : new(), where T : SomeBase, where T : ISomeInterface.',
      },
    ],
    quiz: [
      { q: 'What does <T> represent?', options: ['A template string', 'A type parameter', 'A tuple', 'A thread'], answer: 1, explain: 'T is a placeholder for a type supplied by the caller.' },
      { q: 'where T : new() means T must…', options: ['Be a new class', 'Have a public parameterless constructor', 'Be nullable', 'Be a struct'], answer: 1, explain: 'The new() constraint requires a parameterless constructor.' },
      { q: 'Main benefit of generics?', options: ['Faster compile', 'Type safety and reuse without casting', 'Smaller files', 'Dynamic typing'], answer: 1, explain: 'Generics give reuse while keeping compile-time type checks.' },
    ],
  },
];

export const getLesson = (id) => LESSONS.find((l) => l.id === id);
