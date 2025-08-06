import PortfolioGrid from "@/components/PortfolioGrid";

export default function PortfolioPage() {
  return (
    <div className="space-y-8 md:space-y-12">
      {/* Header */}
      <section className="text-center space-y-4 md:space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">Portfolio</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
          Explore my latest projects and technical work. Each project showcases different skills and technologies.
        </p>
      </section>

      {/* Projects Grid */}
      <section className="space-y-6 md:space-y-8">
        <PortfolioGrid />
      </section>
    </div>
  );
}