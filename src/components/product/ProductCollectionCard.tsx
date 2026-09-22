'use client';

import Link from 'next/link';
import type { PointerEvent } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import styled from 'styled-components';

import type { ProductCollectionCardData } from '@/types/product';

import { ProductLayer } from './ProductLayer';

type ProductCollectionCardProps = {
  card: ProductCollectionCardData;
};

const Perspective = styled.article`
  width: min(100%, 360px);
  perspective: 1400px;
`;

const Card = styled(motion.div)`
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  border-radius: clamp(20px, 6vw, 28px);
  color: #ffffff;
  background: #191b1f;
  box-shadow: 0 24px 60px rgb(0 0 0 / 25%);
  transform-style: preserve-3d;
  will-change: transform;
  touch-action: pan-y;
`;

const Stage = styled.div`
  position: relative;
  width: 100%;
  height: clamp(300px, 105vw, 400px);
  max-height: 400px;
  isolation: isolate;
`;

const AccentCircle = styled.div<{ $color: string }>`
  position: absolute;
  top: clamp(-130px, -30vw, -90px);
  right: clamp(-170px, -42vw, -125px);
  width: clamp(300px, 100vw, 390px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

const BackgroundText = styled.p`
  position: absolute;
  top: 32%;
  left: 6%;
  z-index: 0;
  max-width: 90%;
  margin: 0;
  overflow: hidden;
  color: rgb(255 255 255 / 90%);
  font-size: clamp(40px, 17vw, 62px);
  font-weight: 900;
  letter-spacing: -0.07em;
  line-height: 0.85;
  text-transform: uppercase;
  white-space: nowrap;
`;

const Details = styled.div`
  position: relative;
  z-index: 10;
  display: grid;
  gap: 16px;
  padding:
    0 clamp(18px, 6vw, 24px)
    clamp(18px, 6vw, 24px);
`;

const Title = styled.h2`
  margin: 0;
  font-size: clamp(19px, 6vw, 24px);
  line-height: 1.1;
  text-transform: uppercase;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const Tagline = styled.p`
  color: rgb(255 255 255 / 65%);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
`;

const ViewButton = styled(Link)<{ $color: string }>`
  padding: 12px 16px;
  border-radius: 10px;
  color: #111111;
  background: ${({ $color }) => $color};
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
`;

export function ProductCollectionCard({
  card,
}: ProductCollectionCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const pointerX = useSpring(rawX, {
    stiffness: 180,
    damping: 22,
  });

  const pointerY = useSpring(rawY, {
    stiffness: 180,
    damping: 22,
  });

  const rotateX = useTransform(
    pointerY,
    [-0.5, 0.5],
    [7, -7],
  );

  const rotateY = useTransform(
    pointerX,
    [-0.5, 0.5],
    [-9, 9],
  );

  function handlePointerMove(
    event: PointerEvent<HTMLDivElement>,
  ) {
    if (
      prefersReducedMotion ||
      event.pointerType !== 'mouse'
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();

    rawX.set(
      (event.clientX - bounds.left) / bounds.width - 0.5,
    );

    rawY.set(
      (event.clientY - bounds.top) / bounds.height - 0.5,
    );
  }

  function resetCard() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <Perspective>
      <Card
        onPointerMove={handlePointerMove}
        onPointerLeave={resetCard}
        style={
          prefersReducedMotion
            ? undefined
            : {
                rotateX,
                rotateY,
              }
        }
      >
        <Stage>
          <AccentCircle $color={card.accentColor} />

          <BackgroundText aria-hidden="true">
            Collection
          </BackgroundText>

          {card.products.map((layer, index) => (
            <ProductLayer
              key={`${layer.product.id}-${layer.depth}`}
              layer={layer}
              pointerX={pointerX}
              pointerY={pointerY}
              priority={index === 0}
            />
          ))}
        </Stage>

        <Details>
          <Title>{card.title}</Title>

          <Footer>
            <Tagline>{card.tagline}</Tagline>

            <ViewButton
              href={`/collections/${card.slug}`}
              $color={card.accentColor}
            >
              Explore
            </ViewButton>
          </Footer>
        </Details>
      </Card>
    </Perspective>
  );
}