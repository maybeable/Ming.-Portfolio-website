export function Footer() {
  return (
    <footer className="border-t border-border pb-safe">
      <div className="container-base flex flex-col sm:flex-row items-center justify-between gap-4 py-10">
        <div className="flex items-center gap-2 text-body-sm text-foreground-muted">
          <span>&copy; {new Date().getFullYear()}</span>
          <span className="text-border">|</span>
          <span>保持简单，保持设计</span>
        </div>
        <div className="flex items-center gap-8">
          <a
            href="#"
            className="text-body-sm text-foreground-muted hover:text-primary transition-colors duration-200 py-2"
          >
            Instagram
          </a>
          <a
            href="#"
            className="text-body-sm text-foreground-muted hover:text-primary transition-colors duration-200 py-2"
          >
            Behance
          </a>
          <a
            href="#"
            className="text-body-sm text-foreground-muted hover:text-primary transition-colors duration-200 py-2"
          >
            Dribbble
          </a>
        </div>
      </div>
    </footer>
  );
}
