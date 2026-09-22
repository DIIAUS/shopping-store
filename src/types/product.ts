export type ProductCardData = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  tagline?: string;
  price: number;
  currency: 'THB' | 'USD';
  imageUrl: string;
  accentColor: string;
};

export type ProductLayerDepth = 1 | 2 | 3;

export type ProductLayerData = {
  product: ProductCardData;
  xPercent: number;
  yPercent: number;
  rotation: number;
  scale: number;
  depth: ProductLayerDepth;
};



export type ProductCollectionCardData = {
  id: string;
  slug: string;
  title: string;
  tagline?: string;
  accentColor: string;
  products: ProductLayerData[];
};