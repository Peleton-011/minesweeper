import SelectorPage from "@/components/SelectorPage";
import GamePage from "@/components/GamePage";
import TestPage from "@/components/TestPage.tsx";
import LeaderBoardPage from "@/components/LeaderBoard/LeaderBoardPage";
import SignUpPage from "@/components/Auth/SignUpPage.jsx";
import SignInPage from "@/components/Auth/SignInPage.jsx";
import SettingsPage from "@/components/Settings/SettingsPage";
import ProfilePage from "@/components/Profile/ProfilePage";
import ShopPage from "@/components/Shop/ShopPage";
import StylesPage from "@/components/Styles/StylesPage.jsx";
// import { enable as enableDarkMode } from "darkreader";
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	createHashRouter,
} from "react-router-dom";
import { bigSizeDifficulty } from "./utils/difficulties.ts";
import { getCellSize } from "./utils/scaling";
import useDeviceType from "@/hooks/useDeviceType";
import { useUser } from "./context/SupabaseContext.jsx";

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
			<Route path="/signup" element={<SignUpPage />} />
			<Route path="/login" element={<SignInPage />} />
			<Route path="/settings" element={<SettingsPage />} />
			<Route path="/profile" element={<ProfilePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/styles" element={<StylesPage />} />
		</>
	)
);

function App({ routes }) {
	// useEffect(() => {
	// 	enableDarkMode({
	// 		brightness: 100,
	// 		contrast: 100,
	// 	});
	// }, []);

	const deviceType = useDeviceType();

	useUser().then((user) => console.log(user));

	if (deviceType === "mobile") {
		// Calculate right size for the board
		const cellSize = getCellSize(
			bigSizeDifficulty.width,
			bigSizeDifficulty.height
		);

		root.style.setProperty("--cell-size", `${cellSize}px`);
		root.style.setProperty("--cell-text-size", `${cellSize * 0.8}px`);
	}

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
