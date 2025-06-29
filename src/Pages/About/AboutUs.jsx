import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="aboutmain m-4">
      {/* Top One */}
      <div className="flex flex-row justify-between items-center pr-4 pl-2 py-1">
        <div>
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="back size-8 p-1 cursor-pointer active:scale-75 transition-all ease-in duration-150"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
              />
            </svg>
          </Link>
        </div>
        <p className="font-semibold">About Us - Nivra</p>
      </div>

      {/* About Main */}
    </div>
  );
};

export default AboutUs;
