'use client';

import Image from 'next/image';
import {
  motion,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import styled from 'styled-components';

import type { ProductLayerData } from '@/types/product';

type ProductLayerProps = {
  layer: ProductLayerData;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  priority?: boolean;
};

type LayerAnchorProps = {
  $xPercent: number;
  $yPercent: number;
};

const LayerAnchor = styled.div<LayerAnchorProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: clamp(220px, 82%, 295px);
  aspect-ratio: 1;

  transform: translate(
    calc(-50% + ${({ $xPercent }) => $xPercent}%),
    calc(-50% + ${({ $yPercent }) => $yPercent}%)
  );

  pointer-events: none;
`;

const LayerImage = styled(motion.div)`
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  will-change: transform;

  img {
    object-fit: contain;
    user-select: none;
    filter: drop-shadow(0 24px 16px rgb(0 0 0 / 35%));
  }
`;

export function ProductLayer({
  layer,
  pointerX,
  pointerY,
  priority = false,
}: ProductLayerProps) {
  const depthRatio = layer.depth / 5;
  const movement = 10 + depthRatio * 34;

  const x = useTransform(pointerX, (value) => value * movement);

  const y = useTransform(pointerY, (value) => value * movement);

  const rotate = useTransform(
    pointerX,
    (value) => layer.rotation + value * (2 + depthRatio * 6),
  );

  return (
    <LayerAnchor
      $xPercent={layer.xPercent}
      $yPercent={layer.yPercent}
      style={{
        zIndex: layer.depth + 2,
      }}
    >
      <LayerImage
        style={{
          x,
          y,
          rotate,
          scale: layer.scale,
        }}
      >
        <Image
          src={layer.product.imageUrl}
          alt={layer.product.name}
          fill
          sizes="(max-width: 480px) 76vw, 295px"
          loading={priority ? "eager" : "lazy"}
        />
      </LayerImage>
    </LayerAnchor>
  );
}
