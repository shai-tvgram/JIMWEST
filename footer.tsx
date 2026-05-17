export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div>
            <p className="font-mono text-sm font-bold tracking-wider text-foreground">
              JIM WEST <span className="text-muted-foreground">//</span> QUANT
              LABS
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              Institutional Intelligence. Zero Compromise.
            </p>
          </div>
          <div className="flex gap-6">
            <a
              href="#radar"
              className="font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:text-primary"
            >
              RADAR
            </a>
            <a
              href="#petrox"
              className="font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:text-primary"
            >
              PETROX
            </a>
            <a
              href="#terminal"
              className="font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:text-primary"
            >
              TERMINAL
            </a>
            <a
              href="#about"
              className="font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:text-primary"
            >
              STORY
            </a>
            <a
              href="https://wa.me/447459309730?text=System%20Initialized.%20I%20want%20to%20unlock%20my%20proprietary%20allocation%20and%20receive%20personal%20quant%20insights.%20My%20profile%20is%20ready."
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-wider text-muted-foreground transition-colors hover:text-primary"
            >
              WHATSAPP
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Jim West Quant Labs. All rights
            reserved. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
