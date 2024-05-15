import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import "../App.css"
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';
const AdminUpdate = () => {
  const navigate=useNavigate()
  const { authorization } = useAuth();

const params=useParams();  
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });
  // const[userData,setUserData]=useState(true)

  // lets tackle our handleInput
  const handleInput = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };
  const getUserById=async()=>{
    try {
      const response = await fetch(`http://localhost:5000/admin/users/${params.id}`, {
        method: "GET",
        headers: {
          Authorization: authorization,
        },
      });
      const user=await response.json();
      console.log("data up",user.user);
      setData(user.user)
      // if(response.ok){
          
      //   }
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response=await fetch(`http://localhost:5000/admin/users/update/${params.id}`,{
        method: "PATCH",
        headers: {
          "Content-Type":"Application/json",
          Authorization: authorization,
        },
        body:JSON.stringify(data),
      });
      if(response.ok){
        toast.success("user updated sucessfully")
        navigate("/admin/users")
      }
      else{
        toast.error("user not updated")
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    getUserById()
  },[])

return (
  <>
  <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Update User Details</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">
         
    <section className="section-form">
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="username"
          id="username"
          autoComplete="off"
          value={data.username}
          onChange={handleInput}
          required
        />
      </div>

      <div>
        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="off"
          value={data.email}
          onChange={handleInput}
          required
        />
      </div>

      <div>
        <label htmlFor="phone">phone</label>
        <input
          type='number'
          name="phone"
          id="phone"
          autoComplete="off"
          value={data.phone}
          onChange={handleInput}
          required
        ></input>
      </div>

      <div>
        <button type="submit">Update</button>
      </div>
    </form>
  </section>
  </div>

        
      </section>
      </>


  )
}

export default AdminUpdate
