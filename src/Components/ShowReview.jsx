import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ShowReview = () => {
	const [reviews, setReviews] = useState([]);
	const { name } = useParams();

	useEffect(() => {
		axios
			.get(`http://localhost:5000/hotels?hotelName=${name}`)
			.then((res) => {
				setReviews(res.data[0].reviews);
			})
			.catch((e) => {
				console.log(e.message);
			});
	}, []);

	return (
		<div className="h-[87%] flex justify-center">
			<div className="w-[80%] h-[90%] scroll-auto rounded-lg flex justify-center flex-grow-0 overflow-y-auto no-scrollbar">
				<div className="text-3xl align-middle w-[80%] h-fit text-center flex flex-wrap items-center justify-center">
					<div className="text-6xl w-full mb-3 font-dancingScript">
						Customer's Reviews
					</div>
					{reviews.map((review, index) => (
						<div
							key={index}
							className="text-md bg-gradient-to-r from-orange-50 to-orange-200 font-poppins text-gray-600 min-w-[70%] h-fit my-4 flex rounded-lg py-4 px-5 shadow-lg text-base"
						>
							{review}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ShowReview;
