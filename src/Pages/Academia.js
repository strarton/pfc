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
          if (cursosData.length > 0) {
            setCursos(cursosData); // Si hay cursos, los mostramos
          } else {
            setError("No tienes cursos asignados.");
          }
        } catch (err) {
          // Manejo de error si la llamada a la API falla
          setError("Hubo un problema al obtener los cursos.");
        }
      };

      fetchCourses();
    }
  }, [navigate]);

  const handleCourseClick = (courseId) => {
    // Al hacer clic, navegamos a la página del curso
    navigate(`/curso/${courseId}`);
  };

  return (
    <div>
      <Navbar />
      <h2>Academia</h2>
      {error && <p>{error}</p>}  {/* Si hay error, lo mostramos */}
      <div>
        {cursos.map((curso) => (
          <button
            key={curso.curso_id}
            onClick={() => handleCourseClick(curso.curso_id)}
          >
            {curso.titulo} {/* Mostramos el título de cada curso */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Academia;
