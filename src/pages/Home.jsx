import { Link } from 'react-router-dom';
import { LESSONS, LEVELS } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';
import CodeBlock from '../components/CodeBlock';

export default function Home() {
  const { progress } = useProgress();
  const doneCount = LESSONS.filter((l) => progress.completed[l.id]).length;
  const next = LESSONS.find((l) => !progress.completed[l.id]) || LESSONS[0];
  const resume = progress.lastLesson ? LESSONS.find((l) => l.id === progress.lastLesson) : null;

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <span className="pill">Free · Interactive · All levels</span>
          <h1>Learn <span className="grad">C#</span> by watching code come alive.</h1>
          <p>Step-by-step animated lessons, instant quizzes and a handy cheat sheet — from your first <code>Console.WriteLine</code> to <code>async</code>/<code>await</code>.</p>
          <div className="hero-cta">
            <Link className="btn big" to={`/lesson/${(resume || next).id}`}>
              {doneCount === 0 && !resume ? 'Start learning →' : `Continue: ${(resume || next).title} →`}
            </Link>
            <Link className="btn ghost big" to="/cheatsheet">Cheat sheet</Link>
          </div>
          {doneCount > 0 && <p className="muted">{doneCount} of {LESSONS.length} lessons completed</p>}
        </div>
        <div className="hero-code">
          <CodeBlock compact code={`var learner = new Learner("You");

foreach (var lesson in Course.Lessons)
{
    learner.Watch(lesson.Animation);
    learner.Take(lesson.Quiz);
}

Console.WriteLine("C# mastered! 🚀");`} />
        </div>
      </section>

      <section className="features">
        {[
          ['🎬', 'Animated topics', 'Watch variables, loops, call stacks and LINQ pipelines move step by step.'],
          ['🧠', 'Quizzes', 'Check your understanding after every lesson with instant feedback.'],
          ['📈', 'Progress tracking', 'Your progress is saved in this browser automatically.'],
          ['📋', 'Cheat sheet', 'A searchable quick reference for everyday C# syntax.'],
        ].map(([icon, t, d]) => (
          <div key={t} className="feature"><div className="f-icon">{icon}</div><h3>{t}</h3><p>{d}</p></div>
        ))}
      </section>

      <section>
        <h2>Learning paths</h2>
        <div className="levels">
          {LEVELS.map((lv) => {
            const ls = LESSONS.filter((l) => l.level === lv.id);
            const done = ls.filter((l) => progress.completed[l.id]).length;
            return (
              <Link key={lv.id} to={`/lessons?level=${lv.id}`} className={`level-card ${lv.id}`}>
                <div className="lc-top"><span className={`lvl-tag ${lv.id}`}>{lv.name}</span><span className="muted">{ls.length} lessons</span></div>
                <p>{lv.blurb}</p>
                <div className="bar"><div style={{ width: `${(done / ls.length) * 100}%` }} /></div>
                <small className="muted">{done}/{ls.length} complete</small>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
