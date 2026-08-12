import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import AboutFounder from "./pages/AboutFounder";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import ArtForms from "./pages/ArtForms";
import StudentWorks from "./pages/StudentWorks";
import Videos from "./pages/Videos";
import Feedback from "./pages/Feedback";
import Awards from "./pages/Awards";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="site-wrapper">
      <div className="site-content">
        <Routes>
          <Route element={<Layout />}>

            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* About */}
            <Route path="/about" element={<About />} />
            <Route path="/about-founder" element={<AboutFounder />} />

            {/* Courses */}
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />

            {/* Art Forms */}
            <Route path="/art-forms" element={<ArtForms />} />

            {/* Student Works */}
            <Route path="/student-works" element={<StudentWorks />} />

            {/* Videos */}
            <Route path="/videos" element={<Videos />} />

            {/* Feedback */}
            <Route path="/feedback" element={<Feedback />} />

            {/* Awards */}
            <Route path="/awards" element={<Awards />} />

            {/* Shop */}
            <Route path="/shop" element={<Shop />} />

            {/* Contact */}
            <Route path="/contact" element={<Contact />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

          </Route>
        </Routes>
      </div>
    </div>
  );
}