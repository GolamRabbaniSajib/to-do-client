
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Auth/Hook/useAxiosPublic";
import useAuth from "../../Auth/Hook/useAuth";
import TaskCompleted from "./TaskCompleted";

const Completed = () => {
  const axiosPublic = useAxiosPublic();
  const { users } = useAuth();
  const email = users?.email;
  const category = "Completed";

  // Fetch tasks
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks", category],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/tasksCompleted?email=${email}&category=${category}`
      );
      return res.data;
    },
  });
refetch()
  return (
    <div className="bg-gray-300 dark:bg-slate-900 px-6 pt-12 pb-14 rounded-lg">
      <h2 className="pl-3 font-bold text-2xl pb-3">Completed</h2>

      {/* All Completed Tasks */}
      <div className="space-y-3">
        {tasks?.map((task) => (
          <TaskCompleted key={task._id} task={task} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default Completed;
