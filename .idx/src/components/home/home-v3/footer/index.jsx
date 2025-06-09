import AppWidget from "./AppWidget";
import ContactMeta from "./ContactMeta";
import Copyright from "./Copyright";
import { Link } from "react-router-dom";
import MenuWidget from "./MenuWidget";
import Social from "./Social";
import Subscribe from "./Subscribe";

const Footer = () => {
  return (
    <>
      <div className="container">
        <div className="row bb-white-light pb30 mb60">
          <div className="col-sm-5">
            <div className="text-center footer-widget text-sm-start">
              <Link className="footer-logo" to="/">
                <img
                
                  className="mb40"
                  src="/images/header-logo.svg"
                  alt=""
                />
              </Link>
            </div>
          </div>
          {/* End .col */}

          <div className="col-sm-7">
            <div className="text-center social-widget text-sm-end">
              <Social />
            </div>
          </div>
          {/* End .col */}
        </div>
        {/* End .row */}

        <div className="row">
          <div className="col-md-6">
            <div className="row justify-content-between">
              <MenuWidget />
            </div>
          </div>
          {/* End .col */}

          <div className="col-md-6 col-lg-4 offset-lg-2">
            <div className="mb-4 footer-widget mb-lg-5">
              <ContactMeta />
              <div className="mb-4 footer-widget mb-lg-5">
                <div className="mb-4 mailchimp-widget mb-lg-5">
                  <h6 className="text-white title mb20">
                    Keep Yourself Up to Date
                  </h6>
                  <Subscribe />
                </div>
              </div>

              <AppWidget />
            </div>
          </div>
          {/* End .col */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}

      <Copyright />
      {/* End copyright */}
    </>
  );
};

export default Footer;
