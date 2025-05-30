import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/" className="text-decoration-none">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					<Link to="/form">
						<button className="btn btn-primary">Login/Signup Page</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};