import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="top" className="relative bg-surface-container-lowest w-full overflow-hidden border-b border-outline-variant">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2YgmIl03PvE3utRbNQMmBsoF9usH0u2DlO2WvEwGc2uHBFfE0HQqIibl0zsuV8SGSI6ez6u7cKcNPaOFKYltpNG1CVO7TVCCq7WAXFNsHCssOKa3vyr0vADj-rSu1eOFqpARGaw1iql46R6W3s1SNWnXhDIZwVhX7tJcvjTbC-kF5HGc0GCucI39dL9Hthz3UEDwgv392B5RG8Up4zlEbDhny8Y38ik0NjGAk8YqQTykMb6PY69pQ_g"
          alt=""
          fill
          priority
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/80 to-transparent" />
      </div>

      <div className="relative z-10 container-page py-xl md:py-[120px] flex flex-col items-start justify-center min-h-[60vh]">
        <h1 className="text-headline-lg-mobile md:text-display-lg text-on-background mb-md max-w-2xl animate-fade-up">
          Enterprise Data Solutions
        </h1>
        <p className="text-body-lg text-on-surface-variant mb-lg max-w-xl animate-fade-up [animation-delay:100ms]">
          Transform your business with Uniper Data&apos;s cutting-edge data management and analytics
          platform. Precision engineered for high-velocity environments.
        </p>
        <div className="flex gap-sm animate-fade-up [animation-delay:200ms]">
          <Button size="lg" asChild>
            <a href="#pricing">
              Get Started
              <ArrowRight size={18} />
            </a>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <a href="#services">View Documentation</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
