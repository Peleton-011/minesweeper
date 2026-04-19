import Game from "@/components/Game";
import GamePage from "@/components/GamePage";
import TestPage from "@/components/TestPage";
import LeaderBoardPage from "@/components/LeaderBoard/LeaderBoardPage";
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
			<Route
				path="/:width?/:height?/:mines?/:lives?/:noGuessMode?/:autoSolveMode?/:winStateCheck?/:startZone?"
				element={<Game />}
			/>
			<Route
				path="/game/:width/:height/:mines/:lives/:noGuessMode?/:autoSolveMode?/:winStateCheck?/:startZone?"
				element={<GamePage />}
			/>
			<Route path="/test" element={<TestPage />} />
			<Route
				path="/scores/:width?/:height?/:mines?/:lives?"
				element={<LeaderBoardPage />}
			/>
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
