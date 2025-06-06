import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { protectedRoute, logout } from "../hooks/actions";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();
	const [userEmail, setUserEmail] = useState(null);

	useEffect(() => {
		const verifyToken = async () => {
			const { data, ok } = await protectedRoute();
			if (ok) {
				setUserEmail(data.logged_in_as); // This is your user's email
			} else {
				logout();
				dispatch({ type: "updateToken", payload: null });
				setUserEmail(null);
				navigate("/form");
			}
		};

		const storedToken = localStorage.getItem("token_value");

		if (!store.token && storedToken) {
			dispatch({ type: "updateToken", payload: storedToken });
			verifyToken();
		} else if (store.token) {
			verifyToken();
		}
	}, [store.token, dispatch, navigate]);

	const handleLogout = () => {
		logout();
		dispatch({ type: "updateToken", payload: null });
		setUserEmail(null);
		navigate("/form");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/" className="text-decoration-none">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					{store.token ? (
						<>
							<span className="me-3">Welcome, {userEmail}</span>
							<button className="btn btn-outline-danger me-3" onClick={handleLogout}>
								Logout
							</button>
							<Link to={"/private"}>
								<button className="btn btn-outline-success">
									My Profile
								</button>
							</Link>
						</>
					) : (
						<Link to="/form">
							<button className="btn btn-primary">Login</button>
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};
