import React, { useState, useEffect } from "react";
import SlotService from "../services/SlotService";

const DayAndSlotDropdown = ({ onSlotSelect }) => {
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date
  const [availableSlots, setAvailableSlots] = useState([]); // State for available slots
  const [loading, setLoading] = useState(false); // Loading state for fetching slots
  const [error, setError] = useState(""); // Error state

  // Generate the next 7 days for the dropdown
  const getNext7Days = () => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Push the ISO date into the array
      days.push({
        label: date.toISOString().split("T")[0], // YYYY-MM-DD format
        value: date.toISOString().split("T")[0], // YYYY-MM-DD format
      });
    }

    return days;
  };

  // Fetch available slots for the selected date
  const fetchSlots = async (date) => {
    try {
      setLoading(true);
      setError(""); // Reset error

      const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
      if (date < today) {
        setError("Cannot select past dates.");
        setAvailableSlots([]); // Reset slots if date is in the past
        return;
      }

      const slots = await SlotService.getSlots(date); // Fetch slots for the selected date
      setAvailableSlots(slots || []);
    } catch (error) {
      console.error("Error fetching slots:", error);
      setError("Error fetching slots. Please try again.");
      setAvailableSlots([]); // If there's an error, set slots to an empty array
    } finally {
      setLoading(false);
    }
  };

  // Automatically set the current date on component mount
  useEffect(() => {
    const today = new Date();
    const currentDate = today.toISOString().split("T")[0]; // Current date in YYYY-MM-DD format
    setSelectedDate(currentDate); // Set the current date as the default selected date
    fetchSlots(currentDate); // Fetch slots for the current date
  }, []);

  // Handle date selection
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    fetchSlots(date); // Fetch slots for the selected date
  };

  // Handle time slot selection
  const handleSlotChange = (e) => {
    const slotId = e.target.value;
    onSlotSelect(slotId); // Pass the selected slot ID to the parent
  };

  return (
    <div>
      {/* Date Dropdown */}
      <label className="block text-sm font-medium text-gray-400 mb-2">Select a Date</label>
      <select
        value={selectedDate}
        onChange={handleDateChange}
        className="w-full px-3 py-2 bg-[#1E1E1E] border border-gray-700 rounded-md text-white mb-4"
      >
        <option value="" disabled>
          Select a date
        </option>
        {getNext7Days().map((day, index) => (
          <option key={index} value={day.value}>
            {day.label} {/* Display the date in YYYY-MM-DD format */}
          </option>
        ))}
      </select>

      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Time Slot Dropdown */}
      <label className="block text-sm font-medium text-gray-400 mb-2">Select a Time Slot</label>
      {loading ? (
        <p className="text-gray-400">Loading slots...</p>
      ) : (
        <select
          onChange={handleSlotChange}
          className="w-full px-3 py-2 bg-[#1E1E1E] border border-gray-700 rounded-md text-white"
        >
          <option value="">
            {availableSlots.length > 0 ? "Select a time slot" : "No slots available"}
          </option>
          {availableSlots.map((slot, index) => (
            <option key={index} value={slot.id}>
              {slot.startTime} - {slot.endTime}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default DayAndSlotDropdown;
