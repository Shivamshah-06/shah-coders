import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Registration from "./pages/Registration"
import Contact from "./pages/Contact"
import Services from "./pages/Services"
import Login from "./pages/Login"
import About from "./pages/About"
import Navbar from "./components/Navbar"
import Error from "./pages/Error" 
import Logout from "./pages/Logout"
import { AdminLayout } from "./components/layout/Admin-Layout"
import AdminUsers from "./pages/AdminUsers"
import AdminContacts from "./pages/AdminContacts"
import AdminUpdate from "./pages/AdminUpdate"

function App() {
  

  return (
    
    <>
    <Navbar/>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Registration/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/service" element={<Services/>}/>
      <Route path="/about" element={<About/>}/>
      
      <Route path="/logout" element={<Logout/>}/>

      <Route path="*" element={<Error/>}/>
      <Route path="/admin" element={<AdminLayout/>}>
      <Route path="users" element={<AdminUsers/>}/>
      <Route path="contacts" element={<AdminContacts/>}/>
      <Route path="users/:id/edit" element={<AdminUpdate/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
