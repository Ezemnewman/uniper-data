import { Target, Eye } from "lucide-react";

const ABOUT_CARDS = [
  {
    icon: Target,
    title: "Our Mission",
    body: "To eliminate cognitive load through purposeful minimalism, providing professional rigor and high-velocity data management solutions that empower enterprise scaling.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    body: "To establish a standard of 'technical calm' in the industry, where complex data sets are managed with authoritative accessibility and absolute precision.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="container-page py-xl">
      <div className="text-center mb-lg">
        <h2 className="text-headline-lg-mobile md:text-headline-lg text-on-surface mb-sm">
          About Uniper Data
        </h2>
        <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">
          The precise navigator in a complex digital world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        {ABOUT_CARDS.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="bg-surface-container-lowest p-md md:p-lg rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-sm mb-md text-primary">
              <Icon size={22} aria-hidden="true" />
              <h3 className="text-title-md text-on-surface">{title}</h3>
            </div>
            <p className="text-body-md text-on-surface-variant">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
