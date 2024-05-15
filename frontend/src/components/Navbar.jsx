// import { a } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";


 const Navbar = () => {
  const {isLoggedIn} =useAuth()
  return (
    <>
      <header>
        <div className="container">
          {/* <div className="logo-brand">
            <a href="/"></a>
          </div> */}

          <nav>
            <ul>
            <li>
                <a href="/"> ShahCoders </a>
              </li>
              <li>
                <a href="/"> Home </a>
              </li>
              <li>
                <a href="/about"> About </a>
              </li>
              <li>
                <a href="/service"> Services </a>
              </li>
              <li>
                <a href="/contact"> Contact </a>
              </li>
              {
                isLoggedIn ? (<li>
                  <a href="/logout"> Logout </a>
                </li>):(<>
                  <li>
                <a href="/register"> Register </a>
              </li>
              <li>
                <a href="/login"> Login </a>
              </li>
                </>)
              }
              
              
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar