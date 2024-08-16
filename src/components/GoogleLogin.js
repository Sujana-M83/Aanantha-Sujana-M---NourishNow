import React from 'react';
import { GoogleLogin } from '@react-oauth2/google';
import { useNavigate } from 'react-router-dom';
import AuthService from './AuthService';

const GoogleAuth = () => {
    const navigate = useNavigate();

    const handleSuccess = async (response) => {
        try {
            const token = response?.access_token;
            const result = await AuthService.googleLogin(token);
            if (result.status === 200) {
                navigate('/home');
            }
        } catch (error) {
            console.error('Google login error:', error);
        }
    };

    const handleError = (error) => {
        console.error('Google login error:', error);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Login with Google</div>
                        <div className="card-body">
                            <GoogleLogin
                                clientId="YOUR_GOOGLE_CLIENT_ID"
                                buttonText="Login with Google"
                                onSuccess={handleSuccess}
                                onError={handleError}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoogleAuth;
