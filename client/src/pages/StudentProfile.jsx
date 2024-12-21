import { StudentInfo } from "../components";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

const originalStudentQuery = (id) => ({
  queryKey: ["student", id && id],
  queryFn: async () => {
    const { data } = await customFetch.get(
      id ? `/student/${id}` : "/student/current-student"
    );
    return data;
  },
});

const singleStudentQuery = (params, id) => {
  const { rate, surahName, juzName } = params;
  return {
    queryKey: [
      "student",
      id && id,
      rate ?? "all",
      surahName ?? "all",
      juzName ?? "all",
    ],

    queryFn: async () => {
      const { data } = await customFetch.get(
        id ? `/student/${id}` : "/student/current-student",
        { params }
      );
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request, params }) => {
    const param = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    try {
      const { id } = params;
      await queryClient.ensureQueryData(originalStudentQuery(id && id));
      await queryClient.ensureQueryData(singleStudentQuery(param, id && id));
      const returnValue = id
        ? { searchValue: { ...param }, id }
        : { searchValue: { ...param } };
      return { ...returnValue };
    } catch (error) {
      return redirect("/");
    }
  };

const StudentProfile = () => {
  const { searchValue, id } = useLoaderData();

  const { data: filteredData } = useQuery(
    singleStudentQuery(searchValue, id && id)
  );

  const { data: originalData } = useQuery(originalStudentQuery(id && id));

  // Use original and filtered data as needed
  const { student: originalStudent } = originalData;
  const { student: filteredStudent } = filteredData;

  return (
    <StudentInfo
      isStudent={id ? false : true}
      student={filteredStudent}
      originalStudentState={originalStudent}
      searchValue={searchValue}
    />
  );
};

export default StudentProfile;
