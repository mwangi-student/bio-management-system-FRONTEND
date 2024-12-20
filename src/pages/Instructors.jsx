import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Modal from "../components/AddStudentModal";

function Instructors() {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    expertise: ""
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", email: "", phone: "", expertise: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch instructors data when component mounts
  useEffect(() => {
    fetch("http://127.0.0.1:8000/instructors", {
      method: "GET"
    })
      .then((response) => response.json())
      .then((result) => {
        setInstructors(result); // Populate the instructors state with fetched data
      })
      .catch((error) => console.error("Error fetching instructors:", error));
  }, []);

  const handleAddInstructor = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/instructors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((newInstructor) => {
        setInstructors((prevInstructors) => [
          ...prevInstructors,
          newInstructor
        ]);
        handleCloseModal();
      })
      .catch((error) => console.error("Error adding instructor:", error));
  };

  const SingleInstructor = (id) => {
    navigate(`/instructors/${id}`);
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
                ADD INSTRUCTOR
              </button>
            </div>

            {/* Instructor List */}
            <div className="space-y-4">
              {instructors.length > 0 ? (
                instructors.map((instructor) => (
                  <div
                    key={instructor.id}
                    className="flex items-center justify-between bg-gray-200 p-4 rounded-lg shadow"
                    style={{ minHeight: "60px" }}
                  >
                    {/* Profile Image */}
                    <div className="w-12 h-12 bg-white rounded-full shadow flex-shrink-0">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          instructor.name
                        )}&background=random&color=fff`}
                        alt={`${instructor.name}'s profile`}
                      />
                    </div>

                    {/* Instructor Details */}
                    <div>
                      <p className="text-gray-700 text-sm">
                        Name: {instructor.name}
                      </p>
                      <p className="text-gray-700 text-sm">
                        Email: {instructor.email}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button
                        className="bg-orange-500 text-white font-bold px-4 py-2 rounded bg-orange-500"
                        onClick={() => SingleInstructor(instructor.id)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No instructors available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-lg font-bold text-gray-700 mb-4">Add Instructor</h2>
        <form className="space-y-4" onSubmit={handleAddInstructor}>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
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
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
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
              Add Instructor
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Instructors;
