import SelectorPage from "@/components/SelectorPage";
import GamePage from "@/components/GamePage";
import TestPage from "@/components/TestPage.tsx";
import LeaderBoardPage from "@/components/LeaderBoard/LeaderBoardPage";
import StylesPage from "./components/Styles/StylesPage";
// import { enable as enableDarkMode } from "darkreader";
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	createHashRouter,
} from "react-router-dom";
import { bigSizeDifficulty } from "./utils/difficulties.ts";
import useDeviceType from "@/hooks/useDeviceType";

const router = createHashRouter(
	createRoutesFromElements(
		<>
			<Route
				path="/:width?/:height?/:mines?/:lives?/:noGuessMode?/:autoSolveMode?/:winStateCheck?/:startZone?"
				element={<SelectorPage />}
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
            <Route path="/styles" element={<StylesPage />} />
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

    const deviceType = useDeviceType();
    
    if (deviceType === "mobile") {
        // Calculate right size for the board
        const screenWidth = window.innerWidth;
        const boardWidth = Math.min(bigSizeDifficulty.width, bigSizeDifficulty.height);

        const newSize = Math.floor((screenWidth / boardWidth) / 1.2); 
        root.style.setProperty("--cell-size", `${newSize}px`);
        root.style.setProperty("--cell-text-size", `${newSize * 0.8}px`);
    }
    

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
