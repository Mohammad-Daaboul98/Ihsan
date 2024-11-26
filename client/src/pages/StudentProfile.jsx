import { StudentInfo } from "../components";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { queryClient } from "../utils/queryClient";
import { useEffect } from "react";

const originalStudentQuery = (id) => ({
  queryKey: ["student", id],
  queryFn: async () => {
    const { data } = await customFetch.get(`/student/${id}`);
    return data;
  },
});

const singleStudentQuery = (params, id) => {
  const { rate, surahName, juzName } = params;
  return {
    queryKey: [
      "student",
      id,
      rate ?? "all",
      surahName ?? "all",
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
      await queryClient.ensureQueryData(originalStudentQuery(id));
      await queryClient.ensureQueryData(singleStudentQuery(param, id));
      return { searchValue: { ...param }, id };
    } catch (error) {
      return redirect("/");
    }
  };

const StudentProfile = () => {
  const { searchValue, id } = useLoaderData();

  const { data: filteredData } = useQuery(singleStudentQuery(searchValue, id));
  const { data: originalData } = useQuery(originalStudentQuery(id));

  // Use original and filtered data as needed
  const { student: originalStudent } = originalData;
  const { student: filteredStudent } = filteredData;

  return (
    <StudentInfo
      student={filteredStudent}
      originalStudentState={originalStudent}
      searchValue={searchValue}
    />
  );
};

export default StudentProfile;
