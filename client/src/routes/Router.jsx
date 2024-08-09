import {
  HomeLayout,
  Login,
  Error,
  DashboardLayout,
  AllTeachers,
  AddTeacher,
} from "../pages";
import { action as loginAction } from "../pages/Login";
import { action as addTeacherAction } from "../pages/AddTeacher";
import { queryClient } from "../utils/queryClient";
import { loader as teachersLoader } from "../pages/AllTeachers";
import { loader as dashboardLoader } from "../pages/DashboardLayout";
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
        element: <DashboardLayout />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            path: "teachers",
            element: <AllTeachers />,
            loader:teachersLoader(queryClient),
            ErrorElement: <ErrorElements />,
          },
          {
            path: "add-teacher",
            element: <AddTeacher />,
            action: addTeacherAction(queryClient),

          },
        ],
      },
    ],
  },
];
