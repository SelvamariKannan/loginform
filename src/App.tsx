import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import Program from "./components/Program";

function App() {

  return (
    <Router>
      <div>
        {/* Removed Background component */}
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/program" element={<Program />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
