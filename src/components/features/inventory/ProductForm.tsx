'use client';

import type { FormEvent } from 'react';
import { Button } from '../../ui/Button';

export interface ProductFormValues { name: string; sku: string; price: number; stock: number }

export function ProductForm({ initialValues, onSubmit }: { initialValues?: Partial<ProductFormValues>; onSubmit: (values: ProductFormValues) => void }) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmit({ name: String(data.get('name') ?? ''), sku: String(data.get('sku') ?? ''), price: Number(data.get('price')), stock: Number(data.get('stock')) });
  }
  return <form onSubmit={submit} className="grid gap-3">
    <label>Name<input name="name" required defaultValue={initialValues?.name} className="block w-full rounded border p-2" /></label>
    <label>SKU<input name="sku" required defaultValue={initialValues?.sku} className="block w-full rounded border p-2" /></label>
    <label>Price<input name="price" type="number" min="0" step="0.01" required defaultValue={initialValues?.price} className="block w-full rounded border p-2" /></label>
    <label>Stock<input name="stock" type="number" min="0" step="1" required defaultValue={initialValues?.stock} className="block w-full rounded border p-2" /></label>
    <Button type="submit">Save product</Button>
  </form>;
}
