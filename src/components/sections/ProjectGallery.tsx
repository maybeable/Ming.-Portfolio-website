import Image from "next/image";

type ImageItem = {
  src: string;
  alt: string;
  aspectRatio?: string;
};

type ProjectGalleryProps = {
  images: ImageItem[];
};

export function ProjectGallery({ images }: ProjectGalleryProps) {
  return (
    <div className="space-y-8 md:space-y-14 lg:space-y-20">
      {images.map((image, index) => {
        const aspectRatio =
          image.aspectRatio ?? (index === 0 ? "16/9" : "4/3");

        return (
          <div
            key={image.src}
            className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-card bg-background-soft"
            style={{ aspectRatio }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-contain"
            />
          </div>
        );
      })}
    </div>
  );
}
