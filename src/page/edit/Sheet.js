import { React, useEffect, useState } from "react";
import { ImHome } from "react-icons/im";
import { MdClear } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";

function Sheet() {
	const [fdata, setData] = useState();
	 var last ; //for Clearall button
	 var first = 0; //starting point for clearall

	const getData = async () => {
		try {
			let res = await fetch("http://localhost:4200/api/get", {});
			const fdata = await res.json();

			setData(fdata);
			// console.log("fdata",fdata);
		} catch (error) {
			console.log(error);
		}
	};

	last = fdata?.length;
	//console.log("result", last);

	//function for deleting data
	async function handelDelete(props) {
		var data = props;
		// const { i, len, flen } = props;
		console.log(data);

		//  setData(filteredList);
		//console.log("jkdsjkakfjk", i);

		try {
			const result = axios.post("http://localhost:4200/api/del", {
				data,
			});

			if (result.ok) {
			}
			const filteredList = fdata.filter((value) => {
				if (value.length > 0) {
					return value;
				}
				// return (item ).data !== data;
			});
			await setData(filteredList);
			// console.log("filterdata", filteredList);
			// console.log("down", fdata,fdata.length);
		} catch (error) {
			console.log("error has occured in deletion", error);
		}
		window.location.reload(false);
	}

	useEffect(() => {
		getData();
	}, [fdata]);

	return (
		<div
			// name='sheet'
			className=' w-full h-screen bg-gradient-to-b from-cyan-500 to-gray-800 p-4 text-white pt-14 pb-10'>
			<div className=' box-content relative shadow-lg bg-slate-300 md: shadow-black rounded-2xl flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full'>
				<div className='Container absolute w-full flex h-full'>
					<div className=' mx-auto flex flex-col w-11/12  h-full '>
						<p className='text-lg text-center font-bold m-5 text-black'>
							Detail in Sheet
						</p>
						<table className='border-2 text-left w-auto mr-11  flex flex-col  justify-between scroll-smooth overflow-y-auto h-auto '>
							<thead className='bg-black flex text-white w-full'>
								<tr key={Math.random()} className='flex w-full mb-4'>
									<th className='p-4 w-1/4'>Date</th>
									<th className='p-4 w-1/4'>Name</th>
									<th className='p-4 w-1/4'>Enrollment no</th>
									<th className='p-4 w-1/4'>Status</th>
									<th className='p-4 w-1/4'>edit</th>
								</tr>
							</thead>
							<tbody className=' text-black bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full '>
								{fdata?.map((item, i) => (
									<>
										{item[0] && (
											<tr key={i} className='flex w-full mb-4'>
												<td className='p-4 w-1/4'>{item[0]}</td>
												<td className='p-4 w-1/4'>{item[1]}</td>
												<td className='p-4 w-1/4'>{item[2]}</td>
												<td className='p-4 w-1/4'>{item[3]}</td>

												<td className='p-4 w-1/4 '>
													<div
														key={i}
														onClick={() => handelDelete({ i,item })}
														style={{ color: "red", cursor: "pointer" }}
														className='hover:scale-105 flex flex-row '>
														<MdClear size='1.4rem' />
														Clear
													</div>
												</td>
											</tr>
										)}
									</>
								))}
							</tbody>
						</table>
						{
							<div
								onClick={()=>handelDelete({first,last})}
								className='HeaderLeft sm:px-2 sm:py-1 cursor-pointer text-black absolute top-0 right-5 bg-gradient-to-b from-red-500 to-yellow-500 px-3 py-2 my-6 mx-auto flex items-center rounded-full shadow-md shadow-black hover:scale-110 duration-300  '>
								Clear All
							</div>
						}
						<div className='HeaderLeft hover:scale-110 duration-300  cursor-pointer sm:px-2 sm:py-1 font-medium flex flex-row text-black absolute top-0 left-0  bg-gray-300 rounded-full to-yellow-500 px-3 py-2 my-6   '>
							<Link to='/'>
								<span className='left-4 absolute ml-10 mt-1'>
									<ImHome />
								</span>{" "}
								Home
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Sheet;
