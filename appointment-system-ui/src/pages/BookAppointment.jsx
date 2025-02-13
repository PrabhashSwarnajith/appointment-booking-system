import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DayAndSlotDropdown from "../components/DayAndSlotDropdown";
import AppointmentService from "../services/AppoinmentService";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    timeSlotId: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSlotSelect = (timeSlotId) => {
    setFormData({ ...formData, timeSlotId });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert("Name is required.");
      return false;
    }
    if (!/^\d{10}$/.test(formData.contact)) {
      alert("Contact must be a 10-digit number.");
      return false;
    }
    if (!formData.timeSlotId) {
      alert("Please select a time slot.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = JSON.parse(localStorage.getItem("user")).accessToken;
      const appointmentData = {
        name: formData.name,
        contact: formData.contact,
        slot_id: formData.timeSlotId,
      };

      await AppointmentService.createAppointment(appointmentData, token);

      alert("Appointment booked successfully!");
      navigate("/appointments");
    } catch (error) {
      if (error.message === "Slot not found") {
        alert("The selected slot is no longer available. Please choose another slot.");
      } else if (error.message === "Slot is already booked") {
        alert("This slot has already been booked. Please choose another slot.");
      } else {
        console.error("Error booking appointment:", error);
        alert("Failed to book appointment. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#121212] to-[#1E1E1E] py-6">
      {/* Main Container */}
      <div className="container mx-auto max-w-lg bg-[#2A2A2A] p-6 rounded-lg shadow-2xl border border-gray-700">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300 mb-4"
        >
          ← Back
        </button>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-center text-white mb-6">Book an Appointment</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Date and Time Slot Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <DayAndSlotDropdown onSlotSelect={handleSlotSelect} />
            </motion.div>

            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#1E1E1E] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39FF14] placeholder:text-gray-500 text-white"
                placeholder="Enter your name"
                required
              />
            </motion.div>

            {/* Contact Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-400 mb-2">Contact</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#1E1E1E] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39FF14] placeholder:text-gray-500 text-white"
                placeholder="Enter your contact number"
                required
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              type="submit"
              className="w-full bg-[#39FF14] text-black py-2 px-4 rounded-md hover:bg-[#32CD32] transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#39FF14]"
            >
              Book Appointment
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BookAppointment;
