import Error from "../pages/Error";
import HomeLayout from "../pages/HomeLayout";
import Landing from "../pages/Landing";

export const Router = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement:<Error />,

    children:[
        {
            index:true,
            element:<Landing />
        }
    ]
  },
];
