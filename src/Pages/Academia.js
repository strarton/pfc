import Navbar from "../Components/Navbar";
import "../App.css";
import useCursosProtegidos from "../hooks/useCursosProtegidos";
import { useNavigate } from "react-router-dom";

const Academia = () => {
  const { cursos, error } = useCursosProtegidos();
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    navigate(`/${courseId}`);
  };

  return (
    <div>
      <Navbar />
      <h2>Academia</h2>
      {error && <p>{error}</p>}
      <div>
        {cursos.map((curso) => (
          <button key={curso.id} onClick={() => handleCourseClick(curso.id)}>
            {curso.titulo}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Academia;
