import { companyData } from "@/constant/companyData";
import React from "react";

function Footer() {
  return (
    <div className="p-2 w-full flex justify-center">
      <div className=" sm:w-9/12 grid sm:grid-cols-2 grid-cols-1">
        <div className="text-sm  font-medium">
          {companyData.companyNameLong} - 2024
        </div>
        <div className="text-sm">
          construido por{" "}
          <span className="text-violet-700 font-medium text-clip">Kedevs</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
