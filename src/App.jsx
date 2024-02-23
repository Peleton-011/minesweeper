import { useState } from "react";
import Board from "./components/Board";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Board
				board={[
					[0, 0, 0],
					[0, 0, 0],
					[0, 0, 0],
				]}
			/>
		</>
	);
}

export default App;
