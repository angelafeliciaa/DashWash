import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import RmHomePage from "./pages/RmHomePage";
import SettingsPage from "./pages/SettingsPage";
import "./App.css";
import LoginCard from "./components/default-auth-page/LoginCard";
import RegisterCard from "./components/default-auth-page/RegisterCard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginCard />} />
        <Route path="/register" element={<RegisterCard />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/rm" element={<RmHomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
