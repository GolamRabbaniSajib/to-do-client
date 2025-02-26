/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { toast } from "react-toastify";
import useAxiosPublic from "../../Auth/Hook/useAxiosPublic";

const TaskTodo = ({ task, refetch }) => {
  const {
    _id: id,
    title: taskTitle,
    description,
    category: taskStatus,
  } = task || {};
  const axiosPublic = useAxiosPublic();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(taskTitle);
  const [desc, setDesc] = useState(description);
  const [status, setStatus] = useState(taskStatus);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete modal

  // Handle Edit
  const handleEdit = async () => {
    if (!title || !desc || !status) {
      return toast.error("All fields must be filled!");
    }

    try {
      setLoading(true);
      const res = await axiosPublic.patch(`/tasks/${id}`, {
        title,
        description: desc,
        category: status, // Update Status
      });

      if (res.data.modifiedCount > 0) {
        toast.success("Task Updated Successfully!");
        refetch();
        setIsEditing(false);
      }
    } catch (error) {
      toast.error("Failed to update task!");
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    try {
      const res = await axiosPublic.delete(`/task/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Task Deleted Successfully!");
        refetch();
        setShowDeleteModal(false); // Close modal after deletion
      }
    } catch (error) {
      toast.error("Failed to delete task!");
    }
  };

  // Status Badge Color
  const getStatusColor = (status) => {
    switch (status) {
      case "To-Do":
        return "bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
      case "In Progress":
        return "bg-yellow-300 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200";
      case "Completed":
        return "bg-green-300 text-green-800 dark:bg-green-700 dark:text-green-200";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  return (
    <div className="bg-gray-200 dark:bg-slate-800 p-4 rounded-lg shadow-md flex flex-col gap-3">
      {/* Title & Description */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {taskTitle}
        </h3>
        <span
          className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
            taskStatus
          )}`}
        >
          {taskStatus}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>

      {/* Buttons */}
      <div className="flex justify-between mt-2">
        <button
          onClick={() => setIsEditing(true)}
          className="btn flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
        >
          <FaPencilAlt /> Edit
        </button>
        <button
          onClick={() => setShowDeleteModal(true)} // Show confirmation modal
          className="btn flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
        >
          <FaTrash /> Delete
        </button>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Edit Task
            </h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mb-3 rounded-md border dark:bg-slate-700"
              maxLength={50}
              placeholder="Edit Title"
            />
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full p-2 rounded-md border dark:bg-slate-700"
              maxLength={200}
              rows="3"
              placeholder="Edit Description"
            />

            {/* Status Dropdown */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 rounded-md border dark:bg-slate-700 mt-2"
            >
              <option value="To-Do">To-Do</option>
              <option value="Progress">Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="btn px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                disabled={loading}
                className="btn px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                {loading ? (
                  "Updating..."
                ) : (
                  <>
                    <IoMdDoneAll /> Save
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)} // Close modal
                className="btn px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="btn px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTodo;
