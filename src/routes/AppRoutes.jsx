import { Route, Routes } from "react-router-dom";

import Layouts from "../components/Layouts";
import Home from "../pages/Home";
import MassageAndSpa from "../pages/spa/MassageAndSpa";
import Career from "../pages/careers/Career";
import PrivacyPolicy from "../pages/legacy/PrivacyPolicy";
import Sitemap from "../pages/legacy/Sitemap";
import Restaurant from "../pages/restaurant/Restaurant";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
        <Route index element={<Home />} />
        <Route path="spa" element={<MassageAndSpa />} />
        <Route path="careers" element={<Career />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="sitemap" element={<Sitemap />} />
        <Route path="restaurant" element={<Restaurant />} />
      </Route>
    </Routes>
  );
}