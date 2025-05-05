import API_BASE_URL from "./config";

const addUser = async ( nombre, apellido, email, password) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, email, password }),
    };

    try {
        const response = await fetch(`${API_BASE_URL}/anadirUsuario.php`, requestOptions);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const result = await response.json();

        return result?.success ?? false;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        return false;
    }
};

export { addUser };
