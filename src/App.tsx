import { useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import fullLogo from './assets/logo-full.png';
import monogram from './assets/logo-monogram.png';
import cookiePhoto from './assets/orange-cookies.png';
import trayPhoto from './assets/baking-tray.png';

type Flavor = { id:string; name:string; note:string; price:number; accent:string; photo?:string };
type Cart = Record<string, number>;

const flavors: Flavor[] = [
  { id:'orange', name:'Brazilian Orange', note:'Bright citrus, buttery crumb, soft sugar finish.', price:3.75, accent:'#F0A15F', photo:cookiePhoto },
  { id:'lime', name:'Lime Sugar', note:'Fresh lime zest with a delicate sweet-tart finish.', price:3.75, accent:'#BFD870' },
  { id:'coconut', name:'Toasted Coconut', note:'Buttery cookie with golden toasted coconut.', price:4.00, accent:'#E2C29F' },
  { id:'choc-orange', name:'Chocolate Orange', note:'Deep cocoa with a bright orange lift.', price:4.25, accent:'#8A5B3E' },
  { id:'guava', name:'Guava Glow', note:'Tropical guava-inspired sweetness with a soft center.', price:4.25, accent:'#ECA0A8' },
  { id:'nut', name:'Brazil Nut Crunch', note:'Rich nutty flavor, crisp edges, tender center.', price:4.50, accent:'#C99B6A' },
];

function Modal({title, children, onClose}:{title:string; children:React.ReactNode; onClose:()=>void}) {
  return <div className="modal-backdrop" role="dialog" aria-modal="true"><div className="modal"><button className="modal-close" onClick={onClose} aria-label="Close">×</button><div className="modal-icon">✓</div><h3>{title}</h3><div>{children}</div><button className="btn btn-primary" onClick={onClose}>Got it</button></div></div>
}

function Header({count}:{count:number}) {
  const [open,setOpen]=useState(false);
  return <header className="site-header"><Link to="/" className="brand"><img src={monogram} alt="Endless & Joy monogram"/><span>Endless & Joy</span></Link><button className="menu-btn" onClick={()=>setOpen(!open)}>☰</button><nav className={open?'open':''} onClick={()=>setOpen(false)}>
    <NavLink to="/shop">Shop</NavLink><NavLink to="/about">About</NavLink><NavLink to="/why-us">Why Us</NavLink><NavLink to="/faq">FAQ</NavLink><NavLink to="/contact">Contact</NavLink><NavLink className="cart-pill" to="/shop">Bag <b>{count}</b></NavLink>
  </nav></header>
}

function Home(){return <>
  <section className="hero"><div className="hero-copy"><span className="eyebrow">Small-batch • Southeast Calgary</span><h1>Life’s too short for <em>boring cookies.</em></h1><p>Handcrafted artisan cookies inspired by Brazilian flavors, made fresh to order with bold combinations and genuine care.</p><div className="hero-actions"><Link className="btn btn-primary" to="/shop">Build your box</Link><Link className="btn btn-secondary" to="/why-us">Why Endless & Joy</Link></div><div className="trust-row"><span>✦ Made to order</span><span>✦ Bold flavors</span><span>✦ Local pickup & delivery</span></div></div><div className="hero-media"><img src={trayPhoto} alt="Fresh orange cookies arranged on a baking tray"/><div className="floating-card"><b>Fresh batch energy</b><span>Made with creativity, integrity & happiness.</span></div></div></section>
  <section className="section"><div className="section-heading"><span className="eyebrow">Signature flavors</span><h2>Choose your next favorite.</h2><p>Cookie boxes are built by flavor, so everyone gets exactly what they crave.</p></div><div className="flavor-preview">{flavors.slice(0,3).map(f=><article className="mini-card" key={f.id}><div className="flavor-art" style={{background:`radial-gradient(circle at 35% 30%, #fff7e5 0 18%, ${f.accent} 19% 55%, #b86a2a 56% 100%)`}}><span>• • •</span></div><h3>{f.name}</h3><p>{f.note}</p></article>)}</div><div className="center"><Link className="text-link" to="/shop">See all flavors →</Link></div></section>
  <section className="story-strip"><img src={cookiePhoto} alt="Stack of flower-shaped cookies"/><div><span className="eyebrow">A cookie with a story</span><h2>Culture, comfort, and a little surprise.</h2><p>Our recipes are rooted in family tradition and shaped by Brazilian-inspired flavors like orange, lime, coconut, chocolate, and nuts.</p><Link className="btn btn-light" to="/about">Meet the owner</Link></div></section>
</>}

function Shop({cart,setCart}:{cart:Cart;setCart:(c:Cart)=>void}){
  const nav=useNavigate();
  const totalQty=Object.values(cart).reduce((a,b)=>a+b,0);
  const subtotal=useMemo(()=>flavors.reduce((s,f)=>s+(cart[f.id]||0)*f.price,0),[cart]);
  const change=(id:string,delta:number)=>setCart({...cart,[id]:Math.max(0,(cart[id]||0)+delta)});
  return <main className="page"><div className="page-heading"><span className="eyebrow">Build your box</span><h1>Pick your cookies by picture.</h1><p>Tap + or − to choose how many of each flavor you want. Mix and match freely.</p></div>
    <div className="shop-layout"><div className="product-grid">{flavors.map((f,i)=><article className="product-card" key={f.id}><div className="product-photo">{i===0?<img src={cookiePhoto} alt={f.name}/>:<div className="cookie-visual" style={{background:`radial-gradient(circle at 42% 38%, #fff1cf 0 12%, ${f.accent} 13% 68%, #A95B2A 69% 100%)`}}><i/><i/><i/><i/><i/></div>}</div><div className="product-body"><div><h3>{f.name}</h3><p>{f.note}</p></div><div className="product-bottom"><b>${f.price.toFixed(2)}</b><div className="stepper"><button onClick={()=>change(f.id,-1)} aria-label={`Remove one ${f.name}`}>−</button><span>{cart[f.id]||0}</span><button onClick={()=>change(f.id,1)} aria-label={`Add one ${f.name}`}>+</button></div></div></div></article>)}</div>
    <aside className="order-summary"><span className="eyebrow">Your box</span><h2>{totalQty ? `${totalQty} cookie${totalQty>1?'s':''}`:'Start selecting'}</h2>{flavors.filter(f=>cart[f.id]).map(f=><div className="summary-line" key={f.id}><span>{cart[f.id]} × {f.name}</span><b>${((cart[f.id]||0)*f.price).toFixed(2)}</b></div>)}<hr/><div className="summary-total"><span>Subtotal</span><b>${subtotal.toFixed(2)}</b></div><button className="btn btn-primary full" disabled={!totalQty} onClick={()=>nav('/checkout')}>Continue to checkout</button><small>Payment and delivery are simulated for this front-end prototype.</small></aside></div>
  </main>
}

function Checkout({cart,setCart}:{cart:Cart;setCart:(c:Cart)=>void}){
  const [payment,setPayment]=useState<'card'|'etransfer'>('card'); const [fulfillment,setFulfillment]=useState<'pickup'|'delivery'>('pickup'); const [modal,setModal]=useState(false);
  const subtotal=flavors.reduce((s,f)=>s+(cart[f.id]||0)*f.price,0); const delivery=fulfillment==='delivery'?7:0;
  function placeOrder(e:React.FormEvent){e.preventDefault(); setModal(true)}
  return <main className="page"><div className="page-heading"><span className="eyebrow">Checkout</span><h1>Simple, clear, almost done.</h1></div><form className="checkout-grid" onSubmit={placeOrder}>
    <div className="checkout-main"><section className="form-card"><div className="step-number">1</div><h2>Your details</h2><div className="field-grid"><label>Full name<input required placeholder="Jane Smith"/></label><label>Email<input required type="email" placeholder="jane@example.com"/></label><label>Phone<input required placeholder="(403) 555-0188"/></label></div></section>
    <section className="form-card"><div className="step-number">2</div><h2>Pickup or delivery</h2><div className="choice-grid"><button type="button" className={fulfillment==='pickup'?'choice active':'choice'} onClick={()=>setFulfillment('pickup')}><b>Pickup</b><span>Southeast Calgary • Free</span></button><button type="button" className={fulfillment==='delivery'?'choice active':'choice'} onClick={()=>setFulfillment('delivery')}><b>Delivery</b><span>Local delivery • $7</span></button></div>{fulfillment==='delivery'&&<div className="field-grid single"><label>Delivery address<input required placeholder="Street address, Calgary, AB"/></label><label>Delivery notes<textarea placeholder="Buzz code, leave-at-door instructions, etc."/></label></div>}</section>
    <section className="form-card"><div className="step-number">3</div><h2>Payment method</h2><div className="choice-grid"><button type="button" className={payment==='card'?'choice active':'choice'} onClick={()=>setPayment('card')}><b>Credit card</b><span>Visa, Mastercard, Amex</span></button><button type="button" className={payment==='etransfer'?'choice active':'choice'} onClick={()=>setPayment('etransfer')}><b>Interac e-Transfer</b><span>Instructions after order</span></button></div>{payment==='card'&&<div className="field-grid"><label>Card number<input required placeholder="4242 4242 4242 4242"/></label><label>Expiry<input required placeholder="MM / YY"/></label><label>CVV<input required placeholder="123"/></label></div>}</section></div>
    <aside className="order-summary"><span className="eyebrow">Order summary</span>{flavors.filter(f=>cart[f.id]).map(f=><div className="summary-line" key={f.id}><span>{cart[f.id]} × {f.name}</span><b>${((cart[f.id]||0)*f.price).toFixed(2)}</b></div>)}<hr/><div className="summary-line"><span>Delivery</span><b>{delivery?'$7.00':'Free'}</b></div><div className="summary-total"><span>Total</span><b>${(subtotal+delivery).toFixed(2)}</b></div><button className="btn btn-primary full" disabled={!subtotal}>Place order</button><small>No real payment is processed in this prototype.</small></aside>
  </form>{modal&&<Modal title="Your order is simulated!" onClose={()=>{setModal(false);setCart({})}}><p>Thanks! In the real version, this is where the order would be sent to the bakery and payment would be processed. For now, no charge was made.</p></Modal>}</main>
}

function About(){return <main className="page"><div className="split-page"><div><span className="eyebrow">About the owner</span><h1>Built with heart, heritage, and a maker’s mindset.</h1><p className="lead">Endless & Joy began from a love of cooking, family recipes, and the belief that food can connect people across cultures.</p><p>The owner brings a Brazilian cultural perspective to a Calgary home bakery, combining years of home cooking and focused bread-and-cookie practice with the precision and problem-solving mindset of a software-development career.</p><p>The result is a small-batch cookie business centered on bold flavor combinations, consistent quality, and the kind of personal care that is hard to replicate at scale.</p><div className="quote-card">“Food is one of the most powerful ways to connect people across cultures.”</div></div><img className="about-img" src={trayPhoto} alt="Tray of freshly prepared cookies"/></div></main>}

function WhyUs(){return <main className="page"><div className="page-heading"><span className="eyebrow">Why Endless & Joy</span><h1>Not just another cookie box.</h1><p>We built the experience around what mass-produced cookies cannot offer.</p></div><div className="why-grid">{[
 ['01','Bold, culturally inspired flavors','Orange, lime, coconut, chocolate, nuts and other combinations designed to be memorable—not ordinary.'],
 ['02','Made fresh to order','Small-batch production means your cookies are baked for your order instead of waiting on a shelf.'],
 ['03','A personal local alternative','A Calgary-based home bakery with a story, a cultural point of view, and genuine care in every order.'],
 ['04','Built for gifting','Thoughtful flavors and joyful presentation make the box feel special enough for birthdays, celebrations, or just because.'],
 ['05','Choice without complexity','Pick your flavors and quantities visually, then choose pickup or delivery in a few simple steps.'],
 ['06','Creativity, integrity, happiness','Those three values guide the recipes, quality standards, and customer experience.']
 ].map(([n,t,d])=><article className="why-card" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></main>}

const faq=[
 ['Where do you deliver?','This prototype assumes local delivery in southeast Calgary, with pickup also available. Exact delivery zones and fees can be finalized when the backend and ordering rules are implemented.'],
 ['Are the cookies made fresh?','Yes. Endless & Joy is designed around a made-to-order, small-batch model.'],
 ['Can I mix flavors in one box?','Absolutely. The shop lets you choose each flavor and the exact quantity you want.'],
 ['Do you offer custom toppings?','Customization is part of the brand direction. The first front-end version focuses on flavor quantities; topping options can be added next.'],
 ['How do I pay?','The prototype offers credit card and Interac e-Transfer. No real payment is processed yet.'],
 ['Do you handle allergies?','A production version should display ingredient and allergen information for every flavor before checkout. The current prototype is not a substitute for final food labeling.'],
 ['Can I order for gifts or celebrations?','Yes. The brand is designed for everyday treats and gifting. Gift notes and scheduled delivery can be added as the ordering system evolves.']
];
function FAQ(){const [open,setOpen]=useState<number|null>(0); return <main className="page narrow"><div className="page-heading"><span className="eyebrow">FAQ</span><h1>Questions, answered.</h1></div><div className="faq-list">{faq.map(([q,a],i)=><div className="faq-item" key={q}><button onClick={()=>setOpen(open===i?null:i)}><span>{q}</span><b>{open===i?'−':'+'}</b></button>{open===i&&<p>{a}</p>}</div>)}</div></main>}

function Contact(){const [modal,setModal]=useState(false);return <main className="page"><div className="contact-grid"><div><span className="eyebrow">Contact us</span><h1>Questions? Cravings? Say hello.</h1><p className="lead">We’d love to hear from you. The contact details below are placeholders for the prototype.</p><div className="contact-card"><b>Phone</b><span>(403) 555-0142</span><b>Email</b><span>hello@endlessandjoy.example</span><b>Service area</b><span>Southeast Calgary, Alberta</span></div></div><form className="form-card contact-form" onSubmit={(e)=>{e.preventDefault();setModal(true)}}><h2>Send a message</h2><label>Name<input required/></label><label>Email<input required type="email"/></label><label>Subject<input required/></label><label>Message<textarea required rows={6}/></label><button className="btn btn-primary">Send message</button></form></div>{modal&&<Modal title="Message simulated" onClose={()=>setModal(false)}><p>Your message looks good. In the backend version, it would be saved or sent to the bakery inbox. Nothing was actually sent.</p></Modal>}</main>}

function Footer(){return <footer><div className="footer-brand"><img src={monogram} alt="Endless & Joy"/><div><b>Endless & Joy</b><span>Artisan cookies • Southeast Calgary</span></div></div><div className="footer-links"><Link to="/shop">Shop</Link><Link to="/about">About</Link><Link to="/faq">FAQ</Link><Link to="/contact">Contact</Link></div><p>Life’s too short for boring cookies.</p></footer>}

export default function App(){const [cart,setCart]=useState<Cart>({}); const count=Object.values(cart).reduce((a,b)=>a+b,0); return <div className="app"><Header count={count}/><Routes><Route path="/" element={<Home/>}/><Route path="/shop" element={<Shop cart={cart} setCart={setCart}/>}/><Route path="/checkout" element={<Checkout cart={cart} setCart={setCart}/>}/><Route path="/about" element={<About/>}/><Route path="/why-us" element={<WhyUs/>}/><Route path="/faq" element={<FAQ/>}/><Route path="/contact" element={<Contact/>}/></Routes><Footer/></div>}
