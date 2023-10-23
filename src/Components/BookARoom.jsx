import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AppContext } from "../App";

const BookARoom = () => {
	const { name } = useParams();
	const [sDate, setSDate] = useState("");
	const [eDate, setEDate] = useState("");
	const [noOfPerson, setNoOfPerson] = useState(0);
	const [noOfRoom, setNoOfRoom] = useState(0);
	const [roomType, setRoomType] = useState("");
	const { user, hotels } = useContext(AppContext);
	const navigate = useNavigate();
	var isValid = true;

	const onChangeHandler = (e) => {
		if (e.target.name == "sDate") {
			setSDate(e.target.value);
		}
		if (e.target.name == "eDate") {
			setEDate(e.target.value);
		}
		if (e.target.name == "noOfPerson") {
			setNoOfPerson(e.target.value);
		}
		if (e.target.name == "noOfRoom") {
			setNoOfRoom(e.target.value);
		}
		if (e.target.name == "roomType") {
			setRoomType(e.target.value);
		}
	};

	const frmSubmit = (e) => {
		e.preventDefault();

		if (new Date(sDate) < new Date()) {
			toast.error("Start Date should be in the future!");
			isValid = false;
		} else if (new Date(eDate) < new Date(sDate)) {
			toast.error("End Date should be after start date!");
			isValid = false;
		} else if (noOfPerson < 0 || noOfPerson > 5) {
			toast.error("No. Of Persons should be between 0 and 5");
			isValid = false;
		} else if (noOfRoom < 0 || noOfRoom > 3) {
			toast.error("No. Of Rooms should be between 0 and 3");
			isValid = false;
		} else if (roomType === "Please choose one option") {
			toast.error("Please select an option!");
			isValid = false;
		}

		if (isValid) {
			console.log(hotels);
			console.log(name);
			const hotel = hotels.filter((hotel) => hotel.hotelName == name)[0];

			axios
				.post("http://localhost:5000/bookings", {
					startDate: sDate,
					endDate: eDate,
					noOfPersons: noOfPerson,
					noOfRooms: noOfRoom,
					typeOfRoom: roomType,
					hotelName: name,
					hotelId: hotel.id,
					userId: user.id,
				})
				.then(() => {
					toast.success("Room booked successfull!", {
						position: "top-center",
						onClose: () => {
							navigate("/bookings");
						},
					});
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	};

	return (
		<div className="h-[87%] flex justify-center items-center">
			<ToastContainer />
			<div className="w-[35%] h-[90%] border-4 border-orange-200 rounded-lg -translate-y-5 bg-gradient-to-br from-orange-100 to-orange-200 flex justify-center">
				<div className="h-full w-full relative flex flex-wrap">
					<div className="py-8 h-[20%] w-full font-dancingScript text-5xl text-gray-600 text-center">
						Book A Room
					</div>
					<form
						action="#"
						onSubmit={(e) => frmSubmit(e)}
						className="py-2 h-[70%] px-6 w-full flex flex-wrap justify-start overflow-y-auto no-scrollbar"
					>
						<div className="w-full mb-4">
							<div htmlFor="" className="text-gray-600 font-roboto text-xl">
								Start Date
							</div>
							<input
								type="date"
								required
								name="sDate"
								value={sDate}
								onChange={(e) => onChangeHandler(e)}
								className="h-10 bg-transparent border-b-2 text-gray-500 rounded-md border-gray-400 text-md py-1 w-full focus:outline-none"
							/>
						</div>
						<div className="w-full mb-4">
							<div htmlFor="" className="text-gray-600 font-roboto text-xl">
								End Date
							</div>
							<input
								type="date"
								required
								name="eDate"
								value={eDate}
								onChange={(e) => onChangeHandler(e)}
								className="h-10 bg-transparent border-b-2 text-gray-500 rounded-md border-gray-400 py-1 w-full focus:outline-none"
							/>
						</div>
						<div className="w-full mb-4">
							<div htmlFor="" className="text-gray-600 font-roboto text-xl">
								No. Of Person
							</div>
							<input
								type="text"
								required
								name="noOfPerson"
								value={noOfPerson}
								onChange={(e) => onChangeHandler(e)}
								className="h-10 bg-transparent border-b-2 text-gray-500 rounded-md border-gray-400 py-1 w-full focus:outline-none"
							/>
						</div>
						<div className="w-full mb-4">
							<div htmlFor="" className="text-gray-600 font-roboto text-xl">
								No. Of Rooms
							</div>
							<input
								type="text"
								required
								name="noOfRoom"
								value={noOfRoom}
								onChange={(e) => onChangeHandler(e)}
								className="h-10 bg-transparent border-b-2 text-gray-500 rounded-md border-gray-400 py-1 w-full focus:outline-none"
							/>
						</div>
						<div className="w-full mb-4">
							<div htmlFor="" className="text-gray-600 font-roboto text-xl">
								Type of Room
							</div>
							<select
								onChange={onChangeHandler}
								className="h-10 bg-transparent border-b-2 text-gray-500 rounded-md border-gray-400 py-1 w-full focus:outline-none"
								required
								name="roomType"
								value={roomType}
							>
								<option>Please choose one option</option>
								<option>AC</option>
								<option>Non-AC</option>
							</select>
						</div>
						<div className="w-full h-[10%] text-gray-600 sticky bottom-0">
							<button
								className="border-2 text-white bg-gradient-to-tr from-cyan-200 px-4 py-1 w-full mb-5 rounded-lg to-cyan-300 align-middle"
								type="submit"
							>
								Book Room
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default BookARoom;

// Magesh.Babu@Infosys.com
// 9487237666
