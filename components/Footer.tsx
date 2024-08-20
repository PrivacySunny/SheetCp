// components/Footer.tsx

import React from "react";
import { FaHeart, FaLinkedin } from "react-icons/fa";
import { SiCodeforces } from "react-icons/si";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <hr className="border-t-3 border-white mb-6" />
        <div className="flex justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CpSheet. All rights reserved.
          </p>
          <FaHeart />
          <div className="flex gap-4 flex-row cursor-pointer">
            <div>
              <a
                href="https://www.linkedin.com/in/sunny-kumar-4821a2229/"
                target="_blank"
              >
                <FaLinkedin />
              </a>
            </div>
            <div>
              <a
                href="https://codeforces.com/profile/Last_Of_UsOO"
                target="_blank"
              >
                <SiCodeforces />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
