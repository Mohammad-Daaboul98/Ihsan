import { FaUsers } from "react-icons/fa";
import { PiStudentDuotone } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";

const links = [
  // {
  //   text: "المستخدمين",
  //   icon: <FaUsers />,
  //   submenu: [
  //     { subText: "عرض الأساتذه", subPath: "." },
  //     { subText: "عرض الطلاب", subPath: "." },
  //   ],
  // },
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
      { subText: "انشاء طالب", subPath: "add-student" },
    ],
  },
];

export default links;
