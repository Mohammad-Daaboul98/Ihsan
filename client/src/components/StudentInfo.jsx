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
  Link,
  Flex,
  Button,
} from "@chakra-ui/react";
import FormRowSelect from "./FormRowSelect";
import { STUDENT_RATE } from "../../../server/shared/constants";
import { Form, useSubmit, useSearchParams } from "react-router-dom";

const StudentInfo = ({ student, searchValue }) => {
  const submit = useSubmit();

  const [filters, setFilters] = useState({
    juzName: searchValue.juzName || "",
    surahName: searchValue.surahName || "",
    rate: searchValue.rate || "",
    date: searchValue.date || "",
  });

  const groupedJuzData = Object.values(
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

  const filtersConfig = [
    {
      id: "juzName",
      labelText: "اختر الجزء",
      list: groupedJuzData,
      listItem: "juzName",
      value: filters.juzName,
    },
    {
      id: "surahName",
      labelText: "اختر السورة",
      list: groupedJuzData.flatMap((juz) => juz.surahs),
      listItem: "surahName",
      value: filters.surahName,
    },
    {
      id: "rate",
      labelText: "اختر التقييم",
      list: STUDENT_RATE,
      value: filters.rate,
    },
    {
      id: "date",
      labelText: "اختر التاريخ",
      list: Array.from(
        new Set(
          groupedJuzData.flatMap((juz) =>
            juz.surahs.flatMap((surah) =>
              Array.isArray(surah.pages)
                ? surah.pages.map((page) =>
                    new Date(page.date).toLocaleDateString("ar")
                  )
                : []
            )
          )
        )
      ),
      value: filters.date,
    },
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

  const handleClearFilters = () => {
    setFilters({
      juzName: "",
      surahName: "",
      rate: "",
      date: "",
    });
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
            <Text fontSize="2xl" fontWeight="bold">
              {student.studentName}
            </Text>
            <Text>العمر: {student.age}</Text>
            <Text>
              ولي الأمر: {student.parentName} ({student.parentWork})
            </Text>
            <Flex alignItems="center" gap="5px">
              <Text>رقم الهاتف:</Text>
              <Link href={`tel:${student.parentPhone}`} dir="ltr">
                {student.parentPhone}
              </Link>
            </Flex>
            <Text>المعلم: {student.teacher?.teacherName}</Text>
          </VStack>
        </SimpleGrid>

        <Divider my={6} />

        {/* Filters */}
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          الفلاتر
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {filtersConfig.map(({ id, labelText, list, listItem, value,defaultValue }) => (
            <FormRowSelect
              key={id}
              name={id}
              labelText={labelText}
              list={list}
              listItem={listItem}
              placeholder={`اختر ${labelText}`}
              value={value}
              onChange={(newValue) => handleFilterChange(id, newValue)}
              defaultValue={defaultValue}
            />
          ))}
        </SimpleGrid>

        <HStack justifyContent="start" mt={4}>
          <Button
            colorScheme="red"
            variant="outline"
            type="submit"
            onClick={handleClearFilters}
          >
            مسح الفلاتر
          </Button>
          <Button colorScheme="teal" type="submit">
            تقديم
          </Button>
        </HStack>

        <Divider my={6} />

        {/* Quranic Progress */}
        <Accordion allowToggle>
          {groupedJuzData.map((juz) => (
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
