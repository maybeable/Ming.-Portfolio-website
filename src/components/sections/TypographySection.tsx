type FontInfo = {
  name: string;
  category: string;
};

type TypographySectionProps = {
  fonts: FontInfo[];
};

export function TypographySection({ fonts }: TypographySectionProps) {
  return (
    <div className="space-y-12">
      {fonts.map((font) => (
        <div
          key={font.name}
          className="border-b border-border pb-12 last:border-0 last:pb-0"
        >
          <p className="text-[6rem] md:text-[8rem] leading-none tracking-tight text-foreground font-light">
            Aa
          </p>
          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-h4">{font.name}</span>
            <span className="text-body-sm text-foreground-muted">
              {font.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
