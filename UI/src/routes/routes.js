import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "../component/navbar/Navbar";
import Footer from "../component/footer/Footer";
import Shimmer from "../component/body/Shimmer";
import { publicRoutes, commonRoutes, privateRouteList } from "./routelist";
const AllRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Shimmer />}>
        <Routes>
          {publicRoutes.map(({ path, element: Element }) => {
            return <Route path={path} element={<Element />} />;
          })}

          {commonRoutes.map(({ path, element: Element }) => {
            return <Route path={path} element={<Element />} />;
          })}
          {privateRouteList.map(({ path, element: Element }) => {
            return <Route path={path} element={<Element />} />;
          })}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AllRoutes;
