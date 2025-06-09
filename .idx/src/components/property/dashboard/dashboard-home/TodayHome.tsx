import React, { useState } from "react";

import { ImFileEmpty } from "react-icons/im";
import { Link } from "react-router-dom";

interface Reservation {
  id: number;
  guestName: string;
  status:
    | "checkingOut"
    | "currentlyHosting"
    | "arrivingSoon"
    | "upcoming"
    | "pendingReview";
  date: string;
}

const stats = [
  {
    title: "Average Rating",
    value: "4.9",
    description: "Your Rating has gone done",
    trend: "down",
  },
  {
    title: "New Bookings",
    value: "33",
    description: "Compared to (last month)",
    trend: "up",
  },
  {
    title: "Available Earnings",
    value: "$1289",
    description: "Compared to ($21340 last year)",
    trend: "up",
  },
  {
    title: "Total Properties",
    value: "0",
    description: "Compared to ($21340 last year)",
    trend: "up",
  },
];
const dummyReservations: Reservation[] = [
  {
    id: 1,
    guestName: "John Doe",
    status: "currentlyHosting",
    date: "2025-02-10",
  },
  {
    id: 2,
    guestName: "Jane Smith",
    status: "upcoming",
    date: "2025-02-15",
  },
];

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div className={`p-4 border border-gray-300 rounded-lg ${className}`}>
    {children}
  </div>
);

const Button: React.FC<{
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
}> = ({ onClick, active, children }) => (
  <button
    className={`px-2 py-2 rounded-full  border ${
      active ? "border-black" : "border-gray-300"
    } ${active ? "bg-gray-100" : "  bg-white"}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const TodayHome: React.FC = () => {
  const [reservations, setReservations] =
    useState<Reservation[]>(dummyReservations);
  const [selectedTab, setSelectedTab] = useState("checkingOut");

  const filteredReservations = reservations.filter(
    (res) => res.status === selectedTab
  );

  return (
    <div className="max-w-4xl p-6">
      {/* <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
        <div className="bg-[#FFC500] rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-black">
            Average Rating <span className="text-red-500">↓</span>
          </h3>
          <p className="mt-2 text-3xl font-bold text-white">4.9</p>
          <p className="mt-1 text-sm text-gray-200">
            Your Rating has gone down
          </p>
        </div>
        <div className="bg-[#FFC500] rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800">
            New Bookings <span className="text-green-500">↑</span>
          </h3>
          <p className="mt-2 text-3xl font-bold text-white">33</p>
          <p className="mt-1 text-sm text-gray-200">Compared to (last month)</p>
        </div>
        <div className="bg-[#FFC500] rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Available Earnings <span className="text-green-500">↑</span>
          </h3>
          <p className="mt-2 text-3xl font-bold text-white">$1289</p>
          <p className="mt-1 text-sm text-gray-200">
            
          </p>
        </div>
        <div className="bg-[#FFC500] rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Total Properties <span className="text-green-500">↑</span>
          </h3>
          <p className="mt-2 text-3xl font-bold text-white">0</p>
          <p className="mt-1 text-sm text-gray-200">
            Compared to ($21340 last year)
          </p>
        </div>
      </div> */}

      <div className="mt-4">
        <div className="flex items-center justify-between ">
          <h2 className="text-lg font-medium">Your reservations</h2>
          <Link to="/dashboard-my-favourites">
            <div className="font-medium underline cursor-pointer">
              All Reservations (0)
            </div>
          </Link>
        </div>
        <div className="flex gap-2 mt-2 overflow-x-auto whitespace-nowrap md:overflow-hidden">
          {[
            "checkingOut",
            "currentlyHosting",
            "arrivingSoon",
            "upcoming",
            "pendingReview",
          ].map((tab) => (
            <Button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              active={selectedTab === tab}
            >
              {tab.replace(/([A-Z])/g, " $1")} (
              {reservations.filter((r) => r.status === tab).length})
            </Button>
          ))}
        </div>
      </div>
      <div className="pt-6">
        {filteredReservations.length === 0 ? (
          <div>
            <Card className="flex flex-col items-center justify-center p-10 text-gray-500 bg-gray-100">
              <div className=" text-[30px]">
                <ImFileEmpty />
              </div>
              <p className=" mt-2 w-[33%] text-center">
                You don’t have any guests{" "}
                {selectedTab.replace(/([A-Z])/g, " $1")} today or tomorrow.
              </p>
            </Card>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReservations.map((reservation) => (
              <Card key={reservation.id}>
                <div className="flex items-center justify-between ">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {reservation.guestName}
                    </h3>
                    <p className="text-gray-600">{reservation.date}</p>
                  </div>
                  <div>
                    <p>{reservation.status}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayHome;
