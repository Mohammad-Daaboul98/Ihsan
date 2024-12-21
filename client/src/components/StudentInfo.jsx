import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  Image,
  SimpleGrid,
  Button,
  Link as ChakraLink,
  Heading,
} from "@chakra-ui/react";
import FormRowSelect from "./FormRowSelect";
import { STUDENT_RATE } from "../../../server/shared/constants";
import { Form, useSubmit, Link } from "react-router-dom";

const StudentInfo = ({
  student,
  searchValue,
  originalStudentState,
  isStudent,
}) => {
  const submit = useSubmit();
  console.log(student);

  const { rate, surahName, juzName } = searchValue;

  const [filters, setFilters] = useState({});

  const groupedJuzData = (student) =>
    Object.values(
      (student.studentJuz ?? []).reduce((acc, juz) => {
        if (!acc[juz.juzName]) {
          acc[juz.juzName] = { ...juz, surahs: [] };
        }
        acc[juz.juzName].surahs = acc[juz.juzName].surahs.concat(
          Array.isArray(juz.surahs) ? juz.surahs : [juz.surahs]
        );
        return acc;
      }, {})
    );

  const originalData = groupedJuzData(originalStudentState);
  const filteredData = groupedJuzData(student);

  const filtersConfig = [
    {
      id: "juzName",
      labelText: "اختر الجزء",
      list: originalData,
      listItem: "juzName",
      defaultValue: juzName,
    },
    {
      id: "surahName",
      labelText: "اختر السورة",
      list: originalData.flatMap((juz) => juz.surahs),
      listItem: "surahName",
      defaultValue: surahName,
    },
    {
      id: "rate",
      labelText: "اختر التقييم",
      list: STUDENT_RATE,
      defaultValue: rate,
    },
  ];

  const studentData = [
    { label: "", value: student.studentName, isBold: true, fontSize: "2xl" },
    { label: "العمر:", value: student.age },
    {
      label: "ولي الأمر:",
      value: `${student.parentName} (${student.parentWork})`,
    },
    {
      label: "رقم الهاتف:",
      value: (
        <ChakraLink href={`tel:${student.parentPhone}`} dir="ltr">
          {student.parentPhone}
        </ChakraLink>
      ),
    },
    { label: "المعلم:", value: student.teacherId?.teacherName },
  ];

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(filters, { replace: true });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Box
        maxW="6xl"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        p={5}
        mx="auto"
        mt={5}
        textAlign="right"
        fontFamily="Arial, sans-serif"
      >
        {/* QR Code and Info */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Image
            src={student.qrCode}
            alt={`رمز الاستجابة السريعة لـ ${student.studentName}`}
            borderRadius="md"
            maxW="200px"
            mx="auto"
          />
          <VStack align="start" spacing={2}>
            {studentData.map((item, index) => (
              <Text
                key={index}
                fontSize={item.fontSize || "md"}
                fontWeight={item.isBold ? "bold" : "normal"}
              >
                {item.label} {item.value}
              </Text>
            ))}
          </VStack>
        </SimpleGrid>

        <Divider my={6} />

        {/* Filters */}
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          الفلاتر
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {filtersConfig.map(
            ({ id, labelText, list, listItem, defaultValue }) => (
              <FormRowSelect
                key={id}
                name={id}
                labelText={labelText}
                list={list}
                listItem={listItem}
                placeholder={`اختر ${labelText}`}
                onChange={(newValue) => handleFilterChange(id, newValue)}
                defaultValue={defaultValue}
              />
            )
          )}

          <HStack justifyContent="start" mt={8}>
            <Button colorScheme="teal" type="submit" w={"50%"}>
              اضافة
            </Button>
            <Link
              to={
                isStudent
                  ? "/dashboard/student-profile"
                  : `/dashboard/student/${student._id}`
              }
              style={{ width: "50%" }}
            >
              <Button colorScheme="red" variant="outline" w={"100%"}>
                مسح الفلاتر
              </Button>
            </Link>
          </HStack>
        </SimpleGrid>

        <Divider my={6} />
        {filteredData && filteredData.length ? (
          <Accordion allowToggle>
            {filteredData.map((juz) => (
              <AccordionItem key={juz._id}>
                <AccordionButton>
                  <HStack flex="1" justifyContent="space-between">
                    <Text>{juz.juzName}</Text>
                    <Badge colorScheme="teal">{juz.surahs.length} سور</Badge>
                  </HStack>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  {juz.surahs.map((surah) => (
                    <Box key={surah._id} mb={3}>
                      <Text fontWeight="bold">{surah.surahName}</Text>
                      {(Array.isArray(surah.pages) ? surah.pages : []).map(
                        (page) => (
                          <Box
                            key={page._id}
                            mt={1}
                            p={2}
                            borderWidth="1px"
                            borderRadius="md"
                            boxShadow="sm"
                          >
                            <HStack justifyContent="space-between">
                              <Text>
                                الصفحات: {page.pageFrom} -{" "}
                                {page.pageTo ?? "النهاية"}
                              </Text>
                              <Badge colorScheme={getBadgeColor(page.rate)}>
                                {page.rate}
                              </Badge>
                            </HStack>
                            <Text fontSize="sm">
                              التاريخ:{" "}
                              {new Date(page.date).toLocaleDateString("en")}
                            </Text>
                          </Box>
                        )
                      )}
                    </Box>
                  ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <Heading as="h6" size={"md"} textAlign={"center"}>
            لايوجد بيانات لعرضها
          </Heading>
        )}
      </Box>
    </Form>
  );
};

const getBadgeColor = (rate) => {
  switch (rate) {
    case "ممتاز":
      return "green";
    case "جيد":
      return "teal";
    case "وسط":
      return "yellow";
    default:
      return "red";
  }
};

export default StudentInfo;
