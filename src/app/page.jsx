import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import AuthModal from "@/components/auth/AuthModal";
import React from "react";

const page = () => {
  return <div>
    <Navbar/>
    <Footer />
    <AuthModal />
  </div>;
};

export default page;
