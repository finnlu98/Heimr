import { useState } from "react";
import "./Login.css";
import { IoMdSend } from "react-icons/io";
import { useAuth } from "../../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const { user, login, logout } = useAuth();
  function handleSubmit() {
    if (email === "") return;
    login(email);
  }

  return (
    <div className="login-container h-column">
      {!user ? (
        <div>
          <p>Enter your email to login 🚀</p>
          <div className="h-row">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn-primary" onClick={handleSubmit}>
              <IoMdSend />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>Welcome! 👋</p>
          <p>
            You are logged in with <strong>{user}</strong>
          </p>
          <button onClick={() => logout()} className="sign-out">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};
export default Login;
