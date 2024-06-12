"use client"
import { me } from "@/lib/auth";
import { useAppStore } from "@/store/store";
import { useEffect } from "react";

// when refereshing the url
// mount the user info datas

const NavigationEvents = () => {
  const { userInfo, setUserInfo } = useAppStore();
  
  useEffect(() => {
    if(!userInfo) {
      const getUserData = async () => {
        const data = await me();
        setUserInfo(data);
      }

      // call user info data
      getUserData();
    }
  }, [userInfo]);

  return null;
};

export default NavigationEvents;
