import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLoaderData } from "react-router-dom";
import {
  QRCodeComponent,
  SearchComponent,
  TableComponent,
} from "../components";
import customFetch from "../utils/customFetch";
import { IoAddCircleSharp } from "react-icons/io5";
import { BiShow } from "react-icons/bi";
import {
  IconButton,
  // useDisclosure,
  // ModalOverlay,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/ar";
dayjs.locale("ar");

const allStudentsQuery = (params) => {
  const { search } = params;
  return {
    queryKey: ["students&Teachers", search],
    queryFn: async () => {
      const { data } = await customFetch.get("/student-with-teacher", {
        params,
      });
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

const AllStudents = () => {
  const { searchValue } = useLoaderData();

  const { data } = useQuery(allStudentsQuery(searchValue));
  const students = data?.students || [];

  // const Overlay = () => (
  //   <ModalOverlay
  //     bg="blackAlpha.100"
  //     backdropFilter="blur(10px) hue-rotate(90deg)"
  //   />
  // );

  const columns = [
    { id: "studentName", header: "الطالب", accessorKey: "studentName" },
    {
      header: "الاستاذ",
      accessorKey: "teacherId",
      cell: ({ getValue }) => {
        const teacherId = getValue();
        return teacherId?.teacherName || "N/A";
      },
    },
    {
      id: "parentPhone",
      header: "هاتف ولي الأمر",
      accessorKey: "parentPhone",
      cell: ({ cell }) => (
        <div style={{ direction: "ltr" }}>{cell.getValue()}</div>
      ),
    },

    { id: "age", header: "عمر الطالب", accessorKey: "age", isNumeric: true },
    {
      header: "باركود",
      accessorKey: "qrCode",
      cell: ({ row }) => {
        const student = row.original;
        return (
          <QRCodeComponent
            list={student}
            id="_id"
            phoneNumber="parentPhone"
            name="studentName"
            qrCode="qrCode"
          />
        );
      },
    },
    {
      header: "التقييم",
      accessorKey: "View&Add",
      cell: ({ row }) => {
        const studentId = row.original._id;

        return (
          <>
            <Link to={`../student/${studentId}`}>
              <IconButton ml="10px" icon={<BiShow />} />
            </Link>
            <Link to={`../add-student-rate/${studentId}`}>
              <IconButton icon={<IoAddCircleSharp />} />
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <>
      <SearchComponent
        searchValue={searchValue}
        labelText="بحث عن طريق اسم الطالب او العمر"
      />

      <>
        <TableComponent
          title="معلومات الطالب"
          columns={columns}
          data={students}
          editAndDelete={true}
          editPage="edit-student"
          deletePage="delete-student"
        />
      </>
    </>
  );
};

export default AllStudents;
