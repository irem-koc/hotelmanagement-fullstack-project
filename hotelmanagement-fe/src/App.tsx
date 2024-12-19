import { useRoutes } from "react-router";
import "./App.css";
import routes from "./routes/routes";

function App() {
  const element = useRoutes(routes);
  return element;
}

export default App;
