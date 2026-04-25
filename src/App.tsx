import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedPage from "./pages/ProtectedPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedPage isAuthenticated={true} />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
