import Game from "./components/Game";
import "./App.css";

function App() {
	const config = {
		height: 16,
		width: 30,
		mineCount: 99,
		lives: 3,
	};
	return (
		<div className="App">
			<Game config={config} />
		</div>
	);
}

export default App;
