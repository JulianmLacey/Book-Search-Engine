import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import SearchBooks from "./pages/SearchBooks.jsx";
import SavedBooks from "./pages/SavedBooks.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		//errorElement: <Error />,
		children: [
			{
				index: true,
				element: <SearchBooks />,
			},
			{
				path: "/profiles/:profileId",
				element: <SavedBooks />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
