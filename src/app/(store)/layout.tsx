import type { ReactNode } from 'react';
import { StoreHeader } from '@/components/layout/StoreHeader';

type StoreLayoutProps = {
  children: ReactNode;
};

export default function StoreLayout({ children }: StoreLayoutProps) {
  return (
    <>
      <StoreHeader />
      {children}
    </>
  );
}