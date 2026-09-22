"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import type { PointerEvent } from "react";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

import type {
  CollectionCardBackground,
  ProductCardData,
} from "@/types/product";

type ShowcaseProductCardProps = {
  product: ProductCardData;
  priority?: boolean;
  imageScale?: number;
  background?: CollectionCardBackground;
};

const Perspective = styled.article`
  width: min(100%, 320px);
  perspective: 1400px;
`;

// const Card = styled.article`
//   width: 320px;
//   min-height: 500px;
//   overflow: hidden;
//   border-radius: 28px;
//   color: #ffffff;
//   background: #1d1f21;
//   box-shadow: 0 20px 50px rgb(0 0 0 / 20%);
// `;

const Card = styled(motion.div)`
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  border-radius: clamp(20px, 6vw, 28px);
  color: #ffffff;
  background: #1d1f21;
  box-shadow: 0 20px 50px rgb(0 0 0 / 20%);
  transform-style: preserve-3d;
  will-change: transform;
  touch-action: pan-y;
`;

const Visual = styled.div`
  position: relative;
  width: 100%;
  height: clamp(290px, 100vw, 330px);
  max-height: 330px;
  overflow: hidden;
  isolation: isolate;
`;

const AccentCircle = styled.div<{ $color: string }>`
  position: absolute;
  top: clamp(-110px, -25vw, -75px);
  right: clamp(-170px, -45vw, -125px);
  width: clamp(290px, 100vw, 360px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

const BackgroundMedia = styled.div<{ $position: string }>`
  position: absolute;
  inset: 0;
  z-index: 0;

  img {
    object-fit: cover;
    object-position: ${({ $position }) => $position};
  }
`;

const BackgroundOverlay = styled.div<{ $color: string }>`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: ${({ $color }) => $color};
`;

const BrandText = styled.p`
  position: absolute;
  top: 40%;
  left: 6%;
  z-index: 2;
  max-width: 90%;
  margin: 0;
  overflow: hidden;
  color: rgb(255 255 255 / 94%);
  font-size: clamp(42px, 19vw, 64px);
  font-weight: 900;
  letter-spacing: -0.07em;
  line-height: 0.85;
  text-transform: uppercase;
  white-space: nowrap;
`;

// const ProductImage = styled.div`
//   position: absolute;
//   inset: 40px 0 0;
//   z-index: 1;

//   img {
//     object-fit: contain;
//     filter: drop-shadow(0 25px 15px rgb(0 0 0 / 35%));
//   }
// `;

const ProductImageAnchor = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 3;
  width: clamp(220px, 90%, 300px);
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

const ProductImage = styled(motion.div)`
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  will-change: transform;

  img {
    object-fit: contain;
    user-select: none;
    filter: drop-shadow(0 25px 15px rgb(0 0 0 / 35%));
  }
`;

const Details = styled.div`
  display: grid;
  gap: 18px;
  padding: 20px clamp(18px, 6vw, 22px) clamp(18px, 6vw, 22px);
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

const Brand = styled.span`
  color: rgb(255 255 255 / 60%);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
`;

const Name = styled.h2`
  margin: 4px 0 0;
  font-size: 20px;
  text-transform: uppercase;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 800;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 320px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

const Tagline = styled.p`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
`;

const ViewButton = styled(Link)<{ $color: string }>`
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  border-radius: 10px;
  color: #111111;
  background: ${({ $color }) => $color};
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
`;

function formatPrice(price: number, currency: ProductCardData["currency"]) {
  return new Intl.NumberFormat(currency === "THB" ? "th-TH" : "en-US", {
    style: "currency",
    currency,
  }).format(price);
}

export function ShowcaseProductCard({
  product,
  priority = false,
  imageScale = 1,
  background,
}: ShowcaseProductCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, {
    stiffness: 180,
    damping: 22,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 180,
    damping: 22,
  });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  const imageX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);

  const imageY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  const safeImageScale = Math.min(Math.max(imageScale, 0.6), 1.5);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (prefersReducedMotion || event.pointerType !== "mouse") {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - bounds.left) / bounds.width - 0.5;

    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    pointerX.set(x);
    pointerY.set(y);
  }

  function resetTilt() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <Perspective>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={
          prefersReducedMotion
            ? undefined
            : {
                y: -8,
              }
        }
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 20,
        }}
        style={
          prefersReducedMotion
            ? undefined
            : {
                rotateX,
                rotateY,
              }
        }
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
      >
        <Visual>
          {background?.type === "image" ? (
            <>
              <BackgroundMedia $position={background.position ?? "center"}>
                <Image
                  src={background.imageUrl}
                  alt=""
                  fill
                  sizes="(max-width: 480px) 100vw, 320px"
                  loading={priority ? "eager" : "lazy"}
                />
              </BackgroundMedia>

              <BackgroundOverlay
                $color={background.overlayColor ?? "rgb(0 0 0 / 30%)"}
              />
            </>
          ) : (
            <AccentCircle
              $color={
                background?.type === "color"
                  ? background.color
                  : product.accentColor
              }
            />
          )}

          <BrandText aria-hidden="true">{product.brand}</BrandText>
          <ProductImageAnchor>
            <ProductImage
              style={{
                x: imageX,
                y: imageY,
                scale: safeImageScale,
              }}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      scale: safeImageScale * 1.06,
                      rotate: -4,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 18,
              }}
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 480px) 85vw, 300px"
                loading={priority ? "eager" : "lazy"}
              />
            </ProductImage>
          </ProductImageAnchor>
        </Visual>

        <Details>
          <ProductHeader>
            <div>
              <Brand>{product.brand}</Brand>
              <Name>{product.name}</Name>
            </div>

            <Price>{formatPrice(product.price, product.currency)}</Price>
          </ProductHeader>

          <Footer>
            <Tagline>{product.tagline}</Tagline>

            <ViewButton
              href={`/product/${product.slug}`}
              $color={product.accentColor}
            >
              View
            </ViewButton>
          </Footer>
        </Details>
      </Card>
    </Perspective>
  );
}
