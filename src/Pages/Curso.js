import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getCourses from "../Api/get_courses"; // o puedes hacer getCourseById(cursoId)

const Curso = () => {
  const { cursoId } = useParams();  // Obtenemos el ID del curso desde la URL
  const navigate = useNavigate();    // Usamos navigate para cambiar de página
  const [curso, setCurso] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const cursos = await getCourses();
        const cursoEncontrado = cursos.find((c) => c.id === parseInt(cursoId));  // Buscamos el curso por su ID
        if (cursoEncontrado) {
          setCurso(cursoEncontrado);
        } else {
          setError("Curso no encontrado.");
        }
      } catch (err) {
        setError("Error al cargar el curso.");
      }
    };

    fetchCurso();
  }, [cursoId]);

  if (error) return <p>{error}</p>;
  if (!curso) return <p>Cargando...</p>;

  const handleLeccionClick = (leccionId) => {
    // Navegamos a la página de la lección
    navigate(`/${cursoId}/${leccionId}`);
  };

  return (
    <div>
      <h2>{curso.titulo}</h2>
      <p>{curso.descripcion}</p>

      {curso.lecciones && curso.lecciones.length > 0 ? (
        <ul>
          {curso.lecciones.map((leccion) => (
            <li key={leccion.id}>
              <button onClick={() => handleLeccionClick(leccion.id)}>
                {leccion.titulo}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Este curso no tiene lecciones.</p>
      )}
    </div>
  );
};

export default Curso;
