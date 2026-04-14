import Game from "./components/Game";
import TestPage from "./components/TestPage";
import LeaderBoardPage from "./components/LeaderBoardPage";
// import { enable as enableDarkMode } from "darkreader";
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	createHashRouter,
} from "react-router-dom";

const router = createHashRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Game />} />
			<Route path="/test" element={<TestPage />} />
			<Route path="/scores/:width?/:height?/:mines?/:lives?" element={<LeaderBoardPage />} />
		</>,
	),
);

function App({ routes }) {
	// useEffect(() => {
	// 	enableDarkMode({
	// 		brightness: 100,
	// 		contrast: 100,
	// 	});
	// }, []);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
