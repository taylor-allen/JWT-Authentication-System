import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const Home = () => {

	return (
		<div className="text-center mt-5">
			<h1 className="display-4">Welcome</h1>
			<p>
				<img src={"https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} className="img-fluid rounded-circle mb-3 h-25 w-25" alt="Rigo Baby" />
			</p>
			<Link to={"/form"} className="text-decoration-none">CLICK HERE to go to the authorization form</Link>
		</div>
	);
}; 