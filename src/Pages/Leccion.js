import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getCourses from "../Api/get_courses";

const Leccion = () => {
  const { cursoId, leccionId } = useParams();  // Obtener el cursoId y leccionId desde la URL
  const [leccion, setLeccion] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeccionDetails = async () => {
      try {
        const cursos = await getCourses();
        const curso = cursos.find((c) => c.id === parseInt(cursoId)); // Encontramos el curso
        if (curso) {
          const leccionEncontrada = curso.lecciones.find((l) => l.id === parseInt(leccionId));  // Buscamos la lección por su ID
          if (leccionEncontrada) {
            setLeccion(leccionEncontrada);
          } else {
            setError("Lección no encontrada.");
          }
        } else {
          setError("Curso no encontrado.");
        }
      } catch (err) {
        setError("Error al cargar la lección.");
      }
    };

    fetchLeccionDetails();
  }, [cursoId, leccionId]);

  if (error) return <p>{error}</p>;
  if (!leccion) return <p>Cargando...</p>;

  return (
    <div>
      <h2>{leccion.titulo}</h2>
      <p>{leccion.contenido}</p>
      <h3>Recursos:</h3>
      <ul>
        {leccion.recursos.map((recurso, index) => (
          <li key={index}>{recurso}</li>
        ))}
      </ul>
    </div>
  );
};

export default Leccion;
