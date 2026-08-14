const STATS = [
  { value: "10,000+", label: "Active Users" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "24/7", label: "Expert Support" },
];

export function StatsBar() {
  return (
    <section className="bg-surface-container border-b border-outline-variant">
      <div className="container-page py-md grid grid-cols-1 md:grid-cols-3 gap-md divide-y md:divide-y-0 md:divide-x divide-outline-variant text-center">
        {STATS.map((stat) => (
          <div key={stat.label} className="py-xs md:py-0">
            <div className="text-title-md text-primary mb-base font-semibold">{stat.value}</div>
            <div className="text-label-sm text-on-surface-variant uppercase tracking-widest">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
