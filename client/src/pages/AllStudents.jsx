import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import { SearchComponent, TableComponent } from "../components";
import customFetch from "../utils/customFetch";

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
  const { searchValue } = useLoaderData();  

  const { data: { student = [] } = {} } = useQuery(
    allStudentsQuery(searchValue)
  );
  console.log(student);
  

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
      />
    </>
  );
};

export default AllStudents;
