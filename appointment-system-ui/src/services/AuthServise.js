import axios from 'axios';

const API_URL = 'http://localhost:8081/api/auth';

class AuthService {
  static async login(username, password) {
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error('Login failed: No access token received');
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      throw new Error(error.response?.data || 'An error occurred during login');
    }
  }

  static logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    window.location.href = "/login"; 
   }

  static async register(username, email, password) {
    try {
      const response = await axios.post(`${API_URL}/register`, { username, email, password });
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      throw new Error(error.response?.data?.message || 'An error occurred during registration');
    }
  }

  static getRole() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.roles[0];
  }

  static isAuthenticated() {
    const user = JSON.parse(localStorage.getItem('user'));
    return !!user;
  }
}

export default AuthService;