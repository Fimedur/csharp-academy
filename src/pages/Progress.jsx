import { Link } from 'react-router-dom';
import { LESSONS, LEVELS } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';

export default function Progress() {
  const { progress, reset } = useProgress();
  const done = LESSONS.filter((l) => progress.completed[l.id]).length;
  const pct = Math.round((done / LESSONS.length) * 100);
  const quizzes = Object.values(progress.quiz);
  const avg = quizzes.length ? Math.round((quizzes.reduce((s, q) => s + q.best / q.total, 0) / quizzes.length) * 100) : 0;

  return (
    <div>
      <h1>Your progress</h1>
      <div className="stats-row">
        <div className="big-stat">
          <div className="score-ring pass" style={{ '--p': pct }}><span>{pct}%</span></div>
          <div><b>{done}/{LESSONS.length}</b><small>lessons complete</small></div>
        </div>
        <div className="big-stat"><div className="emoji">🧠</div><div><b>{quizzes.length}</b><small>quizzes taken</small></div></div>
        <div className="big-stat"><div className="emoji">🎯</div><div><b>{avg}%</b><small>avg best quiz score</small></div></div>
      </div>

      {LEVELS.map((lv) => (
        <section key={lv.id} className="prog-level">
          <h2><span className={`lvl-tag ${lv.id}`}>{lv.name}</span></h2>
          <div className="prog-list">
            {LESSONS.filter((l) => l.level === lv.id).map((l) => {
              const q = progress.quiz[l.id];
              const isDone = progress.completed[l.id];
              return (
                <Link key={l.id} to={`/lesson/${l.id}`} className={`prog-item ${isDone ? 'done' : ''}`}>
                  <span className="tick">{isDone ? '✓' : '○'}</span>
                  <span className="pi-title">{l.title}</span>
                  <span className="muted">{q ? `Quiz best ${q.best}/${q.total}` : 'Quiz not taken'}</span>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <button
        className="btn danger"
        onClick={() => { if (window.confirm('Reset all progress? This cannot be undone.')) reset(); }}
      >
        Reset progress
      </button>
    </div>
  );
}
