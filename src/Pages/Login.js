import { useState } from "react";
import { checkUser } from "../Api/getUsers";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    const response = await checkUser(email, password); 

    if (response.success) {
      navigate("/Academia"); 
    } else {
      setError("Usuario o contraseña incorrectos"); 
    }
  };

  return (
    <div>
  <Navbar />
  <div id="login">
    <h2 className="login-title">Iniciar Sesión</h2>
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Ingresa tu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Ingresa tu contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="button-row">
        <button type="submit">Login</button>
        <Link to="/Registro" className="register-link">Registro</Link>
      </div>
    </form>
    {error && <p style={{ color: "red" }}>{error}</p>}
  </div>
</div>

  );
};

export default Login;
