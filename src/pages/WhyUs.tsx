import { whyUsItems } from '../data/whyUs';

export function WhyUs() {
  return (
    <main className="page">
      <div className="page-heading">
        <span className="eyebrow">Why Endless & Joy</span>
        <h1>Not just another cookie box.</h1>
        <p>We built the experience around what mass-produced cookies cannot offer.</p>
      </div>
      <div className="why-grid">
        {whyUsItems.map(([n, t, d]) => (
          <article className="why-card" key={n}>
            <span>{n}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
