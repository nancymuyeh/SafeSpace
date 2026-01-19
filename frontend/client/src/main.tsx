import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import keycloak from "./lib/keycloak";

keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
  if (authenticated) {
    createRoot(document.getElementById("root")!).render(<App />);
  } else {
    alert("Authentication failed");
  }
});
