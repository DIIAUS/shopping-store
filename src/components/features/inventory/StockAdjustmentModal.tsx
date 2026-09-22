'use client';

import type { FormEvent } from 'react';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';

export function StockAdjustmentModal({ open, productName, onClose, onSubmit }: { open: boolean; productName: string; onClose: () => void; onSubmit: (change: number) => void }) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const change = Number(new FormData(event.currentTarget).get('change'));
    if (Number.isInteger(change) && change !== 0) onSubmit(change);
  }
  return <Modal open={open} title={`Adjust stock: ${productName}`} onClose={onClose}><form onSubmit={submit} className="grid gap-3"><label>Quantity change<input name="change" type="number" step="1" required className="block w-full rounded border p-2" /></label><Button type="submit">Apply adjustment</Button></form></Modal>;
}
