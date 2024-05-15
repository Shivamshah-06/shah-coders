import { NavLink, Navigate, Outlet } from "react-router-dom"
import { FaHome } from "react-icons/fa";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { BsPersonWorkspace } from "react-icons/bs";
import "../../App.css"
import { useAuth } from "../../store/auth";
export const AdminLayout=()=>{
  const {user,isLoading} =useAuth();
  if(isLoading){
    return <h1>Loading....</h1>
  }
  if(!user.isAdmin){
    return <Navigate to="/"/>;
  }
  return (
    <>
    <header>
      <div className="container">
        <nav>
          <ul>
            <li><NavLink to="/admin/users"><FaUserTie/>users</NavLink></li>
            <li><NavLink to="/admin/contacts"><MdOutlineConnectWithoutContact/>contacts</NavLink></li>
            <li><NavLink to="/admin/services"><BsPersonWorkspace/>services</NavLink></li>
            <li><NavLink to="/"><FaHome />Home</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
    <Outlet/>
    </>
  )
}