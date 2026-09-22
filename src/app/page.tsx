import { ShowcaseProductCard } from '@/components/product/ShowcaseProductCard';
import { ProductCollectionCard } from '@/components/product/ProductCollectionCard';
import type {
  ProductCardData,
  ProductCollectionCardData,
} from '@/types/product';

const blackJordan: ProductCardData = {
  id: 'p-001',
  slug: 'air-jordan-black',
  brand: 'Nike',
  name: 'Air Jordan Black',
  price: 550,
  currency: 'USD',
  imageUrl: '/images/products/air-jordan-transparent.png',
  accentColor: '#ffc400',
};

const wemenShirt: ProductCardData = {
  id: 'p-002',
  slug: 'air-jordan-red',
  brand: 'Nike',
  name: 'Air Jordan Red',
  price: 520,
  currency: 'USD',
  imageUrl: '/images/products/wemen1-shirt1.png',
  accentColor: '#ff544d',
};

const wemenHijab: ProductCardData = {
  id: 'p-003',
  slug: 'air-jordan-blue',
  brand: 'Nike',
  name: 'Air Jordan Blue',
  price: 490,
  currency: 'USD',
  imageUrl: '/images/products/wemen1-hijab1.png',
  accentColor: '#4ca6ff',
};

const womenModel: ProductCardData = {
  id: 'p-004',
  slug: 'HJ',
  brand: 'Nike',
  name: 'SDFSDF',
  price: 490,
  currency: 'USD',
  imageUrl: '/images/products/wemen1.png',
  accentColor: '#4ca6ff',
};

const product: ProductCardData = {
  id: 'p-001',
  slug: 'hijab-colle-1',
  brand: 'HILMA Collection',
  name: 'HIJAB',
  tagline: 'Your next shoes',
  price: 1200,
  currency: 'THB',
  imageUrl: '/images/products/wemen1.png',
  accentColor: '#618da5',
};

const collectionCard: ProductCollectionCardData = {
  id: 'collection-001',
  slug: 'air-jordan-collection',
  title: 'Jordan Collection',
  tagline: 'Choose your style',
  accentColor: '#7c9a22',
  products: [

    {
      product: wemenHijab,
      xPercent: 20,
      yPercent: -29.5,
      rotation: 13,
      scale: 0.9,
      depth: 1,
    },
    {
      product: wemenShirt,
      xPercent: 25,
      yPercent: 10,
      rotation: -10,
      scale: 1,
      depth: 2,
    },
    {
      product: womenModel,
      xPercent: -26,
      yPercent: -10,
      rotation: 0,
      scale: 1.5,
      depth: 1,
    },
    
  ],
};

export default function HomePage() {
  return (
    <main>
      <ShowcaseProductCard
        product={product}
        imageScale={1.5}
        priority
      />
      <ProductCollectionCard card={collectionCard} />
    </main>
  );
}