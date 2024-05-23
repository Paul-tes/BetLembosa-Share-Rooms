"use client"
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import FormInput from "../common/FormInput";

const AuthModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userFound, setUserFound] = useState(null);

  const verifyEmail = async () => {
  };

  const handleLogin = async () => {
  };

  const handleSignup = async () => {
  };
  

  return (
    <div className="relative z-50">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white  pb-4 pt-5">
              <div className="border-b border-b-gray-200 flex items-center justify-center relative pb-5">
                <span
                  className="absolute left-5 cursor-pointer text-lg"
                  onClick={() => setAuthModal()}
                >
                  <IoMdClose />
                </span>
                {userFound === null ? (
                  <span>Log in or signup</span>
                ) : (
                  <span>
                    {userFound === true ? "Log in" : "Sign up"} {email}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-xl pb-5">Welcome to BetLembosa</h3>{" "}
                {userFound === null && (
                  <FormInput
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                  />
                )}
                {userFound === true && (
                  <FormInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                  />
                )}
                {userFound === false && (
                  <div className="flex gap-3 flex-col">
                    <FormInput
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={firstName}
                      setValue={setFirstName}
                    />
                    <FormInput
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={lastName}
                      setValue={setLastName}
                    />
                    <FormInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      setValue={setPassword}
                    />
                  </div>
                )}
                <button
                  className="bg-betlembosa-gradient  py-3 mt-5 w-full text-white text-lg font-medium rounded-md"
                  onClick={
                    userFound === null
                      ? verifyEmail
                      : userFound
                      ? handleLogin
                      : handleSignup
                  }
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
