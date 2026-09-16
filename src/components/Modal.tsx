import type { ReactNode } from 'react';

type ModalProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="modal-icon">✓</div>
        <h3>{title}</h3>
        <div>{children}</div>
        <button className="btn btn-primary" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}
