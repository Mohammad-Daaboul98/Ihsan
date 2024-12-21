import {
  HomeLayout,
  Login,
  Error,
  DashboardLayout,
  AllTeachers,
  AddTeacher,
  AllStudents,
  AddStudent,
  AddStudentRate,
  EditTeacher,
  EditStudent,
  StudentsAttendance,
  StudentProfile,
} from "../pages";
import { queryClient } from "../utils/queryClient";
import { action as loginAction } from "../pages/Login";
import { action as addTeacherAction } from "../pages/AddTeacher";
import {
  action as editTeacherAction,
  loader as editTeacherLoader,
} from "../pages/EditTeacher";
import {
  action as addStudentAction,
  loader as addStudentLoader,
} from "../pages/AddStudent";
import {
  action as addStudentRateAction,
  loader as studentRateLoader,
} from "../pages/AddStudentRate";
import {
  action as editStudentAction,
  loader as editStudentLoader,
} from "../pages/EditStudent";
import {
  loader as studentAttendanceLoader,
  action as studentAttendanceAction,
} from "../pages/StudentsAttendance";
import { action as deleteTeacherAction } from "../pages/DeleteTeacher";
import { action as deleteStudentAction } from "../pages/DeletesStudent";
import { loader as teachersLoader } from "../pages/AllTeachers";
import { loader as studentLoader } from "../pages/AllStudents";
import { loader as dashboardLoader } from "../pages/DashboardLayout";
import { loader as studentProfileLoader } from "../pages/StudentProfile";

import { ErrorElements } from "../components";

export const Router = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,

    children: [
      {
        index: true,
        element: <Login />,
        action: loginAction(queryClient),
      },
      {
        path: "dashboard",
        element: <DashboardLayout queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            path: "teachers",
            element: <AllTeachers />,
            loader: teachersLoader(queryClient),
            ErrorElement: <ErrorElements />,
          },
          {
            path: "add-teacher",
            element: <AddTeacher />,
            action: addTeacherAction(queryClient),
          },
          {
            path: "edit-teacher/:id",
            element: <EditTeacher />,
            action: editTeacherAction(queryClient),
            loader: editTeacherLoader(queryClient),
          },
          {
            path: "delete-teacher/:id",
            action: deleteTeacherAction(queryClient),
          },
          {
            path: "students",
            element: <AllStudents />,
            loader: studentLoader(queryClient),
          },
          {
            path: "students-attendance",
            element: <StudentsAttendance />,
            action: studentAttendanceAction(queryClient),
            loader: studentAttendanceLoader(queryClient),
          },
          {
            path: "add-student",
            element: <AddStudent />,
            action: addStudentAction(queryClient),
            loader: addStudentLoader(queryClient),
          },
          {
            path: "edit-student/:id",
            element: <EditStudent />,
            action: editStudentAction(queryClient),
            loader: editStudentLoader(queryClient),
          },
          {
            path: "delete-student/:id",
            action: deleteStudentAction(queryClient),
          },
          {
            path: "add-student-rate/:id",
            element: <AddStudentRate />,
            action: addStudentRateAction(queryClient),
            loader: studentRateLoader(queryClient),
          },
          {
            path: "student/:id",
            element: <StudentProfile />,
            // action: addStudentRateAction(queryClient),
            loader: studentProfileLoader(queryClient),
          },
          {
            path: "student-profile",
            element: <StudentProfile />,
            loader: studentProfileLoader(queryClient, true),
          },
        ],
      },
    ],
  },
];
