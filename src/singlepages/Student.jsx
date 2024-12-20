import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // for dynamic routing and navigation
import Navbar from "../components/NavBar";
import Modal from "../components/AddStudentModal";

function StudentDetails() {
  const { id } = useParams(); // Use this hook to get the dynamic student ID from the URL
  const navigate = useNavigate(); // Hook to navigate after deleting
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [student, setStudent] = useState(null);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");

  useEffect(() => {
    // Fetch student data dynamically using the student ID from the URL
    fetch(`https://bio-management-system-1.onrender.com/students/${id}`, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => {
        setStudent(data);
        setSelectedCourse(data.course);
        setSelectedInstructor(data.instructor_id);
      })
      .catch((error) => console.error("Error fetching student data:", error));
  }, [id]);

  const handleEditClick = () => setIsEditModalOpen(true);
  const handleCloseModal = () => setIsEditModalOpen(false);

  const handleUpdate = (event) => {
    event.preventDefault();

    // Prepare the updated student data
    const updatedStudent = {
      ...student,
      course: selectedCourse,
      instructor_id: selectedInstructor
    };

    // Send the updated data to the backend
    fetch(`https://bio-management-system-1.onrender.com/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedStudent)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Student updated successfully:", data);
        setIsEditModalOpen(false);
        setStudent(data);
      })
      .catch((error) => console.error("Error updating student data:", error));
  };

  const handleDelete = () => {
    // Send DELETE request to remove the student
    fetch(`https://bio-management-system-1.onrender.com/students/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        // Redirect to the students page after successful deletion
        navigate("/students");
      })
      .catch((error) => console.error("Error deleting student:", error));
  };

  if (!student) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-gray-100 flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start">
          {/* Profile Section */}
          <div className="bg-gray-200 rounded-lg w-48 h-60 flex justify-center items-center text-center text-gray-600 text-lg font-semibold mb-6 md:mb-0 md:mr-6">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                student.name
              )}&background=random&color=fff`}
              alt="student's profile"
            />
          </div>

          {/* Student Details Section */}
          <div className="flex-grow bg-gray-200 rounded-lg p-4">
            <p className="text-gray-700 text-sm mb-2">Name: {student.name}</p>
            <p className="text-gray-700 text-sm mb-2">Age: {student.age}</p>
            <p className="text-gray-700 text-sm mb-2">Phone: {student.phone}</p>
            <p className="text-gray-700 text-sm mb-2">Email: {student.email}</p>
            <p className="text-gray-700 text-sm">
              created_at: {student.created_at}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 md:mt-0 md:ml-6 flex space-x-4">
            <button
              onClick={handleEditClick}
              className="bg-orange-500 text-white font-bold px-4 py-2 rounded hover:bg-orange-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white font-bold px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && (
          <Modal isOpen={isEditModalOpen} onClose={handleCloseModal}>
            <h2 className="text-lg font-bold text-gray-700 mb-4">
              Edit Student
            </h2>
            <form className="space-y-4" onSubmit={handleUpdate}>
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={student.name}
                  onChange={(e) =>
                    setStudent({ ...student, name: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Age
                </label>
                <input
                  type="number"
                  value={student.age}
                  onChange={(e) =>
                    setStudent({ ...student, age: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={student.phone}
                  onChange={(e) =>
                    setStudent({ ...student, phone: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Email
                </label>
                <input
                  type="text"
                  value={student.email}
                  onChange={(e) =>
                    setStudent({ ...student, email: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
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

export default StudentDetails;
