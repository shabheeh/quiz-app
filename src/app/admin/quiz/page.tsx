'use client';
import AddQuiz from "@/app/components/AddQuiz";
import Navbar from "@/app/components/Navbar";
import { ToastContainer } from "react-toastify";

export default function Dashboard() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <ToastContainer />
            <Navbar />
            <div className="pt-20">
                <AddQuiz />
            </div>
        </div>
    );
}
