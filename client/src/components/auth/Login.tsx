import { IoMdSend } from "react-icons/io";
import "./Login.css";

interface LoginProps {
  email: string;
  setEmail: (email: string) => void;
  handleSubmit: () => void;
}

const Login: React.FC<LoginProps> = ({ email, setEmail, handleSubmit }) => {
  return (
    <>
      <div>
        <p>Enter your email to login 🚀</p>
        <div className="h-row">
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="btn-primary" onClick={handleSubmit}>
            <IoMdSend />
          </button>
        </div>
      </div>
    </>
  );
};
export default Login;
