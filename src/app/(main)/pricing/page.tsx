"use client";
import PricingModle from "@/components/PricingModle";
import { useSidebar } from "@/components/ui/sidebar";
import { UserDetailContext } from "@/context/userDetailContext";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import { Dot, Infinity, PanelLeftOpen } from "lucide-react";
import React, { useContext } from "react";

const page = () => {
  const { toggleSidebar } = useSidebar();
  const { user, setUser } = useContext(UserDetailContext);





  return (
    <>
    <div className="flex flex-col items-start justify-start">
      
      <div className="px-5 mb-10 mt-5 cursor-pointer ">
        <PanelLeftOpen onClick={toggleSidebar} />
      </div>
      <div className="w-full h-full flex flex-col items-center mt-3 p-10 md:px-20 lg:px-36">
        <h2 className="text-5xl upperacse font-bold">Pricing</h2>
        <p className="max-w-xl mt-3 text-center text-neutral-400">
          {Lookup.PRICING_DESC}
        </p>
        <div
          className="w-full flex items-center justify-between p-5 border rounded-lg mt-5"
          style={{ backgroundColor: Colors.BACKGROUND }}
        >
          <p className="flex items-center gap-1">
            <span>
              <Dot className="h-12 w-12 text-green-600 " />
            </span>
            <span className="font-bold">
              {" "}
              <p className="truncate ">
                {user.token > 10000000000000 ? <Infinity /> : user.token}
              </p>
            </span>{" "}
            Token Left
          </p>
          <div className="text-sm">
            <p>Need more token</p>
            <p>Upgrade Your Plane</p>
          </div>
        </div>
        <PricingModle/>
      </div>
      
    </div>
    </>
  );
};

export default page;
