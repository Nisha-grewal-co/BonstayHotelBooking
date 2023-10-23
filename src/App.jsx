import "./App.css";
import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import AddReview from "./Components/AddReview";
import BookARooom from "./Components/BookARoom";
import GetBookings from "./Components/GetBookings";
import Hotels from "./Components/Hotels";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import RescheduleBooking from "./Components/RescheduleBooking";
import ShowReview from "./Components/ShowReview";

import { Route, Routes } from "react-router-dom";

export const AppContext = React.createContext();

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState({});
	const [hotels, setHotels] = useState({});

	// useEffect(() => {
	// 	const currentUser = localStorage.getItem("user");
	// 	if (currentUser) {
	// 		setIsLoggedIn(true);
	// 	}
	// }, []);

	return (
		<>
			<AppContext.Provider
				value={{ isLoggedIn, setIsLoggedIn, user, setUser, hotels, setHotels }}
			>
				<div className="text-2xl app h-[100vh] w-[100vw]">
					<div className="h-[13%]">
						<Navbar />
					</div>

					<Routes>
						<Route path="/home" element={isLoggedIn ? <Home /> : <Login />} />
						<Route
							path="/addReview/:name"
							element={isLoggedIn ? <AddReview /> : <Login />}
						/>
						<Route
							path="/bookARoom/:name"
							element={isLoggedIn ? <BookARooom /> : <Login />}
						/>
						<Route
							path="/bookings"
							element={isLoggedIn ? <GetBookings /> : <Login />}
						/>
						<Route
							path="/reschedule/:id"
							element={isLoggedIn ? <RescheduleBooking /> : <Login />}
						/>
						<Route
							path="/reviews/:name"
							element={isLoggedIn ? <ShowReview /> : <Login />}
						/>
						<Route
							path="/hotels"
							element={isLoggedIn ? <Hotels /> : <Login />}
						/>
						<Route path="/" element={isLoggedIn ? <Home /> : <Login />} />
						<Route path="/registration" element={<Registration />} />
						<Route path="/login" element={<Login />} />
						<Route path="*" element={<Login />} />
					</Routes>
				</div>
			</AppContext.Provider>
		</>
	);
}

export default App;
