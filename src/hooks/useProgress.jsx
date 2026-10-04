import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const KEY = 'csharp-academy-progress-v1';
const empty = { completed: {}, quiz: {}, lastLesson: null };

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(progress));
    } catch {
      /* storage unavailable — progress lives in memory only */
    }
  }, [progress]);

  const markComplete = useCallback((id, done = true) => {
    setProgress((p) => ({ ...p, completed: { ...p.completed, [id]: done } }));
  }, []);

  const saveQuiz = useCallback((id, score, total) => {
    setProgress((p) => {
      const prev = p.quiz[id];
      const best = prev ? Math.max(prev.best, score) : score;
      return {
        ...p,
        quiz: { ...p.quiz, [id]: { best, last: score, total } },
        // Passing the quiz (≥ 70%) also completes the lesson
        completed: score / total >= 0.7 ? { ...p.completed, [id]: true } : p.completed,
      };
    });
  }, []);

  const visit = useCallback((id) => {
    setProgress((p) => (p.lastLesson === id ? p : { ...p, lastLesson: id }));
  }, []);

  const reset = useCallback(() => setProgress(empty), []);

  return (
    <ProgressContext.Provider value={{ progress, markComplete, saveQuiz, visit, reset }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
