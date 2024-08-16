import axios from 'axios';

const getUser = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/user'); // Replace with your backend URL
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export default getUser;
