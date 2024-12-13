'use client';

import axios from "axios";
import { useRef, useState } from "react";
import { validateEmail } from "../_lib/auth";

export default function LoginForm({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailLabel, setEmailLabel] = useState('Email')
  const [passwordLabel, setPasswordLabel] = useState('Password')
  const [error, setError] = useState('');

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 

    if (!email && !password) {
    //   setError("Please fill in both fields.");
      setEmailLabel('Please enter email')
      setPasswordLabel('Please enter password')
      emailRef.current?.focus()
      return;
    }else {
        setEmailLabel('Email')
        setPasswordLabel('Password')
    }

    if(!email) {
        setEmailLabel('Please enter email')
        emailRef.current?.focus()
        return;
    }

    if(!password) {
        setPasswordLabel('Please enter Password')
        passwordRef.current?.focus()
        return;
    }

    if(!validateEmail(email)) {
        setEmailLabel('Enter a valid email')
        return
    }else {
        setEmailLabel('Email')
    }

    try {
        const res = await axios.post("/api/login", {
            email,
            password,
          });
      
          if (res.status !== 200) {
            throw new Error("Invalid credentials");
          }

      onLoginSuccess(); // Pass login success to the parent component
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <div>
        <label htmlFor="email" 
        className={`block mb-1 ${emailLabel !== 'Email' ? 'text-red-500' : 'text-gray-700'}`}
        >
          {emailLabel}
        </label>
        <input
          ref={emailRef}
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${emailLabel !== 'Email' ? 'focus:ring-red-500' : 'focus:ring-green-500'}`}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label htmlFor="password" 
        className={`block mb-1 ${passwordLabel !== 'Password' ? 'text-red-500' : 'text-gray-700'}`}

        >
          {passwordLabel}
        </label>
        <input
          ref={passwordRef}
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${passwordLabel !== 'Password' ? 'focus:ring-red-500' : 'focus:ring-green-500'}`}
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
      >
        Login
      </button>
    </form>
  );
}
