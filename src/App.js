import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/HomePage";
import Contact from "./components/contact/ContactPage";
import Reports from "./components/Reports/Reports";
import AuthPage from "./components/auth/AuthPage";
import UserDashboard from "./components/userDashboard/UserDashboard";
import ReportIssue from "./components/reportIssue/ReportIssue";
import MyReports from "./components/myReports/MyReports";
import Leaderboard from "./components/leaderboard/Leaderboard";
import Badges from "./components/badges/Badges";
function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/report-issue" element={<ReportIssue />} />
        <Route path="/my-reports" element={<MyReports />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/badges" element={<Badges />} />


      </Routes>
    </Router>
  );
}

export default App;
