import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register_login";
import Home from "./pages/Home";
import PrivateRoutes from "./privateRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/Home"
            element={
              <PrivateRoutes >
                <Home />
              </PrivateRoutes>
            }
          />
          <Route path="/" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
