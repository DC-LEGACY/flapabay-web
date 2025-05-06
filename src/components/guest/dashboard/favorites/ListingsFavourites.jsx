import React, { useState, useRef } from "react";

const Reservations = () => {
  const [selectedTab, setSelectedTab] = useState("Upcoming");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const printRef = useRef(null); // Reference for the printable section

  const tabs = ["Upcoming", "Completed", "Canceled", "All"];

  const reservations = [
    {
      id: 1,
      name: "John Doe",
      date: "2025-02-15",
      location: "New York, NY",
      status: "Upcoming",
    },
    {
      id: 2,
      name: "Jane Smith",
      date: "2025-02-20",
      location: "Los Angeles, CA",
      status: "Upcoming",
    },
  ];

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const filteredReservations = reservations.filter(
    (reservation) => selectedTab === "All" || reservation.status === selectedTab
  );

  const handlePrint = () => {
    const printContent = printRef.current;
    if (printContent) {
      const printWindow = window.open("", "", "width=800,height=600");
      printWindow.document.write("<html><head><title>Print</title></head><body>");
      printWindow.document.write(printContent.innerHTML);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Reservations</h1>
        <div className="flex gap-4">
          <button
            className="p-2 rounded-lg border border-black hover:shadow-lg"
            onClick={() => setShowFilterModal(true)}
          >
            Filter
          </button>
          <button
            className="p-2 rounded-lg border border-black hover:shadow-lg"
            onClick={() => setShowExportModal(true)}
          >
            Export
          </button>
          <button
            className="p-2 rounded-lg border border-black hover:shadow-lg"
            onClick={handlePrint}
          >
            Print
          </button>
        </div>
      </div>

      <div className="flex border-b mb-6 w-[45%]">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`flex-1 text-center p-2 border-b-2 text-lg ${
              selectedTab === tab
                ? "border-black font-medium"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Printable Section */}
      <div ref={printRef}>
        {filteredReservations.length > 0 ? (
          <div className="space-y-4">
            {filteredReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="p-4 rounded-lg flex justify-between items-center"
              >
                <div className="items-center">
                  <h2 className="text-lg font-semibold">{reservation.name}</h2>
                  <p className="text-sm text-gray-500">{reservation.date}</p>
                </div>
                <p className="text-sm text-gray-600">{reservation.location}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center pt-24 pb-10">
            <p className="text-lg font-semibold text-gray-500">
              You have no upcoming reservations
            </p>
            <a href="#" className="text-black font-semibold text-lg underline mt-2 block">
              See all reservations
            </a>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowFilterModal(false);
            }
          }}
        >
          <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                className="text-gray-500 hover:text-black"
                onClick={() => setShowFilterModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Select a listing</label>
              <select className="w-full border rounded-lg p-2">
                <option value="">Select a listing</option>
                <option value="listing1">Listing 1</option>
                <option value="listing2">Listing 2</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Reservations that start or end within the following dates
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  className="w-full border rounded-lg p-2"
                  placeholder="From"
                />
                <input
                  type="date"
                  className="w-full border rounded-lg p-2"
                  placeholder="Until"
                />
              </div>
            </div>
            <button
              className="w-full bg-black text-white py-2 rounded-lg"
              onClick={() => setShowFilterModal(false)}
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowExportModal(false);
            }
          }}
        >
          <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Export Options</h2>
              <button
                className="text-gray-500 hover:text-black"
                onClick={() => setShowExportModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="mb-4">
              <a
                href="#"
                className="block text-black underline text-lg hover:underline mb-2"
              >
                Download CSV file...
              </a>
              <a
                href="#"
                className="block text-black underline text-lg hover:underline"
              >
                Sync your reservations...
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservations;
