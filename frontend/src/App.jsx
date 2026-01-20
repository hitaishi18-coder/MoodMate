import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoute";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;