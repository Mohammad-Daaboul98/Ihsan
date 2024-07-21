import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Router } from "./routes/Router";

const router = createBrowserRouter(Router);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
