import { RouteObject } from "react-router";
import Layout from "../layouts/Layout";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        children: [
          { path: "add", element: <ProductAdd /> },
          {
            path: ":id",
            element: <ProductDetail />,
          },
          { path: ":id/edit", element: <ProductEdit /> },
        ],
      },
    ],
  },
];
