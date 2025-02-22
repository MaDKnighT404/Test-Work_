import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import { store } from "./store";

import MainLayout from "./shared/Layouts/MainLayout";
import Loader from "./shared/components/Loader";

const AuthPage = lazy(() => import("./pages/AuthPage"));
const MainPage = lazy(() => import("./pages/MainPage"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <Suspense
            fallback={
              <div className="flex h-screen items-center justify-center">
                <Loader className="h-20 w-20 text-blue-500" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<AuthPage />} />
                <Route path="/main" element={<MainPage />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
