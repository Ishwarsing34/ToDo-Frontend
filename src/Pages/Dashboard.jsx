import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
const API = import.meta.env.VITE_API_URL;



const DashBoard = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [todos, setTodos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(prev => !prev);
  };

   const token = localStorage.getItem("token");

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError("");

      
      if (!token) {
        navigate("/signin");
        return;
      }

      const res = await axios.get(
    
       `${API}/api/todos`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTodos(res.data.todos);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    fetchAll();
  }, []);

  // 🔥 YOU WILL HANDLE THIS
  const handleDelete =async (todoId) => {
    console.log("Delete todo with id:", todoId);

     await axios.delete(`${API}/api/todos/${todoId}`,
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
     )

      
  };



  return (
    <div className="dashboard-container">

      {/* Header */}
      <div className="dashboard-header">
        <button
          className="refresh-btn"
          onClick={fetchAll}
          disabled={loading}
        >
          🔄 Refresh
        </button>

        <h2 className="dashboard-title">My Todos</h2>

        <button
          className="add-todo-btn"
          onClick={toggleModal}
        >
          + Add Todo
        </button>
      </div>

      {/* Modal */}
      {isOpen && <Modal onClose={toggleModal}  onFetch={fetchAll}/>}

      {/* Todos */}
      <div className="todos-wrapper">
        {loading && <p className="status-text">Fetching all todos...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && todos.length === 0 && (
          <p className="status-text">No todos yet</p>
        )}

        {!loading && !error &&
          todos.map(todo => (
            <div className="todo-card" key={todo._id}>
              <div className="todo-card-header">
                <h3 className="todo-title">{todo.title}</h3>

                <div className="todo-actions">
                  <span className={`priority-badge ${todo.priority}`}>
                    {todo.priority}
                  </span>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(todo._id)}
                    title="Delete todo"
                  >
                    ❌
                  </button>
                </div>
              </div>

              {todo.description && (
                <p className="todo-desc">{todo.description}</p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default DashBoard;
