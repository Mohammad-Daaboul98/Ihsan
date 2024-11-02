import { useQuery } from "@tanstack/react-query";
import {
  QrReader,
  RadioGroup,
  SearchComponent,
  TableComponent,
} from "../components";
import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

const allStudentsQuery = (params) => {
  const { search } = params;
  return {
    queryKey: ["students&Teachers", search],
    queryFn: async () => {
      const data = customFetch.get("/student-with-teacher", { params });
      return data;
    },
  };
};

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    let studentAttendance = Object.entries(data).map(
      ([studentId, attendance]) => {
        return {
          studentId,
          status: attendance,
        };
      }
    );
    studentAttendance.pop();
    studentAttendance = {
      date: data.date,
      attendance: studentAttendance,
    };

    try {
      await customFetch.patch("student", studentAttendance);
      queryClient.invalidateQueries(["students"]);
      toast.success("تم تعديل حالة حضور الطالاب", { theme: "colored" });
      return redirect("../students");
    } catch (error) {
      to("Error:", error);
      return error;
    }
  };

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      await queryClient.ensureQueryData(allStudentsQuery(params));
      return { searchValue: { ...params } };
    } catch (error) {
      const errorMessage = error?.response?.data?.msg;
      toast.error(errorMessage);
      throw error;
    }
  };

const StudentsAttendance = () => {
  const [studentsAttendance, setStudentsAttendance] = useState({});

  const { searchValue } = useLoaderData();
  const { data: { students = [] } = {} } = useQuery(
    allStudentsQuery(searchValue)
  ).data;
  const navigation = useNavigation();
  const isLoading = navigation.state === "submitting";

  // Handle attendance state change for each student
  const handleAttendanceChange = (studentId, attendance) => {
    setStudentsAttendance((prevState) => ({
      ...prevState,
      [studentId]: attendance, // Update attendance for the specific student
    }));
  };

  const columns = [
    { id: "studentName", header: "الطالب", accessorKey: "studentName" },
    {
      header: "الاستاذ",
      accessorKey: "teacherId",
      cell: ({ getValue }) => {
        const teacherId = getValue();
        const teacherName = teacherId.teacherName;
        return teacherName;
      },
    },
    {
      header: "عدد ايام الحضور",
      accessorKey: "present",
      isNumeric: true,
      cell: ({ row }) => {
        let presentCount = 0;
        const attendance = row.original.studentAttendance;
        const attendanceArr = attendance.map((attend) => {
          return attend.status;
        });

        attendanceArr.map((i) => {
          if (i === "موجود") return presentCount++;
        });
        return presentCount;
      },
    },
    {
      header: "عدد ايام الغياب",
      accessorKey: "absent",
      isNumeric: true,
      cell: ({ row }) => {
        let absentCount = 0;
        const attendance = row.original.studentAttendance;
        const attendanceArr = attendance.map((attend) => {
          return attend.status;
        });

        attendanceArr.map((i) => {
          if (i === "غائب") return absentCount++;
        });
        return absentCount;
      },
    },
    {
      header: "حالة الطالب",
      accessorKey: "attendance",
      cell: ({ row }) => {
        const studentId = row.original._id;
        const attendance = studentsAttendance[studentId] || "موجد";

        return (
          <RadioGroup
            studentsAttendance={(value) =>
              handleAttendanceChange(studentId, value)
            }
            currentAttendance={attendance} // Pass current state as value
          />
        );
      },
    },
  ];

  return (
    <>
      <SearchComponent
        searchValue={searchValue}
        labelText="بحث عن طريق اسم الطالب"
      />
      <Box
        mx={"auto"}
        mt={4}
        mb="5px"
        width={{ base: "90%", md: "80%", lg: "xl", xl: "2xl", "2xl": "78%" }}
      >
        <Form method="post">
          {Object.entries(studentsAttendance).map(([studentId, attendance]) => (
            <Input
              key={studentId}
              type="hidden"
              name={studentId}
              value={attendance}
            />
          ))}
          <Box
            display="flex"
            gap={"20px 10px"}
            flexWrap={{ base: "wrap", lg: "nowrap", md: "nowrap", sm: "wrap" }}
          >
            <Input
              type="date"
              name="date"
              defaultValue={new Date().toISOString().split("T")[0]}
              width={"auto"}
              size="lg"
              textAlign="right"
              w={{ base: "100%", lg: "auto", md: "auto", sm: "100%" }}
            />
            <Button
              colorScheme="green"
              size="lg"
              w={{ base: "48%", lg: "auto", md: "auto", sm: "48%" }}
              // onClick={<QrReader />}
            >
              تصوير الباركود
            </Button>
            <Button
              type="submit"
              colorScheme="teal"
              size="lg"
              w={{ base: "48%", lg: "auto", md: "auto", sm: "48%" }}
              isLoading={isLoading}
              spinner={<BeatLoader size={8} color="white" />}
            >
              حفظ الحضور
            </Button>
          </Box>
        </Form>
      </Box>

      <TableComponent
        title="جدول الحضور"
        columns={columns}
        data={students}
        editAndDelete={false}
      />
    </>
  );
};

export default StudentsAttendance;
