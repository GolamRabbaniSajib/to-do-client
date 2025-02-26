import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosPublic from "../../Auth/Hook/useAxiosPublic";
import useAuth from "../../Auth/Hook/useAuth";
import Completed from "./Completed";
import Progress from "./Progress";
import ToDo from "./ToDo";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const { users } = useAuth();
  const email = users?.email;
  const category = "To-Do"; // Default category for new tasks

  // State for task input
  const [showField, setShowField] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");

  // Handle Task Submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!taskTitle || !taskDesc) {
      return toast.error("Title and Description cannot be empty!");
    }

    const newTask = {
      title: taskTitle,
      description: taskDesc,
      email,
      category,
    };

    try {
      const res = await axiosPublic.post("/tasks", newTask);
      if (res.data.acknowledged) {
        toast.success("New Task Added!");
        setShowField(false);
        setTaskTitle("");
        setTaskDesc("");
        // Trigger refetch for task components if needed
      }
    } catch (error) {
      toast.error("Failed to add task!");
    }
  };

  return (
    <div className="min-h-[85vh] pt-28 px-4 sm:px-6 lg:px-8">
      {/* Add Task Section */}
      <div className="flex justify-center my-4">
        {!showField ? (
          <button
            onClick={() => setShowField(true)}
            className="btn bg-blue-600 text-white hover:bg-blue-700"
          >
            + Add Task
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-100 dark:bg-slate-800 p-4 rounded-lg shadow-lg">
            <input
              type="text"
              name="title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              maxLength={50}
              placeholder="Enter Task Title"
              className="input w-full bg-white dark:bg-gray-700 border rounded-md p-2 mb-2"
            />
            <textarea
              name="desc"
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              placeholder="Enter Task Description"
              className="textarea w-full bg-white dark:bg-gray-700 border rounded-md p-2 mb-2"
            />
            <div className="flex justify-between">
              <button type="submit" className="btn bg-green-500 text-white hover:bg-green-600">
                Add Task
              </button>
              <button onClick={() => setShowField(false)} className="btn bg-red-500 text-white hover:bg-red-600">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Task Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-screen-xl mx-auto gap-6 md:gap-8 pt-4 pb-20">
        <ToDo />
        <Progress />
        <Completed />
      </div>
    </div>
  );
};

export default Home;
