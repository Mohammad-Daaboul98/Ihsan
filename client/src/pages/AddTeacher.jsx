import { redirect, useActionData, useNavigation } from "react-router-dom";

import { TeacherFrom } from "../components";

import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { handleFormSubmit } from "../utils/excelDBHandler";
import whatsAppMessage from "../utils/whatsAppMessage";
import { useState } from "react";

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
      // const newTeacherData = [
      //   {
      //     "اسم المستخدم": teacherData?.userName,
      //     "كلمة السر": data?.password,
      //     "اسم الاستاذ": data?.teacherName,
      //     "عمل الاستاذ": data?.teacherWork,
      //     "المستوى العلمي": data?.teacherStudy,
      //     "عمر الاستاذ": data?.age,
      //     "رقم الهاتق": data?.teacherPhone,
      //   },
      // ];

      // await handleFormSubmit(newTeacherData, "ملف الاساتذه");

      return redirect("../teachers");
    } catch (error) {
      console.error("Error:", error);
      return { error, data };
    }
  };

const AddTeacher = () => {
  const data = useActionData();

  const errorMessage = data?.error?.response?.data?.msg;
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  const defaultValue = { ...data?.data };

  return (
    <TeacherFrom
      title="انشاء استاذ"
      btnTitle="انشاء"
      errorMessage={errorMessage}
      defaultValue={defaultValue}
      isLoading={isLoading}
    />
  );
};

export default AddTeacher;
