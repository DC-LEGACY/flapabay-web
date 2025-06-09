import React from "react";

const statisticsData = [
  {
    text: "Average Rating ",
    title: "583",
    icon: "flaticon-home",
    stat_icon: "↓",
    stat_col: "text-red-500",
    comment: " Your Rating has gone down"
  },
  {
    text: "New Bookings",
    title: "192",
    icon: "flaticon-search-chart",
    stat_icon: "↑",
    stat_col: "text-green-500",
    comment: " Your Rating has gone up"
  },
  {
    text: " Available Earnings",
    title: "$3438",
    icon: "flaticon-review",
    stat_icon: "↓",
    stat_col: "text-red-500",
    comment: "Compared to ($21340 last year)"
  },
  {
    text: "Total Properties",
    title: "67",
    icon: "flaticon-like",
    stat_icon: "↑",
    stat_col: "text-green-500",
    comment: " Your Rating has gone Up"
  },
];

const TopStateBlock = () => {
  return (
    <>
      <div className="max-w-4xl">
        <div className="p-6 row ">
          {statisticsData.map((data, index) => (
            <div key={index} className="col-sm-6 col-xxl-3">
            <div className="bg-[#FFC500] rounded-2xl shadow-md p-6 statistics_funfact">
              <div className="d-flex justify-content-between">
                <div className="details">
                  <div className="text fz25">
                    {data.text} <span className={data.stat_col}>{data.stat_icon}</span>
                  </div>
                  <div className="title">{data.title}</div>
                </div>
                <div className="bg-[#FFC500] text-center icon">
                  <i className={data.icon} />
                </div>
              </div>
              <p className="mt-1 text-sm text-white">{data.comment}</p> {/* Added description here */}
            </div>
          </div>
          
          ))}
        </div>
      </div>
    </>
  );
};

export default TopStateBlock;
