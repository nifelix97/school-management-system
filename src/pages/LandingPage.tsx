import HeroSection from "../components/HeroSection";


// Stats Section
const StatsSection = () => {
  const stats = [
    { number: "50K+", label: "Students" },
    { number: "500+", label: "Teachers" },
    { number: "1000+", label: "Programs" },
    { number: "70%", label: "Usage Rate" },
  ];

  return (
    <section className="py-16 sm:py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-50 mb-12">
              Why Choose Our System?
            </h2>
            <p className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto">
              Our commitment to excellence has led to the creation of world-class learning experiences.
            </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-100 mb-2">
                {stat.number}
              </div>
              <div className="text-base sm:text-lg text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


// Main Landing Page
const LandingPage = () => {
  return (
    <div className="w-full overflow-x-hidden">
        <HeroSection />
      <StatsSection />
    </div>
  );
};

export default LandingPage;
