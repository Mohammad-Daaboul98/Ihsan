import { useQuery } from "@tanstack/react-query";
import { Link, useLoaderData } from "react-router-dom";
import { ModalComponent, SearchComponent, TableComponent } from "../components";
import customFetch from "../utils/customFetch";
import { BiShow } from "react-icons/bi";
import { IoAddCircleSharp } from "react-icons/io5";
import {
  Box,
  Button,
  IconButton,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

// Query function to fetch all teachers
const allStudentsQuery = (params) => {
  const { search } = params;
  return {
    queryKey: ["students", search],
    queryFn: async () => {
      const { data } = await customFetch.get("/student", { params });
      return data;
    },
  };
};

// Loader for the route
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAttendance, setSelectedAttendance] = useState([]); // State for storing selected student's attendance

  const { searchValue } = useLoaderData();

  const { data: { student = [] } = {} } = useQuery(
    allStudentsQuery(searchValue)
  );

  const Overlay = () => (
    <ModalOverlay
      bg="blackAlpha.100"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const columns = [
    { id: "studentName", header: "اسم الطالب", accessorKey: "studentName" },
    { id: "parentName", header: "اسم الأب او الأم", accessorKey: "parentName" },
    { id: "parentWork", header: "عمل الأب او الأم", accessorKey: "parentWork" },
    {
      id: "parentPhone",
      header: "رقم هاتف الأب أو الأم",
      accessorKey: "parentPhone",
    },
    {
      id: "StudentStudy",
      header: "المستوى العلمي",
      accessorKey: "StudentStudy",
    },
    { id: "age", header: "عمر الطالب", accessorKey: "age", isNumeric: true },
    {
      header: "الجزء",
      accessorKey: "StudentJuz",
      cell: ({ getValue }) => {
        const studentJuz = getValue();
        return studentJuz && studentJuz.length > 0
          ? studentJuz.map((juz) => juz.juzName).join(", ")
          : "لم يتم ادخال الجزء";
      },
    },
    {
      header: "عرض ايام حضور الطالب",
      accessorKey: "studentAttendance",
      cell: ({ row }) => (
        <Button
          onClick={() => {
            setSelectedAttendance(row.original.studentAttendance); // Set selected student's attendance
            onOpen(); // Open modal
          }}
        >
          <BiShow />
        </Button>
      ),
    },
    {
      header: "اضافة تقيم",
      accessorKey: "studentDaily",
      cell: ({ row }) => {
        const studentId = row.original._id;
        const juzName =
          row.original.StudentJuz?.map((juz) => juz.juzName).join(",") ||
          "NoJuz";

        return (
          <Link
            to={`../add-student-rate/${studentId}?juzName=${encodeURIComponent(
              juzName
            )}`}
          >
            <IconButton icon={<IoAddCircleSharp />} />
          </Link>
        );
      },
    },
  ];

  const modalColumns = [
    {
      header: "التاريخ",
      accessorKey: "date",
      cell: ({ getValue }) => {
        const attendance = getValue();
        return attendance ? attendance : "-";
      },
    },
    {
      header: "الحالة",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const attendance = getValue();
        return attendance ? attendance : "-";
      },
    },
  ];

  return (
    <>
      <SearchComponent
        searchValue={searchValue}
        labelText="بحث عن طريق اسم الطالب او العمر"
      />
      <TableComponent
        title="معلومات الطالب"
        columns={columns}
        data={student}
        editAndDelete={true}
      />
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        overlay={<Overlay />}
        components={
          <TableComponent
            title="معلومات حضور الطالب"
            columns={modalColumns}
            data={selectedAttendance}
            editAndDelete={false}
          />
        }
      />
    </>
  );
};

export default AllStudents;
