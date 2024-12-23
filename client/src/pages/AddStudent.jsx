import { redirect, useActionData, useNavigation } from "react-router-dom";
import { StudentForm } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import whatsAppMessage from "../utils/whatsAppMessage";

const getTeachersQuery = () => {
  return {
    queryKey: ["teachers"],
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

    data.StudentJuz = [{ juzName: data.juzName }];
    const role = "student";
    try {
      const student = await customFetch.post("student", { ...data, role });
      // const studentData = student?.data?.user;
      const MessageInfo = student?.data?.MessageInfo;

      queryClient.invalidateQueries(["students&Teachers"]);
      queryClient.invalidateQueries(["teachers"]);
      queryClient.invalidateQueries(["students"]);
      toast.success("تم انشاء طالب جديد", { theme: "colored" });

      whatsAppMessage(
        data?.parentPhone,
        MessageInfo?.qrUrl,
        MessageInfo?.userName,
        data?.password
      );

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
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";
  return (
    <StudentForm
      title="انشاء طالب"
      btnTitle="انشاء"
      errorMessage={errorMessage}
      teachers={teachers}
      isLoading={isLoading}
    />
  );
};

export default AddStudent;
