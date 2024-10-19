import {redirect, useActionData } from "react-router-dom";
import {TeacherFrom } from "../components";

import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { createOrUpdateExcelFile } from "../utils/excelUtils";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const role = "teacher";
    try {
      const teacher = await customFetch.post("teacher", { ...data, role });
      const teacherData = teacher?.data?.user;
      queryClient.invalidateQueries(["teachers"]);
      toast.success("تم انشاء استاذ جديد", { theme: "colored" });
      const newTeacherData = [
        {
          "اسم المستخدم": teacherData?.userName || 'N/A',  // Default to 'N/A' if undefined
          "كلمة السر": data?.password || 'N/A',
          "اسم الاستاذ": data?.teacherName || 'N/A',
          "عمل الاستاذ": data?.teacherWork || 'N/A',
          "المستوى العلمي": data?.teacherStudy || 'N/A',
          "عمر الاستاذ": data?.age || 'N/A',
          "رقم الهاتق": data?.teacherPhone || 'N/A',
        },
      ];
      
      // Call the function to save or update the Excel file
      await createOrUpdateExcelFile("ملف حسابات الاساتذه", newTeacherData);
      

      return redirect("../teachers");
    } catch (error) {
      console.error("Error:", error);
      return error;
    }
  };

const AddTeacher = () => {
  const date = useActionData();
  const errorMessage = date?.response?.data?.msg;

  return (
    <TeacherFrom
      title="انشاء استاذ"
      btnTitle="انشاء"
      errorMessage={errorMessage}
      defaultValue=""
    />
  );
};

export default AddTeacher;
