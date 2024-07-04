import React from "react";
import { useAppStore } from "@/store/store";
import { Alert } from "@material-tailwind/react";
 

const AlertPop = ({message}) => {

  const closeAlert = ()=> {
    console.log("OnClose Alert it called");
    onClose();
  }
  return (
    <Alert
      color="red"
      className="p p-4 w-3/4 m-auto fixed top-20 left-0 right-0 animate-slide-down"
    >
      <div className="flex justify-around gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p>{message}</p>
      </div>
    </Alert>
  );
};

export default AlertPop;
