'use client';

import type { ButtonHTMLAttributes } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className = '', type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={`rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50 ${className}`.trim()} {...props} />;
}
