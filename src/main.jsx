import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout/Layout.jsx";
import Main from "./components/Main";
import Tabela from "./components/Tabela";
import ErrorPage from "./components/ErrorPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
        errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Main /> },
      { path: "teste", element: <Tabela /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
