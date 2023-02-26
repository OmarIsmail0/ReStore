import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../../features/home/HomePage";
import { ContactPage } from "./../../features/contact/ContactPage";
import { ProductDetails } from "./../../features/catalog/ProductDetails";
import { AboutPage } from "../../features/about/AboutPage";
import App from "../layout/App";
import Catalog from "./../../features/catalog/Catalog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "catalog",
        element: <Catalog />,
      },
      {
        path: "catalog/:id",
        element: <ProductDetails />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },
]);