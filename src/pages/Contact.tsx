import { useState } from 'react';
import type { FormEvent } from 'react';
import { Modal } from '../components/Modal';

export function Contact() {
  const [modal, setModal] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setModal(true);
  }

  return (
    <main className="page">
      <div className="contact-grid">
        <div>
          <span className="eyebrow">Contact us</span>
          <h1>Questions? Cravings? Say hello.</h1>
          <p className="lead">
            We’d love to hear from you. The contact details below are placeholders for the
            prototype.
          </p>
          <div className="contact-card">
            <b>Phone</b>
            <span>(403) 555-0142</span>
            <b>Email</b>
            <span>hello@endlessandjoy.example</span>
            <b>Service area</b>
            <span>Southeast Calgary, Alberta</span>
          </div>
        </div>
        <form className="form-card contact-form" onSubmit={handleSubmit}>
          <h2>Send a message</h2>
          <label>
            Name
            <input required />
          </label>
          <label>
            Email
            <input required type="email" />
          </label>
          <label>
            Subject
            <input required />
          </label>
          <label>
            Message
            <textarea required rows={6} />
          </label>
          <button className="btn btn-primary">Send message</button>
        </form>
      </div>

      {modal && (
        <Modal title="Message simulated" onClose={() => setModal(false)}>
          <p>
            Your message looks good. In the backend version, it would be saved or sent to the bakery
            inbox. Nothing was actually sent.
          </p>
        </Modal>
      )}
    </main>
  );
}
