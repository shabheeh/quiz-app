
import Link from "next/link";
import { FaQuestionCircle } from "react-icons/fa";

const CreateFirstQuiz = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <div className="flex flex-col items-center justify-center p-8 max-w-md mx-auto bg-white shadow-md rounded-lg">
                <div className="w-24 h-20 bg-green-600 rounded mb-4">
                    <FaQuestionCircle className="m-auto mt-2 text-6xl text-white" />
                </div>
                <p className="text-gray-600 mb-4">Click below to create the first quiz</p>
                <Link href={'/admin/quiz'}>
                    <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                        Create first Quiz
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default CreateFirstQuiz;
