import API_BASE_URL from "./config";

const checkUser = async (username, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/existe_usuario.php?username=${username}&password=${password}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en la petición:", error);
        return { error: "Error en la conexión" };
    }
};

export { checkUser };
