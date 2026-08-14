import Image from "next/image";

const GALLERY_IMAGES = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMLEe5zVSHTHsz80d-6vS5Gw_eO4waOR_pXw64FJ2fGxgVuVTr6WPlImoOlCdMikrwSz3xxi0C63NFYWehN8qJbKN7jLBihqp5BXkdSAdjE1jTTZxmWgDzPkAF4-4Fuo0shDeFjQsbP8nUWPFt84FOt95-sEt0yxgp0xrYQBm81BV52VhJ5t9CYGCO2RLvTQp1LQNFShCs9VAaD5DFy2Me0CA2GtDq82YVnYcxC1HSVU6rboLtaEbo0A",
    alt: "Enterprise analytics dashboard displaying real-time data visualizations",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuATT_91fiAsa4uFFz0tXPQtiyEnOVDu1b_tbmKvK65Ijcz-2dwwG-4596nBoVVJTKmUOajydF0ovc50Y-FYLrsTiI9F4gjvqdSLg3NWBPt-Y314Tbq8PSNCHuJFSRZMQ4L_T_SjGgX5yanNUv7LXJT9CH7GBW2OdkW9HIOywDksWr1EdZtPtKy3qRU6Hs0eXS2tfVZ334dkF3jrPmLW2QeC2h_e4Awom2IQOPUvQd7WSoEjrXvRJekApg",
    alt: "Enterprise team reviewing data structures together in a conference room",
  },
];

export function GallerySection() {
  return (
    <section id="gallery" className="bg-surface-container-low border-y border-outline-variant py-xl">
      <div className="container-page">
        <div className="text-center mb-lg">
          <h2 className="text-headline-lg-mobile md:text-headline-lg text-on-surface mb-sm">
            Data in Action
          </h2>
          <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Visualizing performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {GALLERY_IMAGES.map((img) => (
            <div
              key={img.src}
              className="rounded-xl overflow-hidden border border-outline-variant shadow-sm h-64 relative bg-surface-container-lowest"
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
