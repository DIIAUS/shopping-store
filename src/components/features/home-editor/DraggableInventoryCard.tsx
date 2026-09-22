'use client';

import type { HTMLAttributes } from 'react';
import { useDraggable } from '@dnd-kit/core';

export function DraggableInventoryCard({ id, children, ...props }: { id: string } & HTMLAttributes<HTMLDivElement>) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  return <div ref={setNodeRef} style={{ transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined }} {...attributes} {...listeners} {...props}>{children}</div>;
}
