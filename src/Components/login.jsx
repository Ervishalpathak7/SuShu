import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, Github, Twitter } from 'lucide-react';
import { Input } from './ui/input';
import { useState } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { login as loginThunk } from '../Redux-Toolkit/Thunks'; // Import the login thunk
import { toast } from 'react-toastify'; // Optional: for better error notifications

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch
  const [loading, setLoading] = useState(false);
  
  // Login handler
  const loginHandler = async (data) => {
    setLoading(true);

    try {
      const resultAction = await dispatch(loginThunk(data)); // Dispatch the login thunk
      const { payload, error } = resultAction;

      if (error) {
        // Handle error if login fails
        toast.error(error.message || "Login failed. Please try again."); // Optional: using toast for notifications
        return;
      }

      // If successful, handle success (you might want to store user info)
      sessionStorage.setItem('userEmail', data.email); // Store email if needed
      navigate('/dashboard'); // Redirect to the dashboard after successful login

    } catch (error) {
      console.error('Login error:', error);
      toast.error('Error logging in. Please try again.'); // Optional: show an error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <MessageCircle className="mx-auto h-12 w-12 text-black" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to RealChat</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/signup" className="font-medium text-black hover:text-gray-800">
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(loginHandler)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <Input
                id="email-address"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address',
                  },
                })}
                className="rounded-t-md w-full p-2 border"
                placeholder="Email address"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <Input
                id="password"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                })}
                className="rounded-b-md w-full p-2 border"
                placeholder="Password"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Input type="checkbox" id="remember-me" {...register('rememberMe')} className="h-4 w-4" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>

            <div className="text-sm">
              <Link to="/" className="font-medium text-black hover:text-gray-800">Forgot your password?</Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`w-full ${loading ? 'bg-gray-500' : 'bg-black hover:bg-gray-800'} text-white py-2`}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button type="button" className="w-full border flex justify-center items-center py-2">
              <Github className="h-5 w-5 mr-2" /> GitHub
            </button>
            <button type="button" className="w-full border flex justify-center items-center py-2">
              <Twitter className="h-5 w-5 mr-2" /> Twitter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
