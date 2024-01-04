import { Route, Router, Routes } from "react-router-dom"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Signin from "./pages/Signin"
import SignUp from "./pages/Signup"
import Home from "./pages/Home"
import Header from "./components/Header"
import ProtectedRoute from "./components/ProtectedRoute"
import CreateListing from "./pages/CreateListing"
import UpdateListing from './pages/UpdateListing'
import LIsting from "./pages/LIsting"


function App() {

  return (
    <div >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:listingId" element={<LIsting />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/update-listing/:listingId" element={<UpdateListing />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
