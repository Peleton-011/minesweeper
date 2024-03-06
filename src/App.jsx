import Game from "./components/Game";
import "./App.css";

function App() {
	return (
		<div className="App">
			<Game height={9} width={9} mineCount={18} lives={3}/>
		</div>
	);
}

export default App;
