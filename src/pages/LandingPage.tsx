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


// Partners Section with Horizontal Scrolling Animation
const PartnersSection = () => {
  const partners = [
    { name: "Microsoft", logo: "https://img.icons8.com/color/96/microsoft.png" },
    { name: "Google", logo: "https://img.icons8.com/color/96/google-logo.png" },
    { name: "Apple", logo: "https://img.icons8.com/ios-filled/100/mac-os.png" },
    { name: "Amazon", logo: "https://img.icons8.com/color/96/amazon.png" },
    { name: "Meta", logo: "https://img.icons8.com/color/96/meta.png" },
    { name: "IBM", logo: "https://img.icons8.com/color/96/ibm.png" },
    { name: "Oracle", logo: "https://img.icons8.com/color/96/oracle-logo.png" },
    { name: "SAP", logo: "https://img.icons8.com/color/96/sap.png" },
  ];

  // Duplicate partners array for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-200 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-50 mb-4">
            Our Partners
          </h2>
          <p className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto">
            Trusted by leading organizations worldwide
          </p>
        </div>

        {/* Scrolling Container */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

          {/* Animated Scrolling Track */}
          <div className="flex animate-scroll hover:pause-animation">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-6 sm:mx-8 lg:mx-12 group"
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex items-center justify-center bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

// Main Landing Page
const LandingPage = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection />
      <StatsSection />
      <PartnersSection />
    </div>
  );
};

export default LandingPage;
