'use client';

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { PointerEvent } from 'react';
import styled from 'styled-components';

type HeroProduct = {
  id: string;
  name: string;
  imageUrl: string;
  depth: number;
  x: string;
  y: string;
  width: string;
  rotation?: number;
};

type HeroBannerProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  backgroundImage: string;
  products: HeroProduct[];
  ctaLabel?: string;
  ctaHref?: string;
};

const Section = styled.section`
  position: relative;
  isolation: isolate;
  min-height: clamp(560px, 78svh, 860px);
  overflow: hidden;
  color: var(--color-ivory, #f7f0e5);
  background: var(--color-emerald-950, #082f28);
  perspective: 1200px;
`;

const Background = styled(motion.div)`
  position: absolute;
  z-index: -3;
  inset: -4%;

  img {
    object-fit: cover;
  }
`;

const Overlay = styled.div`
  position: absolute;
  z-index: -2;
  inset: 0;
  background:
    linear-gradient(
      90deg,
      rgb(5 32 27 / 90%) 0%,
      rgb(5 32 27 / 65%) 42%,
      rgb(5 32 27 / 14%) 75%
    ),
    linear-gradient(
      0deg,
      rgb(5 32 27 / 55%) 0%,
      transparent 45%
    );
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: min(
    calc(100% - (var(--page-padding, 24px) * 2)),
    var(--page-max-width, 1440px)
  );
  min-height: inherit;
  margin-inline: auto;
  padding-block: clamp(70px, 10vw, 130px);
  pointer-events: none;

  @media (max-width: 768px) {
    justify-content: flex-end;
    width: calc(100% - 36px);
    padding-bottom: 54px;
  }
`;

const TextBox = styled.div`
  width: min(520px, 48vw);
  pointer-events: auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Eyebrow = styled.p`
  margin: 0 0 16px;
  color: var(--color-gold-300, #d5b985);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  max-width: 700px;
  margin: 0;
  font-family: var(--font-editorial, Georgia, serif);
  font-size: clamp(48px, 7vw, 108px);
  font-weight: 400;
  letter-spacing: -0.035em;
  line-height: 0.88;
  text-wrap: balance;
`;

const Description = styled.p`
  max-width: 440px;
  margin: 24px 0 0;
  color: rgb(247 240 229 / 78%);
  font-size: clamp(14px, 1.2vw, 17px);
  line-height: 1.7;
`;

const Cta = styled(Link)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 48px;
  margin-top: 32px;
  padding-inline: 26px;
  color: var(--color-emerald-950, #082f28);
  background: var(--color-gold-300, #d5b985);
  border: 1px solid var(--color-gold-300, #d5b985);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-decoration: none;
  text-transform: uppercase;
  transition:
    color 180ms ease,
    background 180ms ease;

  &:hover {
    color: var(--color-gold-300, #d5b985);
    background: transparent;
  }
`;

const Scene = styled(motion.div)`
  position: absolute;
  z-index: 5;
  top: 0;
  right: 0;
  width: min(62vw, 920px);
  height: 100%;
  transform-style: preserve-3d;
  pointer-events: none;

  @media (max-width: 768px) {
    top: 0;
    width: 100%;
    height: 68%;
    opacity: 0.95;
  }
`;

const ProductLayer = styled(motion.div)`
  position: absolute;
  transform-style: preserve-3d;
  will-change: transform;

  img {
    object-fit: contain;
    filter: drop-shadow(0 30px 24px rgb(0 0 0 / 38%));
    user-select: none;
  }
`;

export function HeroBanner({
  eyebrow,
  title,
  description,
  backgroundImage,
  products,
  ctaLabel = 'Explore collection',
  ctaHref = '/collections',
}: HeroBannerProps) {
  const prefersReducedMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, {
    stiffness: 100,
    damping: 24,
    mass: 0.5,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 100,
    damping: 24,
    mass: 0.5,
  });

  const sceneRotateY = useTransform(smoothX, [-1, 1], [-4, 4]);
  const sceneRotateX = useTransform(smoothY, [-1, 1], [4, -4]);

  const backgroundX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const backgroundY = useTransform(smoothY, [-1, 1], [-6, 6]);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (prefersReducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();

    const normalizedX =
      ((event.clientX - bounds.left) / bounds.width) * 2 - 1;

    const normalizedY =
      ((event.clientY - bounds.top) / bounds.height) * 2 - 1;

    pointerX.set(normalizedX);
    pointerY.set(normalizedY);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <Section
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <Background
        style={
          prefersReducedMotion
            ? undefined
            : {
                x: backgroundX,
                y: backgroundY,
              }
        }
      >
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          loading="eager"
          sizes="100vw"
        />
      </Background>

      <Overlay />

      <Scene
        style={
          prefersReducedMotion
            ? undefined
            : {
                rotateX: sceneRotateX,
                rotateY: sceneRotateY,
              }
        }
      >
        {products.map((product) => (
          <HeroProductLayer
            key={product.id}
            product={product}
            pointerX={smoothX}
            pointerY={smoothY}
            reducedMotion={Boolean(prefersReducedMotion)}
          />
        ))}
      </Scene>

      <Content
        initial={
          prefersReducedMotion
            ? undefined
            : { opacity: 0, y: 24 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.8,
          delay: prefersReducedMotion ? 0 : 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <TextBox>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}

          <Title id="hero-title">{title}</Title>

          {description && (
            <Description>{description}</Description>
          )}

          <Cta href={ctaHref}>{ctaLabel}</Cta>
        </TextBox>
      </Content>
    </Section>
  );
}

type HeroProductLayerProps = {
  product: HeroProduct;
  pointerX: ReturnType<typeof useSpring>;
  pointerY: ReturnType<typeof useSpring>;
  reducedMotion: boolean;
};

function HeroProductLayer({
  product,
  pointerX,
  pointerY,
  reducedMotion,
}: HeroProductLayerProps) {
  const movement = product.depth * 12;

  const x = useTransform(pointerX, [-1, 1], [-movement, movement]);
  const y = useTransform(pointerY, [-1, 1], [-movement, movement]);

  return (
    <ProductLayer
      style={{
        left: product.x,
        top: product.y,
        width: product.width,
        aspectRatio: '1',
        zIndex: product.depth,
        x: reducedMotion ? 0 : x,
        y: reducedMotion ? 0 : y,
        rotate: product.rotation ?? 0,
        translateZ: product.depth * 35,
      }}
    >
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        priority={product.depth >= 2}
        loading={product.depth >= 2 ? 'eager' : 'lazy'}
        sizes="(max-width: 768px) 55vw, 34vw"
      />
    </ProductLayer>
  );
}