import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import sanlogo from "../assets/snverse.png";

const Footer = () => {
  return (
    <footer className="bg-primary-50 text-primary-400 py-8 mt-16 relative z-20 min-h-[300px] flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center">
              <img
                src={sanlogo}
                alt="Logo"
                className="w-40 h-30 mr-2 object-contain"
              />
            </div>
            <p className="leading-relaxed opacity-90 text-white">
              Transforming education through <br />
              innovation and excellence. We prepare <br />
              students for a brighter future with <br />
              quality learning experiences.
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
            <h4 className="font-heading mb-4 text-primary-100 font-extrabold text-xl">
              Quick Links
            </h4>
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
            <h4 className="font-heading mb-4 text-primary-100 font-extrabold text-xl">
              Contact Info
            </h4>
            <div className="flex flex-col gap-2 text-white">
              <span className="opacity-90">
                Plot 48, KN 1 Road, <br /> Sofaru Building
                <br />
                Kigali, Rwanda
              </span>
              <span className="opacity-90">
                +250780309833
                <br />
                +22371005873
              </span>
              <span className="opacity-90">info@santechinnovate.com</span>
              <span className="opacity-90">Mon-Sun: 8AM - 10PM</span>
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
