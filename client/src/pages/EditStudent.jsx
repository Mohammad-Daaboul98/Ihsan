import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import { AccordionComponents, FormRowSelect, StudentForm } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { createOrUpdateExcelFile } from "../utils/excelUtils";
import { useQuery } from "@tanstack/react-query";
import { Box, Button } from "@chakra-ui/react";
import { QURAN_INDEX } from "../../../server/shared/constants";

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
    data.StudentJuz = [{ juzName: data.StudentJuz }];

    try {
      const student = await customFetch.patch(`student/${params.id}`, {
        ...data,
      });
      // const studentData = student?.data?.user;
      queryClient.invalidateQueries(["students"]);
      toast.success("تم تعديل معلومات الطالب", { theme: "colored" });
      // const newStudentData = [
      //   {
      //     "اسم المستخدم": studentData?.userName,
      //     "كلمة السر": data.password,
      //     "اسم الطالب": data.studentName,
      //     "اسم الأب او الأم": data.parentName,
      //     "عمل الأب او الأم": data.parentWork,
      //     "رقم هاتف الأب أو الأم": data.parentPhone,
      //     "المستوى العلمي": data.StudentStudy,
      //     "عمر الطالب": data.age,
      //     "اسم الاستاذ": data.teacherId,
      //     الجزء: data.StudentJuz,
      //     // "نقاط الطالب": data.studentPoint,
      //     // "السورة":data.surahs,
      //     // "الصفحة":data.pages,
      //     // "تقيم التسميع":data.rate,
      //   },
      // ];
      // await createOrUpdateExcelFile("ملف حسابات الطالب", newStudentData);
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

  const JuzForm = () => {
    return (
      <Box>
        <Form method="post">
          <FormRowSelect
            name={"juzName"}
            labelText={"الجزء"}
            list={QURAN_INDEX.JUZ}
            listItem={"juzName"}
            // PlacementTop={true}
          />
          <Button mt={'10px'}>
            حفظ
          </Button>
        </Form>
      </Box>
    );
  };

  const accordionItems = [
    {
      title: "اضافة جزء",
      component: <JuzForm />,
    },
    {
      title: "تعديل طالب",
      component: (
        <StudentForm

          btnTitle="تعديل"
          errorMessage={errorMessage}
          teachers={teachers}
          defaultValue={students}
          disable={true}
          checkBox={true}
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
