import { Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { SearchResult } from "./SearchResult";
import { MyPage } from "./MyPage";
import { Login } from "./Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserProvider } from "./UserContext";

export const Router = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/recipes"
          element={
            <ProtectedRoute>
              <SearchResult />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mypages"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
        {/* <Route path="*" element={<Page404 />} /> */}
      </Routes>
    </UserProvider>
  );
};
