import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Dashboard from "./Dashboard";
import TShirts from "./TShirts";
import Accounts from "./Accounts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/tshirts" element={<TShirts />}></Route>
          <Route path="/accounts" element={<Accounts />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
