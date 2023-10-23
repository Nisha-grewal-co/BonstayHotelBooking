import { ToastContainer, toast } from "react-toastify";
import { AppContext } from "../App";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
	const { setIsLoggedIn, user, setUser } = useContext(AppContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();

	const frmSubmit = (e) => {
		e.preventDefault();
		axios.get(`http://localhost:5000/users?email=${email}`).then((res) => {
			if (res.data.length > 0) {
				const user = res.data[0];
				if (user.password === password) {
					toast.success("Login Successful!", {
						position: "top-center",
						autoClose: 3000,
					});
					setIsLoggedIn(true);
					setSuccess(true);
					setUser(user);
					localStorage.setItem("user", JSON.stringify(user));
				} else {
					toast.error("Username and Password do not match! Please Retry!", {
						position: "top-center",
						autoClose: 3000,
					});
				}
			}
		});
	};

	if (success) {
		setSuccess(false);
		console.log(user);
		return navigate("/home");
	}

	const onChangeHandler = (e) => {
		if (e.target.name == "email") {
			setEmail(e.target.value);
		}
		if (e.target.name == "password") {
			setPassword(e.target.value);
		}
	};

	return (
		<div className="h-[87%] flex justify-center items-center">
			<ToastContainer />
			<div className="w-[35%] h-[90%] border-4 border-orange-200 rounded-lg -translate-y-5 bg-gradient-to-br from-orange-100 to-orange-200 flex justify-center">
				<div className="h-full ">
					<div className="py-8 mb-6 font-dancingScript text-5xl text-gray-600 text-center">
						BonStay With Us
					</div>
					<form
						action="#"
						onSubmit={(e) => frmSubmit(e)}
						className="py-2 px-6 w-full flex flex-wrap flex-col justify-start"
					>
						<div className="w-full mb-6">
							<div htmlFor="" className="text-gray-600 font-roboto text-xl">
								Email Id:
							</div>
							<input
								type="email"
								required
								name="email"
								value={email}
								onChange={(e) => onChangeHandler(e)}
								className="h-10 bg-transparent border-b-2 text-gray-500 rounded-md border-gray-400 text-md py-1 w-full focus:outline-none"
							/>
						</div>
						<div className="w-full gap-y-4">
							<div htmlFor="" className="text-gray-600 font-roboto text-xl">
								Password:
							</div>
							<input
								type="password"
								required
								name="password"
								value={password}
								onChange={(e) => onChangeHandler(e)}
								className="h-10 bg-transparent border-b-2 text-gray-500 rounded-md border-gray-400 py-1 w-full focus:outline-none"
							/>
							<div className="w-full text-gray-600 my-2">
								<button
									className="border-2 text-white bg-gradient-to-tr from-cyan-200 px-4 py-1 w-full mt-2 rounded-lg to-cyan-300 align-middle"
									type="submit"
								>
									Login
								</button>
							</div>
							<div className="w-full mt-2 text-gray-600">
								<Link to="/registration" className="text-cyan-600">
									Sign Up
								</Link>{" "}
								to create a new account
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
