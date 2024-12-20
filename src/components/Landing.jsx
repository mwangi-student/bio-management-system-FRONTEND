import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const get_started = () => {
    navigate("/students");
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[#c69663]">
      <h1 className="text-5xl font-bold text-center mb-6">
        WELCOME TO OUR BIO MANAGEMENT SYSTEM
      </h1>
      <button
        className="px-6 py-3 bg-orange-600 text-white rounded-full text-lg hover:bg-orange-500 transition"
        onClick={get_started}
      >
        GET STARTED
      </button>
    </div>
  );
};

export default Navbar;
