import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import { SearchComponent, TableComponent } from "../components";
import customFetch from "../utils/customFetch";

// Query function to fetch all teachers
const allTeachersQuery = (params) => {
  const { search } = params;
  return {
    queryKey: ["teachers", search],
    queryFn: async () => {
      const { data } = await customFetch.get("/teacher", { params });
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
      await queryClient.ensureQueryData(allTeachersQuery(params));
      return { searchValue: { ...params } };
    } catch (error) {
      const errorMessage = error?.response?.data?.msg;
      toast.error(errorMessage);
      throw error;
    }
  };

const AllTeachers = () => {
  const { searchValue } = useLoaderData();

  const { data: { teachers = [] } = {} } = useQuery(
    allTeachersQuery(searchValue)
  );

  const columns = [
    { id: "name", header: "اسم الاستاذ", accessorKey: "teacherName" },
    { id: "work", header: "عمل الاستاذ", accessorKey: "teacherWork" },
    { id: "study", header: "المستوى العلمي", accessorKey: "teacherStudy" },
    { id: "age", header: "عمر الاستاذ", accessorKey: "age", isNumeric: true },
    { id: "phone", header: "رقم الهاتف", accessorKey: "teacherPhone" },
  ];

  return (
    <>
      <SearchComponent
        searchValue={searchValue}
        labelText="بحث عن طريق اسم الاستاذ او العمر"
      />
      <TableComponent
        title="معلومات الأستاذه"
        columns={columns}
        data={teachers}
        editAndDelete={true}
        editPage = 'edit-teacher'
        deletePage = 'delete-teacher'
      />
    </>
  );
};

export default AllTeachers;
