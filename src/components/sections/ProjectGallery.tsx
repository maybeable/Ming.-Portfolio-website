import Image from "next/image";

type ImageItem = {
  src: string;
  alt: string;
};

type ProjectGalleryProps = {
  images: ImageItem[];
};

export function ProjectGallery({ images }: ProjectGalleryProps) {
  return (
    <div className="space-y-16">
      {images.map((image, index) => (
        <div
          key={image.src}
          className="relative w-full overflow-hidden rounded-card bg-background-soft"
          style={{ aspectRatio: index === 0 ? "16/9" : "4/3" }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
