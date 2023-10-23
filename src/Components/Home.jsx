import { useContext } from "react";
import { AppContext } from "../App";

const Home = () => {
	const { user } = useContext(AppContext);
	console.log(user);

	return (
		<div className="min-h-[87%] h-fit flex justify-center items-center">
			<div className="home-img text-3xl font-dancingScript text-white align-middle w-[60%] h-[40%] border-4 border-orange-200 rounded-lg -translate-y-10 text-center flex flex-wrap items-center px-5 py-3">
				<p className="">
					BonStay always provides you an amazing and pleasant stay with your
					friends and family at reasonable prices.
				</p>
				<p className="text-white">
					We provide well-designed space with modern amenities. You can reserve
					a room faster with our efficient BonStay app.
				</p>
			</div>
		</div>
	);
};

export default Home;
