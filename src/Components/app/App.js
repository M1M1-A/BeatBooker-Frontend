import { Routes, Route, useNavigate }from "react-router-dom";
import Login from "../auth/Login"

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login navigate={useNavigate()}/>}/>
      </Routes>
    </>
  );
}

export default App;
