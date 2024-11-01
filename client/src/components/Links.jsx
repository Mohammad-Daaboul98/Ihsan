import { PiStudentDuotone } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";

const Links = [

  {
    text: "الأساتذه",
    icon: <GiTeacher />,
    submenu: [
      { subText: "عرض الأساتذه", subPath: "teachers" },
      { subText: "انشاء استاذ", subPath: "add-teacher" },
    ],
  },
  {
    text: "الطلاب",
    icon: <PiStudentDuotone />,
    submenu: [
      { subText: "عرض الطلاب", subPath: "students" },
      { subText: "جدول الحضور", subPath: "students-attendance" },
      { subText: "انشاء طالب", subPath: "add-student" },
    ],
  },
];

export default Links;
