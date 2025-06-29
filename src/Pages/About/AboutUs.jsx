import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="min-h-screen pb-2">
      <div className="m-2 md:m-4">
        {/* Top One */}
        <div className="aboutmain flex flex-row justify-between items-center pr-4 pl-2 py-1">
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
        <section className="aboutmain p-3 px-4">
          <h1 class="text-xl md:text-2xl font-bold mb-4 text-center">
            About Nivra
          </h1>
          <p class="text-base md:text-lg mb-4 leading-relaxed text-center">
            <strong>Nivra</strong> is your smart weather companion. Whether
            you're dressing for a cold morning or planning an outdoor walk,
            Nivra gives you accurate forecasts and smart suggestions — like when
            to carry an umbrella or wear a jacket.
          </p>

          <div class="border-t border-white/30 my-6"></div>

          <h2 class="text-2xl font-semibold mb-2">🌟 Key Features</h2>
          <ul class="list-disc pl-5 space-y-1 text-base">
            <li>Daily and weekly forecasts</li>
            <li>Real-time outfit advice</li>
            <li>Mobile-first responsive design</li>
            <li>Simple, clean user interface</li>
            <li>Powered by accurate weather data</li>
          </ul>

          <div class="border-t border-white/30 my-6"></div>

          <h2 class="text-2xl font-semibold mb-2">🌍 Data Source</h2>
          <p class="text-base mb-4">
            Weather data provided by&nbsp;
            <span class="font-semibold text-blue-600">WeatherApi</span>
          </p>

          <div class="border-t border-white/30 my-6"></div>

          <h2 class="text-2xl font-semibold mb-2">📬 Contact & Feedback</h2>
          <p class="text-base">
            Have suggestions or feedback? We'd love to hear from you!
            <br />
            📧
            <a
              href="mailto:aimableukobizaba@gmail.com"
              class="text-blue-500 hover:underline"
            >
              aimableukobizaba@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
