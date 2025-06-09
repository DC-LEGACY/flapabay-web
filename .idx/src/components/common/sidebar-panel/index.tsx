import ContactInfo from "./ContactInfo";
import MenuItems from "./MenuItems";
import SocialLinks from "./SocialLinks";

const SidebarPanel: React.FC = () => {
  return (
    <div className="rightside-hidden-bar">
      <div className="hsidebar-header">
        <div
          className="sidebar-close-icon"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <span className="far fa-times"></span>
        </div>
        <h4 className="title">Welcome to Flapabay</h4>
      </div>

      <div className="hsidebar-content">
        <div className="hiddenbar_navbar_content">
          <div className="pl-8 hiddenbar_navbar_menu justify-center">
            <MenuItems />
          </div>

          <div className="hiddenbar_footer position-relative bdrt1">
            <div className="row pt45 pb30 pl30">
              <ContactInfo />
            </div>

            <div className="row pt30 pb30 bdrt1">
              <div className="col-auto">
                <div className="social-style-sidebar d-flex align-items-center pl30">
                  <h6 className="mb-0 me-4">Follow us</h6>
                  <SocialLinks />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarPanel; 