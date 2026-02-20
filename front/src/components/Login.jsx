import { useState, useEffect } from "react";
import { useUser } from "./UserContext";
import axios from "axios";
import { Home } from "./Home";

export const Login = () => {
  const { user, setUser } = useUser();
  const [form, setForm] = useState({ userId: "", password: "" });

  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/me", { withCredentials: true });
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async () => {
    try {
      await axios.post("/api/login", form);
      fetchUser();
    } catch {
      alert("ログイン失敗");
    }
  };

  const logout = async () => {
    await axios.post("/api/logout");
    setUser(null);
  };

  return (
    <div style={{ margin: 20 }}>
      <h2>セッション認証デモ</h2>
      {user ? (
        <>
          <p>ようこそ、{user.userId}さん！</p>
          <button onClick={logout}>ログアウト</button>
          <Home></Home>
        </>
      ) : (
        <>
          <input
            style={{ marginRight: 20 }}
            placeholder="userId"
            onChange={(e) => setForm({ ...form, userId: e.target.value })}
          />
          <input
            style={{ marginRight: 20 }}
            placeholder="password"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button onClick={login}>ログイン</button>
        </>
      )}
    </div>
  );
};
