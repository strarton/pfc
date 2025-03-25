import API_BASE_URL from "./config";

const addUser = async (tipo, nombre, apellido, email, password) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo, nombre, apellido, email, password }) // Ahora envía todos los datos necesarios
    };

    try {
        const response = await fetch(`${API_BASE_URL}/anadirUsuario.php`, requestOptions);
        const result = await response.json();
        return result.success || false;  
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return false;
    }
};

export { addUser };

