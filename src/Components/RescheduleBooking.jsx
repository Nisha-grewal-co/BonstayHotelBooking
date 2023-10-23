import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const RescheduleBooking = () => {
	const { id } = useParams();
	const [sDate, setSDate] = useState("");
	const [eDate, setEDate] = useState("");
	const [booking, setBooking] = useState({});
	const navigate = useNavigate();
	var isValid = true;

	console.log(id);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/bookings/${id}`)
			.then((res) => {
				setBooking(res.data);
			})
			.catch((e) => {
				console.log(e.message);
			});
	}, [id]);

	const onChangeHandler = (e) => {
		if (e.target.name == "sDate") {
			setSDate(e.target.value);
		}
		if (e.target.name == "eDate") {
			setEDate(e.target.value);
		}
	};

	const frmSubmit = (e) => {
		e.preventDefault();
		console.log(sDate);
		console.log(eDate);

		if (new Date(sDate) < new Date()) {
			toast.error("Start Date should be in the future!");
			isValid = false;
		} else if (new Date(eDate) < new Date(sDate)) {
			toast.error("End Date should be after start date!");
			isValid = false;
		}

		if (isValid) {
			console.log(booking);
			axios
				.put(`http://localhost:5000/bookings/${id}`, {
					...booking,
					startDate: sDate,
					endDate: eDate,
				})
				.then((res) => {
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

						<div className="w-full h-[10%] text-gray-600 sticky bottom-0">
							<button
								className="text-white px-4 py-1 w-full mb-5 rounded-lg bg-gradient-to-r from-violet-300 to-violet-700 border-2 border-violet-400 align-middle"
								type="submit"
							>
								Reschedule Room
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RescheduleBooking;

// Magesh.Babu@Infosys.com
// 9487237666
