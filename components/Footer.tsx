export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/60 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 OrangeURL. All rights reserved.
          </div>
          <div className="text-sm text-muted-foreground">
            Facing issues? Mail us: <a href="mailto:support@orangeurl.live" className="text-primary hover:underline">support@orangeurl.live</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 