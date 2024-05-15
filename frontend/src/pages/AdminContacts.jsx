import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast } from 'react-toastify';

const AdminContacts = () => {
  const {authorization}=useAuth();
  const [contact,setContact]=useState([]);
  const getAllContacts=async()=>{
    
    try {
      const response=await fetch("http://localhost:5000/admin/contacts",{
      method:"GET",
      headers:{
        Authorization:authorization,  
      }

    })
    const data=await response.json();
    // console.log(data);
    setContact(data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getAllContacts();
  },[])
  const deleteUser=async(id)=>{
    try {
    const response=await fetch(`http://localhost:5000/admin/contacts/delete/${id}`,{
    method:"DELETE",
    headers:{
      Authorization:authorization,  
    }

  })
  if(response.ok){
    toast.success("contact deleted successfully");
    getAllContacts();
  }
  else{
    toast.error("contact not deleted")
  }
  } catch (error) {
    console.log(error)
  }
}
  return (
    <>
    <section className="admin-users-section">
    <div className="container">
      <h1 style={{alignItems:"center" ,textAlign:"center" ,textDecorationLine:"underline", color:"#646cff"}}>Admin Contacts Data</h1>
    </div>
    <div className="container admin-users">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {contact?.map((curUser, index) => {
            return <tr key={index}>
              <td>{curUser.username}</td>
              <td>{curUser.email}</td>
              <td>{curUser.message}</td>
              <td><button className="button delete" onClick={()=>deleteUser(curUser._id)}><RiDeleteBin5Fill/></button></td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  </section>
</>
  )
}

export default AdminContacts
