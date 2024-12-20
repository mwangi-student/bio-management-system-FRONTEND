import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Landing";
import Students from "./pages/Students";
import StudentDetails from "./singlepages/Student";
import Courses from "./pages/Courses";
import CourseDetails from "./singlepages/Course";
import Instructors from "./pages/Instructors";
import InstructorDetails from "./singlepages/Instructor";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Header />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/instructors" element={<Instructors />} />

          {/* Individual Routes */}
          <Route path="/students/:id" element={<StudentDetails />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/instructors/:id" element={<InstructorDetails />} />

          {/* Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
