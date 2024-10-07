import { redirect, useActionData } from "react-router-dom";
import { StudentForm } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { createOrUpdateExcelFile } from "../utils/excelUtils";
import { useQuery } from "@tanstack/react-query";

const getTeachersQuery = () => {
  return {
    queryKey: ["get-teachers"],
    queryFn: async () => {
      const { data } = await customFetch.get("/teacher");
      return data;
    },
  };
};

export const loader = (queryClient) => async () => {
  try {
    const teachers = await queryClient.ensureQueryData(getTeachersQuery());
    return teachers;
  } catch (error) {
    const errorMessage = error?.response?.data?.msg;
    toast.error(errorMessage);
    throw error;
  }
};

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    data.StudentJuz = [{ juzName: data.StudentJuz }];

    const role = "student";
    try {
      const student = await customFetch.post("student", { ...data, role });
      const studentData = student?.data?.user;
      queryClient.invalidateQueries(["students"]);
      toast.success("تم انشاء طالب جديد", { theme: "colored" });
      const newStudentData = [
        {
          "اسم المستخدم": studentData?.userName,
          "كلمة السر": data.password,
          "اسم الطالب": data.studentName,
          "اسم الأب او الأم": data.parentName,
          "عمل الأب او الأم": data.parentWork,
          "رقم هاتف الأب أو الأم": data.parentPhone,
          "المستوى العلمي": data.StudentStudy,
          "عمر الطالب": data.age,
          "اسم الاستاذ": data.teacherId,
          الجزء: data.StudentJuz,
          // "نقاط الطالب": data.studentPoint,
          // "السورة":data.surahs,
          // "الصفحة":data.pages,
          // "تقيم التسميع":data.rate,
        },
      ];
      await createOrUpdateExcelFile("ملف حسابات الطالب", newStudentData);
      return redirect("../students");
    } catch (error) {
      console.error("Error:", error);
      return error;
    }
  };

const AddStudent = () => {
  const date = useActionData();
  const errorMessage = date?.response?.data?.msg;

  const { data: { teachers = [] } = {} } = useQuery(getTeachersQuery());

  return (
    <StudentForm
      title="انشاء طالب"
      btnTitle="انشاء"
      errorMessage={errorMessage}
      teachers={teachers}
    />
  );
};

export default AddStudent;
