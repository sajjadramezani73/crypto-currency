import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { IGlobalState } from "./redux/type";

import { setupAxios } from "./requests";
import Header from "./components/global/header";

function App() {
  setupAxios();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchInterval: false,
        refetchOnWindowFocus: false,
        retry: 2,
      },
    },
  });

  const theme = useSelector((state: IGlobalState) => state.theme);

  useEffect(() => {
    const root = document.getElementsByTagName("html")[0];
    root.setAttribute("class", theme);
  }, [theme]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <div className="p-8">
          <Outlet />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
