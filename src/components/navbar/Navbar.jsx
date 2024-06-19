"use client";

import React, { useState } from "react";
import Image from "next/image";
import BetLembosaLogo from "../../svg/betlemobsaLogo.png"
import { RxHamburgerMenu } from "react-icons/rx"
import ContextMenu from "../common/ContextMenu";
import { useAppStore } from "@/store/store";
import { useRouter } from "next/navigation";

const Navbar = () => {

  const router = useRouter();

  // use state from zstand from appStore, AuthSlice
  // get setAuthModal mePthod in zstand metod.
  const { setAuthModal, userInfo, isLoggedIn, setUserInfo, setIsLoggedIn } = useAppStore();

  // use state for top navBar unmberger menue
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false)

  // list of options that are appear in menu
  const contextMenuOptions = [
    {
      name: "LogIn",
      callBack: () => {
        setAuthModal();
        setIsContextMenuVisible(false); // when the list item is clicked the contextMenue should be closed, so we passed the clossing method as a function paramter.
      }
    },

    {
      name: "SignUp",
      callBack: () => {
        setAuthModal();
        setIsContextMenuVisible(false);
      }
    },

    {
      name: "Stay BetLembosa",
      callBack: () => {
        setIsContextMenuVisible(false);
      }
    },

    {
      name: "Help",
      callBack: () => {
        setIsContextMenuVisible(false);
      }
    }
  ];

  const authenticatedContextMenuOptions = [
    {
      name: "Messages",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Notifications",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Trips",
      callBack: () => {
        router.push("/trips");
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Wishlists",
      callBack: () => {
        router.push("/wishlist");
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Manage Hosts",
      callBack: () => {
        router.push("/my-hosts");
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Account",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Help",
      callBack: () => {
        setIsContextMenuVisible(false);
      },
    },
    {
      name: "Logout",
      callBack: () => {
        setIsContextMenuVisible(false);
        setIsLoggedIn(false);
        setUserInfo(null);
        localStorage.clear();
      },
    },
  ];

  return (
    <div className="fixed z-50 bg-white shadow-md w-full flex flex-col justify-center transition-all duration-30 h-20 border-b border-b-gray-200">
      <div className="flex items-center justify-between px-20">
        <div className="flex-grow basis-0">
          <div className="w-max cursor-pointer">
           <Image
            src={BetLembosaLogo}
            alt="BetLembosa Logo"
            width={180}
            onClick={() => router.push("/")}
          />
          </div>
        </div>
        <div className="flex-grow basis-0">
          <ul className="flex items-center justify-end gap-6 font-medium">
            <li
              className="cursor-pointer"
              onClick={() => router.push("/host")}
            >
              <span>ቤት ለምቦሳ | ለምቦሳ ሳሮ</span>
            </li>
            <li
              className="flex cursor-pointer items-center gap-4 border border-gray-300 py-2 px-3 rounded-full hover:shadow-xl transition-all duration-500"
              onClick={() => setIsContextMenuVisible(true)}
            >
              <RxHamburgerMenu />
              <span>
                {userInfo ? (
                  <span className="flex justify-center items-center bg-black text-white h-7 w-7 text-sm rounded-full">
                    {userInfo?.userName?.split("").shift()?.toUpperCase()}
                  </span>
                ) : (
                  <Image
                    src="/empty-profile.png"
                    alt="profile"
                    height={30}
                    width={30}
                  />
                )}
              </span>
            </li>
          </ul>          
        </div>
      </div>
      {isContextMenuVisible && (
        <ContextMenu
          contextMenu={isContextMenuVisible}
          setContextMenue={setIsContextMenuVisible}
          cordinates={{ 
            x: window.innerWidth - 250,
            y: 70,
          }}
          optios={
            isLoggedIn == true ? authenticatedContextMenuOptions : contextMenuOptions
          }
        />
      )}
    </div>
  );
};

export default Navbar;
