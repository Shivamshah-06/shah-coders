import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
 const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // let handle the input field value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
 
  const {storeTokenInLS}=useAuth();
  const handlesubmit = async (e) => {
      
       try {
        e.preventDefault();
        const response =await fetch("http://localhost:5000/login",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(user),
      })
      console.log(response);
      const res_data=await response.json()
      console.log(res_data);
      if(response.ok){
        storeTokenInLS(res_data.token);
        setUser({username: "",
        email: "",
        phone: "",
        password: "",});
        toast.success("login sucessful")
        navigate("/")
       }
       else{
        toast.error(res_data.extraDetails ? res_data.extraDetails[0]  : res_data.message)
       }
       } catch (error) {
        console.log({message:error})
       }
  }

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="https://websitedeveloper.biz/wp-content/uploads/2023/10/small-business-website.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handlesubmit}>
                
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
                    Login
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

export default Login