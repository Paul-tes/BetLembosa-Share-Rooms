"use client";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import AuthModal from "@/components/auth/AuthModal";
import React from "react";
import { useAppStore } from "@/store/store";

const Home = () => {

  // AuthModalState
  const { isAuthModalOpen } = useAppStore();

  return <div>
    <Navbar/>
    <Footer />
    {
      isAuthModalOpen && <AuthModal />
    }
  </div>;
};

export default Home;
