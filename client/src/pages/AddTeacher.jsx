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
      const MessageInfo = teacher?.data?.MessageInfo;

      queryClient.invalidateQueries(["teachers"]);
      toast.success("تم انشاء استاذ جديد", { theme: "colored" });
      whatsAppMessage(
        data?.teacherPhone,
        "",
        MessageInfo?.userName,
        data?.password
      );
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
