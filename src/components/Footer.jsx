// components/Footer.jsx
import Link from "next/link";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mt-12 bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Study Nook<span className="text-purple-400">Booking</span>
          </h2>
          <p className="text-purple-100/80 leading-7">
            Find and book the best rooms for your next stay.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-2 text-purple-100/80">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/rooms" className="hover:text-white transition">
                Rooms
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition">
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-2xl font-semibold mb-4">Contact</h3>

          <div className="space-y-2 text-purple-100/80 mb-5">
            <p>ummehabiba.com</p>
            <p>+880 01780644001</p>
          </div>

          <div className="flex gap-3">
            {[
              {
                icon: <FaFacebookF />,
                url: "https://facebook.com",
                hover: "hover:bg-blue-600",
              },
              {
                icon: <FaXTwitter />,
                url: "https://x.com",
                hover: "hover:bg-black",
              },
              {
                icon: <FaLinkedinIn />,
                url: "https://linkedin.com",
                hover: "hover:bg-blue-700",
              },
              {
                icon: <FaInstagram />,
                url: "https://instagram.com",
                hover: "hover:bg-pink-600",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition ${social.hover}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-4 text-center text-purple-200/80 text-sm">
        © {new Date().getFullYear()} Study Nook Booking. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
