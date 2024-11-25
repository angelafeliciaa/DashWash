import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import RmHomPage from "./pages/RmHomePage";
import "./App.css";
import LoginCard from "./components/default-auth-page/LoginCard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginCard />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/rm" element={<RmHomPage />} />
      </Routes>
    </Router>
  );
}

export default App;
