import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import {
  AccordionComponents,
  FormComponents,
  JuzForm,
  StudentForm,
} from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@chakra-ui/react";
import { QURAN_INDEX } from "../../../server/shared/constants";
import { studentPointCalc } from "../utils/studentPointCalc";

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
    const { oldJuz, newJuz } = data;

    try {
      let toastMsg;
      if (juzName) {
        const juz = await customFetch.post(`juz/${params.id}`, {
          ...data,
        });
        toastMsg = juz.data.msg;
      } else if (oldJuz) {
        const juz = await customFetch.patch(`juz/${oldJuz}`, {
          newJuz,
        });
        toastMsg = juz.data.msg;
      } else {
        if (data.pointSpent) {
          const studentData = queryClient.getQueryData([
            "students",
            "teachers",
            params.id,
          ]);
          const pointSpent = studentData?.students?.pointSpent || 0;

          data.pointSpent = Number(data.pointSpent) + pointSpent;
        }
        const student = await customFetch.patch(`student/${params.id}`, {
          ...data,
        });
        toastMsg = student.data.msg;
      }
      queryClient.invalidateQueries(["students&Teachers"]);
      queryClient.invalidateQueries(["teachers"]);
      queryClient.invalidateQueries(["students"]);
      queryClient.invalidateQueries(["student", params.id]);
      toast.success(toastMsg, { theme: "colored" });
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
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  const { studentJuz } = students;
  const quranJuzName = QURAN_INDEX.JUZ.map((i) => {
    return i.juzName;
  });
  const currentJuz = studentJuz.map((i) => {
    return i?.juzName;
  });

  const juzName = quranJuzName?.filter((juz) => !currentJuz.includes(juz));
  const studentExtraPoint = students?.studentExtraPoint || 0;
  const pointSpent = students?.pointSpent || 0;
  const studentPoint =
    studentPointCalc(students) + studentExtraPoint - pointSpent;

  const accordionItems = [
    {
      title: "اضافة جزء",
      component: (
        <JuzForm
          juzList={juzName}
          juzTitle="juzName"
          juzLabel="الجزء"
          btnTitle="اضافة جزء"
        />
      ),
    },
    {
      title: "تعديل جزء",
      component: (
        <JuzForm
          juzList={studentJuz}
          label
          newJuzList={juzName}
          juzTitle="oldJuz"
          juzLabel="الجزء القديم"
          btnTitle="تعديل جزء"
          listItem="juzName"
          EditJuz={true}
        />
      ),
    },
    {
      title: "صرف نقاط الطالب",
      component: (
        <FormComponents
          btnTitle="صرف نقاط"
          id="pointSpent"
          type="Number"
          labelText="نقاط الطالب"
          max={studentPoint}
          min={1}
          placeholder={`عدد نقاط الطالب (${studentPoint}) نقطة`}
          onInvalid={
            studentPoint === 0
              ? `لايوجد للطالب نقاط`
              : `القيمة يجب ان تكون أقل من (${studentPoint}) نقطة`
          }
        />
      ),
    },
    {
      title: "اضافة نقاط نشاط",
      component: (
        <FormComponents
          btnTitle="اضافة نقاط"
          id="studentExtraPoint"
          type="Number"
          labelText="نقاط النشاط"
          placeholder=" "
        />
      ),
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
          removeJuz={true}
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
      <AccordionComponents items={accordionItems} defaultIndex={4} />
    </Box>
  );
};

export default EditStudent;
