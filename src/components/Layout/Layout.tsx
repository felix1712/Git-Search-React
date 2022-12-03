import React, { lazy, Suspense, useRef } from "react";
import { Navigate, Routes, Route} from "react-router-dom";
import { Header } from "../Header/Header";

const Home = lazy(() =>
  import("../../pages/Home/Home")
);

const Search = lazy(() =>
  import("../../pages/Search/Search")
);

const User = lazy(() =>
  import("../../pages/User/User")
);
const Layouts = () => {
  return (
    <div className="container-wrapper">
      <Header />
      <div className="content-wrapper">
        <Suspense fallback="Loading...">
          <Routes>
            <Route
              index
              path="/"
              element={<Home />}
            />
            <Route
              path="/search"
              element={<Search />}
            />
            <Route
              path="/user/:username"
              element={<User />}
            />
            <Route path="*" element={<Navigate to="/" replace />} /> {/*default root */}
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default Layouts;