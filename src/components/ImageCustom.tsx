/** @format */

import { Image } from '@nextui-org/react';

export const ImageCustom = ({ className, src, alt }) => {
  return <Image className={className} src={src} alt={alt} />;
};
