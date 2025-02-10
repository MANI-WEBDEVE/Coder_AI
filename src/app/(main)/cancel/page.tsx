import React from "react";
import { XCircle } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen gap-3">
      <div className=" p-12 rounded shadow-md text-center">
        <XCircle className="w-16 h-16 text-red-500 mx-auto" />
        <h1 className="text-2xl font-bold mt-4 mb-5">Payment Cancelled</h1>
        <p className=" text-gray-600 mb-4">
          Your payment has been cancelled. If you have any questions, please
          contact support.
        </p>
        <Link
          href="/"
          className="mt-10 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
        >
          Go Back to Home
        </Link>{" "}
      </div>
    </div>
  );
};

export default page;
