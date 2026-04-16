import { Route, Routes } from "react-router-dom";

import Layouts from "../components/Layouts";
import Home from "../pages/Home";
import MassageAndSpa from "../pages/spa/MassageAndSpa";
import Career from "../pages/careers/Career";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
        <Route index element={<Home />} />
        <Route path="spa" element={<MassageAndSpa />} />
        <Route path="careers" element={<Career />} />
      </Route>
    </Routes>
  );
}