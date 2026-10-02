const badges = [
  'University Partners',
  'Certified Advisors',
  'Industry Memberships',
  'Visa Guidance Network',
  'Education Alliance',
  'Global Consultants',
];

export default function TrustSection() {
  return (
    <section className="bg-white border-y border-navy-100">
      <div className="container-page py-12">
        <p className="text-center text-xs font-bold tracking-[0.18em] uppercase text-navy-400 mb-8">
          Trusted by Students, Professionals & Families
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((b) => (
            <div
              key={b}
              className="flex items-center justify-center px-3 py-5 rounded-2xl bg-cream-100/70 border border-navy-100 hover:border-navy-200 transition-colors"
            >
              <span className="text-xs sm:text-[0.8rem] font-semibold text-navy-400 text-center leading-tight">
                {b}
              </span>
            </div>
          ))}
        </div>
        <p className="text-center text-[0.7rem] text-navy-300 mt-6">
          Placeholder partner badges — to be replaced with verified affiliations.
        </p>
      </div>
    </section>
  );
}