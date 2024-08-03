import { HomeLayout, Login, Error, DashboardLayout } from "../pages";
import AddTeacher from "../pages/AddTeacher";
import { action as loginAction } from "../pages/Login";
import { action as addTeacherAction } from "../pages/AddTeacher";
import { queryClient } from "../utils/queryClient";


export const Router = [
  {
    path: "/",
    element: <HomeLayout  />,
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
        children: [
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
