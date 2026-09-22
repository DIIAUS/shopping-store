'use client';

import type { ReactNode } from 'react';

export interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) return null;
  return <div role="presentation" className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onMouseDown={onClose}>
    <section role="dialog" aria-modal="true" aria-label={title} className="w-full max-w-lg rounded-xl bg-white p-6 text-black" onMouseDown={(event) => event.stopPropagation()}>
      <div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-semibold">{title}</h2><button type="button" aria-label="Close" onClick={onClose}>×</button></div>
      {children}
    </section>
  </div>;
}
