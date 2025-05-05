import { useEffect, useState } from "react"; // Importar useState
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "../App.css";
import getCourses from "../Api/get_courses";

const Academia = () => {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]); // Inicializamos useState
  const [error, setError] = useState("");  // Inicializamos useState para errores

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      // Si no hay token, redirigimos a login
      navigate("/login");
    } else {
      const fetchCourses = async () => {
        try {
          const cursosData = await getCourses();
          console.log("Cursos sin formato:", cursosData);
          console.log("Cursos desde API:", JSON.stringify(cursosData, null, 2));

          if (cursosData.length > 0) {
            setCursos(cursosData); // Si hay cursos, los mostramos
          } else {
            setError("No tienes cursos asignados.");
          }
        } catch (err) {
          setError("Hubo un problema al obtener los cursos.");
        }
      };

      fetchCourses();
    }
  }, [navigate]);

  const handleCourseClick = (courseId) => {
    console.log("Navigating to course with ID:", courseId); // Verifica si el ID se pasa correctamente
    navigate(`/${courseId}`);
  };

  return (
    <div>
      <Navbar />
      <h2>Academia</h2>
      {error && <p>{error}</p>}  {/* Si hay error, lo mostramos */}
      <div>
        {cursos.map((curso) => (
          <button
            key={curso.id}  // Cambié de curso.curso_id a curso.id
            onClick={() => handleCourseClick(curso.id)} // Cambié de curso.curso_id a curso.id
          >
            {curso.titulo} {/* Mostramos el título de cada curso */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Academia;
