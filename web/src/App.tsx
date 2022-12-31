import { BrowserRouter } from "react-router-dom";
import { RandomUserProvider } from "./context/RandomUserContext";
import { Router } from "./Router";

export function App() {
  return (
    <BrowserRouter>
      <RandomUserProvider>
        <Router />
      </RandomUserProvider>
    </BrowserRouter>
  );
}
