'use client'
import Lookup from "@/data/Lookup";
import React, { useContext } from "react";
<<<<<<< HEAD
=======
import { loadStripe } from "@stripe/stripe-js";
>>>>>>> f410b72d9312a407c68f1241bdcd6bb6c90561de
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserDetailContext } from "@/context/userDetailContext";

const PricingModle = () => {
  const router=useRouter()
  const {user,setUser}=useContext(UserDetailContext)

  const handleCheckout = async (option: any) => {
    
    try {
      const response = await axios.post("/api/checkout-payment", {
        token: option.value,
        price: option.price,
        userId:user._id,
        userToken:user.token
      });

      const session = await response.data;
      if(session.url){
        router.push(session.url)
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 py-12">
      {Lookup.PRICING_OPTIONS.map((option) => (
        <div
          key={option.name}
          className="relative overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-gray-900 p-8 transition-transform duration-300 hover:scale-105"
        >
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-20" />

          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {option.name}
          </h2>

          <div className="flex items-baseline mb-8">
            <span className="text-5xl font-extrabold text-gray-900 dark:text-gray-50">
              ${option.price}
            </span>
            <span className="ml-1 text-xl text-gray-500 dark:text-gray-400">
              /mo
            </span>
          </div>

          <p className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-4">
            {option.tokens} tokens
          </p>

          <p className="text-gray-600 dark:text-gray-200 mb-8">{option.desc}</p>

          <button
            onClick={() => handleCheckout(option)}
            className="w-full py-4 px-8 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-purple-700 hover:opacity-90 transition-opacity"
          >
            Choose Plan
          </button>
        </div>
      ))}
    </div>
  );
};

export default PricingModle;
