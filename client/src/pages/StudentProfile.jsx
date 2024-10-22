import {
  Box,
  Text,
  Heading,
  CardBody,
  Card,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { CardComponents } from "../components";
import { useQuery } from "@tanstack/react-query";
import customFetch from "../utils/customFetch";
import dayjs from "dayjs"; // Importing dayjs for date formatting

const singleStudentQuery = {
  queryKey: ["currentStudent"],
  queryFn: async () => {
    const { data } = await customFetch.get(`/student/current-student`);
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(singleStudentQuery);
  } catch (error) {
    return redirect("/");
  }
};

const StudentProfile = () => {
  // Attendance card values
  const cardValue = [
    { title: "أيام الحضور", count: 0 },
    { title: "أيام الغياب", count: 0 },
  ];

  const {
    data: { student },
  } = useQuery(singleStudentQuery);
  const { studentAttendance, StudentJuz } = student;
  console.log(StudentJuz);

  // Attendance count logic
  const statusMap = {
    موجود: cardValue[0],
    غائب: cardValue[1],
  };

  studentAttendance.forEach(({ status }) => {
    if (statusMap[status]) {
      statusMap[status].count++;
    }
  });

  return (
    <Box p={6}>
      {/* Display attendance cards */}
      <Box display="flex" mb={8}>
        {cardValue.map(({ title, count }, index) => (
          <CardComponents
            key={index}
            title={title}
            value={count}
            iconType={index === 0 ? "calendar" : "DisturbOn"}
          />
        ))}
      </Box>

      {/* Display Juz, Surah, Pages */}
      <Box mt={6}>
        <Heading as="h3" size="lg" mb={4} color="gray.300">
          بيانات الجزء وسور الطالب
        </Heading>
        {student?.StudentJuz?.map((juz, juzIndex) => (
          <Box key={juzIndex} mb={6}>
            <Heading as="h4" size="md" mb={2} color="teal.400">
              {juz.juzName}
            </Heading>
            {juz.surahs?.map((surah, surahIndex) => (
              <Box key={surahIndex} mb={4}>
                <Heading as="h5" size="sm" mb={2} color="yellow.400">
                  {surah.surahName}
                </Heading>

                {/* Loop through the pages, rate, and date */}
                <SimpleGrid columns={[2, 3, 4, 5, 6]} spacing={4}>
                  {surah.pages?.map((page, pageIndex) => (
                    <Box
                      key={pageIndex}
                      bg="gray.700"
                      p={4}
                      borderRadius="10px"
                      boxShadow="0 8px 16px rgba(0, 0, 0, 0.2)"
                    >
                      <Text color="gray.100">
                        <strong>صفحة:</strong> {page.pageNumber}
                      </Text>
                      <Text color="gray.100">
                        <strong>التقييم:</strong> {page.rate}
                      </Text>
                      <Text color="gray.100">
                        <strong>التاريخ:</strong>{" "}
                        {dayjs(page.date).format("YYYY-MM-DD")}{" "}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StudentProfile;
