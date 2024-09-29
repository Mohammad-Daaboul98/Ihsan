// import { studentInputRate } from '../utils/formFields';

import { useState } from "react";
import { Form, useActionData, useLocation } from "react-router-dom";
import { FormRow, FormRowSelect } from "../components";
import { studentInputRate } from "../utils/formFields";
import { Box, Button, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import customFetch from "../utils/customFetch";
import { QURAN_INDEX } from "../../../server/shared/constants";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const juzName = queryParams.get("juzName");
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(juzName);
    
    data.StudentJuz = [
      {
        juzName,
        surahs: [
          {
            surahName: data.surahName,
            pages: data.pages,
            rate: data.rate,
          },
        ],
      },
    ];
    data.studentAttendance = [{ date: data.date, status: data.status }];

    try {
      await customFetch.patch(`student/student-rate/${params.id}`, data);
      queryClient.invalidateQueries(["student-rate"]);
      toast.success("تم حفظ التقيم", { theme: "colored" });
      return redirect("../students");
    } catch (error) {
      console.error("Error:", error);
      return error;
    }
  };

const AddStudentRate = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const juzName = queryParams.get("juzName");

  // State to track selected surah and its pages
  const [surahPages, setSurahPages] = useState([]);

  const date = useActionData();
  const errorMessage = date?.response?.data?.msg;
  console.log(errorMessage);

  // Handle selection change for surahName
  const handleSurahChange = (e) => {
    const selectedSurahId = e.target.value;
    const selectedJuz = QURAN_INDEX.JUZ.find((juz) => juz.juzName === juzName);

    if (selectedJuz) {
      const surah = selectedJuz.surahs.find(
        (surah) => surah.id.toString() === selectedSurahId
      );
      setSurahPages(surah ? surah.pages : []);
    }
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
          {studentInputRate.map(({ type, id, labelText, list, listItem }) => {
            if (type !== "select") {
              return (
                <FormRow
                  key={id}
                  type={type}
                  name={id}
                  id={id}
                  labelText={labelText}
                />
              );
            } else if (listItem === "surahName") {
              return (
                <FormRowSelect
                  key={id}
                  type={type}
                  name={id}
                  labelText={labelText}
                  list={list
                    .filter((value) => value.juzName === juzName)
                    .flatMap((value) => value.surahs)}
                  listItem={listItem}
                  onChange={handleSurahChange} // Handle surah change
                />
              );
            } else if (listItem === "pages") {
              return (
                <FormRowSelect
                  key={id}
                  type={type}
                  name={id}
                  labelText={labelText}
                  list={surahPages.map((page) => ({ id: page, pages: page }))} // Use surahPages from state
                  listItem={listItem}
                />
              );
            } else {
              return (
                <FormRowSelect
                  key={id}
                  type={type}
                  name={id}
                  labelText={labelText}
                  list={list}
                  listItem={listItem}
                />
              );
            }
          })}
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
