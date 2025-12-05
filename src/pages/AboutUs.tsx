import React, { useEffect, useRef, useState } from 'react';
import {
    FaAward,
    FaBookOpen,
    FaChalkboardTeacher,
    FaChartLine,
    FaGlobe,
    FaGraduationCap,
    FaHandshake,
    FaHeart,
    FaLightbulb,
    FaTrophy,
    FaUserGraduate,
    FaUsers
} from 'react-icons/fa';

// Counter component with animation
interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={countRef}>{count.toLocaleString()}{suffix}</span>;
};

const AboutUs: React.FC = () => {
  const stats = [
    { icon: FaUserGraduate, value: 5000, suffix: '+', label: 'Students Enrolled', color: 'primary-50' },
    { icon: FaChalkboardTeacher, value: 200, suffix: '+', label: 'Expert Teachers', color: 'primary-50' },
    { icon: FaAward, value: 50, suffix: '+', label: 'Awards Won', color: 'primary-50' },
    { icon: FaGlobe, value: 30, suffix: '+', label: 'Countries Reached', color: 'primary-50' }
  ];

  const values = [
    {
      icon: FaLightbulb,
      title: 'Innovation',
      description: 'We embrace new ideas and technologies to enhance learning experiences.',
      color: 'primary-50'
    },
    {
      icon: FaHeart,
      title: 'Excellence',
      description: 'We strive for the highest standards in education and student care.',
      color: 'primary-50'
    },
    {
      icon: FaHandshake,
      title: 'Integrity',
      description: 'We uphold honesty, transparency, and ethical practices in all we do.',
      color: 'primary-50'
    },
    {
      icon: FaUsers,
      title: 'Community',
      description: 'We foster a supportive environment where everyone belongs and thrives.',
      color: 'primary-50'
    }
  ];

  const timeline = [
    {
      year: '2010',
      title: 'Foundation',
      description: 'Our school was established with a vision to provide quality education to all.',
      color: 'primary-50'
    },
    {
      year: '2015',
      title: 'Expansion',
      description: 'Opened new campus facilities and introduced advanced learning programs.',
      color: 'primary-50'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Implemented cutting-edge technology and online learning platforms.',
      color: 'primary-50'
    },
    {
      year: '2025',
      title: 'Global Recognition',
      description: 'Achieved international accreditation and expanded to multiple countries.',
      color: 'primary-50'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Principal',
      image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&size=200&background=2B4C7E&color=fff',
      color: 'primary-50'
    },
    {
      name: 'Prof. Michael Chen',
      role: 'Academic Director',
      image: 'https://ui-avatars.com/api/?name=Michael+Chen&size=200&background=2B4C7E&color=fff',
      color: 'primary-50'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Dean of Students',
      image: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&size=200&background=2B4C7E&color=fff',
      color: 'primary-50'
    },
    {
      name: 'Mr. David Williams',
      role: 'Head of Innovation',
      image: 'https://ui-avatars.com/api/?name=David+Williams&size=200&background=2B4C7E&color=fff',
      color: 'primary-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-50 via-primary-50 to-primary-50 text-primary-100">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="text-center animate-[fadeIn_0.8s_ease-out]">
            <FaGraduationCap className="text-5xl sm:text-6xl lg:text-7xl mx-auto mb-6 opacity-90" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
              About Our Institution
            </h1>
            <p className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto opacity-95 px-4 leading-relaxed">
              Empowering minds, shaping futures. We are committed to providing world-class education 
              that prepares students for success in an ever-changing global landscape.
            </p>
          </div>
        </div>
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249, 250, 251)"/>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 lg:-mt-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-[slideUp_0.6s_ease-out] group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="text-3xl sm:text-4xl text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-50 mb-2">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-sm sm:text-base text-gray-600 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Mission */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 animate-[slideUp_0.8s_ease-out] hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary-50 rounded-lg flex items-center justify-center">
                <FaBookOpen className="text-2xl sm:text-3xl text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-50">Our Mission</h2>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              To provide accessible, high-quality education that empowers students to reach their full potential. 
              We are dedicated to fostering critical thinking, creativity, and a lifelong love of learning in a 
              supportive and inclusive environment.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 animate-[slideUp_0.8s_ease-out] hover:shadow-2xl transition-shadow duration-300" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary-50 rounded-lg flex items-center justify-center">
                <FaChartLine className="text-2xl sm:text-3xl text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-50">Our Vision</h2>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
              To be a globally recognized leader in education, known for innovation, excellence, and our commitment 
              to developing well-rounded individuals who contribute positively to society and make a meaningful 
              impact in the world.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-50 mb-4">
              Our Core Values
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 sm:p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-[scaleIn_0.6s_ease-out] group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-${value.color} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                  <value.icon className="text-3xl sm:text-4xl text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-primary-50 mb-3">
                  {value.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-50 mb-4">
            Our Journey
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Milestones that shaped our institution
          </p>
        </div>

        <div className="relative">
          {/* Timeline line - hidden on mobile */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-50"></div>

          <div className="space-y-8 sm:space-y-12">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-4 sm:gap-6 lg:gap-8 animate-[slideUp_0.8s_ease-out] ${
                  index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Content */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <div className={`inline-block px-4 py-2 bg-${item.color} text-white rounded-full text-sm sm:text-base font-bold mb-4`}>
                      {item.year}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-primary-50 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden lg:flex w-2/12 justify-center">
                  <div className={`w-6 h-6 bg-${item.color} rounded-full border-4 border-white shadow-lg z-10`}></div>
                </div>

                {/* Spacer */}
                <div className="hidden lg:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership Team Section */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-50 mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals committed to your success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-[scaleIn_0.6s_ease-out] group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-${member.color} to-transparent opacity-60`}></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-primary-50 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 font-medium">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-50 via-primary-50 to-primary-50 text-white py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaTrophy className="text-4xl sm:text-5xl lg:text-6xl mx-auto mb-6 opacity-90 animate-[scaleIn_0.8s_ease-out]" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 animate-[fadeIn_1s_ease-out]">
            Join Our Community
          </h2>
          <p className="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 opacity-95 animate-[fadeIn_1.2s_ease-out]">
            Be part of an institution that values excellence, innovation, and your success. 
            Start your journey with us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-[slideUp_1.4s_ease-out]">
            <a
              href="/admissions"
              className="w-full sm:w-auto bg-white text-primary-50 px-8 py-4 rounded-lg font-semibold text-base sm:text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <FaGraduationCap />
              Apply Now
            </a>
            <a
              href="/contact-us"
              className="w-full sm:w-auto bg-primary-100 text-primary-50 px-8 py-4 rounded-lg font-semibold text-base sm:text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <FaUsers />
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
