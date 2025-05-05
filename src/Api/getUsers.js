import API_BASE_URL from "./config.js";
import { jwtDecode } from "jwt-decode";  // Cambié a importar correctamente la función

const checkUser = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/existe_usuario.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        // Verifica si la respuesta es exitosa (HTTP 200)
        if (!response.ok) {
            // Si no es una respuesta correcta, lanza un error
            throw new Error("Error en la respuesta del servidor");
        }

        const text = await response.text();
        const data = JSON.parse(text);

        // Verifica si la respuesta contiene el token
        if (data.success && data.token) {
            // Decodifica el JWT (opcional, si quieres usar los datos en el frontend)
            const decodedToken = jwtDecode(data.token);  // Utiliza la función correcta
            console.log("Token decodificado:", decodedToken);

            // Guarda el token en el localStorage
            localStorage.setItem("jwtToken", data.token);
        }

        return data;
    } catch (error) {
        console.error("Error en la conexión o al procesar la respuesta:", error);
        return { error: "Error en la conexión o al procesar la respuesta" };
    }
};

export { checkUser };
