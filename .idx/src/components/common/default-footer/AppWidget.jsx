import React from "react";

const AppWidget = () => {
  const appList = [
    {
      icon: "text-white fab fa-apple fz30",
      text: "Download on the",
      title: "Apple Store",
      link: "#",
    },
    {
      icon: "text-white fab fa-google-play fz30 text-white",
      text: "Get it on",
      title: "Google Play",
      link: "#",
    },
  ];

  return (
    <div className="app-widget">
      <h5 className="text-white title mb10">Apps</h5>
      <div className="mb-4 row mb-lg-5">
        {appList.map((app, index) => (
          <div className="col-auto" key={index}>
            <a href={app.link} target="_blank" rel="noopener noreferrer">
              <div className="mb-10 app-info d-flex align-items-center mb20">
                <div className="flex-shrink-0">
                  <i className={app.icon} />
                </div>
                <div className="flex-grow- ml20">
                  <p className="app-text fz13 mb0">{app.text}</p>
                  <h6 className="text-white app-title fz14">{app.title}</h6>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppWidget;
