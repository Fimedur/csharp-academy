import { useEffect, useState } from 'react';
import { HashRouter, NavLink, Route, Routes, Link } from 'react-router-dom';
import { ProgressProvider } from './hooks/useProgress';
import Home from './pages/Home';
import Lessons from './pages/Lessons';
import Lesson from './pages/Lesson';
import CheatSheet from './pages/CheatSheet';
import Progress from './pages/Progress';

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('csharp-academy-theme') || 'auto'; } catch { return 'auto'; }
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'auto') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', theme);
    try { localStorage.setItem('csharp-academy-theme', theme); } catch { /* ignore */ }
  }, [theme]);
  return [theme, setTheme];
}

export default function App() {
  const [theme, setTheme] = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const cycle = () => setTheme(theme === 'auto' ? 'dark' : theme === 'dark' ? 'light' : 'auto');

  return (
    <ProgressProvider>
      <HashRouter>
        <header className="topbar">
          <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
            <span className="logo">C#</span> Academy
          </Link>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">☰</button>
          <nav className={menuOpen ? 'open' : ''} onClick={() => setMenuOpen(false)}>
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/lessons">Lessons</NavLink>
            <NavLink to="/cheatsheet">Cheat sheet</NavLink>
            <NavLink to="/progress">Progress</NavLink>
          </nav>
          <button className="theme-btn" onClick={cycle} title={`Theme: ${theme}`}>
            {theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '🌓'}
          </button>
        </header>
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/lesson/:id" element={<Lesson />} />
            <Route path="/cheatsheet" element={<CheatSheet />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <footer className="footer">Built with React · Happy coding, Jack! 💜</footer>
      </HashRouter>
    </ProgressProvider>
  );
}
