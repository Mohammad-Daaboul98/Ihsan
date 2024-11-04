import { redirect, useActionData, useLoaderData, useNavigation } from "react-router-dom";
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
      const teacher = await customFetch.patch(`teacher/${params.id}`, {
        ...data,
        role,
      });
      queryClient.invalidateQueries(["teachers"]);
      toast.success("تم تعديل معلومات الاستاذ", { theme: "colored" });

      const teacherData = teacher?.data?.updatedUser;
      const oldUserName = student?.data?.oldUserName;

      const updateTeacherData = [
        {
          "اسم الاستاذ": data.teacherName,
          "عمل الاستاذ": data.teacherWork,
          "المستوى العلمي": data.teacherStudy,
          "عمر الاستاذ": data.age,
          "رقم الهاتق": data.teacherPhone,
        },
      ];

      data.password
        ? (updateStudentData[0]["كلمة السر"] = data.password)
        : null;
      data.userName
        ? (updateStudentData[0]["اسم المستخدم"] = teacherData?.userName)
        : null;

      await patchData(updateTeacherData, "teachers", oldUserName);

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
