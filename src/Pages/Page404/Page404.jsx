import React from "react";
import Nivra from "../../assets/Nivra.png";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center z-50">
      <div className="flex flex-row justify-between items-center">
        <img src={Nivra} alt="Nivra Logo" className="size-16" />
        <h4 className="font-semibold text-lg md:text-2xl text-slate-700">PAGE NOT FOUND</h4>
      </div>
      <span class="loader notFound"></span>
      <h4 className="absolute font-semibold text-lg md:text-2xl text-[#0870b7] -mt-10 -ml-2">
        404
      </h4>
      <Link to="/">
        <button className="bg-slate-200 p-2 px-4 rounded-md font-semibold text-[#0870b7]">
          Return to Home
        </button>
      </Link>
    </div>
  );
};

export default Page404;
