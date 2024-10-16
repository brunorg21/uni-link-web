import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { UserProvider } from "./contexts/user-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./contexts/theme-provider";

function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <UserProvider>
            <RouterProvider router={router} />
            <Toaster richColors />
          </UserProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
