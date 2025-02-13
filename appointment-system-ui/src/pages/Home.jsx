import { FaCalendarAlt, FaEdit, FaMobileAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] to-[#1E1E1E] flex flex-col items-center justify-center px-4">
      {/* Header Section */}
      <header className="w-full max-w-4xl text-center py-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-bold text-white"
        >
          Seamless Appointment Booking
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
          onClick={() => navigate("/login")}
          className="mt-6 bg-[#39FF14] text-black px-6 py-3 rounded-lg shadow-md hover:bg-[#32CD32] transition-colors focus:outline-none focus:ring-2 focus:ring-[#39FF14]"
        >
          Get Started
        </motion.button>
      </header>

      {/* Features Section */}
      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {/* Feature Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1E1E1E] p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
        >
          <FaCalendarAlt className="text-5xl text-[#39FF14] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white">Easy Scheduling</h3>
          <p className="mt-2 text-gray-400">Select available time slots effortlessly.</p>
        </motion.div>

        {/* Feature Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#1E1E1E] p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
        >
          <FaEdit className="text-5xl text-[#39FF14] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white">Manage Appointments</h3>
          <p className="mt-2 text-gray-400">View, edit, or cancel bookings anytime.</p>
        </motion.div>

        {/* Feature Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[#1E1E1E] p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
        >
          <FaMobileAlt className="text-5xl text-[#39FF14] mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white">Mobile-Friendly</h3>
          <p className="mt-2 text-gray-400">Optimized for all devices.</p>
        </motion.div>
      </section>
    </div>
  );
}