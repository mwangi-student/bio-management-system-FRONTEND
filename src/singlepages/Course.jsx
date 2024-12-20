import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Modal from "../components/AddStudentModal";

function CourseDetails() {
  const { id } = useParams(); // Get course ID from URL params
  const navigate = useNavigate();

  const [course, setCourse] = useState(null); // Course details
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    instructor: "",
    duration: "",
    description: ""
  });

  // Fetch course details
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    };

    fetch(
      `https://bio-management-system-1.onrender.com/courses/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setCourse(data);
        setFormData({
          title: data.course_title, // Ensure keys match your backend response
          instructor: data.instructor,
          duration: data.duration,
          description: data.description
        });
      })
      .catch((error) => console.error("Error fetching course:", error));
  }, [id]);

  const handleEditClick = () => setIsEditModalOpen(true);
  const handleCloseModal = () => setIsEditModalOpen(false);

  // Handle form changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update course
  const handleEditSubmit = (e) => {
    e.preventDefault();
    fetch(`https://bio-management-system-1.onrender.com/courses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        setCourse(data);
        setIsEditModalOpen(false);
      })
      .catch((error) => console.error("Error updating course:", error));
  };

  // Delete course
  const handleDeleteClick = () => {
    fetch(`https://bio-management-system-1.onrender.com/courses/${id}`, {
      method: "DELETE"
    })
      .then(() => navigate("/courses"))
      .catch((error) => console.error("Error deleting course:", error));
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-gray-100 flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl flex flex-row">
          {/* Course Image Section */}
          <div className="bg-gray-200 rounded-lg w-48 h-60 flex justify-center items-center text-center text-gray-600 text-lg font-semibold mr-6">
            <img
              className="w-full h-40 object-cover"
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                course.course_title || "Untitled Course"
              )}&background=random&color=fff`}
              alt={course.course_title || "Untitled Course"}
            />
          </div>

          {/* Course Details Section */}
          <div className="flex-grow bg-gray-200 rounded-lg p-4">
            <p className="text-gray-700 text-sm mb-2">
              Title: {course.course_title}
            </p>
            <p className="text-gray-700 text-sm mb-2">
              Instructor_id: {course.instructor_id}
            </p>

            <p className="text-gray-700 text-sm mb-2">
              Date Created: {course.created_at}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="ml-6 flex flex-col space-y-4">
            <button
              onClick={handleEditClick}
              className="bg-orange-500 text-white font-bold px-4 py-2 rounded hover:bg-orange-600"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
              className="bg-orange-500 text-white font-bold px-4 py-2 rounded hover:bg-orange-600"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <Modal isOpen={isEditModalOpen} onClose={handleCloseModal}>
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Edit Course
            </h2>
            <form className="space-y-4" onSubmit={handleEditSubmit}>
              {/* Title Field */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Instructor Field */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Instructor_id
                </label>
                <input
                  type="text"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Submit and Cancel Buttons */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default CourseDetails;
