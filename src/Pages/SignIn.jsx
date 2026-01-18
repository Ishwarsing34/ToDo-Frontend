import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_URL;

const SignIn = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const signInReq = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const payload = {
                email: emailRef.current.value,
                password: passwordRef.current.value
            };

            const res = await axios.post(
                `${API}//api/signin`,
                payload
            );

            // 🔐 store token
            localStorage.setItem("token", res.data.token);

            // redirect to dashboard
            navigate("/dashboard");

        } catch (err) {
            setError(
                err.response?.data?.message || "Signin failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signin-container">
            <form className="signin-form" onSubmit={signInReq}>
                <h2 className="signin-title">Welcome Back</h2>

                {error && <p className="error-text">{error}</p>}

                <input
                    ref={emailRef}
                    type="email"
                    placeholder="Email"
                    className="signin-input"
                    required
                />

                <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                    className="signin-input"
                    required
                />

                <button
                    className="signin-btn"
                    disabled={loading}
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>

                <p className="signin-footer">
                    Don’t have an account?{" "}
                    <span
                        className="link"
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </span>
                </p>
            </form>
        </div>
    );
};

export default SignIn;
