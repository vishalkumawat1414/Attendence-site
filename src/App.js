import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sheet from "./page/edit/Sheet";
import Home from "./page/home/Home";

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/sheet' element={<Sheet />} />
			</Routes>
		</div>
	);
}

export default App;
