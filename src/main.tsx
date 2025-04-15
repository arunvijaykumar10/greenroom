import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import LoginScreen from "./pages/LoginScreen.tsx";

const RootComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSuccessfulLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <StrictMode>
     <App/>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<RootComponent />);