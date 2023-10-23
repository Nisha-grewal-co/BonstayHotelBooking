import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Registration = () => {
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [valid, setValid] = useState(false);
	const [isRegistered, setIsRegistered] = useState(false);
	const navigate = useNavigate();

	const onChangeHandler = (e) => {
		if (e.target.name == "name") {
			setName(e.target.value);
		}
		if (e.target.name == "address") {
			setAddress(e.target.value);
		}
		if (e.target.name == "phone") {
			setPhone(e.target.value);
		}
		if (e.target.name == "email") {
			setEmail(e.target.value);
		}
		if (e.target.name == "password") {
			setPassword(e.target.value);
		}
	};

	const frmSubmit = (e) => {
		e.preventDefault();

		if (name.length < 3) {
			toast.error("Name should be greater than 3 characters!", {
				position: "top-center",
			});
			return;
		} else if (phone.length != 10) {
			toast.error("Phone Number should be of 10 digits", {
				position: "top-center",
			});
			return;
		} else if (password.length < 8 || password.length > 12) {
			toast.error(
				"Password should be greater than 8 characters and less than 12 characters!",
				{
					position: "top-center",
				}
			);
			return;
		} else {
			console.warn("In else");
			axios.get(`http://localhost:5000/users?email=${email}`).then((res) => {
				console.log(res);
				console.log(typeof res);
				if (res.data.length === 1) {
					toast.error("Email is already taken! Please use a different email!", {
						position: "top-center",
					});
				} else {
					console.log("Inside else");
					setValid(true);
					console.log("Valid: " + valid);
				}
			});
		}
		if (valid) {
			axios
				.post("http://localhost:5000/users", {
					name: name,
					address: address,
					phoneNo: Number(phone),
					email: email,
					password: password,
				})
				.then((res) => {
					console.log(res.data);
					toast.success("User Registered Successfully!", {
						position: "top-center",
						autoClose: 3000,
					});
					toast("Redirecting to the Login Page!!", {
						position: "top-center",
						autoClose: 3500,
					});
					setIsRegistered(true);
				})
				.catch((e) => {
					toast.error(e.message);
				});
		}

		// setName("");
		// setAddress("");
		// setPhone("");
		// setEmail("");
		// setPassword("");
	};
	console.log("Is registered: " + isRegistered);

	if (isRegistered) {
		console.warn("Inside the navigate to login");
		setIsRegistered(false);
		return navigate("/login");
	}

	return (
		<div className="h-[87%] flex justify-center items-center">
			<ToastContainer />
			<div className="w-[65%] h-[90%] border-4 border-orange-200 rounded-lg -translate-y-5 flex flex-wrap">
				<div className="w-[50%] h-full border-r-2 border-orange-200 reg-image bottom-0">
					<div className="text-white h-[80%] font-dancingScript text-5xl flex items-center justify-center">
						Welcome to Bonstay
					</div>
				</div>
				<div className="w-[50%] h-full border-l-2 border-orange-200 bg-gradient-to-br from-orange-100 to-orange-200">
					<form
						action="#"
						onSubmit={(e) => frmSubmit(e)}
						className="py-2 px-6 w-full h-full flex flex-wrap flex-col justify-evenly"
					>
						<div className="w-full">
							<div htmlFor="" className="text-gray-600 font-roboto text-xl">
								Name:
							</div>
							<input
								type="text"
								required
								name="name"
								value={name}
								onChange={(e) => onChangeHandler(e)}
								className=" h-10 bg-transparent border-b-2 text-gray-500 rounded-md border-gray-400 text-md py-1 w-full focus:outline-none"
							/>
						</div>
						<div className="w-full">
							<div htmlFor="" className="text-gray-600 font-roboto text-xl">
								Address:
							</div>
							<input
								type="text"
								required
								name="address"
								value={address}
								onChange={(e) => onChangeHandler(e)}
								className="h-10 bg-transparent border-b-2 text-gray-500 rounded-md border-gray-400 text-md py-1 w-full focus:outline-none"
							/>
						</div>
						<div className="w-full">
							<div htmlFor="" className="text-gray-600 font-roboto text-xl">
								Phone No:
							</div>
							<input
								type="text"
								required
								name="phone"
								value={phone}
								onChange={(e) => onChangeHandler(e)}
								className="h-10 bg-transparent border-b-2 text-gray-500 rounded-md border-gray-400 text-md py-1 w-full focus:outline-none"
							/>
						</div>
						<div className="w-full">
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
						<div className="w-full">
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
									Register
								</button>
							</div>
							<div className="w-full mt-2 text-gray-600">
								<Link to="/login" className="text-cyan-600">
									Login
								</Link>{" "}
								with your existing account
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Registration;

//
