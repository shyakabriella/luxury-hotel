import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Layouts from "../components/Layouts";
import Home from "../pages/Home";

export default function AppRoutes() {
  const location = useLocation();
  return (
    <>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route index element={<Home />} />
        </Route>

      </Routes>
    </>
  );
}