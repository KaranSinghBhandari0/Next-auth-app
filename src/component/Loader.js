import { FaSpinner } from "react-icons/fa";

export default function Loader() {
    return (
        <div className="flex items-center justify-center h-screen bg-[#121212] text-white">
            <div className="flex flex-col items-center space-y-4">
                <FaSpinner className="animate-spin text-4xl text-blue-500" />
                <p className="text-lg ml-3">Loading...</p>
            </div>
        </div>
    );
}
