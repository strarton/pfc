import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import useCursosProtegidos from "../hooks/useCursosProtegidos"; // Usamos el hook para obtener los cursos

const Leccion = () => {
  const { cursoId, leccionId } = useParams();  // Obtenemos el cursoId y leccionId desde la URL
  const navigate = useNavigate();
  const { cursos, error, loading } = useCursosProtegidos();  // Usamos el hook para obtener cursos y manejar errores

  const [leccion, setLeccion] = useState(null);

  useEffect(() => {
    if (loading) return; // Esperamos a que termine la validación y obtención de cursos

    // Buscar el curso correspondiente por su ID
    const curso = cursos.find((c) => c.id === parseInt(cursoId));
    if (!curso) {
      setLeccion(null);  // Si no encontramos el curso, limpiamos lección
      return;  // No hacemos nada más
    }

    // Buscar la lección dentro del curso
    const leccionEncontrada = curso.lecciones?.find((l) => l.id === parseInt(leccionId));
    if (leccionEncontrada) {
      setLeccion(leccionEncontrada);  // Si encontramos la lección, la guardamos en el estado
    } else {
      setLeccion(null);  // Si no encontramos la lección, limpiamos el estado
    }
  }, [cursoId, leccionId, cursos, loading]);

  if (loading) return <p>Cargando...</p>;  // Mientras estamos esperando los cursos
  if (error) return <p>{error}</p>;  // Si ocurre un error en el proceso de obtención de cursos
  if (!leccion) return <p>Lección no encontrada o cargando...</p>;  // Si no encontramos la lección

  return (
    <div>
        <Navbar />
      <h2>{leccion.titulo}</h2>
      <p>{leccion.contenido}</p>
      
      {/* Mostrar los recursos de la lección */}
      {leccion.recursos && leccion.recursos.length > 0 && (
        <div>
          <h3>Recursos:</h3>
          <ul>
            {leccion.recursos.map((recurso, index) => (
              <li key={index}>
                <img src={recurso} alt={recurso} style={{ maxWidth: "300px" }} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mostrar los ejercicios de la lección */}
      {leccion.ejercicios && leccion.ejercicios.length > 0 && (
        <div>
          <h3>Ejercicios:</h3>
          <ul>
            {leccion.ejercicios.map((ejercicio) => (
              <li key={ejercicio.id}>
                <p>{ejercicio.pregunta}</p>
                {ejercicio.opciones && (
                  <ul>
                    {ejercicio.opciones.map((opcion, index) => (
                      <li key={index}>{opcion}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Leccion;
