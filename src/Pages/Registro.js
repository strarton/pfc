import { useState } from "react";
import { addUser } from "../Api/addUsers";

const Registro = () => {
    const [formData, setFormData] = useState({
        tipo: "",
        nombre: "",
        apellido: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await addUser(formData.tipo, formData.nombre, formData.apellido, formData.email, formData.password);
        alert(success ? "Usuario registrado correctamente" : "Error al registrar usuario");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="tipo" placeholder="Tipo (admin/alumno)" onChange={handleChange} required />
            <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
            <input type="text" name="apellido" placeholder="Apellido" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Correo" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
            <button type="submit">Registrar</button>
        </form>
    );
};

export default Registro;
