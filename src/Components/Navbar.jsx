import { useContext } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";

const Navbar = () => {
	const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
	const navigate = useNavigate();

	const onLogoutHandler = () => {
		setIsLoggedIn(false);
		navigate("/login");
		localStorage.setItem("user", "");
	};

	return (
		<div className="h-full flex justify-between my-auto items-center px-7">
			<div className="nav-logo-wrap">
				<Link to="/">
					<img src={logo} alt="Logo" className="h-full w-40 ml-10" />
				</Link>
			</div>
			{isLoggedIn && (
				<div className="nav-menu-wrap">
					<span className="mx-3">
						<Link to="/" className="text-md font-poppins">
							Home
						</Link>
					</span>
					<span className="mx-3">
						<Link to="/hotels" className="text-md font-poppins">
							Hotels
						</Link>
					</span>
					<span className="mx-3">
						<Link to={`/bookings`} className="text-md font-poppins">
							Bookings
						</Link>
					</span>
					<span className="mx-3">
						<button
							onClick={() => {
								onLogoutHandler();
							}}
							className="text-md font-poppins text-red-400"
						>
							Logout
						</button>
					</span>
				</div>
			)}
		</div>
	);
};

export default Navbar;
