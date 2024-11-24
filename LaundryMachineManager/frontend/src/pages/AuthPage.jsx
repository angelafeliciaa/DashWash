import { useState } from "react";
import LoginCard from "../components/default-auth-page/LoginCard";
import RegisterCard from "../components/default-auth-page/RegisterCard";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false); // True for login, false for RegisterCard
  const toggleLogin = () => {
    setIsLogin((prev) => !prev);
  };
  return (
    <main>
      {isLogin ? (
        <LoginCard toggle={toggleLogin} />
      ) : (
        <RegisterCard toggle={toggleLogin} />
      )}
    </main>
  );
}
