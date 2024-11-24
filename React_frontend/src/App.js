import { Route,Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Tasks from "./pages/tasks";

function App() {
  return (
    <Routes >
      <Route path="/" element={<Tasks/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;