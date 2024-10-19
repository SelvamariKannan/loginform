import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import Program from "./components/Program";
import CreateProgram from "./components/CreateProgram";
import EditProgram from "./components/EditProgram"; // Import the EditProgram component

function App() {
  return (
    <Router>
      <div>
        {/* Removed Background component */}
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/program" element={<Program />} />
          <Route path="/create-program" element={<CreateProgram />} />
          <Route path="/edit-program/:id" element={<EditProgram />} /> {/* Add the EditProgram route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
