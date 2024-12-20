import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import Modal from "../components/AddStudentModal"; // Modal for editing instructor details

function InstructorDetails() {
  const [instructor, setInstructor] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams(); // To get the instructor ID from the URL
  const navigate = useNavigate();

  // Fetch the instructor data when the component mounts
  useEffect(() => {
    fetch(`https://bio-management-system-1.onrender.com/instructors/${id}`, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => {
        setInstructor(data);
        setName(data.name);
        setEmail(data.email); // Pre-fill the name and email fields
      })
      .catch((error) => console.error("Error fetching instructor:", error));
  }, [id]);

  // Handle edit modal opening
  const handleEditClick = () => setIsEditModalOpen(true);
  const handleCloseModal = () => setIsEditModalOpen(false);

  // Handle submit for editing the instructor
  const handleEditSubmit = (e) => {
    e.preventDefault();

    const updatedInstructor = {
      name,
      email
    };

    // Send the updated data to the API (PUT request)
    fetch(`https://bio-management-system-1.onrender.com/instructors/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedInstructor)
    })
      .then((response) => response.json())
      .then((result) => {
        setInstructor(result); // Update the UI with the updated instructor data
        handleCloseModal();
      })
      .catch((error) => console.error("Error updating instructor:", error));
  };

  // Handle deleting the instructor
  const handleDeleteClick = () => {
    fetch(`https://bio-management-system-1.onrender.com/instructors/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        navigate("/instructors"); // Redirect to the instructors list page after deletion
      })
      .catch((error) => console.error("Error deleting instructor:", error));
  };

  // Loading state while the instructor data is being fetched
  if (!instructor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-gray-100 flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start">
          {/* Profile Section */}
          <div className="bg-gray-200 rounded-lg w-48 h-60 flex justify-center items-center text-center text-gray-600 text-lg font-semibold mb-6 md:mb-0 md:mr-6">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                instructor.name
              )}&background=random&color=fff`}
              alt={`${instructor.name}'s profile`}
            />
          </div>

          {/* Instructor Details Section */}
          <div className="flex-grow bg-gray-200 rounded-lg p-4">
            <p className="text-gray-700 text-sm mb-2">
              Name: {instructor.name}
            </p>
            <p className="text-gray-700 text-sm mb-2">
              Email: {instructor.email}{" "}
            </p>
            <p className="text-gray-700 text-sm mb-2">
              Created_at: {instructor.Created_at}{" "}
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
              onClick={handleDeleteClick}
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
              Edit Instructor
            </h2>
            <form className="space-y-4" onSubmit={handleEditSubmit}>
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

export default InstructorDetails;
