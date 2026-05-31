"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "@/lib/gsap";

type ImageItem = {
  src: string;
  alt: string;
  aspectRatio?: string;
};

type ProjectGalleryProps = {
  images: ImageItem[];
};

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const items = gallery.querySelectorAll(".gallery-item");

    items.forEach((item, i) => {
      const img = item.querySelector(".gallery-image");
      if (!img) return;

      gsap.fromTo(
        img,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 20%",
            toggleActions: "play none none none",
          },
        }
      );

      // Container fade-up
      gsap.fromTo(
        item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: i * 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 20%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, [images.length]);

  return (
    <div ref={galleryRef} className="space-y-12 md:space-y-20">
      {images.map((image, index) => {
        const isFirst = index === 0;
        const isEven = index % 2 === 0;
        const aspectRatio = image.aspectRatio ?? (isFirst ? "16/9" : "4/3");

        return (
          <div
            key={image.src}
            className={`gallery-item ${
              isFirst
                ? "w-full"
                : `w-full ${isEven ? "md:pr-12" : "md:pl-12"}`
            }`}
          >
            <div
              className="relative w-full overflow-hidden border border-border/30 bg-background-soft"
              style={{ aspectRatio }}
            >
              <div className="gallery-image absolute inset-0">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={
                    isFirst
                      ? "(max-width: 768px) 100vw, 90vw"
                      : "(max-width: 768px) 100vw, 50vw"
                  }
                  className="object-contain p-4 md:p-8"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
