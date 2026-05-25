export function Footer() {
  return (
    <footer className="border-t border-border bg-background-soft">
      <div className="container-base flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
        <p className="text-body-sm text-foreground-muted">
          &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-body-sm text-foreground-muted hover:text-foreground transition-colors duration-200"
          >
            Instagram
          </a>
          <a
            href="#"
            className="text-body-sm text-foreground-muted hover:text-foreground transition-colors duration-200"
          >
            Behance
          </a>
          <a
            href="#"
            className="text-body-sm text-foreground-muted hover:text-foreground transition-colors duration-200"
          >
            Dribbble
          </a>
        </div>
      </div>
    </footer>
  );
}
