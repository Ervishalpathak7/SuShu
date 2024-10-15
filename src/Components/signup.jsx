import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { MessageCircle, Github, Twitter } from "lucide-react";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    console.log("Data being sent:", data); // Debugging line

    try 
    {
      const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/register`, data );
  
      console.log("Sign-up successful:", response.data);

      // Redirect to the dashboard
      navigate("/dashboard"); 

    
    } catch (err) {
      setError("Sign-up failed. Please try again."); // Handle error appropriately
      console.error("Error during sign-up:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderError = (field) => {
    return (
      errors[field] && (
        <span className="text-red-500 text-sm">{errors[field].message}</span>
      )
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <MessageCircle className="mx-auto h-12 w-12 text-black" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-black hover:text-gray-800"
            >
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            {[
              {
                id: "full-name",
                label: "Full Name",
                name: "name",
                required: true,
              }, // Changed to 'name'
              {
                id: "username",
                label: "Username",
                name: "username",
                required: true,
              },
              {
                id: "email-address",
                label: "Email address",
                name: "email",
                required: true,
                type: "email",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              },
              {
                id: "password",
                label: "Password",
                name: "password",
                required: true,
                type: "password",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              },
            ].map(
              ({
                id,
                label,
                name,
                required,
                type = "text",
                pattern,
                minLength,
              }) => (
                <div key={id}>
                  <Label htmlFor={id} className="sr-only">
                    {label}
                  </Label>
                  <Input
                    id={id}
                    {...register(name, {
                      required: required ? `${label} is required` : false,
                      pattern,
                      minLength,
                    })}
                    type={type}
                    autoComplete={name}
                    className={
                      type === "password" ? "rounded-b-md" : "rounded-t-md"
                    }
                    placeholder={label}
                  />
                  {renderError(name)}
                </div>
              )
            )}
          </div>

          <div>
            <Button
              type="submit"
              className={`w-full bg-black text-white hover:bg-gray-800 ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or sign up with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full">
              <Github className="h-5 w-5 mr-2" />
              GitHub
            </Button>
            <Button variant="outline" className="w-full">
              <Twitter className="h-5 w-5 mr-2" />
              Twitter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
