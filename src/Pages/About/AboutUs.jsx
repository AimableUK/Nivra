import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="min-h-screen pb-2">
      <div className="m-2 md:m-4 md:mx-10">
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
          <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">
            About Nivra
          </h1>
          <p className="text-base md:text-lg mb-4 leading-relaxed text-center">
            <strong>Nivra</strong> is your smart weather companion. Whether
            you're dressing for a cold morning or planning an outdoor walk,
            Nivra gives you accurate forecasts and smart suggestions — like when
            to carry an umbrella or wear a jacket.
          </p>

          <div className="border-t border-white/30 my-6"></div>

          <h2 className="text-2xl font-semibold mb-2">🌟 Key Features</h2>
          <ul className="list-disc pl-5 space-y-1 text-base">
            <li>Daily and weekly forecasts</li>
            <li>Real-time outfit advice</li>
            <li>Mobile-first responsive design</li>
            <li>Simple, clean user interface</li>
            <li>Powered by accurate weather data</li>
          </ul>

          <div className="border-t border-white/30 my-6"></div>

          <h2 className="text-2xl font-semibold mb-2">🌍 Data Source</h2>
          <p className="text-base mb-4">
            Weather data provided by&nbsp;
            <span className="font-semibold text-blue-600">
              <a href="https://www.weatherapi.com/" target="_blank">
                WeatherApi
              </a>
            </span>
          </p>

          <div className="border-t border-white/30 my-6"></div>

          <h2 className="text-2xl font-semibold mb-2">📬 Contact & Feedback</h2>
          <p className="text-base">
            Have suggestions or feedback? We'd love to hear from you!
            <br />
            📧
            <a
              href="mailto:aimableukobizaba@gmail.com"
              className="text-blue-500 hover:underline"
            >
              aimableukobizaba@gmail.com
            </a>
          </p>

          <div className="border-t border-white/30 my-6"></div>

          <div className="border-l-4 border-l-yellow-900 p-4 rounded-md mt-4 text-sm">
            <h4 className="font-bold mb-1">Disclaimer:</h4>
            <p>
              While we strive to provide accurate and timely weather data, there
              may occasionally be discrepancies in location detection or weather
              forecasts due to technical limitations or third-party data
              inaccuracies.
            </p>
            <p className="mt-1">
              If your current location is misidentified or the weather
              information appears incorrect, please try searching manually for
              your location or enabling GPS access if disabled.
            </p>
            <p className="mt-1 italic text-gray-600">
              We appreciate your understanding and are continuously working to
              improve accuracy and reliability.
            </p>
          </div>

          <div className="border-t border-white/30 my-6"></div>
          <p className="text-base mb-4">
            Made With
            <span role="img" aria-label="love">
              ❤️
            </span>
            by&nbsp;
            <span className="font-semibold text-blue-600">
              <a href="https://malos-technologies.vercel.app/" target="_blank">
                Malos Technologies
              </a>
            </span>
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
