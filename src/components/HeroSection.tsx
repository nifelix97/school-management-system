import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import bk from "../assets/bk.jpg";
import bg1 from "../assets/bk1.jpg";
import bg2 from "../assets/bk2.jpg";
import bg3 from "../assets/bk.jpg";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: "SM",
      title: "School Management",
      description:
        "Comprehensive management system for schools, colleges, and educational institutions with advanced features and tools.",
      color: "bg-primary-50",
      backgroundImage: bg1, // Unique background for this slide
    },
    {
      icon: "LM",
      title: "Learning Management",
      description:
        "Advanced platform for online learning, course management, and student progress tracking with real-time analytics.",
      color: "bg-primary-300",
      backgroundImage: bg2, // Unique background for this slide
    },
    {
      icon: "AS",
      title: "Assessment System",
      description:
        "Automated assessment and grading system with detailed performance analytics and personalized feedback.",
      color: "bg-primary-200",
      backgroundImage: bg3, // Unique background for this slide
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with Overlay - Main Hero Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(26, 66, 102, 0.95) 0%, rgba(37, 99, 145, 0.85) 50%, rgba(26, 90, 120, 0.9) 100%), 
                           url(${bk})`,
        }}
      >
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 -z-10 bg-primary-50/10 animate-[gradient_8s_ease_infinite] bg-[length:200%_200%]"></div>
      </div>

      {/* Content Container */}
      <div className="relative flex min-h-screen items-center px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="w-full max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8 text-white">
              <h1 className="text-xl sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                <div className="flex gap-3">
                  Transform Your Future with
                  <span className="text-primary-100"> {">"}</span>
                </div>
                <span className="relative inline-block">
                  <span className="text-primary-100">Quality Education</span>
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-2xl leading-relaxed">
                Join thousands of students who have achieved their dreams
                through our comprehensive educational programs. Experience
                learning like never before with our innovative approach.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="bg-primary-100 hover:bg-primary-100/90 text-primary-50 font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-base sm:text-lg">
                  Explore resources
                </button>
                <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105 text-base sm:text-lg">
                  Contact Us
                </button>
              </div>
            </div>
            {/* Right Card Slider */}
            <div className="relative">
              {/* Yellow background card - positioned behind */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 lg:top-6 lg:left-6 right-0 bottom-0 bg-primary-100 rounded-3xl -z-10"></div>

              {/* Main card - front */}
              <div
                className="backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden bg-center transition-all duration-700 ease-in-out relative"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(26, 66, 102, 0.95) 0%, rgba(37, 99, 145, 0.85) 50%, rgba(26, 90, 120, 0.9) 100%),
                        url(${slides[currentSlide].backgroundImage})`,
                }}
              >
                <div className="p-8 sm:p-10 lg:p-12 min-h-[400px] sm:min-h-[450px] flex flex-col">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-dashed border-primary-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl font-bold text-primary-100">
                        {slides[currentSlide].icon}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                      {slides[currentSlide].title}
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed">
                      {slides[currentSlide].description}
                    </p>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-primary-100/20">
                    <div className="flex gap-2">
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`h-2 rounded-full transition-all ${
                            index === currentSlide
                              ? "w-8 bg-primary-100"
                              : "w-2 bg-white/40 hover:bg-white/60"
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={prevSlide}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all backdrop-blur-sm"
                        aria-label="Previous slide"
                      >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all backdrop-blur-sm"
                        aria-label="Next slide"
                      >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Yellow accent bar at bottom */}
                <div className="h-2 w-full bg-primary-100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -z-10 top-20 right-20 w-32 h-32 bg-primary-100/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -z-10 bottom-20 left-20 w-40 h-40 bg-primary-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>
  );
};

export default HeroSection;
