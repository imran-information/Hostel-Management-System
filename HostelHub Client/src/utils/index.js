import axios from "axios";
import { toast } from 'react-hot-toast';

export const saveUserData = async (user) => {
    const newUser = {
        displayName: user.displayName,
        email: user.email,
        photo: user.photoURL
    }
    const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, newUser)
    console.log(newUser, data);
    return data;
}


export const onGoogleSignup = async (googleSignInUser, setIsLoading, setError, navigate) => {
    try {
        setIsLoading(true);
        setError('');
        // Show loading toast
        toast.loading('Signing up with Google...', {
            id: 'google-auth',
            duration: 10000
        });
        const result = await googleSignInUser();
        const user = result.user;
        // Success handling
        toast.success(`Welcome, ${user.displayName || 'User'}!`, {
            id: 'google-auth',
            duration: 3000
        });
        // Delay redirect 
        setTimeout(() => navigate('/'), 1500);
        return user;
    } catch (error) {
        const errorMessage = getGoogleAuthErrorMessage(error);
        setError(errorMessage);

        toast.error(errorMessage, {
            id: 'google-auth',
            duration: 5000
        });

        console.error('Google auth error:', error);
    } finally {
        setIsLoading(false);
    }
};

const getGoogleAuthErrorMessage = (error) => {
    const defaultMessage = 'Google authentication failed. Please try again.';
    if (!error.code) return error.message || defaultMessage;

    const errorMap = {
        'auth/account-exists-with-different-credential':
            'An account already exists with this email. Try logging in instead.',
        'auth/popup-closed-by-user':
            'Sign-in cancelled - you closed the Google popup.',
        'auth/cancelled-popup-request':
            'Sign-in cancelled - another popup is already open.',
        'auth/popup-blocked':
            'Popup blocked - please allow popups to sign in with Google.',
        'auth/network-request-failed':
            'Network error - please check your internet connection.',
        'auth/user-disabled':
            'This account has been disabled.',
        'auth/user-not-found':
            'No account found with this email.'
    };

    return errorMap[error.code] || error.message || defaultMessage;
};