import { useQuery } from "@tanstack/react-query";
import {
  QrReader,
  RadioGroup,
  SearchComponent,
  TableComponent,
} from "../components";
import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { useState } from "react";

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
      <QrReader />
      <SearchComponent
        searchValue={searchValue}
        labelText="بحث عن طريق اسم الطالب او العمر"
      />
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
