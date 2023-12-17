import Root from "./routes/root";
import { RouterProvider, createBrowserRouter, Link } from "react-router-dom";

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
      {
        path: "todos",
        lazy: () => import("./routes/todos"),
      },
      {
        path: "traffic-light",
        lazy: () => import("./routes/traffic_light"),
      },
      {
        path: "infinite-scroll",
        lazy: () => import("./routes/infinite_scroll"),
      },
      {
        path: "contacts",
        async lazy() {
          let { Layout } = await import("./routes/contacts");
          return { Component: Layout };
        },
        children: [
          {
            index: true,
            async lazy() {
              let { Index } = await import("./routes/contacts");
              return { Component: Index };
            },
          },
          {
            path: ":contactId",
            async lazy() {
              let { ViewContact } = await import("./routes/contacts");
              return {
                Component: ViewContact,
              };
            },
          },
          {
            path: ":contactId/edit",
            async lazy() {
              let { EditContact } = await import("./routes/contacts");
              return {
                Component: EditContact,
              };
            },
          },
          {
            path: ":contactId/destroy",
            async lazy() {
              let { DestroyContact } = await import("./routes/contacts");
              return {
                Component: DestroyContact,
              };
            },
          },
        ],
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
    <div className="flex  flex-col items-center gap-4 p-4 text-lg">
      <h2 className="text-orange-500">Nothing to see here!</h2>
      <p>
        <Link to="/" className="text-3xl text-blue-400">
          Back to Home Page
        </Link>
      </p>
    </div>
  );
}

function Home() {
  return (
    <div className="flex justify-center text-3xl text-green-500">
      <h2>Home</h2>
    </div>
  );
}
