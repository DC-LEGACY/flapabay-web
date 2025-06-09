import React from "react";

interface FooterMenuItem {
  label: string;
  link: string;
}

const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

const Footer: React.FC = () => {
  const footerMenuItems: FooterMenuItem[] = [
    {
      label: "Privacy",
      link: "#",
    },
    {
      label: "Terms",
      link: "#",
    },
    {
      label: "Sitemap",
      link: "#",
    },
  ];

  return (
    <div className="py-4 container-fluid container-fluidest white-bdrt1">
      <div className="row">
        <div className="col-sm-6">
          <div className="text-center text-lg-start">
            <p className="text-white copyright-text text-gray ff-heading">
              © FlapaBay &nbsp;{getCurrentYear()}{" "}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                Copyright
              </a>{" "}
              - All rights reserved
            </p>
          </div>
        </div>
        {/* End .col-sm-6 */}

        <div className="col-sm-6">
          <div className="text-center text-lg-end">
            <p className="text-white footer-menu ff-heading">
              {footerMenuItems.map((item, index) => (
                <React.Fragment key={index}>
                  <a className="text-white" href={item.link}>
                    {item.label}
                  </a>
                  {index !== footerMenuItems.length - 1 && " · "}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
        {/* End .col-sm-6 */}
      </div>
    </div>
  );
};

export default Footer; 