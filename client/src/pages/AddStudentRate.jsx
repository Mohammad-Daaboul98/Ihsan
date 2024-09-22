// import { studentInputRate } from '../utils/formFields';

import { Form, useActionData, useLocation, useParams } from "react-router-dom";
import { FormRow, FormRowSelect } from "../components";
import { studentInputRate } from "../utils/formFields";
import { Box, Button, Heading, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const student = await customFetch.post("student", { ...data });
      queryClient.invalidateQueries(["student"]);
      toast.success("تم حفظ التقيم", { theme: "colored" });
      return redirect("../students");
    } catch (error) {
      console.error("Error:", error);
      return error;
    }
  };

const AddStudentRate = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const juzName = queryParams.get("juzName");

  // State to track selected surah and its pages
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [surahPages, setSurahPages] = useState([]);

  const date = useActionData();
  const errorMessage = date?.response?.data?.msg;

  // Handle selection change for surahName
  // Handle selection change for surahName
  const handleSurahChange = (e) => {
    const selectedSurahId = e.target.value; // Assuming value is the Surah ID (number)
    setSelectedSurah(selectedSurahId); // Set selected surah ID

    // Find the selected Juz by its juzName
    const selectedJuz = studentInputRate
      .find((item) => item.id === "surahName") // Find surahName input item
      .list.find((juz) => juz.juzName === juzName); // Match juzName

    if (selectedJuz) {
      // Match surah by its ID, which is a number in your data structure
      const surah = selectedJuz.surahs.find(
        (surah) => surah.id.toString() === selectedSurahId // Compare as string for consistency
      );
      setSurahPages(surah ? surah.pages : []); // Set pages if surah found
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
              console.log(surahPages);
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
