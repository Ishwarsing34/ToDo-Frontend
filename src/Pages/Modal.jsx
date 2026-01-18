import { useRef, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

const Modal = ({ onClose,onFetch }) => {
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const priorityRef = useRef(null);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const setTodo = async () => {
        const title = titleRef.current.value.trim();
        const description = descriptionRef.current.value.trim();
        const priority = priorityRef.current.value;

        if (!title) {
            setError("Title is required");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Unauthorized");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const payload = {
                title,
                description,
                priority
            };



            await axios.post(
                `${API}/api/todos`,
                payload,
                {
                    headers: {

                        Authorization: `Bearer ${token}`
                    }
                }

            );




            onFetch(),
            onClose();
        } catch (err) {
            setError(
                err.response?.data?.message || "Error while creating todo"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h3>Add Todo</h3>

                <input
                    ref={titleRef}
                    type="text"
                    placeholder="Title"
                />

                <textarea
                    ref={descriptionRef}
                    placeholder="Description"
                />

                <select ref={priorityRef} defaultValue="medium">
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                </select>

                {error && <p className="error-text">{error}</p>}

                <div className="modal-actions">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={setTodo} disabled={loading}>
                        {loading ? "Adding..." : "Add"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
