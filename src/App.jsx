import Game from "./components/Game";
import TestPage from "./components/TestPage";
import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" >
			<Route index element={<Game />} />
			<Route path="test" element={<TestPage />} />
		</Route>
	)
);

function App({ routes }) {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
