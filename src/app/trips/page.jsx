"use client";
import CompactFooter from "@/components/footer/CompactFooter";
import { getUserTrips } from "@/lib/host";
import { useAppStore } from "@/store/store";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import TripCard from "@/components/views/TripCard";
import { Typography } from "@material-tailwind/react";
import { completeTripPayment } from "@/lib/host";

const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
  ssr: false,
});

export default function Page() {
  const router = useRouter();
  const { userInfo } = useAppStore();
  const [tripData, setTripData] = useState([]);
  const [homeData, setHomeData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const data = await getUserTrips();
      setTripData(data);
    };
    if (userInfo) {
      getData();
    }
  }, [userInfo]);

  const completePayment = async () => {
    const paymentProcessId = localStorage.getItem("PaymentProcessId");
    console.log("Complate Payement is Called: PayementId:", paymentProcessId);
    if (paymentProcessId) {
      try {
        const response = await completeTripPayment(paymentProcessId);
        if (response && response.status === 200) {
          console.log("Payment completed successfully:", response.data);
          // Optionally remove the PaymentProcessId from localStorage if no longer needed
          localStorage.removeItem("PaymentProcessId");
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error completing payment:", error);
      }
    }
  };

  useEffect(() => {
    completePayment();
  }, []);


  return (
    <>
      <Navbar />
      <div className="flex justify-start items-start">
        <div className="relative overflow-x-auto sm:rounded-lg w-full m-20 mt-32">
          {Array.isArray(tripData) && tripData.length > 0 ? (
            tripData.map((trip, index) => (
              <TripCard key={index} data={trip} />
            ))
          ) : (
            <Typography variant="h6" color="gray" className="m-20">
              No trips available.
            </Typography>
          )}
        </div>
      </div>
      <CompactFooter />
    </>
  );
}
