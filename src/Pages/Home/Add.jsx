import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";
import useAxiosPublic from "../../Auth/Hook/useAxiosPublic";
import useAuth from "../../Auth/Hook/useAuth";

const Add = () => {
  const axiosPublic = useAxiosPublic();
  const { users } = useAuth();
  const email = users?.email;
  const category = "To-Do"; // Default status

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Task Submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const title = event.target.title.value.trim();
    const description = event.target.description.value.trim();

    if (!title || !description) {
      return toast.error("Both Title and Description are required!");
    }

    const newTask = { title, description, email, category };

    try {
      setLoading(true);
      const res = await axiosPublic.post("/tasks", newTask);
      if (res.data.acknowledged) {
        toast.success("New Task Added!");
        navigate("/"); // Redirect to home/task list page
      }
    } catch (error) {
      toast.error("Failed to add task!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 px-4">
      <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Add a New Task
          </h2>
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition-all"
          >
            <ImCross size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <input
            type="text"
            name="title"
            maxLength={50}
            placeholder="Enter Title"
            className="input input-bordered w-full bg-gray-200 dark:bg-slate-700 p-3 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />

          {/* Description Input */}
          <textarea
            name="description"
            rows="3"
            maxLength={200}
            placeholder="Enter Description"
            className="textarea textarea-bordered w-full bg-gray-200 dark:bg-slate-700 p-3 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-all disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
