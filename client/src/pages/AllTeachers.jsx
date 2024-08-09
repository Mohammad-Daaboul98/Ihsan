import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import { TableComponent } from "../components";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const allTeachersQuery = (params) => {
  return {
    queryKey: ["teachers", params],
    queryFn: async () => {
      const { data } = await customFetch.get("/teacher", {
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
      await queryClient.ensureQueryData(allTeachersQuery(params));
      return { searchValue: { ...params } };
    } catch (error) {
      const errorMessage = error?.response?.data?.msg;
      toast.error(errorMessage);
      return error;
    }
  };
const AllTeachers = () => {
  const { searchValue } = useLoaderData();
  const {
    data: { teachers },
  } = useQuery(allTeachersQuery(searchValue));

  const tableHeaderName = [
    "اسم الاستاذ",
    "عمل الاستاذ",
    "المستوى العلمي",
    "عمر الاستاذ",
    "رقم الهاتق",
  ];

  const tableItem = () => {
    let item = [];
    teachers.map((teacher) => {
      const teacherAge =
        day(new Date()).format("YYYY") - day(teacher?.age).format("YYYY");

      item.push([
        teacher?.teacherName,
        teacher?.teacherWork,
        teacher?.teacherStudy,
        teacherAge,
        teacher?.teacherPhone,
      ]);
    });
    return item;
  };

  return (
    <TableComponent
      title="معلومات الأستاذه"
      tableHeaderName={tableHeaderName}
      tableItem={tableItem()}
    />
  );
};

export default AllTeachers;
