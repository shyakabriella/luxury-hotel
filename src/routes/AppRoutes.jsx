import { Route, Routes } from "react-router-dom";

import Layouts from "../components/Layouts";
import Home from "../pages/Home";
import MassageAndSpa from "../pages/spa/MassageAndSpa";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
        <Route index element={<Home />} />
        <Route path="spa" element={<MassageAndSpa />} />
      </Route>
    </Routes>
  );
}