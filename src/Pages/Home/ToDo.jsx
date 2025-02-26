import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Auth/Hook/useAxiosPublic";
import useAuth from "../../Auth/Hook/useAuth";
import TaskTodo from "./TaskTodo";

const ToDo = () => {
  // useHooks
  const axiosPublic = useAxiosPublic();
  const { users } = useAuth();
  const email = users?.email;
  const category = "To-Do";

  // tanstack
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks", category],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/tasksTodo?email=${email}&category=${category}`
      );
      return res.data;
    },
  });
  refetch();
  return (
    <>
      <div className=" bg-gray-300 dark:bg-slate-900 px-6 pt-12 pb-14 rounded-lg">
        <h2 className="pl-3 font-bold text-2xl pb-3">To-Do</h2>

        {/* all task based on category */}
        <div className="space-y-3">
          {tasks?.map((task) => (
            <TaskTodo key={task._id} task={task} refetch={refetch}></TaskTodo>
          ))}
        </div>
      </div>
    </>
  );
};

export default ToDo;
