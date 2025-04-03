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
    <div className="transition-all duration-300 ">
       <div className="container-fluid container-fluidest ">
        <div className="row">
          <div className="col-lg-5">
            <div className="mb-4 footer-widget mb-lg-5">
              <Link className="footer-logo" to="/">
                <div className="bg-white footer-logobg rounded-2xl mb40">                 
                  <img className="" src="/images/footer-logo.svg" alt="" />
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

export default Footer;
