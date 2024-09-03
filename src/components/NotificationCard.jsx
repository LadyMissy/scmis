import { Bell, CheckCircle, AlertCircle } from "lucide-react";

export function NotificationCard({ notification }) {
  return (
    <div className="w-full md:w-[30rem] border-2 border-gray-200 p-6 rounded-xl flex gap-4 items-start drop-shadow-lg bg-white">
      <div
        className={`flex-shrink-0 rounded-full p-2 ${
          notification.viewed ? "bg-gray-200" : "bg-blue-500"
        }`}
      >
        {notification.viewed ? (
          <CheckCircle className="w-6 h-6 text-gray-600" />
        ) : (
          <Bell className="w-6 h-6 text-white" />
        )}
      </div>
      <div className="flex-1">
        <h1 className="text-lg font-semibold mb-1">{notification.message}</h1>
        <p className="text-sm text-gray-500">
          {new Date(notification.notifiedAt.seconds * 1000).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
