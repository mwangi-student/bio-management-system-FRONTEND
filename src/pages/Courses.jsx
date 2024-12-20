import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: "", image: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleAddCourse = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newCourse)
      });

      if (response.ok) {
        const addedCourse = await response.json();
        setCourses([...courses, addedCourse]);
      } else {
        console.error("Error adding course:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }

    setNewCourse({ title: "", image: "" });
    setIsModalOpen(false);
  };

  const handleViewCourse = (id) => {
    navigate(`/courses/${id}`);
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <div className="flex justify-end items-center mb-6">
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
            onClick={() => setIsModalOpen(true)}
          >
            Add Course
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
            >
              {/* Course Image */}
              <img
                className="w-full h-40 object-cover"
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  course.course_title || "Untitled Course"
                )}&background=random&color=fff`}
                alt={course.course_title || "Untitled Course"}
              />

              {/* Course Title */}
              <div className="p-4 flex-1 flex items-center justify-center">
                <h3 className="text-lg font-semibold text-center">
                  {course.course_title}
                </h3>
              </div>

              {/* View Button */}
              <div className="p-4">
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded w-full"
                  onClick={() => handleViewCourse(course.id)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Add New Course</h2>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={newCourse.title}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, title: e.target.value })
                  }
                  placeholder="Enter course title"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={newCourse.image}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, image: e.target.value })
                  }
                  placeholder="Enter image URL"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
                  onClick={handleAddCourse}
                >
                  Add Course
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
