import { Database, TrendingUp, ShieldCheck, type LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  body: string;
}

const SERVICES: Service[] = [
  {
    icon: Database,
    title: "Data Management",
    body: "Robust architecture for storing, processing, and retrieving high-velocity data streams with absolute mathematical harmony.",
  },
  {
    icon: TrendingUp,
    title: "Advanced Analytics",
    body: "Transform raw data into actionable insights through sophisticated computational models and refined visual reporting.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    body: "Uncompromising security protocols ensuring data integrity and compliance within rigid and reliable structural frameworks.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-surface-container-low border-y border-outline-variant py-xl">
      <div className="container-page">
        <div className="text-center mb-lg">
          <h2 className="text-headline-lg-mobile md:text-headline-lg text-on-surface mb-sm">
            Core Capabilities
          </h2>
          <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Engineered for clarity and trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
          {SERVICES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center mb-md group-hover:bg-primary-container transition-colors">
                <Icon className="text-primary group-hover:text-white transition-colors" size={22} aria-hidden="true" />
              </div>
              <h3 className="text-title-md text-on-surface mb-sm">{title}</h3>
              <p className="text-body-sm text-on-surface-variant">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
