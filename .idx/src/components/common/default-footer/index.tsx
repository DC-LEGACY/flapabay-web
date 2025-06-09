import React from 'react';
import ContactMeta from './ContactMeta';
import Copyright from './Copyright';
import Social from './Social';
import Subscribe from './Subscribe';
import MenuWidget from './MenuWidget';
import AppWidget from './AppWidget';
import { Link } from 'react-router-dom';


const DefaultFooter = () => {
  return (
    <>
      <div className="z-0 transition-all duration-300 bg-flapabay-yellow ">
        <div className="container-fluid container-fluidest ">
          <div className="row">
            <div className="col-lg-5">
              <div className="mb-4 footer-widget mb-lg-5">
                <Link className="footer-logo" to="/">
                  <div
                    style={{ width: "12rem", padding: "15px 15px 15px 15px !important" }}
                    className="bg-white  rounded-2xl mb-4 px-3 flex justify-start"
                  >
                    <img
                      className="w-full"
                      src="/images/footer-logo.svg"
                      alt="Footer Logo"
                    />
                  </div>
                </Link>
                <ContactMeta />
                <AppWidget />
                <div className="social-widget">
                  <h6 className="text-white mb20">Follow us on social media</h6>
                  <Social />
                </div>
              </div>
            </div>
            {/* End .col-lg-5 */}

            <div className="col-lg-7">
              <div className="mb-4 footer-widget mb-lg-5">
                <Subscribe />
                <div className="row justify-content-between">
                  <MenuWidget />
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}

        <Copyright />
        {/* End copyright */}
      </div>
    </>
  );
};

export default DefaultFooter; 