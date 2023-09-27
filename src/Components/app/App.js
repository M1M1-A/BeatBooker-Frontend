import { Routes, Route, useNavigate }from "react-router-dom";
import Login from "../auth/Login"
import SignUp from "../auth/SignUp"

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login navigate={useNavigate()}/>}/>
        <Route path='/signup' element={<SignUp navigate={useNavigate()}/>}/>
      </Routes>
    </>
  );
}

export default App;
