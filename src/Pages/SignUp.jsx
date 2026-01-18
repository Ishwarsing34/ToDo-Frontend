import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;

const Signup = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const signUpReq = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const payload = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passRef.current.value
      };

      await axios.post(`${API}/api/signup`, payload);

      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={signUpReq}>
        <h2 className="signup-title">Create Account</h2>

        {error && <p className="error-text">{error}</p>}

        <input
          ref={nameRef}
          type="text"
          placeholder="Name"
          className="signup-input"
          required
        />

        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          className="signup-input"
          required
        />

        <input
          ref={passRef}
          type="password"
          placeholder="Password"
          className="signup-input"
          required
        />

        <button
          className="signup-btn"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="signup-footer">
          Already have an account?{" "}
          <span
            className="link"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
