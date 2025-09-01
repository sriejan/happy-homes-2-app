"use client";

import * as React from "react";
import Image, { ImageProps } from "next/image";

type Props = ImageProps & { fallbackSrc?: string };

export default function SafeImage({ src, alt, fallbackSrc = "/img/hero-royal.jpg", ...rest }: Props) {
  const [err, setErr] = React.useState(false);
  const finalSrc = err ? fallbackSrc : src;
  return (
    <Image
      {...rest}
      src={finalSrc}
      alt={alt}
      onError={() => setErr(true)}
    />
  );
}


