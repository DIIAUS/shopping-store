import type { HTMLAttributes } from 'react';

export type CardProps = HTMLAttributes<HTMLElement>;

export function Card({ className = '', ...props }: CardProps) {
  return <article className={`rounded-xl border p-4 ${className}`.trim()} {...props} />;
}
