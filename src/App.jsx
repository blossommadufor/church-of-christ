import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Teachings from "./pages/Teachings";
import TeachingDetail from "./pages/TeachingDetail";
import Activities from "./pages/Activities";
import Contact from "./pages/Contact";
import Location from "./pages/Location";
import History from "./pages/History";
import Leaders from "./pages/Leaders";
import Ministries from "./pages/Ministries";
import Beliefs from "./pages/Belief";
import Roasters from "./pages/Roasters";
import Members from "./pages/Members";
import Donation from "./pages/Donation";
// Admin portal
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMembers from "./pages/admin/AdminMembers";
import AdminMemberDetail from "./pages/admin/AdminMemberDetail";
import AdminAttendance from "./pages/admin/AdminAttendance";
import AdminQuestions from "./pages/admin/AdminQuestions";
import ScrollToTop from "./utils/ScrollToTop";
import MembersDashboardWrapper from "./components/members/MembersDashboardWrapper";
import AuthGuard from "./utils/AuthGuard";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public site */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/teachings" element={<Teachings />} />
              <Route path="/teachings/:id" element={<TeachingDetail />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/location" element={<Location />} />
              <Route path="/history" element={<History />} />
              <Route path="/leaders" element={<Leaders />} />
              <Route path="/ministries" element={<Ministries />} />
              <Route path="/beliefs" element={<Beliefs />} />
              <Route path="/roasters" element={<Roasters />} />
              <Route path="/donation" element={<Donation />} />
            </Route>

            {/* Members portal (unified login) */}
            <Route path="/members" element={<Members />} />

            {/* Protected Portal Routes */}
            <Route element={<AuthGuard />}>
              {/* Member Dashboard */}
              <Route path="/dashboard" element={<MembersDashboardWrapper />} />

              {/* Admin layout and routes */}
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/members" element={<AdminMembers />} />
                <Route path="/admin/members/:id" element={<AdminMemberDetail />} />
                <Route path="/admin/attendance" element={<AdminAttendance />} />
                <Route path="/admin/questions" element={<AdminQuestions />} />
              </Route>
            </Route>

            {/* Catch-all fallback */}
            <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
