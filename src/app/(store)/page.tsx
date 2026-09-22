import { ShowcaseProductCard } from "@/components/product/ShowcaseProductCard";
import { ProductCollectionCard } from "@/components/product/ProductCollectionCard";
import { StoreHeader } from '@/components/layout/StoreHeader';

import type {
  ProductCardData,
  ProductCollectionCardData,
} from "@/types/product";

import { HeroBanner } from '@/components/home/HeroBanner';

const heroProducts = [
  {
    id: 'hero-left',
    name: 'Heritage bag',
    imageUrl: '/images/hero/product-left.png',
    depth: 1,
    x: '4%',
    y: '34%',
    width: '34%',
    rotation: -12,
  },
  {
    id: 'hero-center',
    name: 'Heritage signature product',
    imageUrl: '/images/hero/product-center.png',
    depth: 3,
    x: '30%',
    y: '13%',
    width: '48%',
    rotation: 2,
  },
  {
    id: 'hero-right',
    name: 'Heritage accessory',
    imageUrl: '/images/hero/product-right.png',
    depth: 2,
    x: '66%',
    y: '39%',
    width: '30%',
    rotation: 11,
  },
];

const womenSkirt: ProductCardData = {
  id: "p-001",
  slug: "air-jordan-white",
  brand: "Nike",
  name: "Air Jordan White",
  price: 490,
  currency: "USD",
  imageUrl: "/images/products/women1-skirt1.png",
  accentColor: "#371413",
};

const womenShirt: ProductCardData = {
  id: "p-002",
  slug: "air-jordan-red",
  brand: "Nike",
  name: "Air Jordan Red",
  price: 520,
  currency: "USD",
  imageUrl: "/images/products/women1-shirt1.png",
  accentColor: "#ff544d",
};

const womenHijab: ProductCardData = {
  id: "p-003",
  slug: "air-jordan-blue",
  brand: "Nike",
  name: "Air Jordan Blue",
  price: 490,
  currency: "USD",
  imageUrl: "/images/products/women1-hijab1.png",
  accentColor: "#4ca6ff",
};

const womenModel: ProductCardData = {
  id: "p-004",
  slug: "HJ",
  brand: "Nike",
  name: "SDFSDF",
  price: 490,
  currency: "USD",
  imageUrl: "/images/products/women1-model1.png",
  accentColor: "#4ca6ff",
};

const product: ProductCardData = {
  id: "p-001",
  slug: "hijab-colle-1",
  brand: "HILMA Collection",
  name: "HIJAB",
  tagline: "Your next shoes",
  price: 1200,
  currency: "THB",
  imageUrl: "/images/products/women2-model1.png",
  accentColor: "#618da5",
};

const collectionCard: ProductCollectionCardData = {
  id: "collection-001",
  slug: "air-jordan-collection",
  title: "Jordan Collection",
  tagline: "Choose your style",
  background: {
    type: "image",
    imageUrl: "/images/backgrounds/bg2.jpg",
  },
  cta: {
    label: "Explore",
    backgroundColor: "#22669a",
    textColor: "#ffffff",
  },

  products: [
    {
      product: womenSkirt,
      xPercent: 20,
      yPercent: 15,
      rotation: -10,
      scale: 1,
      depth: 3,
    },

    {
      product: womenHijab,
      xPercent: 40,
      yPercent: 10,
      rotation: 13,
      scale: 0.5,
      depth: 1,
    },
    {
      product: womenShirt,
      xPercent: 25,
      yPercent: -35,
      rotation: -10,
      scale: 1,
      depth: 4,
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
    <>
          <StoreHeader

      />
    <main>
              <HeroBanner
        eyebrow="The Heritage Collection"
        title="An everlasting extension of heritage"
        description="A contemporary expression of craftsmanship, culture and timeless design."
        backgroundImage="/images/hero/heritage-background.jpg"
        products={heroProducts}
        ctaLabel="Discover the collection"
        ctaHref="/collections/heritage"
      />
      <ShowcaseProductCard
        product={product}
        imageScale={1.4}
        priority
        background={{
          type: "image",
          imageUrl: "/images/backgrounds/bg2.jpg",
          overlayColor: "rgb(0 0 0 / 25%)",
          position: "center",
        }}
      />
      <ProductCollectionCard card={collectionCard} priority />
    </main>
    </>
  );
}
