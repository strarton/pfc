const getCourses = async () => {
    const token = localStorage.getItem("jwtToken");  // Recuperamos el token del almacenamiento local
  
    if (!token) {
      alert("Token no proporcionado");
      throw new Error("Token no proporcionado");  // Aseguramos que se arroje un error si no hay token
    }

    try {
      // Verifica si el token se está pasando correctamente en las cabeceras
      console.log("Token enviado: ", token);

      const response = await fetch("http://localhost/academia/backend/obtener_cursos.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ token }), // O cualquier otro cuerpo que se necesite
      });
      

      if (!response.ok) {
        alert("Error al obtener los cursos");
        throw new Error("Error al obtener los cursos");
      }

      const data = await response.json();
      return data;  // Asegúrate de devolver los datos correctamente
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
      alert("Error en la solicitud");
      throw error;
    }
};

export default getCourses;
