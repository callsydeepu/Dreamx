import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const AuthPage = (): JSX.Element => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    isBrand: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (authMode === 'signup') {
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
      } else if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/dashboard');
      } else {
        setErrors({ email: 'Invalid credentials' });
      }
    } catch (error) {
      setErrors({ email: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    console.log(`${authMode} with Google`);
    // Simulate Google auth success and redirect
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'signup' ? 'signin' : 'signup');
    setFormData({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      isBrand: false
    });
    setErrors({});
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: 'url(https://i.pinimg.com/736x/8a/8e/bb/8a8ebbc6b852e85cbf0c7caf3bcd59b6.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Desktop Header with Back Button and Logo - Hidden on Mobile */}
      <header className="hidden sm:flex w-full p-6 items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="h-10 w-10 rounded-full hover:bg-white/20 transition-colors mr-4"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </Button>
        
        {/* Dream X Store Logo - Left aligned on desktop */}
        <div className="flex items-center">
          <img
            src="https://i.postimg.cc/xTVNmCps/Dream-X-Store.png"
            alt="Dream X Store"
            className="h-10 w-auto object-contain"
          />
        </div>
      </header>

      {/* Mobile Header with Back Button Only - No Logo, No Shadow */}
      <header className="sm:hidden w-full p-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="h-10 w-10 rounded-full hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-2 sm:py-4">
        <Card className="w-full max-w-[400px] bg-white border-0 shadow-none sm:shadow-lg rounded-[1px] sm:rounded-[1px] overflow-hidden">
          <CardContent className="p-4 sm:p-6 space-y-4">
            {/* Header - Exact reMarkable styling without H1 title */}
            <div className="text-center space-y-2">
              <h2 className="text-[20px] sm:text-[22px] font-normal text-gray-900 leading-tight">
                {authMode === 'signup' ? 'Create an account' : 'Welcome back'}
              </h2>
              <p className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed">
                {authMode === 'signup' 
                  ? 'Enter your email address to create a new account.' 
                  : 'Enter your credentials to sign in to your account.'
                }
              </p>
            </div>

            {/* Google Authentication Button - Exact reMarkable styling */}
            <div className="space-y-3">
              <Button
                onClick={handleGoogleAuth}
                variant="outline"
                className="w-full h-[44px] border-[#e0e0e0] hover:border-gray-400 hover:bg-gray-50 rounded-[1px] transition-all duration-200 text-[14px] font-normal"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-gray-700">
                    Continue with Google
                  </span>
                </div>
              </Button>
            </div>

            {/* Divider - Exact reMarkable styling */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e0e0e0]"></div>
              </div>
              <div className="relative flex justify-center text-[14px]">
                <span className="px-4 bg-white text-gray-500 font-normal">OR</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email Field - Exact reMarkable styling */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email address*"
                  className={`w-full h-[44px] px-3 border border-[#e0e0e0] rounded-[1px] focus:ring-2 focus:ring-[#4F75FF] focus:border-[#4F75FF] outline-none transition-all duration-200 text-[14px] text-gray-900 placeholder-gray-500 font-normal ${
                    errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-[12px] text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Username Field - Only for Sign Up */}
              {authMode === 'signup' && (
                <div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Username*"
                    className={`w-full h-[44px] px-3 border border-[#e0e0e0] rounded-[1px] focus:ring-2 focus:ring-[#4F75FF] focus:border-[#4F75FF] outline-none transition-all duration-200 text-[14px] text-gray-900 placeholder-gray-500 font-normal ${
                      errors.username ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                    }`}
                  />
                  {errors.username && (
                    <p className="mt-1 text-[12px] text-red-500">{errors.username}</p>
                  )}
                </div>
              )}

              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password*"
                  className={`w-full h-[44px] px-3 pr-10 border border-[#e0e0e0] rounded-[1px] focus:ring-2 focus:ring-[#4F75FF] focus:border-[#4F75FF] outline-none transition-all duration-200 text-[14px] text-gray-900 placeholder-gray-500 font-normal ${
                    errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-[16px] h-[16px]" /> : <Eye className="w-[16px] h-[16px]" />}
                </button>
                {errors.password && (
                  <p className="mt-1 text-[12px] text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field - Only for Sign Up */}
              {authMode === 'signup' && (
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password*"
                    className={`w-full h-[44px] px-3 pr-10 border border-[#e0e0e0] rounded-[1px] focus:ring-2 focus:ring-[#4F75FF] focus:border-[#4F75FF] outline-none transition-all duration-200 text-[14px] text-gray-900 placeholder-gray-500 font-normal ${
                      errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-[16px] h-[16px]" /> : <Eye className="w-[16px] h-[16px]" />}
                  </button>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-[12px] text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              {/* Are you a brand? - Only for Sign Up */}
              {authMode === 'signup' && (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-[1px] border border-[#e0e0e0]">
                  <input
                    type="checkbox"
                    id="isBrand"
                    name="isBrand"
                    checked={formData.isBrand}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-[#4F75FF] bg-gray-100 border-gray-300 rounded focus:ring-[#4F75FF] focus:ring-2"
                  />
                  <label htmlFor="isBrand" className="text-[13px] text-gray-700 font-normal">
                    Are you a brand?
                  </label>
                </div>
              )}

              {/* Submit Button - Exact reMarkable styling */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-[44px] bg-[#4F75FF] hover:bg-[#4066FF] text-white font-normal rounded-[1px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-[14px]"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Please wait...</span>
                  </div>
                ) : (
                  authMode === 'signup' ? 'Continue' : 'Sign In'
                )}
              </Button>
            </form>

            {/* Toggle Auth Mode - Exact reMarkable styling */}
            <div className="text-center">
              <span className="text-[14px] text-gray-600 font-normal">
                {authMode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
              </span>
              <button
                onClick={toggleAuthMode}
                className="text-[14px] font-normal text-gray-900 hover:text-[#4F75FF] transition-colors underline"
              >
                {authMode === 'signup' ? 'Log in' : 'Sign up'}
              </button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer - Exact reMarkable styling */}
      <footer className="w-full p-3 sm:p-4">
        <div className="max-w-[400px] mx-auto text-center">
          <p className="text-[12px] sm:text-[13px] text-gray-600 leading-relaxed">
            By {authMode === 'signup' ? 'signing up' : 'signing in'}, you agree to our{' '}
            <a href="/terms" className="text-[#4F75FF] hover:text-[#4066FF] underline">
              terms of service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-[#4F75FF] hover:text-[#4066FF] underline">
              privacy policy
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
};