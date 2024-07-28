import { FaUsers } from "react-icons/fa";
import { PiStudentDuotone } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";

const links = [
  {
    text: "المستخدمين",
    icon: <FaUsers />,
    submenu: [
      { subText: "عرض الأساتذه", subPath: "." },
      { subText: "عرض الطلاب", subPath: "." },
    ],
  },
  {
    text: "الاساتذه",
    icon: <GiTeacher />,
    submenu: [
      { subText: "انشاء استاذ", subPath: "add-teacher" },
      { subText: "تعديل حالة الاستاذ", subPath: "." },
    ],
  },
  {
    text: "الطلاب",
    icon: <PiStudentDuotone />,
    submenu: [
      { subText: "انشاء طالب", subPath: "." },
      { subText: "تعديل حالة الطالب", subPath: "." },
    ],
  },
];

export default links;
