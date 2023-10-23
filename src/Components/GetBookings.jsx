import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
// import { toast } from "react-toastify";

const GetBookings = () => {
	const [bookings, setBookings] = useState([]);
	const { user } = useContext(AppContext);
	// const navigate = useNavigate();

	const fetchData = () => {
		axios
			.get(`http://localhost:5000/bookings?userId=${user.id}`)
			.then((res) => {
				setBookings(res.data);
			})
			.catch((e) => console.log(e.message));
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleDelete = (id) => {
		console.log("hello");
		axios
			.delete("http://localhost:5000/bookings/" + id)
			.then(() => {
				console.log("Delete function called");
				fetchData();
			})
			.catch((e) => console.log(e.message));
	};

	return (
		<div className="h-[87%] flex justify-center">
			<div className="w-[90%] h-[90%] scroll-auto rounded-lg flex justify-center flex-grow-0 overflow-y-auto no-scrollbar pt-4 items-start">
				<div className="text-3xl align-middle w-full h-full flex flex-wrap p-8 justify-evenly items-start">
					{bookings.map((booking, index) => {
						return (
							<div
								key={booking.id}
								className="w-fit h-fit border-2 border-gray-600 rounded-lg px-4 py-5 bg-gradient-to-br my-4 text-center from-orange-50 to-orange-200"
							>
								<div className="text-md font-poppins text-orange-500 font-semibold">
									B-00{index}
								</div>
								<div className="text-sm font-poppins text-gray-600 font-semibold gap-y-3">
									<div className="my-2">Hotel Name: {booking.hotelName}</div>
									<div className="my-2">Start Date: {booking.startDate}</div>
									<div className="my-2">End Date: {booking.endDate}</div>
									<div className="my-2">
										<span className="px-3 border-r-2 border-gray-600">
											No. Of Persons: {booking.noOfPersons}
										</span>
										<span className="px-3">
											No. Of Rooms: {booking.noOfRooms}
										</span>
									</div>
									<div className="my-2">Type Of Room: {booking.typeOfRoom}</div>
								</div>
								<Link to={`/reschedule/${booking.id}`}>
									<div className="my-5 text-base text-white font-poppins font-bold bg-gradient-to-r from-violet-300 to-violet-700 border-2 border-violet-400 rounded-md px-3 py-2">
										<button>Reschedule</button>
									</div>
								</Link>
								<div className="cursor-pointer mb-2 mt-3 text-base font-bold text-white font-poppins bg-gradient-to-r from-red-300 to-red-700 border-2 border-red-600 rounded-md px-3 py-2">
									<button
										onClick={() => {
											handleDelete(booking.id);
										}}
									>
										Cancel
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default GetBookings;
