import { useState } from 'react';
import type { FormEvent } from 'react';
import { Modal } from '../components/Modal';
import { flavors } from '../data/flavors';
import type { Cart } from '../types';

type CheckoutProps = {
  cart: Cart;
  setCart: (cart: Cart) => void;
};

export function Checkout({ cart, setCart }: CheckoutProps) {
  const [payment, setPayment] = useState<'card' | 'etransfer'>('card');
  const [fulfillment, setFulfillment] = useState<'pickup' | 'delivery'>('pickup');
  const [modal, setModal] = useState(false);

  const subtotal = flavors.reduce((s, f) => s + (cart[f.id] || 0) * f.price, 0);
  const delivery = fulfillment === 'delivery' ? 7 : 0;

  function placeOrder(e: FormEvent) {
    e.preventDefault();
    setModal(true);
  }

  return (
    <main className="page">
      <div className="page-heading">
        <span className="eyebrow">Checkout</span>
        <h1>Simple, clear, almost done.</h1>
      </div>
      <form className="checkout-grid" onSubmit={placeOrder}>
        <div className="checkout-main">
          <section className="form-card">
            <div className="step-number">1</div>
            <h2>Your details</h2>
            <div className="field-grid">
              <label>
                Full name
                <input required placeholder="Jane Smith" />
              </label>
              <label>
                Email
                <input required type="email" placeholder="jane@example.com" />
              </label>
              <label>
                Phone
                <input required placeholder="(403) 555-0188" />
              </label>
            </div>
          </section>

          <section className="form-card">
            <div className="step-number">2</div>
            <h2>Pickup or delivery</h2>
            <div className="choice-grid">
              <button
                type="button"
                className={fulfillment === 'pickup' ? 'choice active' : 'choice'}
                onClick={() => setFulfillment('pickup')}
              >
                <b>Pickup</b>
                <span>Southeast Calgary • Free</span>
              </button>
              <button
                type="button"
                className={fulfillment === 'delivery' ? 'choice active' : 'choice'}
                onClick={() => setFulfillment('delivery')}
              >
                <b>Delivery</b>
                <span>Local delivery • $7</span>
              </button>
            </div>
            {fulfillment === 'delivery' && (
              <div className="field-grid single">
                <label>
                  Delivery address
                  <input required placeholder="Street address, Calgary, AB" />
                </label>
                <label>
                  Delivery notes
                  <textarea placeholder="Buzz code, leave-at-door instructions, etc." />
                </label>
              </div>
            )}
          </section>

          <section className="form-card">
            <div className="step-number">3</div>
            <h2>Payment method</h2>
            <div className="choice-grid">
              <button
                type="button"
                className={payment === 'card' ? 'choice active' : 'choice'}
                onClick={() => setPayment('card')}
              >
                <b>Credit card</b>
                <span>Visa, Mastercard, Amex</span>
              </button>
              <button
                type="button"
                className={payment === 'etransfer' ? 'choice active' : 'choice'}
                onClick={() => setPayment('etransfer')}
              >
                <b>Interac e-Transfer</b>
                <span>Instructions after order</span>
              </button>
            </div>
            {payment === 'card' && (
              <div className="field-grid">
                <label>
                  Card number
                  <input required placeholder="4242 4242 4242 4242" />
                </label>
                <label>
                  Expiry
                  <input required placeholder="MM / YY" />
                </label>
                <label>
                  CVV
                  <input required placeholder="123" />
                </label>
              </div>
            )}
          </section>
        </div>

        <aside className="order-summary">
          <span className="eyebrow">Order summary</span>
          {flavors
            .filter((f) => cart[f.id])
            .map((f) => (
              <div className="summary-line" key={f.id}>
                <span>
                  {cart[f.id]} × {f.name}
                </span>
                <b>${((cart[f.id] || 0) * f.price).toFixed(2)}</b>
              </div>
            ))}
          <hr />
          <div className="summary-line">
            <span>Delivery</span>
            <b>{delivery ? '$7.00' : 'Free'}</b>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <b>${(subtotal + delivery).toFixed(2)}</b>
          </div>
          <button className="btn btn-primary full" disabled={!subtotal}>
            Place order
          </button>
          <small>No real payment is processed in this prototype.</small>
        </aside>
      </form>

      {modal && (
        <Modal
          title="Your order is simulated!"
          onClose={() => {
            setModal(false);
            setCart({});
          }}
        >
          <p>
            Thanks! In the real version, this is where the order would be sent to the bakery and
            payment would be processed. For now, no charge was made.
          </p>
        </Modal>
      )}
    </main>
  );
}
