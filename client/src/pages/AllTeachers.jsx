import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import TableComponent from "../components/TableComponent"; // Adjust this import if necessary
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const allTeachersQuery = (params) => ({
  queryKey: ["teachers", params],
  queryFn: async () => {
    const { data } = await customFetch.get("/teacher", {
      params,
    });
    return data;
  },
});

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
  const { data: { teachers } = {} } = useQuery(allTeachersQuery(searchValue));

  const columns = [
    { id: "name", header: "اسم الاستاذ", accessorKey: "teacherName" },
    { id: "work", header: "عمل الاستاذ", accessorKey: "teacherWork" },
    { id: "study", header: "المستوى العلمي", accessorKey: "teacherStudy" },
    { id: "age", header: "عمر الاستاذ", accessorKey: "teacherAge", isNumeric: true },
    { id: "phone", header: "رقم الهاتق", accessorKey: "teacherPhone" },
  ];

  const data = teachers?.map((teacher) => {
    const teacherAge = day().year() - day(teacher?.age).year();
    return {
      teacherName: teacher?.teacherName,
      teacherWork: teacher?.teacherWork,
      teacherStudy: teacher?.teacherStudy,
      teacherAge,
      teacherPhone: teacher?.teacherPhone,
    };
  }) || [];
  console.log(data);
  

  return (
    <TableComponent
      title="معلومات الأستاذه"
      columns={columns}
      data={data}
    />
  );
};

export default AllTeachers;
