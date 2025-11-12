import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-primary-50 text-primary-400 py-12 mt-16 relative z-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <h3 className="font-heading m-0 text-primary-100 font-extrabold text-2xl">SANVERSE</h3>
            </div>
            <p className="leading-relaxed opacity-90 text-white">
              Transforming education through <br />
              innovation and excellence.
              We prepare <br />
              students for a brighter future with <br />
               quality learning
              experiences.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="#"
                className="text-white hover:text-primary-100 text-xl transition-colors"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-white hover:text-primary-100 text-xl transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-white hover:text-primary-100 text-xl transition-colors"
              >
                <FaSquareXTwitter />
              </a>
              <a
                href="#"
                className="text-white hover:text-primary-100 text-xl transition-colors"
              >
                <FaTiktok />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading mb-4 text-primary-100 font-extrabold text-xl">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-white no-underline opacity-90 hover:opacity-300"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-white no-underline opacity-90 hover:opacity-50"
              >
                Services
              </Link>
              <Link
                to="/about"
                className="text-white no-underline opacity-90 hover:opacity-50"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-white no-underline opacity-90 hover:opacity-50"
              >
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading mb-4 text-primary-100 font-extrabold text-xl">Contact Info</h4>
            <div className="flex flex-col gap-2 text-white">
              <span className="opacity-90">KG 3 Street, Abuja, Nigeria</span>
              <span className="opacity-90">+234 803 123 4567</span>
              <span className="opacity-90">info@sanverse.com</span>
              <span className="opacity-90">Mon-Sun: 9AM - 10PM</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100/15 pt-4 text-center opacity-80">
          <p className="m-0 text-white">
            © 2025 SANVERSE. All rights reserved.|| Powered by{" "}
            <span className="font-bold text-primary-400">SANTECH</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
