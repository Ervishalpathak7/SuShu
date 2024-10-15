import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { LockIcon, CheckCircleIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Verification() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Retrieve the email from session storage when the component mounts
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const email = sessionStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    } else {
      // Handle the case where email is not found in session storage
      setMessage('No email found. Please start the signup process again.');
      navigate('/signup'); // Navigate to signup or another appropriate page
    }
  }, [navigate]);

  const handleVerifyOtp = async (data) => {
    setMessage('');
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/verify`, {
        otp: data.otp,
        email: userEmail, // Include email in the verification request
      });
      setIsVerified(true);
      setMessage('Email verified successfully!');
      sessionStorage.removeItem('userEmail'); // Clear email from session storage
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || 'Error verifying OTP. Please try again.');
      } else {
        setMessage('Error verifying OTP. Please try again.');
      }
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setMessage('');
    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/resend-otp`, { email: userEmail });
      setMessage('OTP resent successfully! Check your email.');
    } catch (error) {
      setMessage('Error resending OTP. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
          <CardDescription>Enter the OTP sent to your email to verify your account</CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {!isVerified ? (
              <motion.div
                key="verification-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmit(handleVerifyOtp)} className="space-y-4">
                  <div>
                    <Label htmlFor="otp">Enter OTP</Label>
                    <div className="relative">
                      <Input
                        id="otp"
                        type="text"
                        {...register('otp', { 
                          required: 'OTP is required', 
                          minLength: { value: 6, message: 'OTP must be at least 6 characters' },
                        })}
                        className="pl-10"
                        placeholder="Enter the OTP"
                        aria-invalid={!!errors.otp} // Accessibility improvement
                        aria-describedby="otp-error" // Associate error message with the input
                      />
                      <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                    {errors.otp && (
                      <span id="otp-error" className="text-red-500 text-sm">{errors.otp.message}</span>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <LoadingSpinner /> : 'Verify OTP'} {/* Button loading state */}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="verification-success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-700 mb-2">Verification Successful!</h2>
                <p className="text-gray-600">Your email has been verified. You can now proceed to use the application.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter>
          {message && (
            <Alert className="w-full">
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

const LoadingSpinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
  </svg>
);
