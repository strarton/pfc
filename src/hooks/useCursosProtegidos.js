import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import getCourses from "../Api/get_courses";

const useCursosProtegidos = () => {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validarTokenYObtenerCursos = async () => {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp < now) {
          localStorage.removeItem("jwtToken");
          navigate("/login");
          return;
        }
      } catch (e) {
        console.error("Token inválido:", e);
        navigate("/login");
        return;
      }

      // Intentamos primero obtener de localStorage
      let storedCursos = JSON.parse(localStorage.getItem("cursos")) || [];

      if (!storedCursos.length) {
        try {
          await getCourses(); // Hace fetch y guarda en localStorage
          storedCursos = JSON.parse(localStorage.getItem("cursos")) || [];
        } catch (fetchError) {
          setError("Error al obtener los cursos.");
          setLoading(false);
          return;
        }
      }

      if (storedCursos.length > 0) {
        setCursos(storedCursos);
      } else {
        setError("No tienes cursos asignados.");
      }

      setLoading(false);
    };

    validarTokenYObtenerCursos();
  }, [navigate]);

  return { cursos, error, loading };
};

export default useCursosProtegidos;
