import {
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { TeacherFrom } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { patchData } from "../utils/excelDBHandler";

const singleTeacherQuery = (id) => {
  return {
    queryKey: ["teacher", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/teacher/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleTeacherQuery(params.id));
      return params.id;
    } catch (error) {
      const errorMessage = error?.response?.data?.msg;
      toast.error(errorMessage);
      throw error;
    }
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const role = "teacher";
    try {
      await customFetch.patch(`teacher/${params.id}`, {
        ...data,
        role,
      });
      queryClient.invalidateQueries(["teachers"]);
      toast.success("تم تعديل معلومات الاستاذ", { theme: "colored" });
      return redirect("../teachers");
    } catch (error) {
      console.error("Error:", error);
      return error;
    }
  };

const EditTeacher = () => {
  const date = useActionData();
  const id = useLoaderData();

  const {
    data: { teacher },
  } = useQuery(singleTeacherQuery(id));
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  const errorMessage = date?.response?.data?.msg;
  return (
    <TeacherFrom
      title="تعديل استاذ"
      btnTitle="تعديل"
      errorMessage={errorMessage}
      defaultValue={teacher}
      isLoading={isLoading}
    />
  );
};

export default EditTeacher;
