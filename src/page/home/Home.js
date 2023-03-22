import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function Home() {
	const notify = () => toast.success("done");

	const navigate = useNavigate();

	const [data, setData] = useState({
		Date: new Date().toString(),
		Name: "",
		Enrollment: "",
		Status: "",
	});

	const handleChange = (e) =>
		setData({ ...data, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		// e.preventDefault();

		try {
			const result = await axios.post(
				"https://attendence-site-server.onrender.com/api/post",
				{
					data,
				}
			);
			console.log("getting data s", data);
			if (result.ok) {
				navigate("/", { replace: true });
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			// name='home'
			className='w-full h-screen bg-gradient-to-b from-black to-gray-800 p-4 text-white pt-14'>
			<div className=' shadow-lg md: shadow-yellow-800 rounded-2xl flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full'>
				<div className='border rounded-md'>
					<div className='pb-20 '>
						<p className='text-4xl text-cyan-500 font-bold flex justify-center items-center  '>
							Attendence
						</p>
					</div>
					<div className=' flex justify-center items-center '>
						<form
							onSubmit={handleSubmit}
							className=' flex flex-col w-full md:w-1/2'>
							<input
								required='1'
								type='text'
								name='Name'
								placeholder='Enter your name'
								value={data.Name}
								onChange={handleChange}
								className='my-4 p-3 bg-transparent border-2 rounded-md text-white focus:outline-none'
							/>
							<input
								required='1'
								type='text'
								name='Enrollment'
								placeholder='Enter your Enrollment no.'
								value={data.Enrollment}
								onChange={handleChange}
								className='my-4 p-3 bg-transparent border-2 rounded-md text-white focus:outline-none'
							/>
							<input
								required='1'
								type='text'
								name='Status'
								placeholder='Present/Absent'
								value={data.Status}
								onChange={handleChange}
								className='my-4 p-3 bg-transparent border-2 rounded-md text-white focus:outline-none'
							/>

							<button
								onClick={notify}
								className='text-white bg-gradient-to-b from-cyan-500 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-full shadow-md shadow-black hover:scale-110 duration-300'>
								Submit
							</button>
							<Toaster
								toastOptions={{
									className: "",
									style: {
										border: "1px solid #713200",
										padding: "4px",
									},
								}}
							/>
						</form>
					</div>
				</div>
				<div className='flex flex-row mt-20'>
					<button className='text-white text-lg font-bold border bg-gradient-to-b from-cyan-500 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-full shadow-md shadow-black hover:scale-110 duration-300'>
						<Link to='/sheet'>Edit Sheet</Link>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Home;
