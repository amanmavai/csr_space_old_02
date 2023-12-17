import { RouterProvider, createBrowserRouter, Link } from "react-router-dom";
import Root from "./routes/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "hooks-flow",
        lazy: () => import("./routes/hooks_flow"),
      },
    ],
  },

  {
    path: "*",
    element: <NoMatch />,
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

export default App;

function NoMatch() {
  return (
    <div className="text-lg p-4 flex flex-col gap-4 items-center">
      <h2 className="text-orange-500">Nothing to see here!</h2>
      <p>
        <Link to="/" className="text-blue-400 text-3xl">
          Back to Home Page
        </Link>
      </p>
    </div>
  );
}

function Home() {
  return (
    <div className="justify-center flex text-3xl text-green-500">
      <h2>Home</h2>
    </div>
  );
}
