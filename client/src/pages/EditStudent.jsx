import { redirect, useActionData, useLoaderData, useNavigation } from "react-router-dom";
import { AccordionComponents, JuzForm, StudentForm } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@chakra-ui/react";
import { findOrCreateJuz } from "../utils/juzHelpers";
import { QURAN_INDEX } from "../../../server/shared/constants";
import { patchData } from "../utils/excelDBHandler";

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
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const { juzName } = data;
    const { students } = queryClient.getQueryData([
      "students",
      "teachers",
      params.id,
    ]);
    let toastMsg;
    try {
      if (juzName) {
        findOrCreateJuz(students?.StudentJuz, data.juzName);
        await customFetch.patch(`student/${params.id}`, {
          ...students,
        });
        toastMsg = "تم اضافة جزء جديد للطالب";
      } else {
        data.StudentJuz = [{ juzName: data.StudentJuz }];
        const student = await customFetch.patch(`student/${params.id}`, {
          ...data,
        });

        toastMsg = "تم تعديل معلومات الطالب";
        const studentData = student?.data?.updatedUser;
        const oldUserName = student?.data?.oldUserName;

        const updateStudentData = [
          {
            "اسم الطالب": data.studentName,
            "اسم الأب او الأم": data.parentName,
            "عمل الأب او الأم": data.parentWork,
            "رقم هاتف الأب أو الأم": data.parentPhone,
          },
        ];

        data.password
          ? (updateStudentData[0]["كلمة السر"] = data.password)
          : null;
        data.userName
          ? (updateStudentData[0]["اسم المستخدم"] = studentData?.userName)
          : null;

        await patchData(updateStudentData, "students", oldUserName);
      }
      queryClient.invalidateQueries(["students&Teachers"]);
      queryClient.invalidateQueries(["teachers"]);
      queryClient.invalidateQueries(["students"]);

      toast.success(toastMsg, { theme: "colored" });
      return juzName ? null : redirect("../students");
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
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  const { StudentJuz } = students;
  const quranJuzName = QURAN_INDEX.JUZ.map((i) => {
    return i.juzName;
  });
  const currentJuz = StudentJuz.map((i) => {
    return i?.juzName;
  });

  const juzName = quranJuzName?.filter((juz) => !currentJuz.includes(juz));

  const accordionItems = [
    {
      title: "اضافة جزء",
      component: <JuzForm juzName={juzName} />,
    },
    {
      title: "تعديل معلومات الطالب",
      component: (
        <StudentForm
          btnTitle="تعديل"
          errorMessage={errorMessage}
          teachers={teachers}
          defaultValue={students}
          disable={true}
          checkBox={true}
          isLoading={isLoading}
        />
      ),
    },
  ];
  return (
    <Box
      padding={{
        md: "25px 50px",
        sm: "20px",
        base: "20px 10px",
      }}
    >
      <AccordionComponents items={accordionItems} defaultIndex={1} />
    </Box>
  );
};

export default EditStudent;
