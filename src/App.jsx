import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Sermons from "./pages/Sermons";
import SermonDetail from "./pages/SermonDetail";
import Activities from "./pages/Activities";
import Contact from "./pages/Contact";
import Location from "./pages/Location";
import History from "./pages/History";
import Leaders from "./pages/Leaders";
import Ministries from "./pages/Ministries";
import Beliefs from "./pages/Belief";
import Roasters from "./pages/Roasters";
import Members from "./pages/Members";
// Admin portal
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMembers from "./pages/admin/AdminMembers";
import AdminMemberDetail from "./pages/admin/AdminMemberDetail";
import AdminGuard from "./utils/AdminGuard";
import AdminAttendance from "./pages/admin/AdminAttendance";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public site */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sermons" element={<Sermons />} />
            <Route path="/sermons/:id" element={<SermonDetail />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/location" element={<Location />} />
            <Route path="/history" element={<History />} />
            <Route path="/leaders" element={<Leaders />} />
            <Route path="/ministries" element={<Ministries />} />
            <Route path="/beliefs" element={<Beliefs />} />
            <Route path="/roasters" element={<Roasters />} />
          </Route>

          {/* Members portal — standalone */}
          <Route path="/members" element={<Members />} />

          {/* Admin portal — standalone */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminGuard />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/members" element={<AdminMembers />} />
              <Route path="/admin/members/:id" element={<AdminMemberDetail />} />
              <Route path="/admin/attendance" element={<AdminAttendance />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
