import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useUser } from "../../providers/UserProvider";
import { NotificationCard } from "../../components/NotificationCard";
import { BellIcon, Loader2 } from "lucide-react"; // Add loader icon

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "notifications"),
      where("toId", "==", user.id)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notificationsArray = [];
      querySnapshot.forEach((doc) => {
        notificationsArray.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setNotifications(notificationsArray);
      setLoading(false); // Set loading to false when data is fetched
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [user]);

  return (
    <main className="p-6 sm:p-8 lg:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 flex items-center space-x-2 mb-10">
        <BellIcon className="text-blue-500 w-8 h-8" />
        <span>Notifications</span>
      </h1>
      <section className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationCard
              notification={notification}
              key={notification.id}
            />
          ))
        ) : (
          <div className="text-gray-500">You have no notifications.</div>
        )}
      </section>
    </main>
  );
}
