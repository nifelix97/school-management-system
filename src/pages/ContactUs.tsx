import React, { useState } from 'react';
import {
    FaBuilding,
    FaClock,
    FaEnvelope,
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaMapMarkerAlt,
    FaPaperPlane,
    FaPhone,
    FaTwitter,
    FaUser
} from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Phone',
      details: ['+250 788 123 456', '+250 788 654 321'],
      color: 'primary-50'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      details: ['info@school.edu', 'admissions@school.edu'],
      color: 'primary-50'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Address',
      details: ['123 Education Street', 'Kigali, Rwanda'],
      color: 'primary-50'
    },
    {
      icon: FaClock,
      title: 'Working Hours',
      details: ['Mon - Fri: 8:00 AM - 5:00 PM', 'Sat: 9:00 AM - 1:00 PM'],
      color: 'primary-50'
    }
  ];

  const socialLinks = [
    { icon: FaFacebookF, url: '#', label: 'Facebook', color: 'primary-50' },
    { icon: FaTwitter, url: '#', label: 'Twitter', color: 'primary-50' },
    { icon: FaLinkedinIn, url: '#', label: 'LinkedIn', color: 'primary-50' },
    { icon: FaInstagram, url: '#', label: 'Instagram', color: 'primary-50' }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-50 via-primary-50 to-primary-50 text-primary-100">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center animate-[fadeIn_0.8s_ease-out]">
            <FaBuilding className="text-5xl sm:text-6xl lg:text-7xl mx-auto mb-6 opacity-90" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
              Get In Touch
            </h1>
            <p className="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto opacity-95 px-4">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
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

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 lg:-mt-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-[slideUp_0.6s_ease-out] group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-${info.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <info.icon className="text-2xl sm:text-3xl text-primary-100" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-primary-50 mb-3">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-sm sm:text-base text-primary-50 mb-1">
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 animate-[slideUp_0.8s_ease-out]">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-6 sm:mb-8">
              Send Us a Message
            </h2>

            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-[scaleIn_0.3s_ease-out]">
                <p className="text-green-700 flex items-center gap-2">
                  <FaPaperPlane className="text-primary-300" />
                  Thank you! Your message has been sent successfully.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-primary-50 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-50/40" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 sm:py-4 border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 border-primary-50/40 text-primary-50 focus:ring-primary-100 focus:border-transparent transition-all duration-200 outline-none text-sm sm:text-base`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-primary-50 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-50/40" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 sm:py-4 border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 border-primary-50/40 text-primary-50 focus:ring-primary-100 focus:border-transparent transition-all duration-200 outline-none text-sm sm:text-base`}
                    placeholder="your.email@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-primary-50 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 sm:py-4 border ${
                    errors.subject ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 border-primary-50/40 text-primary-50 focus:ring-primary-100 focus:border-transparent transition-all duration-200 outline-none text-sm sm:text-base`}
                  placeholder="What is this regarding?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-primary-50 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 sm:py-4 border ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg border-primary-50/40 text-primary-50 focus:ring-2 focus:ring-primary-100 focus:border-transparent transition-all duration-200 outline-none resize-none text-sm sm:text-base`}
                  placeholder="Tell us more about your inquiry..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary-50 via-primary-50 to-primary-50 text-white py-3 sm:py-4 px-6 rounded-lg font-semibold text-base sm:text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Map & Social Media */}
          <div className="space-y-6 sm:space-y-8">
            {/* Map */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-[slideUp_0.8s_ease-out] h-64 sm:h-80 lg:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.5285447896847!2d30.057149875634204!3d-1.9393202980086842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca54594ea006b%3A0xb6c437b36f83461a!2sSAN%20TECH%20-%20Making%20your%20ideas%20happen%20!!5e0!3m2!1sen!2srw!4v1733395200000!5m2!1sen!2srw"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="School Location"
              />
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 animate-[slideUp_1s_ease-out]">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                Connect With Us
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    aria-label={social.label}
                    className={`bg-${social.color} text-primary-100 p-4 sm:p-5 rounded-xl flex flex-col items-center justify-center gap-2 sm:gap-3 hover:shadow-lg hover:scale-110 transition-all duration-300 group`}
                  >
                    <social.icon className="text-2xl sm:text-3xl group-hover:rotate-12 transition-transform duration-300" />
                    <span className="text-xs sm:text-sm font-semibold">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-50 rounded-2xl shadow-xl p-6 sm:p-8 text-white animate-[slideUp_1.2s_ease-out]">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Need Immediate Assistance?
              </h3>
              <p className="text-sm sm:text-base mb-6 opacity-95">
                For urgent matters, please call our main office during business hours. Our team is ready to help you.
              </p>
              <a
                href="tel:+250780309833"
                className="inline-flex items-center gap-2 bg-primary-100 text-primary-50 px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <FaPhone className='text-primary-50' />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-50 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-primary-50 max-w-2xl mx-auto">
              Find quick answers to common questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-primary-50">
            {[
              {
                question: 'What are your admission requirements?',
                answer: 'Our admission requirements vary by program. Please contact our admissions office for detailed information about specific programs.'
              },
              {
                question: 'How can I schedule a campus tour?',
                answer: 'You can schedule a campus tour by calling our main office or filling out the contact form above. We offer tours Monday through Friday.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept various payment methods including bank transfers, mobile money, and credit cards. Contact our finance office for more details.'
              },
              {
                question: 'Do you offer scholarships?',
                answer: 'Yes, we offer various scholarship programs based on academic merit and financial need. Visit our admissions office for more information.'
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 animate-[scaleIn_0.6s_ease-out]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h4 className="text-base sm:text-lg font-bold text-primary-50 mb-3">
                  {faq.question}
                </h4>
                <p className="text-sm sm:text-base text-primary-50">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
