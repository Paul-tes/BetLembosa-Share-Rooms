"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import BetLembosaLogo from "../../svg/betlemobsaLogo.png"
import { RxHamburgerMenu } from "react-icons/rx"
import ContextMenu from "../common/ContextMenu";
import { useAppStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { getSearchListing } from "@/lib/host";
import AlertPop from "../common/Alert";

const Navbar = ({isHome}) => {

  const [error, setError] = useState("");

  const router = useRouter();

  // use state from zstand from appStore, AuthSlice
  // get setAuthModal mePthod in zstand metod.
  const { setAuthModal, userInfo, isLoggedIn, setUserInfo, setIsLoggedIn, setListings } = useAppStore();

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

  const handleSearch = async (event) => {

    event.preventDefault();
    const searchTerm = event.target.elements.searchInput.value;
    
    // call api for the new searched item
    try {
      const data = await getSearchListing(searchTerm);
      console.log("Searched item: ", data);
      setListings(data);
    } catch (error) {
      // set the error
      setError(error.message);
    }
  }

    // clearing ther error message and the alert.
    useEffect(() => {
      if (error) {
        const timer = setTimeout(() => {
          setError("");
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [error]);

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

        {isHome && (

        <form class="mx-auto w-1/3" onSubmit={handleSearch}>   
          <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
              </div>
              <input name="searchInput" type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Country, City..." required />
              <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
        )}
        
        <div className="flex-grow basis-0">
          <ul className="flex items-center justify-end gap-6 font-medium">
            <li
              className="cursor-pointer"
              onClick={() => router.push("/host")}
            >
              <span>ቤት ለምቦሳ | Host Now</span>
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
      
      {error && <AlertPop message={error}/>}
    </div>
  );
};

export default Navbar;
