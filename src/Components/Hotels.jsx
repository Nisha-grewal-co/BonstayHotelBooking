import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const Hotels = () => {
	const { hotels, setHotels } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.get("http://localhost:5000/hotels")
			.then((res) => {
				setHotels(res.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err.message);
			});
		console.log("inside");
	}, []);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className="h-[87%] flex justify-center">
			<div className="w-[80%] h-[90%] scroll-auto rounded-lg flex justify-center flex-grow-0 overflow-y-auto no-scrollbar">
				<div className="text-3xl align-middle w-[80%] h-fit text-center flex flex-wrap items-center">
					{hotels.map((hotel, index) => (
						<div
							key={index}
							className="text-md bg-gradient-to-r from-orange-50 to-orange-200 w-full h-fit my-4 flex rounded-lg py-4 px-5"
						>
							<div className="w-[20%]">
								<img
									src={hotel.imageUrl}
									alt=""
									className="w-full h-full rounded-full border-2 border-orange-400 shadow-2xl"
								/>
							</div>
							<div className="w-[55%] py-1 px-2 text-left">
								<div className="text-md font-poppins text-orange-500">
									{hotel.hotelName}
								</div>
								<div className="text-sm font-poppins text-gray-600">
									City: {hotel.city}
								</div>
								<div className="text-sm font-poppins text-gray-600">
									Amenities: {hotel.amenities}
								</div>
								<div className="text-sm font-poppins text-gray-600 pb-3">
									Contact No.: {hotel.phoneNo}
								</div>
							</div>
							<div className="w-[25%] px-3 flex flex-wrap justify-between">
								<Link
									to={`/bookARoom/${hotel.hotelName}`}
									className="text-sm font-poppins w-full flex items-center justify-center bg-orange-400 rounded-sm my-1 text-gray-600"
								>
									<button className="">Book A Room</button>
								</Link>
								<Link
									to={`/addReview/${hotel.hotelName}`}
									className="text-sm font-poppins w-full flex items-center justify-center bg-orange-400 rounded-sm my-1 text-gray-600"
								>
									<button className="">Add A Review</button>
								</Link>
								<Link
									to={`/reviews/${hotel.hotelName}`}
									className="text-sm font-poppins w-full flex items-center justify-center bg-orange-400 rounded-sm my-1 text-gray-600"
								>
									<button className="">View Reviews</button>
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Hotels;
