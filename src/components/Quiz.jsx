import { useState } from 'react';
import { useProgress } from '../hooks/useProgress';

export default function Quiz({ lessonId, questions }) {
  const { progress, saveQuiz } = useProgress();
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[idx];
  const best = progress.quiz[lessonId];

  const choose = (i) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (idx + 1 < questions.length) {
      setIdx(idx + 1);
      setPicked(null);
    } else {
      setFinished(true);
      saveQuiz(lessonId, score, questions.length);
    }
  };

  const restart = () => {
    setIdx(0); setPicked(null); setScore(0); setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const passed = pct >= 70;
    return (
      <div className="quiz result-card">
        <div className={`score-ring ${passed ? 'pass' : 'fail'}`} style={{ '--p': pct }}>
          <span>{pct}%</span>
        </div>
        <h3>{passed ? '🎉 Great job!' : 'Almost there!'}</h3>
        <p>You got {score} of {questions.length} correct.{passed ? ' Lesson marked as complete.' : ' Score 70% or more to complete the lesson.'}</p>
        <button className="btn" onClick={restart}>Try again</button>
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz-head">
        <span>Question {idx + 1} of {questions.length}</span>
        {best && <span className="muted">Best: {best.best}/{best.total}</span>}
      </div>
      <div className="quiz-bar"><div style={{ width: `${(idx / questions.length) * 100}%` }} /></div>
      <h3 className="quiz-q">{q.q}</h3>
      <div className="quiz-options">
        {q.options.map((opt, i) => {
          let cls = '';
          if (picked !== null) {
            if (i === q.answer) cls = 'correct';
            else if (i === picked) cls = 'wrong';
            else cls = 'dim';
          }
          return (
            <button key={i} className={`quiz-opt ${cls}`} onClick={() => choose(i)}>
              <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
              <code>{opt}</code>
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className={`quiz-explain ${picked === q.answer ? 'ok' : 'no'}`}>
          <strong>{picked === q.answer ? 'Correct!' : 'Not quite.'}</strong> {q.explain}
          <button className="btn" onClick={next}>{idx + 1 < questions.length ? 'Next →' : 'See result'}</button>
        </div>
      )}
    </div>
  );
}
