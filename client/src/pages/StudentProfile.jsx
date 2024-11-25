import { StudentInfo } from "../components";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

const singleStudentQuery = (params, id) => {
  const { rate, surahName, date, juzName } = params;
  return {
    queryKey: [
      "student",
      id,
      rate ?? "all",
      surahName ?? "all",
      date ?? "all",
      juzName ?? "all",
    ],
    queryFn: async () => {
      const { data } = await customFetch.get(`/student/${id}`, { params });
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request, params }) => {
    const { id } = params;
    const param = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      await queryClient.ensureQueryData(singleStudentQuery(param, id));
      return { searchValue: { ...param }, id };
    } catch (error) {
      return redirect("/");
    }
  };

const StudentProfile = () => {
  const { searchValue, id } = useLoaderData();

  const {
    data: { student },
  } = useQuery(singleStudentQuery(searchValue, id));

  console.log(student);

  return <StudentInfo student={student} searchValue={searchValue} />;
};

export default StudentProfile;
