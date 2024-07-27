import { HomeLayout, Login, Error ,DashboardLayout} from "../pages";
import { action as loginAction } from "../pages/Login";
import { queryClient } from "../utils/queryClient";

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
      },
    ],
  },
];
