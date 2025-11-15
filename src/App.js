import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import Home from "./components/home/HomePage";
import Contact from "./components/contact/ContactPage";
import Reports from "./components/Reports/Reports";
import AuthPage from "./components/auth/AuthPage";
import UserDashboard from "./components/userDashboard/UserDashboard";
import ReportIssue from "./components/reportIssue/ReportIssue";
import MyReports from "./components/myReports/MyReports";
import Leaderboard from "./components/leaderboard/Leaderboard";
import Badges from "./components/badges/Badges";
import Profile from "./components/profile/Profile";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminReports from "./components/admin/AdminReports";
import AdminUsers from "./components/admin/AdminUsers";
import AdminReportTimeline from "./components/admin/AdminReportTimeline";
import AdminCategories from "./components/admin/AdminCategories";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/login" element={<AuthPage />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <UserDashboard />
    </ProtectedRoute>
  }
/>

       <Route
  path="/my-reports"
  element={
    <ProtectedRoute>
      <MyReports />
    </ProtectedRoute>
  }
/>
        <Route path="/report-issue" element={<ReportIssue />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/badges" element={<Badges />} />
        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
       <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  }
>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="report/:id/timeline" element={<AdminReportTimeline />} />
          <Route path="categories" element={<AdminCategories />} />

        </Route>
      
      </Routes>
    </Router>
  );
}

export default App;
