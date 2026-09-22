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

type HeroLayerDepth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type HeroProduct = {
  id: string;
  name: string;
  imageUrl: string;
  depth: HeroLayerDepth;
  x: string;
  y: string;
  width: string;
  rotation?: number;
};

export type ProductLayerDepth = 1 | 2 | 3 | 4 | 5;

export type ProductLayerData = {
  product: ProductCardData;
  xPercent: number;
  yPercent: number;
  rotation: number;
  scale: number;
  depth: ProductLayerDepth;
};

export type CollectionCardBackground =
  | {
      type: 'color';
      color: string;
    }
  | {
      type: 'image';
      imageUrl: string;
      overlayColor?: string;
      position?: string;
    };

export type CollectionCardCta = {
  label: string;
  backgroundColor: string;
  textColor?: string;
};

export type ProductCollectionCardData = {
  id: string;
  slug: string;
  title: string;
  tagline?: string;
  background: CollectionCardBackground;
  cta: CollectionCardCta;
  products: ProductLayerData[];
};