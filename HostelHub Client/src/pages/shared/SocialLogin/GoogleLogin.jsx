import React from 'react';

const GoogleLogin = () => {
    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            setLoginError('');

            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            // This gives you a Google Access Token and user info
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            console.log('Google login successful', user);
            // Redirect or handle successful login
            // router.push('/dashboard');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoginError(errorMessage);
            console.error('Google login error:', errorCode, errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="px-8 pb-6">
            <div className="relative flex pb-4 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
            >
                <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google logo"
                    className="h-5 w-5"
                />
                {isLoading ? 'Signing in...' : 'Continue with Google'}
            </button>
        </div>
    );
};

export default GoogleLogin;