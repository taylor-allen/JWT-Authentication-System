import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";
import { protectedRoute } from "../hooks/actions.js";
import { useEffect, useState } from "react";
import { logout } from "../hooks/actions.js";

export const Private = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [privateMessage, setPrivateMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      const { data, ok } = await protectedRoute();
      if (ok) {
        setPrivateMessage(data.message); // this message is in the routes.py for protected endpoint
        setUserEmail(data.logged_in_as) // user.email=logged_in_as in routes.py
      } else {
        console.log(`Error: ${data.message || 'Could not access protected data.'}`);
        logout(); // clears token on failure
        dispatch({ type: "updateToken", payload: null }); // clears token in global state
        navigate("/form");
      }
    };

    if (!store.token) {
      // if token is not in global state, this will try getting it from localStorage
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        dispatch({ type: "updateToken", payload: storedToken });
        verifyToken();
      } else {
        navigate("/form"); // if there's no token, redirect to login form
      }
    } else {
      verifyToken();
    }
  }, [store.token, dispatch, navigate]);

  const handleLogout = () => {
    logout();
    dispatch({ type: "updateToken", payload: null });
    navigate("/form");
  };

  return (
    <div className="text-center mt-5">
      {store.token ? (
        <>
          <h1 className="display-4">Welcome to the Private Profile Page!</h1>
          <div><p>This is a protected page. You are logged in.</p>
            {privateMessage && <p className="lead mt-4">Hi, {userEmail}!</p>}
            <img src="https://images.unsplash.com/photo-1489945052260-4f21c52268b9?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="img-fluid rounded-circle mb-3 h-25 w-25" />
          </div>
          <button className="btn btn-danger mt-3" onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        <p>Redirecting to login...</p>
      )
      }
    </div >
  );
};