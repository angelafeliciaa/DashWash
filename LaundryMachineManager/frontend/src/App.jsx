import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import RmHomePage from "./pages/RmHomePage";
import SettingsPage from "./pages/SettingsPage";
import "./App.css";
import LoginCard from "./components/default-auth-page/LoginCard";
import RegisterCard from "./components/default-auth-page/RegisterCard";
import RmMachinePage from "./pages/RmMachinePage";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginCard />} />
        <Route path="/register" element={<RegisterCard />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/rm" element={<RmHomePage />} />
        <Route path="/rm/machines" element={<RmMachinePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
