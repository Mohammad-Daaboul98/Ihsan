import { redirect, useActionData, useLoaderData } from "react-router-dom";
import { StudentForm } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { createOrUpdateExcelFile } from "../utils/excelUtils";
import { useQuery } from "@tanstack/react-query";

const studentsTeachersQuery = (id) => {
  return {
    queryKey: ["students", "teachers", id],
    queryFn: async () => {
      const [students, teachers] = await Promise.all([
        customFetch.get(`/student/${id}`),
        customFetch.get("/teacher"),
      ]);

      return {
        students: students.data.student,
        teachers: teachers.data.teachers,
      };
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(studentsTeachersQuery(params.id));
      return params.id;
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
const EditStudent = () => {
  const date = useActionData();
  const id = useLoaderData();
  const errorMessage = date?.response?.data?.msg;

  const { data: { students, teachers } = {} } = useQuery(
    studentsTeachersQuery(id)
  );
  return (
    <StudentForm
      title="تعديل طالب"
      btnTitle="تعديل"
      errorMessage={errorMessage}
      teachers={teachers}
      defaultValue={students}
    />
  );
};

export default EditStudent;
