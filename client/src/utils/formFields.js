import { list } from "@chakra-ui/react";
import {
  QURAN_INDEX,
  STUDENT_ATTENDANCE,
  STUDENT_RATE,
} from "../../../server/shared/constants";

export const teacherInput = [
  {
    type: "text",
    id: "userName",
    labelText: "اسم المستخدم",
  },
  {
    type: "password",
    id: "password",
    labelText: "كلمة المرور",
  },
  { type: "number", id: "age", labelText: "عمر الاستاذ" },
  {
    type: "text",
    id: "teacherName",
    labelText: "اسم الاستاذ",
  },
  {
    type: "text",
    id: "teacherWork",
    labelText: "عمل الاستاذ",
  },
  {
    type: "text",
    id: "teacherStudy",
    labelText: "المستوى العلمي",
  },
  {
    type: "tel",
    id: "teacherPhone",
    labelText: "رقم الهاتق",
  },
];
export const studentInput = [
  {
    type: "text",
    id: "userName",
    labelText: "اسم المستخدم",
  },
  {
    type: "password",
    id: "password",
    labelText: "كلمة السر",
  },
  {
    type: "text",
    id: "studentName",
    labelText: "اسم الطالب",
  },
  {
    type: "text",
    id: "parentName",
    labelText: "اسم الأب او الأم",
  },
  {
    type: "text",
    id: "parentWork",
    labelText: "عمل الأب او الأم",
  },
  {
    type: "tel",
    id: "parentPhone",
    labelText: "رقم هاتف الأب أو الأم",
  },
  {
    type: "text",
    id: "StudentStudy",
    labelText: "المستوى العلمي",
  },
  {
    type: "number",
    id: "age",
    labelText: "عمر الطالب",
  },
  {
    type: "select",
    id: "teacherId",
    labelText: "اسم الاستاذ",
    listItem: "teacherName",
  },
  {
    type: "select",
    id: "StudentJuz",
    labelText: "الجزء",
    list: QURAN_INDEX.JUZ,
    listItem: "juzName",
  },
];

export const studentInputRate = [
  {
    type: "date",
    id: "date",
    labelText: "تاريخ االيوم",
  },

  {
    type: "select",
    id: "status",
    labelText: "حالة الحضور",
    list: STUDENT_ATTENDANCE,
    listItem: false,
  },
  {
    type: "select",
    id: "surahName",
    labelText: "السورة",
    list: QURAN_INDEX.JUZ,
    listItem: "surahName",
  },
  {
    type: "select",
    id: "pages",
    labelText: "الصفحة",
    list: QURAN_INDEX.JUZ,
    listItem: "pages",
  },
  {
    type: "select",
    id: "rate",
    labelText: "التقيم",
    list: STUDENT_RATE,
    listItem: false,
  },
];
