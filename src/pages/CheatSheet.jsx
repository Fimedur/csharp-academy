import { useMemo, useState } from 'react';
import { CHEATSHEET } from '../data/cheatsheet';
import CodeBlock from '../components/CodeBlock';

export default function CheatSheet() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CHEATSHEET;
    return CHEATSHEET.map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (it) => it.title.toLowerCase().includes(q) || it.code.toLowerCase().includes(q) || cat.category.toLowerCase().includes(q)
      ),
    })).filter((cat) => cat.items.length);
  }, [query]);

  return (
    <div>
      <h1>C# Cheat Sheet</h1>
      <p className="lead">Quick reference for everyday syntax. Click Copy on any snippet.</p>
      <input
        className="search"
        placeholder="Search… e.g. dictionary, switch, async"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="cat-nav">
        {filtered.map((c) => <a key={c.category} href={`#cat-${c.category}`} onClick={(e) => { e.preventDefault(); document.getElementById(`cat-${c.category}`)?.scrollIntoView({ behavior: 'smooth' }); }}>{c.category}</a>)}
      </div>
      {filtered.length === 0 && <p className="muted">No matches.</p>}
      {filtered.map((cat) => (
        <section key={cat.category} id={`cat-${cat.category}`} className="cheat-cat">
          <h2>{cat.category}</h2>
          <div className="cheat-grid">
            {cat.items.map((it) => (
              <div key={it.title} className="cheat-card">
                <h4>{it.title}</h4>
                <CodeBlock code={it.code} showLines={false} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
