<<<<<<< HEAD
import { redirect, useActionData } from "react-router-dom";

=======
import { redirect, useActionData, useNavigation } from "react-router-dom";
>>>>>>> aa62fc11054e580abf1ec47e4d8c195381bcc35e
import { TeacherFrom } from "../components";

import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { handleFormSubmit } from "../utils/excelDBHandler";
import whatsAppMessage from "../utils/whatsAppMessage";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const role = "teacher";
    try {
      const teacher = await customFetch.post("teacher", { ...data, role });
      const teacherData = teacher?.data?.user;
      const MessageInfo = teacher?.data?.MessageInfo;

      queryClient.invalidateQueries(["teachers"]);
      toast.success("تم انشاء استاذ جديد", { theme: "colored" });
      whatsAppMessage(
        data?.teacherPhone,
        "",
        MessageInfo?.userName,
        data?.password
      );
      const newTeacherData = [
        {
          "اسم المستخدم": teacherData?.userName,
          "كلمة السر": data?.password,
          "اسم الاستاذ": data?.teacherName,
          "عمل الاستاذ": data?.teacherWork,
          "المستوى العلمي": data?.teacherStudy,
          "عمر الاستاذ": data?.age,
          "رقم الهاتق": data?.teacherPhone,
        },
      ];

      await handleFormSubmit(newTeacherData, "teachers");

      return redirect("../teachers");
    } catch (error) {
      console.error("Error:", error);
      return error;
    }
  };

const AddTeacher = () => {
  const date = useActionData();
  const errorMessage = date?.response?.data?.msg;
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  return (
    <TeacherFrom
      title="انشاء استاذ"
      btnTitle="انشاء"
      errorMessage={errorMessage}
      defaultValue=""
      isLoading={isLoading}
    />
  );
};

export default AddTeacher;
