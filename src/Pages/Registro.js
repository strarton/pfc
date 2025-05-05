import { useState } from "react";
import { addUser } from "../Api/addUsers";
import { Link, useNavigate } from "react-router-dom";

const Registro = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await addUser( formData.nombre, formData.apellido, formData.email, formData.password);
        
        if (success) {
            //alert("Usuario registrado correctamente");
            navigate("/Login"); 
        } else {
            alert("Error al registrar usuario");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registro</h2>
            <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
            <input type="text" name="apellido" placeholder="Apellido" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Correo" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
            <button type="submit">Registrar</button>
            <Link to="/Login">Login</Link>
        </form>
    );
};

export default Registro;
