import axios from "axios";

const API_URL = "http://localhost:8081/api/appointment";

class AppointmentService {
  static async createAppointment(appointmentData, token) {
    try {
       const response = await axios.post(`${API_URL}`,appointmentData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
          }
        }
      );

      console.log("Response data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating appointment:", error.response ? error.response.data : error.message);
      throw new Error("Failed to create appointment");
    }
  }

  static async getAppointments(token) {
    try {
      const response = await axios.get(`${API_URL}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
  
      console.log("API Response:", response.data); // Debugging step
  
      if (!Array.isArray(response.data)) {
        throw new Error("API did not return an array");
      }
  
      return response.data;
    } catch (error) {
      console.error("Error fetching appointments:", error.response ? error.response.data : error.message);
      throw new Error("Failed to fetch appointments");
    }
  }

  static async cancelAppointment(appointmentId, token) {
    try {
      const response = await axios.delete(`${API_URL}/${appointmentId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error canceling appointment:", error.response ? error.response.data : error.message);
      throw new Error("Failed to cancel appointment");
    }
  }
  
}

export default AppointmentService;
