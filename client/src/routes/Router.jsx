import { HomeLayout, Login } from "../pages";

export const Router = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,

    children: [
      {
        index: true,
        element: <Login />,
      }
    ],
  },
];
