import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaEdit, FaMobileAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SlotService from "../services/SlotService";

const AvailableSlots = () => {
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("You are not logged in.");
          navigate("/login", { replace: true });
          return;
        }

        const currentDate = new Date();
        const fetchedSlots = await SlotService.getSlots(currentDate, token);

        const slotsWithDate = fetchedSlots.map((slot) => {
          const startTime = new Date(currentDate);
          const endTime = new Date(currentDate);
          const [startHours, startMinutes] = slot.startTime.split(":");
          const [endHours, endMinutes] = slot.endTime.split(":");
          startTime.setHours(startHours, startMinutes, 0);
          endTime.setHours(endHours, endMinutes, 0);

          return {
            ...slot,
            date: startTime.toLocaleDateString(),
            startTime: startTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            endTime: endTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
        });

        setSlots(slotsWithDate);
      } catch (err) {
        setError(err.message || "Failed to fetch slots. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1E1E1E] flex flex-col items-center justify-center px-4">
      <header className="w-full max-w-4xl text-center py-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold text-white"
        >
          Find Your Perfect Time Slot
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-lg sm:text-xl text-gray-400"
        >
          Book and manage your appointments with ease and efficiency.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onClick={() => navigate("/book")}
          className="mt-6 bg-[#39FF14] text-black px-6 py-3 rounded-lg shadow-md hover:bg-[#32CD32] transition-colors focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
        >
          Get Started
        </motion.button>
      </header>

      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <motion.div className="bg-[#1E1E1E] p-6 rounded-lg shadow-md text-center">
          <FaCalendarAlt className="text-5xl text-[#39FF14] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white">Easy Scheduling</h3>
          <p className="mt-2 text-gray-400">Select available time slots effortlessly.</p>
        </motion.div>

        <motion.div className="bg-[#1E1E1E] p-6 rounded-lg shadow-md text-center">
          <FaEdit className="text-5xl text-[#39FF14] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white">Manage Appointments</h3>
          <p className="mt-2 text-gray-400">View, edit, or cancel bookings anytime.</p>
        </motion.div>

        <motion.div className="bg-[#1E1E1E] p-6 rounded-lg shadow-md text-center">
          <FaMobileAlt className="text-5xl text-[#39FF14] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white">Mobile-Friendly</h3>
          <p className="mt-2 text-gray-400">Optimized for all devices.</p>
        </motion.div>
      </section>

      <section className="w-full max-w-4xl mt-10">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Available Time Slots</h2>
        <div className="overflow-x-auto max-h-[300px] bg-[#2A2A2A] rounded-lg shadow-md p-4">
          {loading ? (
            <p className="text-gray-400 text-center">Loading slots...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : slots.length > 0 ? (
            <table className="min-w-full text-left text-gray-400">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="py-3 px-6 font-medium">Date</th>
                  <th className="py-3 px-6 font-medium">Start Time</th>
                  <th className="py-3 px-6 font-medium">End Time</th>
                  <th className="py-3 px-6 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((slot) => (
                  <tr key={slot.id} className="border-b border-gray-700">
                    <td className="py-3 px-6">{slot.date}</td>
                    <td className="py-3 px-6">{slot.startTime}</td>
                    <td className="py-3 px-6">{slot.endTime}</td>
                    <td className="py-3 px-6">
                      <span className={`inline-block py-1 px-3 text-sm font-semibold rounded-lg ${slot.status === "AVAILABLE" ? "bg-[#5ff145] text-black" : "bg-red-500 text-white"}`}>
                        {slot.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400 text-center">No available slots.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default AvailableSlots;
