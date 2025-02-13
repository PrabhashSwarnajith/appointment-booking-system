import axios from "axios";

const API_URL = "http://localhost:8081/api";

class SlotService {
    static async getSlots(date, token) {
        try {
            let validDate = date instanceof Date ? date : new Date(date);

            if (isNaN(validDate)) {
                throw new Error("Invalid date format");
            }

            // Add 1 day
            validDate.setDate(validDate.getDate() + 1);

            // Convert to UTC format
            const utcDate = new Date(validDate.toUTCString());
            const formattedDate = utcDate.toISOString().split("T")[0];

            console.log("Adjusted Date Sent:", formattedDate);

            const response = await axios.get(`${API_URL}/slots`, {
                params: { date: formattedDate },
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });

            console.log("Response data:", response.data);
            return response.data;
        } catch (error) {
            const errorMessage = error.response ? error.response.data || error.message : error.message;
            console.error("Error fetching slots:", errorMessage);
            throw new Error(`Failed to fetch slots: ${errorMessage}`);
        }
    }
}

export default SlotService;
