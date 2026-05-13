import React, { useEffect, useState } from 'react';
import { ASSET_PLACEHOLDER } from '@/constants/images';

type ImageWithFallbackProps = React.ImgHTMLAttributes<HTMLImageElement>;

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const { src, alt, style, className, onLoad, onError, ...rest } = props;
  const [didError, setDidError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [placeholderFailed, setPlaceholderFailed] = useState(false);

  useEffect(() => {
    setDidError(false);
    setIsLoaded(false);
    setPlaceholderFailed(false);
  }, [src]);

  const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    setDidError(true);
    onError?.(e);
  };

  const handleLoad: React.ReactEventHandler<HTMLImageElement> = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  if (didError) {
    return (
      <div
        className={`flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 ${className ?? ''}`}
        style={style}
        role="img"
        aria-label={alt}
      >
        <span className="sr-only">{alt}</span>
        {!placeholderFailed && (
          <img
            src={ASSET_PLACEHOLDER}
            alt=""
            className="max-h-[45%] max-w-[45%] object-contain opacity-40"
            onError={() => setPlaceholderFailed(true)}
          />
        )}
      </div>
    );
  }

  return (
    <span className="relative block h-full w-full min-h-0 min-w-0 max-w-full">
      {!isLoaded && (
        <span
          className="pointer-events-none absolute inset-0 z-10 block animate-pulse bg-gradient-to-br from-gray-100 to-gray-200"
          aria-hidden
        />
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        {...rest}
        onLoad={handleLoad}
        onError={handleError}
      />
    </span>
  );
}
