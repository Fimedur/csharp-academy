import { Link, useSearchParams } from 'react-router-dom';
import { LESSONS, LEVELS } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';

export default function Lessons() {
  const [params, setParams] = useSearchParams();
  const level = params.get('level') || 'all';
  const { progress } = useProgress();

  const shown = level === 'all' ? LESSONS : LESSONS.filter((l) => l.level === level);

  return (
    <div>
      <h1>Lessons</h1>
      <div className="tabs">
        {[{ id: 'all', name: 'All' }, ...LEVELS].map((lv) => (
          <button
            key={lv.id}
            className={`tab ${level === lv.id ? 'on' : ''}`}
            onClick={() => setParams(lv.id === 'all' ? {} : { level: lv.id })}
          >
            {lv.name}
          </button>
        ))}
      </div>
      <div className="lesson-grid">
        {shown.map((l) => {
          const n = LESSONS.indexOf(l) + 1;
          const done = progress.completed[l.id];
          const q = progress.quiz[l.id];
          return (
            <Link key={l.id} to={`/lesson/${l.id}`} className={`lesson-card ${done ? 'done' : ''}`}>
              <div className="lc-top">
                <span className="lesson-num">{String(n).padStart(2, '0')}</span>
                <span className={`lvl-tag ${l.level}`}>{l.level}</span>
              </div>
              <h3>{l.title}</h3>
              <p>{l.summary}</p>
              <div className="lc-foot">
                <span className="muted">⏱ {l.minutes} min · 🎬 animation · 🧠 {l.quiz.length} Qs</span>
                {done ? <span className="check">✓ Done</span> : q ? <span className="muted">Quiz {q.best}/{q.total}</span> : null}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
