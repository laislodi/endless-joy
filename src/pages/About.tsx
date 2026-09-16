import trayPhoto from '../assets/baking-tray.png';

export function About() {
  return (
    <main className="page">
      <div className="split-page">
        <div>
          <span className="eyebrow">About the owner</span>
          <h1>Built with heart, heritage, and a maker’s mindset.</h1>
          <p className="lead">
            Endless & Joy began from a love of cooking, family recipes, and the belief that food can
            connect people across cultures.
          </p>
          <p>
            The owner brings a Brazilian cultural perspective to a Calgary home bakery, combining
            years of home cooking and focused bread-and-cookie practice with the precision and
            problem-solving mindset of a software-development career.
          </p>
          <p>
            The result is a small-batch cookie business centered on bold flavor combinations,
            consistent quality, and the kind of personal care that is hard to replicate at scale.
          </p>
          <div className="quote-card">
            “Food is one of the most powerful ways to connect people across cultures.”
          </div>
        </div>
        <img className="about-img" src={trayPhoto} alt="Tray of freshly prepared cookies" />
      </div>
    </main>
  );
}
