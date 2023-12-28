import { Route, Router, Routes } from "react-router-dom"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Signin from "./pages/Signin"
import Signout from "./pages/Signout"
import Home from "./pages/Home"


function App() {

  return (
   <div >
     <Routes>
     <Route path="/" element={<Home/>} />
     <Route path="/about" element={<About/>} />
     <Route path="/profile" element={<Profile/>} />
     <Route path="/signin" element={<Signin/>} />
     <Route path="/signout" element={<Signout/>} />
     </Routes>
   </div>
  )
}

export default App
