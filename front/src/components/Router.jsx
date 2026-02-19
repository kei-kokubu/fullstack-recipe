import { Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { SearchResult } from "./SearchResult";
import { MyPage } from "./MyPage";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<SearchResult />} />
      <Route path="/mypages" element={<MyPage />} />
      {/* <Route path="*" element={<Page404 />} /> */}
    </Routes>
  );
};
