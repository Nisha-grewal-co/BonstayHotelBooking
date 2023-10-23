import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AppContext } from "../App";

const AddReview = () => {
	const [review, setReview] = useState("");
	const { hotels } = useContext(AppContext);
	const { name } = useParams();
	const navigate = useNavigate();

	const frmSubmit = (e) => {
		e.preventDefault();
		console.log(name);
		const hotel = hotels.filter((a) => a.hotelName == name)[0];

		console.log(hotel);

		const reviews = [...hotel.reviews, review];

		axios
			.put(`http://localhost:5000/hotels/${hotel.id}`, {
				...hotel,
				reviews: reviews,
			})
			.then((e) => {
				toast("Review Added Successfully!");
				navigate(`/reviews/${name}`);
			})
			.catch((e) => {
				console.log(e.message);
			});
	};

	const onChangeHandler = (e) => {
		setReview(e.target.value);
	};

	return (
		<div className="h-[87%] flex justify-center items-center">
			<ToastContainer />
			<div className="w-[35%] h-[90%] border-4 border-orange-200 rounded-lg -translate-y-5 bg-gradient-to-br from-orange-100 to-orange-200 flex justify-center">
				<div className="h-full ">
					<div className="py-8 mb-6 font-dancingScript text-5xl text-gray-600 text-center">
						Your Review Means a Lot for Us
					</div>
					<form
						action="#"
						onSubmit={(e) => frmSubmit(e)}
						className="py-2 px-6 w-full flex flex-wrap flex-col justify-start"
					>
						<div className="w-full mb-6">
							<div
								htmlFor=""
								className="text-gray-600  mb-4 font-poppins font-bold text-xl"
							>
								Add Your Review:
							</div>
							<textarea
								required
								name="email"
								value={review}
								rows="4"
								onChange={(e) => onChangeHandler(e)}
								className="bg-transparent resize-none border-2 text-gray-700 rounded-md border-gray-400 text-sm px-3 py-2 w-full font-poppins focus:outline-none"
							></textarea>
						</div>
						<div className=" float-right text-gray-600 my-2">
							<button
								className="border-2 text-white bg-gradient-to-tr from-cyan-200 px-4 py-1 w-full rounded-lg to-cyan-300 align-middle"
								type="submit"
							>
								Add Review
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddReview;

// var b = {
// 	a:1,
// 	a:2
// }

// b.a
