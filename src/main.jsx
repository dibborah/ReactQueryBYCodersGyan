import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Products from "./Products.jsx";
import Product from "./Product.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

// Create a client
// const queryClient = new QueryClient();

// Setting the fetching behaviours Globally
const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            staleTime: 10000
        }
    }
})

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
  // Provide the client to your App
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
