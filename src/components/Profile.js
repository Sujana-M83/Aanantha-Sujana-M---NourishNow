import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login'); // Redirect if not authenticated
            return;
        }

        axios.get('/api/profile/currentUser', {
            headers: {
                'Authorization': `Bearer ${token}` // Corrected the backticks here
            }
        })
        .then(response => {
            setUser(response.data);
        })
        .catch(error => {
            console.error("There was an error fetching the user data!", error);
            navigate('/login'); // Redirect on error
        });
    }, [navigate]);

    if (!user) {
        return <div>Loading...</div>; // Show loading state while data is being fetched
    }

    return (
        <div>
            <h1>Profile Page</h1>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Email: {user.email}</p> {/* Use 'email' instead of 'username' */}
        </div>
    );
};

export default ProfilePage;
