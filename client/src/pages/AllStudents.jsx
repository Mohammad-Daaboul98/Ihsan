import { useQuery } from "@tanstack/react-query";
import { Link, useLoaderData } from "react-router-dom";
import { ModalComponent, SearchComponent, TableComponent } from "../components";
import customFetch from "../utils/customFetch";
import { BiShow } from "react-icons/bi";
import { IoAddCircleSharp } from "react-icons/io5";
import {
  Button,
  IconButton,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ar";
dayjs.locale("ar");

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
      header: "عرض تقيم الطالب",
      accessorKey: "studentAttendance",
      cell: ({ row }) => (
        <Button
          onClick={() => {
            setSelectedAttendance(row.original.StudentJuz); // Set selected student's attendance
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
        // const juzName =
        //   row.original.StudentJuz?.map((juz) => juz.juzName).join(",") ||
        //   "NoJuz";

        return (
          <Link to={`../add-student-rate/${studentId}`}>
            <IconButton icon={<IoAddCircleSharp />} />
          </Link>
        );
      },
    },
  ];

  const modalColumns = [
    {
      header: "التاريخ",
      accessorKey: "studentAttendance.date",
      cell: ({ getValue }) => {
        const date = getValue();
        return date ? dayjs(date).format("D MMMM YYYY") : "-";
      },
    },
    {
      header: "الحالة",
      accessorKey: "studentAttendance.status",
      cell: ({ getValue }) => {
        const status = getValue();
        return status ? status : "-";
      },
    },
    {
      header: "الجزء",
      accessorKey: "juzName",
      cell: ({ getValue }) => {
        const juzName = getValue();
        return juzName ? juzName : "-";
      },
    },
    {
      header: "السورة",
      accessorKey: "surahName",
      cell: ({ getValue }) => {
        const surahName = getValue();
        return surahName ? surahName : "-";
      },
    },
    {
      header: "الصفحة",
      accessorKey: "pages",
      cell: ({ getValue }) => {
        const pages = getValue();
        return pages ? pages : "-";
      },
    },

    {
      header: "التقيم",
      accessorKey: "rate",
      cell: ({ getValue }) => {
        const rate = getValue();
        return rate ? rate : "-";
      },
    },
  ];

  const flattenData = (data) => {
    return data.flatMap((item) =>
      item.surahs.map((surah) => ({
        juzName: item.juzName,
        surahName: surah.surahName,
        pages: surah.pages,
        rate: surah.rate,
        studentAttendance: surah.studentAttendance,
      }))
    );
  };
  const flattenedData = flattenData(selectedAttendance);

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
            data={flattenedData}
            editAndDelete={false}
          />
        }
      />
    </>
  );
};

export default AllStudents;
