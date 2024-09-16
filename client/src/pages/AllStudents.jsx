import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import { ModalComponent, SearchComponent, TableComponent } from "../components";
import customFetch from "../utils/customFetch";
import { BiShow } from "react-icons/bi";
import { Button, ModalOverlay, useDisclosure } from "@chakra-ui/react";

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

  const { searchValue } = useLoaderData();

  const { data: { student = [] } = {} } = useQuery(
    allStudentsQuery(searchValue)
  );

  const Overlay = () => (
    <ModalOverlay
      bg='blackAlpha.100'
      backdropFilter='blur(10px) hue-rotate(90deg)'
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
          : "No Juz Assigned";
      },
    },
    {
      header: "عرض ايام حضور الطالب",
      accessorKey: "studentAttendance",
      cell: () => (
        <Button onClick={()=>onOpen()}>
          <BiShow />
        </Button>
      ),
    },
  ];

  return (
    <>
      <SearchComponent
        searchValue={searchValue}
        labelText="بحث عن طريق اسم الطالب او العمر"
      />
      <TableComponent title="معلومات الطالب" columns={columns} data={student} />
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        title="Modal Title"
        bodyContent={<p>This is the modal content.</p>}
        overlay={<Overlay />}
      />
    </>
  );
};

export default AllStudents;
