'use client';

import type { HTMLAttributes } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableProductCard({ id, children, style, ...props }: { id: string } & HTMLAttributes<HTMLDivElement>) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  return <div ref={setNodeRef} style={{ ...style, transform: CSS.Transform.toString(transform), transition }} {...attributes} {...listeners} {...props}>{children}</div>;
}
