export function Terminal({ lines, small = false }) {
  return (
    <div className={`terminal ${small ? 'small' : ''}`}>
      <div className="term-bar">
        <span className="tb r" /><span className="tb y" /><span className="tb g" />
        <span className="term-title">Console</span>
      </div>
      <div className="term-body">
        {lines.length === 0 && <span className="term-cursor">_</span>}
        {lines.map((l, i) => (
          <div key={i} className={`term-line ${i === lines.length - 1 ? 'new' : ''}`}>
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}
