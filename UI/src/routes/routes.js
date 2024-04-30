import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, useEffect } from "react";
import Navbar from "../component/navbar/Navbar";
import Footer from "../component/footer/Footer";
import Shimmer from "../component/body/Shimmer";
import { publicRoutes, commonRoutes, privateRouteList } from "./routelist";
import { useSelector } from "react-redux";

const AllRoutes = () => {
  const token = useSelector((state) => state.user.token);

  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Shimmer />}>
        <Routes>
          {publicRoutes.map(({ path, element: Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ))}
          {commonRoutes.map(({ path, element: Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ))}
          {privateRouteList.map(({ path, element: Element }) =>
            token ? (
              <Route key={path} path={path} element={<Element />} />
            ) : null
          )}
          {!token && (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AllRoutes;
