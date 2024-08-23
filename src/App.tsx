import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { UserProvider } from "./contexts/user-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";

function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
