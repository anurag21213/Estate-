import { Route, Router, Routes } from "react-router-dom"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Signin from "./pages/Signin"
import Signout from "./pages/Signout"
import Home from "./pages/Home"
import Header from "./components/Header"


function App() {

  return (
    <div >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signout />} />
      </Routes>
    </div>
  )
}

export default App
