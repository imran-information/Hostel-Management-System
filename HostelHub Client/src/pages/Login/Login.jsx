import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router';

// Validation schema
const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),
});

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const { loginUser, loading } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: 'onBlur',
    });

    // Form Submission 
    const onSubmit = async (data) => {
        setIsLoading(true);
        setLoginError('');

        const { email, password } = data;

        try {
            const result = await loginUser(email, password);
            console.log('Logged in user:', result.user);

        } catch (error) {
            setLoginError('Login failed. Please try again.');
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleGoogleLogin = async () => {
        // try {
        //     setIsLoading(true);
        //     setLoginError('');

        //     const provider = new GoogleAuthProvider();
        //     const result = await signInWithPopup(auth, provider);

        //     // This gives you a Google Access Token and user info
        //     const credential = GoogleAuthProvider.credentialFromResult(result);
        //     const token = credential.accessToken;
        //     const user = result.user;

        //     console.log('Google login successful', user);
        //     // Redirect or handle successful login
        //     // router.push('/dashboard');
        // } catch (error) {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     setLoginError(errorMessage);
        //     console.error('Google login error:', errorCode, errorMessage);
        // } finally {
        //     setIsLoading(false);
        // }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-indigo-600 py-6 px-8 text-center">
                    <h1 className="text-3xl font-bold text-white">Login</h1>
                    <p className="text-indigo-200 mt-2">Access your account</p>
                </div>



                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                    {loginError && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4">
                            <p className="text-red-700">{loginError}</p>
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                {...register('email')}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition`}
                                placeholder="your@email.com"
                                autoComplete="email"
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                                className={`w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition`}
                                placeholder="••••••••"
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                                    Logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </div>
                </form>

                {/* Google login button */}
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

                {/* Footer */}
                <div className="bg-gray-50 px-8 py-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;