import React, { lazy, Suspense, useRef } from "react";
import { Navigate, Routes, Route} from "react-router-dom";

const Home = lazy(() =>
  import("../../pages/Home/Home")
);

const SearchPreview = lazy(() =>
  import("../../pages/SearchPreview/SearchPreview")
);

const Layouts = () => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <Routes>
          <Route
            index
            path="/"
            element={<Home />}
          />
          <Route
            path="/search"
            element={<SearchPreview />}
          />
          <Route path="*" element={<Navigate to="/" replace />} /> {/*default root */}
        </Routes>
      </Suspense>
    </div>
  );
};

export default Layouts;