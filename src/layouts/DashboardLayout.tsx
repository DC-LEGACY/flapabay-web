import { Outlet } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/feedback/tooltip';
import DashboardHeader from '@/components/common/DashboardHeader';
import SidebarDashboard from '@/components/property/dashboard/SidebarDashboard';
import DboardMobileNavigation from '@/components/property/dashboard/DboardMobileNavigation';
import MetaData from '@/components/common/MetaData';
import MobileMenu from '@/components/common/MobileMenu';
import Footer from '@/components/common/Footer';
import { usePage } from '@/contexts/PageContext';

const defaultMetaInformation = {
  title: "Dashboard - Flapabay",
  description: "User dashboard"
};

const DashboardLayout = () => {
  const { pageTitle, pageSubtitle } = usePage();

  return (
    <>
      <MetaData meta={{...defaultMetaInformation, title: `${pageTitle} - Flapabay` }} />
      <DashboardHeader />
      <MobileMenu />

      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-md flex">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto z-40">
            <SidebarDashboard />
          </div>
          <div className="dashboard__main pl0-md flex-grow overflow-y-auto">
            <div className="dashboard__content property-page bgc-f7">
             

              {/* <div className="row align-items-center pb40">
                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2>{pageTitle}</h2>
                    <p className="text">{pageSubtitle}</p>
                  </div>
                </div>
              </div> */}

              <div className="row">
                <div className="col-xl-12">
                  <TooltipProvider>
                    <Outlet />
                  </TooltipProvider>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;