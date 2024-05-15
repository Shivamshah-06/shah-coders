import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import "../App.css";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";



const AdminUsers = () => {
  const { authorization } = useAuth();
  const [userData, setUserData] = useState([]);
  const getAllUsers = async (req, res) => {
    try {
      const response = await fetch("http://localhost:5000/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorization,
        },
      });
      // console.log(response);
      const data = await response.json();
      setUserData(data);
      // console.log(userData);
    } catch (error) {
      console.log(error);
    }
  };
  
  const deleteUser=async(id)=>{
    try {
      const response = await fetch(`http://localhost:5000/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorization,
        },
      });
      toast.success("user deleted sucessfull")
      if(response.ok){
          getAllUsers();
        }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <section className="admin-users-section">
        <div className="container">
          <h1 style={{alignItems:"center" ,textAlign:"center" ,textDecorationLine:"underline", color:"#646cff"}}>Admin User Data</h1>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {userData?.map((curUser, index) => {
                return <tr key={index}>
                  <td>{curUser.username}</td>
                  <td>{curUser.email}</td>
                  <td>{curUser.phone}</td>
                  <td ><Link to={`${curUser._id}/edit`}><FaEdit/></Link></td>
                  <td><button className="button delete" onClick={()=>deleteUser(curUser._id)}><RiDeleteBin5Fill/></button></td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminUsers;
