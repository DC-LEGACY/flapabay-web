import React from "react";

const AppWidget = () => {
  const appList = [
    {
      icon: "fab fa-apple",
      text: "Download on the",
      title: "Apple Store",
      link: "#",
    },
    {
      icon: "fab fa-google-play",
      text: "Get it on",
      title: "Google Play",
      link: "#",
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      {appList.map((app, index) => (
        <a
          key={index}
          href={app.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-white text-black px-4 py-2 rounded-lg shadow hover:shadow-lg transition"
        >
          <i className={`${app.icon} text-2xl mr-3`} />
          <div>
            <p className="text-xs leading-tight">{app.text}</p>
            <h6 className="text-sm font-semibold">{app.title}</h6>
          </div>
        </a>
      ))}
    </div>
  );
};

export default AppWidget;
