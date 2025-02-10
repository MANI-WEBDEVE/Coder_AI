'use client'
import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PaymentSuccessPage: React.FC = () => {
const router=useRouter()
    useEffect(()=>{
        setTimeout(()=>{
            router.push('/')
        },5000)
    },[])

  return (
    <div className="flex flex-col w-full  items-center justify-center h-screen  text-white text-center">
      <CheckCircle size={64} className="text-green-500 animate-bounce" />
      <h1 className="text-2xl my-4">Payment Successful</h1>
      <p className="text-base my-2">
        Thank you for your purchase! Your payment has been processed
        successfully.
      </p>
      <Button
        variant={"outline"}
        className="px-3 py-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-none rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
      >
        <Link href="/" className="text-lg foont-medium">Go to Chat</Link>
      </Button>
    </div>
  );
};

export default PaymentSuccessPage;
