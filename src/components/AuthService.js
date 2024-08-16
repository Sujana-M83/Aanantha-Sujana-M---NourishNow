import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Update with your API URL

// Define the register function
const register = async (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

// Function to get the current user's profile
const getProfile = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/profile/currentUser`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response;
};

// Function for Google login
const googleLogin = async (token) => {
    return axios.post(`${API_URL}/auth/google`, null, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

// Export all the functions as part of the AuthService object
export default { register, getProfile, googleLogin };
