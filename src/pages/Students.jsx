import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Modal from "../components/AddStudentModal";

function Students() {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    phone: "",
    email: "",
    age: ""
  });
  const navigate = useNavigate();

  // Fetch students data on component mount
  useEffect(() => {
    fetch("http://127.0.0.1:8000/students")
      .then((response) => response.json()) // Assuming the API returns JSON data
      .then((data) => setStudents(data)) // Update state with fetched data
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  // Handle opening and closing the modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Navigate to a single student page
  const handleViewStudent = (id) => {
    navigate(`/students/${id}`);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding a new student
  const handleAddStudent = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newStudent)
    })
      .then((response) => response.json())
      .then((addedStudent) => {
        // Append the new student to the list
        setStudents((prevStudents) => [...prevStudents, addedStudent]);
        // Reset form inputs
        setNewStudent({ name: "", phone: "", email: "", age: "" });
        // Close the modal
        setIsModalOpen(false);
      })
      .catch((error) => console.error("Error adding student:", error));
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-full mx-auto px-4 py-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Top Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={handleOpenModal}
                className="bg-orange-500 text-white font-bold px-4 py-2 rounded hover:bg-orange-600"
              >
                ADD STUDENTS
              </button>
            </div>

            {/* Student List */}
            <div className="space-y-4">
              {students.length > 0 ? (
                students.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between bg-gray-200 p-4 rounded-lg shadow"
                    style={{ minHeight: "60px" }}
                  >
                    {/* Profile Image */}
                    <div className="w-12 h-12 bg-white rounded-full shadow flex-shrink-0">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          student.name
                        )}&background=random&color=fff`}
                        alt="student's profile"
                      />
                    </div>

                    {/* Student Details */}
                    <div className="flex-1 ml-4">
                      <p className="font-bold text-gray-800">{student.name}</p>
                      <p className="text-gray-600">{student.email}</p>
                    </div>

                    {/* View Button */}
                    <button
                      className="bg-orange-500 text-white font-bold px-4 py-2 rounded hover:bg-orange-600"
                      onClick={() => handleViewStudent(student.id)}
                    >
                      View
                    </button>
                  </div>
                ))
              ) : (
                <p>No students available</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-lg font-bold text-gray-700 mb-4">Add Student</h2>
        <form className="space-y-4" onSubmit={handleAddStudent}>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={newStudent.name}
              onChange={handleInputChange}
              placeholder="Enter full name"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={newStudent.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={newStudent.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Age</label>
            <input
              type="text"
              name="age"
              value={newStudent.age}
              onChange={handleInputChange}
              placeholder="Enter student's age"
              className="w-full p-2 border border-gray-300 rounded"
              required
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
              Add Student
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Students;
