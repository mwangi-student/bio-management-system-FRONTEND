import StudentsDetails from "./components/StudentsDetails";
import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/students", {
      method: "GET"
    })
      .then((response) => response.json())
      .then((result) => setStudents(result))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main className="p-8">
      <ul role="list" className="divide-y divide-gray-100">
        {students.map((student) => (
          <StudentsDetails key={student.id} {...student}/>
        ))}
      </ul>
    </main>
  );
}

export default App;
