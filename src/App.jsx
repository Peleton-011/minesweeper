import Game from "./components/Game";
import "./App.css";

function App() {
	return (
		<div className="App">
			<Game height={3} width={3} mineCount={3} lives={3}/>
		</div>
	);
}

export default App;
