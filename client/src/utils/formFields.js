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
    defaultKey: "teacherName",
  },
  {
    type: "password",
    id: "password",
    labelText: "كلمة المرور",
    btnPassword: true,
  },
  {
    type: "number",
    id: "age",
    labelText: "عمر الاستاذ",
    defaultKey: "age",
  },
  {
    type: "text",
    id: "teacherName",
    labelText: "اسم الاستاذ",
    defaultKey: "teacherName",
  },
  {
    type: "text",
    id: "teacherWork",
    labelText: "عمل الاستاذ",
    defaultKey: "teacherWork",
  },
  {
    type: "text",
    id: "teacherStudy",
    labelText: "المستوى العلمي",
    defaultKey: "teacherStudy",
  },
  {
    type: "tel",
    id: "teacherPhone",
    labelText: "رقم الهاتف",
    defaultKey: "teacherPhone",
    phone: true,
  },
];
export const studentInput = [
  {
    type: "text",
    id: "userName",
    labelText: "اسم المستخدم",
    defaultKey: "studentName",
  },
  {
    type: "password",
    id: "password",
    labelText: "كلمة السر",
    btnPassword: true,
  },
  {
    type: "text",
    id: "studentName",
    labelText: "اسم الطالب",
    defaultKey: "studentName",
  },
  {
    type: "text",
    id: "parentName",
    labelText: "اسم ولي الأمر",
    defaultKey: "parentName",
  },
  {
    type: "text",
    id: "parentWork",
    labelText: "عمل ولي الأمر",
    defaultKey: "parentWork",
  },
  {
    type: "tel",
    id: "parentPhone",
    labelText: "رقم ولي الأمر",
    defaultKey: "parentPhone",
    phone: true,
  },
  {
    type: "text",
    id: "StudentStudy",
    labelText: "المستوى العلمي",
    defaultKey: "StudentStudy",
  },
  {
    type: "number",
    id: "age",
    labelText: "عمر الطالب",
    defaultKey: "age",
  },
  {
    type: "select",
    id: "teacherId",
    labelText: "اسم الاستاذ",
    listItem: "teacherName",
    defaultKey: "teacherName",
    secondaryListItem: "studentCount",
  },
  {
    type: "select",
    id: "juzName",
    labelText: "الجزء",
    list: QURAN_INDEX.JUZ,
    listItem: "juzName",
    defaultKey: "juzName",
  },
];

export const studentInputRate = [
  {
    type: "date",
    id: "date",
    labelText: "تاريخ االيوم",
    defaultValue: new Date().toISOString().split("T")[0],
  },

  {
    type: "select",
    id: "juzName",
    labelText: "الجزء",
    listItem: "juzName",
    defaultValue: "لايوجد",
  },
  {
    type: "select",
    id: "surahName",
    labelText: "السورة",
    listItem: "surahName",
    defaultValue: "لايوجد",
  },
  {
    type: "select",
    id: "pages",
    labelText: "الصفحة",
    listItem: "pages",
    defaultValue: 0,
  },
  {
    type: "select",
    id: "rate",
    labelText: "التقيم",
    list: STUDENT_RATE.point,
    listItem: false,
    secondaryListItem: STUDENT_RATE.rate,
  },
];

export const StudentCheckBox = [
  {
    title: "اسم المستخدم",
    listItem: "userName",
  },
  {
    title: "كلمة السر",
    listItem: "password",
  },
  {
    title: "الاستاذ",
    listItem: "teacherName",
  },
];
