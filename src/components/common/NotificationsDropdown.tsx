import React from "react";

export type NotificationType = {
  id: number;
  avatar: string;
  name: string;
  message: string;
  time: string;
  bold: string;
  unread: boolean;
  reply?: string;
  actions?: boolean;
};

interface NotificationsDropdownProps {
  activeTab: "all" | "unread" | "read";
  onTabChange: (tab: "all" | "unread" | "read") => void;
  notifications: NotificationType[];
}

const tabList = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "read", label: "Read" },
];

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ activeTab, onTabChange, notifications }) => {
  let filtered = notifications;
  if (activeTab === "unread") filtered = notifications.filter(n => n.unread);
  if (activeTab === "read") filtered = notifications.filter(n => !n.unread);

  return (
    <div className="absolute right-0 mt-2 w-[370px] max-h-[500px] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">
      <div className="flex px-4 pt-4 pb-2 border-b border-gray-100">
        {tabList.map(tab => (
          <button
            key={tab.key}
            className={`pb-2 px-2 mr-4 ${activeTab === tab.key ? "font-semibold text-black border-b-2 border-[#ffc500]" : "text-gray-400"}`}
            onClick={() => onTabChange(tab.key as any)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="divide-y divide-gray-100">
        {filtered.length === 0 && (
          <div className="px-4 py-8 text-center text-gray-400 text-sm">No notifications.</div>
        )}
        {filtered.map((notif) => (
          <div key={notif.id} className={`flex px-4 py-4 gap-3 items-start hover:bg-gray-50 transition group ${notif.unread ? "bg-[#fffbe6]" : ""}`}>
            <img src={notif.avatar} alt={notif.name} className="w-10 h-10 rounded-full object-cover mt-1" />
            <div className="flex-1 min-w-0">
              <div className="text-sm text-black">
                <span className="font-semibold">{notif.name}</span> {notif.message.split(notif.bold)[0]}
                <span className="font-bold">{notif.bold}</span>
                {notif.message.split(notif.bold)[1]}
              </div>
              {notif.reply && (
                <div className="text-xs text-gray-500 mt-1 border-l-2 border-[#ffc500] pl-2">
                  “{notif.reply}”
                </div>
              )}
              <div className="text-xs text-gray-400 mt-1">{notif.time}</div>
              {notif.actions && (
                <div className="flex gap-2 mt-2">
                  <button className="bg-[#ffc500] text-white rounded-lg px-3 py-1 text-xs font-semibold hover:bg-[#e6b800]">Approve</button>
                  <button className="bg-gray-100 text-gray-700 rounded-lg px-3 py-1 text-xs font-semibold hover:bg-gray-200">Decline</button>
                </div>
              )}
            </div>
            {notif.unread && <span className="w-2 h-2 bg-[#ffc500] rounded-full mt-2"></span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsDropdown; 