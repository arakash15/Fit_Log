/* eslint-disable @next/next/no-img-element */
export default function Thumb({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return src ? (
    <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} />
  ) : (
    <div className={`flex items-center justify-center bg-line text-xs text-muted ${className}`}>No image</div>
  );
}
