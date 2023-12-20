import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css'
//import Home from "./components/Home";


const router = createBrowserRouter([
  {
    path: "/R08.007.Random-Sampling.Dowell",
    element: <App />,
    children: [
      {
        path: "/R08.007.Random-Sampling.Dowell/",
  //      element: <Home />
      }
    ]
  }
])
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);
