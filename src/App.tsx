import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { UserProvider } from "./contexts/user-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <RouterProvider router={router} />
          <Toaster richColors />
        </UserProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
