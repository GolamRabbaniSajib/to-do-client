import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Auth/Hook/useAxiosPublic";
import useAuth from "../../Auth/Hook/useAuth";
import TaskProgress from "./TaskProgress";

const Progress = () => {
  const axiosPublic = useAxiosPublic();
  const { users } = useAuth();
  const email = users?.email;
  const category = "Progress";

  // Fetch tasks based on category
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks", category],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/tasksProgress?email=${email}&category=${category}`
      );
      return res.data;
    },
  });
  refetch();
  return (
    <>
      <div className="bg-gray-300 dark:bg-slate-900 px-6 pt-12 pb-14 rounded-lg">
        <h2 className="pl-3 font-bold text-2xl pb-3">In Progress</h2>

        {/* Render tasks based on the 'Progress' category */}
        <div className="space-y-3">
          {tasks?.map((task) => (
            <TaskProgress key={task._id} task={task} refetch={refetch} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Progress;
