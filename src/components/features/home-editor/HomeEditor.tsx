'use client';

import { HomeSectionEditor, type HomeSectionProduct } from './HomeSectionEditor';

export interface HomeSection { id: string; title: string; products: HomeSectionProduct[] }

export function HomeEditor({ sections, onChange }: { sections: HomeSection[]; onChange: (sections: HomeSection[]) => void }) {
  return <div className="grid gap-6">{sections.map((section) => <section key={section.id}><h2 className="mb-3 text-lg font-semibold">{section.title}</h2><HomeSectionEditor products={section.products} onChange={(products) => onChange(sections.map((item) => item.id === section.id ? { ...item, products } : item))} /></section>)}</div>;
}
