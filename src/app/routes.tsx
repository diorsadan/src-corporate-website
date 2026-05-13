import { createBrowserRouter } from "react-router";
import { Root } from "@/components/layout/Root";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Properties } from "./pages/Properties";
import { Leasing } from "./pages/Leasing";
import { Resources } from "./pages/Resources";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "properties", Component: Properties },
      { path: "leasing", Component: Leasing },
      { path: "resources", Component: Resources },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
