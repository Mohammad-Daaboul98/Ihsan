// import { studentInputRate } from '../utils/formFields';

import { useState } from "react";
import { Form, redirect, useActionData, useLoaderData } from "react-router-dom";
import { FormRow, FormRowSelect } from "../components";
import { studentInputRate } from "../utils/formFields";
import { Box, Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { findOrCreateJuz, findOrUpdateSurah } from "../utils/juzHelpers";
import { useQuery } from "@tanstack/react-query";
import { QURAN_INDEX } from "../../../server/shared/constants";

const fetchStudentProfile = async (studentId) => {
  try {
    const { data } = await customFetch.get(`/student/${studentId}`);

    return data.student;
  } catch (error) {
    const errorMessage = error?.response?.data?.msg;
    toast.error(errorMessage);
    throw error;
  }
};

const singleStudentQuery = (id) => {
  return {
    queryKey: ["students", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/student/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleStudentQuery(params.id));
      return params.id;
    } catch (error) {
      const errorMessage = error?.response?.data?.msg;
      toast.error(errorMessage);
      throw error;
    }
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const studentAttendance = { date: data.date, status: data.status };
    const newSurah = {
      surahName: data.surahName,
      pages: data.pages.split(",").map(Number),
      rate: data.rate,
      studentAttendance,
    };

    try {
      const studentProfile = await fetchStudentProfile(params.id);

      const juz = findOrCreateJuz(studentProfile?.StudentJuz, data.juzName);
      findOrUpdateSurah(juz, newSurah);

      await customFetch.patch(`student/student-rate/${params.id}`, {
        ...studentProfile,
      });
      queryClient.invalidateQueries(["students"]);
      toast.success("تم حفظ التقيم", { theme: "colored" });
      return redirect("../students");
    } catch (error) {
      console.error("Error:", error);
      return error;
    }
  };

const AddStudentRate = () => {
  const date = useActionData();

  const id = useLoaderData();
  const {
    data: { student },
  } = useQuery(singleStudentQuery(id));
  const juzName = student.StudentJuz;

  const [surahPages, setSurahPages] = useState([]);
  const [juzSurah, setJuzSurah] = useState([]);

  const errorMessage = date?.response?.data?.msg;

  // Handle selection change for surahName
  const handleSurahChange = (e) => {
    const selectedSurah = e.target.value;
    const surah = juzSurah.find((surah) => surah.id === selectedSurah);
    setSurahPages(surah ? surah.pages : []);
  };

  const handleJuzChange = (e) => {
    const selectedJuz = e.target.value;
    const juz = QURAN_INDEX.JUZ.find((juz) => juz.juzName === selectedJuz);
    setJuzSurah(juz ? juz.surahs : []);
  };



  return (
    <Box
      padding={{
        md: "25px 50px",
        sm: "20px",
        base: "20px 10px",
      }}
      m={"auto"}
      boxShadow="2xl"
      borderRadius="md"
    >
      <Heading mb={"50px"} textAlign="center">
        اضافة تقيم التسميع
      </Heading>

      {errorMessage ? (
        <Text fontSize="md" color="tomato" py="25px">
          {errorMessage}
        </Text>
      ) : null}

      <Form method="post">
        <SimpleGrid
          columns={{ lg: 2, md: 2, sm: 2, base: 1 }}
          spacing={{ md: "10px 20px", base: "10px" }}
        >
          {studentInputRate.map(
            ({ type, id, labelText, list, listItem, defaultValue }) => {
              if (type !== "select") {
                return (
                  <FormRow
                    key={id}
                    type={type}
                    name={id}
                    id={id}
                    labelText={labelText}
                    defaultValue={defaultValue}
                  />
                );
              } else if (listItem === "surahName") {
                return (
                  <FormRowSelect
                    key={id}
                    type={type}
                    name={id}
                    labelText={labelText}
                    list={juzSurah.map((surah) => ({
                      id: surah.id,
                      surahName: surah.surahName,
                    }))}
                    listItem={listItem}
                    onChange={handleSurahChange}
                    initialDefaultValue={defaultValue}
                  />
                );
              } else if (listItem === "pages") {
                return (
                  <FormRowSelect
                    key={id}
                    type={type}
                    name={id}
                    labelText={labelText}
                    list={surahPages.map((page) => ({ id: page, pages: page }))}
                    listItem={listItem}
                    initialDefaultValue={defaultValue}
                  />
                );
              } else {
                return (
                  <FormRowSelect
                    key={id}
                    type={type}
                    name={id}
                    labelText={labelText}
                    list={list ? list : juzName}
                    listItem={listItem}
                    initialDefaultValue={defaultValue}
                    onChange={listItem === "juzName" ? handleJuzChange : null}
                  />
                );
              }
            }
          )}
        </SimpleGrid>
        <Button
          mt="15px"
          type="submit"
          colorScheme="teal"
          size="lg"
          width="full"
        >
          انشاء
        </Button>
      </Form>
    </Box>
  );
};

export default AddStudentRate;
