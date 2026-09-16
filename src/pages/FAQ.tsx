import { useState } from 'react';
import { faq } from '../data/faq';

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="page narrow">
      <div className="page-heading">
        <span className="eyebrow">FAQ</span>
        <h1>Questions, answered.</h1>
      </div>
      <div className="faq-list">
        {faq.map(([q, a], i) => (
          <div className="faq-item" key={q}>
            <button onClick={() => setOpen(open === i ? null : i)}>
              <span>{q}</span>
              <b>{open === i ? '−' : '+'}</b>
            </button>
            {open === i && <p>{a}</p>}
          </div>
        ))}
      </div>
    </main>
  );
}
