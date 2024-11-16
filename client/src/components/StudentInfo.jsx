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
} from "@chakra-ui/react";
import FormRowSelect from "./FormRowSelect";

const STUDENT_RATE = ["ممتاز", "جيد", "وسط", "سيء"];

const StudentInfo = ({ student }) => {
  const [filterJuz, setFilterJuz] = useState("");
  const [filterSurah, setFilterSurah] = useState("");
  const [filterRate, setFilterRate] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const filters = [
    {
      id: "filterJuz",
      labelText: "اختر الجزء",
      list: student.studentJuz,
      listItem: "juzName",
      onChange: setFilterJuz,
      value: filterJuz,
    },
    {
      id: "filterSurah",
      labelText: "اختر السورة",
      list: student.studentJuz.flatMap((juz) => juz.surahs),
      listItem: "surahName",
      onChange: setFilterSurah,
      value: filterSurah,
    },
    {
      id: "filterRate",
      labelText: "اختر التقييم",
      list: STUDENT_RATE,
      onChange: setFilterRate,
      value: filterRate,
    },
    {
      id: "filterDate",
      labelText: "اختر التاريخ",
      list: Array.from(
        new Set(
          student.studentJuz.flatMap((juz) =>
            juz.surahs.flatMap((surah) =>
              surah.pages.map((page) =>
                new Date(page.date).toLocaleDateString("en")
              )
            )
          )
        )
      ),
      onChange: setFilterDate,
      value: filterDate,
    },
  ];

  const filteredJuz = student.studentJuz.filter((juz) => {
    const matchesJuz = filterJuz ? juz.juzName === filterJuz : true;
    const matchesSurah = filterSurah
      ? juz.surahs.some((surah) => surah.surahName === filterSurah)
      : true;
    const matchesRate = filterRate
      ? juz.surahs.some((surah) =>
          surah.pages.some((page) => page.rate === filterRate)
        )
      : true;
    const matchesDate = filterDate
      ? juz.surahs.some((surah) =>
          surah.pages.some(
            (page) =>
              new Date(page.date).toLocaleDateString("ar-SY") === filterDate
          )
        )
      : true;

    return matchesJuz && matchesSurah && matchesRate && matchesDate;
  });

  return (
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
          <Flex alignItems='center' gap='5px'>
            <Text>رقم الهاتف:</Text>
            <Link href={`tel:${student.parentPhone}`} dir="ltr">
              {student.parentPhone}
            </Link>
          </Flex>

          <Text>المعلم: {student.teacherId?.teacherName}</Text>
        </VStack>
      </SimpleGrid>

      <Divider my={6} />

      {/* Filters */}
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        الفلاتر
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {filters.map(({ id, labelText, list, listItem, onChange, value }) => {
          return (
            <FormRowSelect
              key={id}
              name={id}
              labelText={labelText}
              list={list}
              listItem={listItem}
              onChange={onChange}
              placeholder={`اختر ${labelText}`}
              value={value}
            />
          );
        })}
      </SimpleGrid>

      <Divider my={6} />

      {/* Quranic Progress */}
      <Accordion allowToggle>
        {filteredJuz.map((juz) => (
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
                  {surah.pages.map((page) => (
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
                          الصفحات: {page.pageFrom} - {page.pageTo ?? "النهاية"}
                        </Text>
                        <Badge
                          colorScheme={
                            page.rate === "ممتاز"
                              ? "green"
                              : page.rate === "جيد"
                              ? "teal"
                              : page.rate === "وسط"
                              ? "yellow"
                              : "red"
                          }
                        >
                          {page.rate}
                        </Badge>
                      </HStack>
                      <Text fontSize="sm">
                        التاريخ: {new Date(page.date).toLocaleDateString("en")}
                      </Text>
                    </Box>
                  ))}
                </Box>
              ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default StudentInfo;
