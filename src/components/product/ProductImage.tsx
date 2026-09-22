import Image from 'next/image';

export interface ProductImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function ProductImage({
  src,
  alt,
  width = 320,
  height = 320,
  priority = false,
}: ProductImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={`${width}px`}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
}
