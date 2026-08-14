import { Globe, Mail } from "lucide-react";

const FOOTER_LINKS = ["Product", "Pricing", "Security", "Privacy Policy"];

export function Footer() {
  return (
    <footer className="w-full bg-inverse-surface">
      <div className="container-page py-xl grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="md:col-span-1 flex flex-col gap-sm">
          <span className="text-title-md font-black text-white">Uniper Data</span>
          <p className="text-body-sm text-inverse-on-surface/80">
            Munich, Germany
            <br />
            Enterprise Data Solutions
          </p>
          <div className="flex gap-sm mt-sm">
            <a href="#" aria-label="Website" className="text-outline-variant hover:text-primary-fixed transition-colors">
              <Globe size={20} />
            </a>
            <a href="mailto:hello@uniperdata.com" aria-label="Email" className="text-outline-variant hover:text-primary-fixed transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="md:col-span-3 flex flex-col md:flex-row gap-xl md:justify-end">
          <div className="flex flex-col gap-sm">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-body-sm text-outline-variant hover:text-primary-fixed transition-colors hover:underline decoration-primary"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-4 mt-lg pt-md border-t border-white/10">
          <p className="text-body-sm text-inverse-on-surface text-center">
            © 2026 Uniper Data. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
