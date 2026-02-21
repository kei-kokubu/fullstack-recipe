import { Routes, Route } from "react-router-dom";
import { Home } from "../components/Home";
import { SearchResult } from "../components/SearchResult";
import { MyPage } from "../components/MyPage";
import { Login } from "../components/Login";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { UserProvider } from "../components/UserContext";

export const Router = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
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
