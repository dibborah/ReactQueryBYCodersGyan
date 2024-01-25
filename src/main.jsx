import ReactDOM from "react-dom/client";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App.jsx";
import Products from "./Products.jsx";
import Product from "./Product.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
const queryClient = new QueryClient();

// Setting the fetching behaviours Globally
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 10000,
//     },
//   },
// });

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/:productId",
    element: <Product />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
