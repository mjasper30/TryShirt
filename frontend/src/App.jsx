import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import TShirts from "./TShirts";
import Accounts from "./Accounts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/tshirts" element={<TShirts />}></Route>
          <Route path="/accounts" element={<Accounts />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
