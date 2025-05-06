import { useParams, useNavigate } from "react-router-dom";
import useCursosProtegidos from "../hooks/useCursosProtegidos";
import Navbar from "../Components/Navbar";

const Curso = () => {
  const { cursoId } = useParams();  // Obtener el cursoId desde la URL
  const navigate = useNavigate();  // Para poder redirigir a otra ruta
  const { cursos, error, loading } = useCursosProtegidos();  // Obtener todos los cursos desde el hook

  // Filtramos el curso específico según el ID de la URL
  const curso = cursos.find((c) => c.id === parseInt(cursoId));

  if (loading) return <p>Cargando...</p>;  // Esperamos a que termine la carga
  if (error) return <p>{error}</p>;  // Mostramos cualquier error
  if (!curso) return <p>Curso no encontrado.</p>;  // Si no se encuentra el curso

  const handleLeccionClick = (leccionId) => {
    // Redirige a la página de la lección con el cursoId y leccionId
    navigate(`/${cursoId}/${leccionId}`);
  };

  return (
    <div>
        <Navbar />
      <h2>{curso.titulo}</h2>
      <p>{curso.descripcion}</p>

      {/* Verificamos si el curso tiene lecciones */}
      {curso.lecciones && curso.lecciones.length > 0 ? (
        <div>
          <h3>Lecciones:</h3>
          <ul>
            {curso.lecciones.map((leccion) => (
              <li key={leccion.id}>
                <button onClick={() => handleLeccionClick(leccion.id)}>
                  {leccion.titulo}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Este curso no tiene lecciones disponibles.</p>
      )}
    </div>
  );
};

export default Curso;
