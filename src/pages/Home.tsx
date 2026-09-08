import { Link } from 'react-router-dom';
import trayPhoto from '../assets/baking-tray.png';
import cookiePhoto from '../assets/orange-cookies.png';
import { flavors } from '../data/flavors';

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Small-batch • Southeast Calgary</span>
          <h1>Life’s too short for <em>boring cookies.</em></h1>
          <p>Handcrafted artisan cookies inspired by Brazilian flavors, made fresh to order with bold combinations and genuine care.</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/shop">Build your box</Link>
            <Link className="btn btn-secondary" to="/why-us">Why Endless & Joy</Link>
          </div>
          <div className="trust-row">
            <span>✦ Made to order</span>
            <span>✦ Bold flavors</span>
            <span>✦ Local pickup & delivery</span>
          </div>
        </div>
        <div className="hero-media">
          <img src={trayPhoto} alt="Fresh orange cookies arranged on a baking tray" />
          <div className="floating-card">
            <b>Fresh batch energy</b>
            <span>Made with creativity, integrity & happiness.</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">Signature flavors</span>
          <h2>Choose your next favorite.</h2>
          <p>Cookie boxes are built by flavor, so everyone gets exactly what they crave.</p>
        </div>
        <div className="flavor-preview">
          {flavors.slice(0, 3).map((f) => (
            <article className="mini-card" key={f.id}>
              <div
                className="flavor-art"
                style={{ background: `radial-gradient(circle at 35% 30%, #fff7e5 0 18%, ${f.accent} 19% 55%, #b86a2a 56% 100%)` }}
              >
                <span>• • •</span>
              </div>
              <h3>{f.name}</h3>
              <p>{f.note}</p>
            </article>
          ))}
        </div>
        <div className="center">
          <Link className="text-link" to="/shop">See all flavors →</Link>
        </div>
      </section>

      <section className="story-strip">
        <img src={cookiePhoto} alt="Stack of flower-shaped cookies" />
        <div>
          <span className="eyebrow">A cookie with a story</span>
          <h2>Culture, comfort, and a little surprise.</h2>
          <p>Our recipes are rooted in family tradition and shaped by Brazilian-inspired flavors like orange, lime, coconut, chocolate, and nuts.</p>
          <Link className="btn btn-light" to="/about">Meet the owner</Link>
        </div>
      </section>
    </>
  );
}
