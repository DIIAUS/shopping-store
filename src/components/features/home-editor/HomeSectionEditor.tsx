'use client';

import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { SortableProductCard } from './SortableProductCard';

export interface HomeSectionProduct { id: string; name: string }

export function HomeSectionEditor({ products, onChange }: { products: HomeSectionProduct[]; onChange: (products: HomeSectionProduct[]) => void }) {
  function dragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const from = products.findIndex((product) => product.id === active.id);
    const to = products.findIndex((product) => product.id === over.id);
    if (from >= 0 && to >= 0) onChange(arrayMove(products, from, to));
  }
  return <DndContext collisionDetection={closestCenter} onDragEnd={dragEnd}><SortableContext items={products.map((product) => product.id)} strategy={verticalListSortingStrategy}><div className="grid gap-2">{products.map((product) => <SortableProductCard key={product.id} id={product.id} className="cursor-grab rounded border p-3">{product.name}</SortableProductCard>)}</div></SortableContext></DndContext>;
}
