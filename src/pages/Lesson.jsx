import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { LESSONS, getLesson } from '../data/lessons';
import { ANIMATIONS } from '../animations';
import { useProgress } from '../hooks/useProgress';
import CodeBlock from '../components/CodeBlock';
import AnimationPlayer from '../components/AnimationPlayer';
import Quiz from '../components/Quiz';

const TABS = [
  { id: 'learn', label: '📖 Learn' },
  { id: 'animate', label: '🎬 Animation' },
  { id: 'quiz', label: '🧠 Quiz' },
];

export default function Lesson() {
  const { id } = useParams();
  const lesson = getLesson(id);
  const { progress, markComplete, visit } = useProgress();
  const [tab, setTab] = useState('learn');

  useEffect(() => {
    if (lesson) visit(lesson.id);
    setTab('learn');
    window.scrollTo(0, 0);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!lesson) {
    return <div><h1>Lesson not found</h1><Link to="/lessons">Back to lessons</Link></div>;
  }

  const index = LESSONS.indexOf(lesson);
  const prev = LESSONS[index - 1];
  const next = LESSONS[index + 1];
  const done = !!progress.completed[lesson.id];

  return (
    <div className="lesson">
      <div className="crumbs">
        <Link to="/lessons">Lessons</Link> / <Link to={`/lessons?level=${lesson.level}`}>{lesson.level}</Link> / {lesson.title}
      </div>
      <header className="lesson-head">
        <div>
          <span className={`lvl-tag ${lesson.level}`}>{lesson.level}</span>
          <h1>{lesson.title}</h1>
          <p className="lead">{lesson.summary}</p>
        </div>
        <button className={`btn ${done ? 'success' : 'ghost'}`} onClick={() => markComplete(lesson.id, !done)}>
          {done ? '✓ Completed' : 'Mark complete'}
        </button>
      </header>

      <div className="tabs sticky">
        {TABS.map((t) => (
          <button key={t.id} className={`tab ${tab === t.id ? 'on' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      <div className="tab-panel" key={tab}>
        {tab === 'learn' && (
          <>
            {lesson.sections.map((s) => (
              <section key={s.heading} className="lesson-section">
                <h2>{s.heading}</h2>
                <p>{s.text}</p>
                {s.code && <CodeBlock code={s.code} />}
              </section>
            ))}
            <div className="cta-row">
              <button className="btn" onClick={() => setTab('animate')}>Watch it animated →</button>
            </div>
          </>
        )}
        {tab === 'animate' && (
          <>
            <p className="muted">Press ▶ Play or step through manually. The highlighted line is the one being executed.</p>
            <AnimationPlayer key={lesson.id} anim={ANIMATIONS[lesson.animation]} />
            <div className="cta-row">
              <button className="btn" onClick={() => setTab('quiz')}>Test yourself →</button>
            </div>
          </>
        )}
        {tab === 'quiz' && <Quiz key={lesson.id} lessonId={lesson.id} questions={lesson.quiz} />}
      </div>

      <nav className="pager">
        {prev ? <Link to={`/lesson/${prev.id}`} className="pager-link">← {prev.title}</Link> : <span />}
        {next ? <Link to={`/lesson/${next.id}`} className="pager-link right">{next.title} →</Link> : <Link to="/progress" className="pager-link right">View progress →</Link>}
      </nav>
    </div>
  );
}
