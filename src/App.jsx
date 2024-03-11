import Game from "./components/Game";
import "./App.css";

function App() {
	return (
		<div className="App">
			<Game height={16} width={30} mineCount={99} lives={3}/>
		</div>
	);
}

export default App;
