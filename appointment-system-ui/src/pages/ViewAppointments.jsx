import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AppointmentService from "../services/AppoinmentService";

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No access token found");
          return;
        }
        const data = await AppointmentService.getAppointments(token);
        console.log("Fetched Data:", data); // Debugging step

        if (data && Array.isArray(data)) {
          setAppointments(data);
        } else {
          console.error("Unexpected API response format:", data);
          setAppointments([]);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const cancelAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found");
        return;
      }

      await AppointmentService.cancelAppointment(appointmentId, token);
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== appointmentId)
      );
    } catch (error) {
      console.error("Error canceling appointment:", error.message);
      alert("Failed to cancel appointment.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1E1E1E] py-6">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300 mb-4"
        >
          ← Back
        </button>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-white mb-8"
        >
          Your Appointments
        </motion.h1>

        {loading ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : appointments.length === 0 ? (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-center"
          >
            No appointments booked yet.
          </motion.p>
        ) : (
          <ul className="space-y-4">
            {appointments.map((appointment) => (
              <motion.li
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#2A2A2A] p-4 rounded-lg shadow-md flex justify-between items-center border border-gray-700"
              >
                <div>
                  <p className="font-medium text-white">{appointment.name}</p>
                  <p className="text-sm text-gray-400">{appointment.date} at {appointment.time}</p>
                  <p className="text-sm text-gray-400">Status: {appointment.status}</p>
                </div>
                <button
                  onClick={() => cancelAppointment(appointment.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Cancel
                </button>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ViewAppointments;
