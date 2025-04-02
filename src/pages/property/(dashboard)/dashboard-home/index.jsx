import DashboardHeader from "@/components/common/DashboardHeader";
import Footer from "@/components/property/dashboard/Footer";
import MetaData from "@/components/common/MetaData";
import MobileMenu from "@/components/common/mobile-menu";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import TodayHome from "@/components/property/dashboard/dashboard-home/TodayHome";
import TopStateBlock from "@/components/property/dashboard/dashboard-home/TopStateBlock";
import Dashboard from "@/components/dashboard/host/Dashboard";

const metaInformation = {
  title: "Dashboard Home || Flapabay- Apartment Rental, Experiences and More!",
};

const DashboardHome = () => {
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
             
              {/* End .row */}

              {/* End .row */}

              <div className="row">
                <div>
                  
                  <div className="pb-10 col-lg-12">
                    <div className="dashboard_title_area">
                    <h1 className="pb-3 text-3xl font-semibold">Welcome back, George</h1>
                      <p className="text">We are glad to see you again!</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="overflow-hidden ps-widget bgc-white bdrs12 default-box-shadow2 mb30 position-relative">
                    <div className="">
                     {/* <TopStateBlock /> */}
                     
                      <Dashboard />
                    </div>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DashboardHome;
