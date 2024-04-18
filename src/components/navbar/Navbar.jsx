import React from "react";
import Image from "next/image";
import BetLembosaLogo from "../../svg/betlemobsaLogo.png"
import { FiGlobe } from "react-icons/fi"
import { RxHamburgerMenu } from "react-icons/rx"


const Navbar = () => {
  return <div>
    <header className="w-full flex flex-col justify-center transition-all duration-30 h-20 border-b border-b-gray-200">
      <div className="flex items-center justify-between px-20">
        <div className="flex-grow basis-0">
          <div className="w-max cursor-pointer">
           <Image
            src={BetLembosaLogo}
            alt="BetLembosa Logo"
            width={150}
          />
          </div>
        </div>
        <div className="flex-grow basis-0">
          <ul className="flex items-center justify-end gap-6 font-medium">
            <li className="cursor-pointer">
              <span>ቤት ለምቦሳ | ለምቦሳ ሳሮ</span>
            </li>
            <li className="cursor-pointer">
            <FiGlobe />
            </li>
            <li className="flex cursor-pointer items-center gap-2 border border-gray-300 py-2 px-3 rounded-full hover:shadow-xl transition-all duration-500">
              <RxHamburgerMenu />
              <span>
                <Image 
                  src = "/empty-profile.png"
                  alt="profile picture"
                  height={30}
                  width={30}
                />
              </span>
            </li>
          </ul>          
        </div>
      </div>
    </header>
  </div>;
};

export default Navbar;
