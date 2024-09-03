import { useEffect, useState } from "react";
import { getUserData } from "../utils/user";

export function AppointmentCard({ appointment }) {
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const worker = await getUserData(appointment.workerId, "WORKER");
        setWorker(worker);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorker();
  }, []);

  if (loading) return <>Loading Appointment</>;

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
      <div className="flex justify-between flex-col-reverse items-start md:items-center md:flex-row mb-4 gap-4">
        <h3 className="text-lg font-semibold">
          Appointment with {appointment.workerType} {worker.firstname}
        </h3>
        <span className="px-3 py-1 text-sm font-medium text-white bg-yellow-500 rounded-full">
          {appointment.appointmentStatus}
        </span>
      </div>
      <div className="text-gray-700">
        <p className="mb-2 flex-col flex">
          <strong>Message:</strong> {appointment.message}
        </p>
        <p className="flex flex-col">
          <strong>Created At:</strong>
          {new Date(appointment.createdAt.seconds * 1000).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
