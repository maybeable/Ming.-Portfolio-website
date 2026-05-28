"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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
    <div className="space-y-12 md:space-y-20">
      {images.map((image, index) => {
        // 首图全宽，其余交错
        const isFirst = index === 0;
        const isEven = index % 2 === 0;
        const aspectRatio = image.aspectRatio ?? (isFirst ? "16/9" : "4/3");

        return (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: index * 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className={isFirst
              ? "w-full"
              : `w-full ${isEven ? "md:pr-12" : "md:pl-12"}`
            }
          >
            <div
              className="relative w-full overflow-hidden border border-border/30 bg-background-soft"
              style={{ aspectRatio }}
            >
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
          </motion.div>
        );
      })}
    </div>
  );
}
