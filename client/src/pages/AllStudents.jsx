import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLoaderData } from "react-router-dom";
import {
  ModalComponent,
  QRCodeComponent,
  SearchComponent,
  TableComponent,
} from "../components";
import customFetch from "../utils/customFetch";
import { IoAddCircleSharp } from "react-icons/io5";
import {
  BiLogoTelegram,
  BiLogoWhatsapp,
  BiMessageSquareDetail,
  BiShareAlt,
  BiShow,
} from "react-icons/bi";
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  ModalOverlay,
  Tooltip,
} from "@chakra-ui/react";
import QRCode from "qrcode";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAttendance, setSelectedAttendance] = useState([]);
  const { searchValue } = useLoaderData();

  const { data, isLoading, error } = useQuery(allStudentsQuery(searchValue));
  const students = data?.students || [];

  const Overlay = () => (
    <ModalOverlay
      bg="blackAlpha.100"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

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
    { id: "parentName", header: "ولي الأمر", accessorKey: "parentName" },
    { id: "parentWork", header: "عمل ولي الأمر", accessorKey: "parentWork" },
    {
      id: "parentPhone",
      header: "هاتف ولي الأمر",
      accessorKey: "parentPhone",
    },
    {
      id: "StudentStudy",
      header: "المستوى العلمي",
      accessorKey: "StudentStudy",
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
            numberPhone="parentPhone"
            name="studentName"
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
            <Button
              ml="10px"
              onClick={() => {
                setSelectedAttendance(row.original.StudentJuz);
                onOpen();
              }}
            >
              <BiShow />
            </Button>
            <Link to={`../add-student-rate/${studentId}`}>
              <IconButton icon={<IoAddCircleSharp />} />
            </Link>
          </>
        );
      },
    },
  ];

  const modalColumns = [
    {
      header: "التاريخ",
      cell: ({ row }) => {
        const date = row.original.page.date;
        return date ? dayjs(date).format("D MMMM YYYY") : "-";
      },
    },
    {
      header: "الجزء",
      accessorKey: "juzName",
      cell: ({ getValue }) => {
        const juzName = getValue();
        return juzName || "-";
      },
    },
    {
      header: "السورة",
      accessorKey: "surahName",
      cell: ({ getValue }) => {
        const surahName = getValue();
        return surahName || "-";
      },
    },
    {
      header: "الصفحة",
      cell: ({ row }) => {
        const pageFrom = row.original.page.pageFrom;
        const pageTo = row.original.page.pageTo;
        return pageFrom && pageTo ? `${pageFrom} - ${pageTo}` : pageFrom || "-";
      },
    },
    {
      header: "التقيم",
      cell: ({ row }) => {
        const rate = row.original.page.rate;
        return rate || "-";
      },
    },
  ];

  const flattenData = (data) => {
    return data.flatMap((item) =>
      item.surahs.flatMap((surah) =>
        surah.pages.map((page) => ({
          juzName: item.juzName,
          surahName: surah.surahName,
          page: page,
          rate: surah.rate,
          studentAttendance: surah.studentAttendance,
        }))
      )
    );
  };

  const flattenedData = flattenData(selectedAttendance);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading students data.</p>;

  return (
    <>
      <SearchComponent
        searchValue={searchValue}
        labelText="بحث عن طريق اسم الطالب او العمر"
      />
      <TableComponent
        title="معلومات الطالب"
        columns={columns}
        data={students}
        editAndDelete={true}
        editPage="edit-student"
        deletePage="delete-student"
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
            width="6xl"
          />
        }
      />
    </>
  );
};

export default AllStudents;
