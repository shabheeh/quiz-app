'use client';

import { useRouter } from 'next/navigation';
import LoginForm from "@/app/components/LoginForm";
import Navbar from '@/app/components/Navbar';

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    alert("You are logged in!");
    router.push('/admin/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-green-500 text-center">Login</h1>
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
      </div>
    </div>
  );
}
