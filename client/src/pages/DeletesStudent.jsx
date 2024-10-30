import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/student/${params.id}`);
      queryClient.invalidateQueries(["students&Teachers"]);
      queryClient.invalidateQueries(["teachers"]);

      toast.success(
        "تم حذف الطالب"
      );
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect("../students");
  };
