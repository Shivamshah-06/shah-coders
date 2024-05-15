import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user,setUser]=useState();
  const [isLoading,setIsLoading]=useState(true)
  const [service,setService]=useState([]);
  const authorization=`Bearer ${token}`
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };
  let isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };
  const userAuthentication = async () => {

    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/user", {
        method: "GET",
        headers: {
          Authorization: authorization,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("user data",data.userData)
        setUser(data.userData);
        setIsLoading(false);
      }
      else{
        console.error("Error fetching data")
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Errot fetching data");
    }
  };
  const getService = async () => {
    try {
      const response=await fetch("http://localhost:5000/service",{
      method:"GET"
    })
    if(response.ok){

      const res_data=await response.json();
      // console.log("service data",res_data.msg);
      setService(res_data.msg);
      // console.log(service)

    }
  
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getService();
    userAuthentication();
  }, []);
  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser,user ,service,authorization,isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
