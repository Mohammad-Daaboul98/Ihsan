import { redirect, useActionData, useLoaderData } from "react-router-dom";
import { TeacherFrom } from "../components";

import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { createOrUpdateExcelFile } from "../utils/excelUtils";
import { useQuery } from "@tanstack/react-query";

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
      const teacher = await customFetch.patch(`teacher/${params.id}`, {
        ...data,
        role,
      });
      const teacherData = teacher?.data?.user;
      queryClient.invalidateQueries(["teachers"]);
      toast.success("تم تعديل معلومات الاستاذ", { theme: "colored" });
      const newTeacherData = [
        {
          "اسم المستخدم": teacherData?.userName,
          "كلمة السر": data.password,
          "اسم الاستاذ": data.teacherName,
          "عمل الاستاذ": data.teacherWork,
          "المستوى العلمي": data.teacherStudy,
          "عمر الاستاذ": data.age,
          "رقم الهاتق": data.teacherPhone,
        },
      ];
      await createOrUpdateExcelFile("ملف حسابات الاساتذه", newTeacherData);

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


  const errorMessage = date?.response?.data?.msg;
  return (
    <TeacherFrom
      title="تعديل استاذ"
      btnTitle="تعديل"
      errorMessage={errorMessage}
      defaultValue={teacher}
    />
  );
};

export default EditTeacher;
