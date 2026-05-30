import { AnimatedContainer } from "@/components/layout/AnimatedContainer";
import { BeforeAfterSlider } from "@/components/interactive/BeforeAfterSlider";

type BeforeAfterImage = {
  original: string;
  refined: string;
  alt: string;
};

type BeforeAfterSectionProps = {
  images: BeforeAfterImage[];
};

export function BeforeAfterSection({ images }: BeforeAfterSectionProps) {
  return (
    <div className="space-y-16 md:space-y-24">
      {images.map((image, index) => (
        <AnimatedContainer key={image.original} delay={index * 0.1}>
          <BeforeAfterSlider
            original={image.original}
            refined={image.refined}
            alt={image.alt}
          />
        </AnimatedContainer>
      ))}
    </div>
  );
}
