import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import MetaData from "@/components/common/MetaData";
import TellGuestsabout from "@/components/property/dashboard/dashboard-calender/TellGuestsabout";
import HostCalendar from "@/components/dashboard/host/Calendar";

const metaInformation = {
  title: "Dashboard Properties || Flapabay- Apartment Rental, Experiences and More!",
};

const Dashboardcalender = () => {
  return (
    <>
    <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DashboardHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* dashboard_content_wrapper */}
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-xl">
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              <div className="row pb40">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
                {/* End .col-12 */}
              </div>
              {/* End .row */}

              <div className="row align-items-center pb40">
                
                <div className="col-xxl-12">
                  <HostCalendar/>
                </div>
              </div>
              {/* End .row */}

              
              {/* End .row */}
            </div>
            {/* End .dashboard__content */}

           
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default Dashboardcalender;
