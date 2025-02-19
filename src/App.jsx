import Game from "./components/Game";
import TestPage from "./components/TestPage";
import { enable as enableDarkMode } from "darkreader";
import { useEffect } from "react";
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route index element={<Game />} />
			<Route path="test" element={<TestPage />} />
		</Route>
	)
);

function App({ routes }) {
	useEffect(() => {
		enableDarkMode({
			brightness: 100,
			contrast: 100,
		});
	}, []);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
