import { NavLink } from "react-router-dom";

const Navbar = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Students", path: "/students" },
    { name: "Instructors", path: "/instructors" },
    { name: "Courses", path: "/courses" }
  ];

  return (
    <nav className="bg-[#c69663] px-4 py-3">
      <div className="flex justify-center items-center space-x-8">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `text-black cursor-pointer px-4 py-2 ${
                isActive ? "bg-orange-500 text-black rounded-full" : ""
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
