import Image from 'next/image';

export interface ProductImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export function ProductImage({ src, alt, width = 320, height = 320 }: ProductImageProps) {
  return <Image src={src} alt={alt} width={width} height={height} className="object-cover" />;
}
