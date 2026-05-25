type ColorInfo = {
  name: string;
  hex: string;
};

type ColorPaletteSectionProps = {
  colors: ColorInfo[];
};

export function ColorPaletteSection({ colors }: ColorPaletteSectionProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {colors.map((color) => (
        <div key={color.hex} className="space-y-3">
          <div
            className="w-full aspect-square rounded-xl border border-border"
            style={{ backgroundColor: color.hex }}
          />
          <div>
            <p className="text-body-sm font-medium text-foreground">
              {color.name}
            </p>
            <p className="text-caption text-foreground-muted uppercase mt-0.5">
              {color.hex}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
