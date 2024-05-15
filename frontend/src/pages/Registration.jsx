import { useState } from "react";
import { useAuth } from "../store/auth";
import "../App.css"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate=useNavigate()
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const {storeTokenInLS}=useAuth();

  // handle form on submit
  const handleSubmit =async (e) => {
    e.preventDefault();
    // console.log(user);
    const response= await  fetch("http://localhost:5000/register",
  {
    method:"POST",
    headers:{
      "Content-Type":"application/json",

    },
    body:JSON.stringify(user),

  })
  const res_data=await response.json();
   console.log(res_data);
   if(response.ok){
    storeTokenInLS(res_data.token);
    setUser({username: "",
    email: "",
    phone: "",
    password: "",});
    toast.success("registeration sucessfull")
    navigate("/login");

   }
   else{
    toast.error(res_data.extraDetails ? res_data.extraDetails[0]  : res_data.message)
   }
  };



  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="https://cdn.undiksha.ac.id/wp-content/uploads/sites/27/2019/05/27145018/fitur-dan-funsi-website.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">registration form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="username"
                    />
                  </div>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Register