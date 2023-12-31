import {createContext, useState, useEffect} from "react";
// import {createBrowserHistory} from 'history'
// import { Redirect } from "react-router-dom";
// import {useHistory} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const swal = require('sweetalert2')

const AuthContext = createContext();


export default AuthContext;

export const AuthProvider = ({ children }) => {

  // const history = useHistory()
  // const history = createBrowserHistory();

  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );

  const [loading, setLoading] = useState(true);

  const loginUser = async (username, password, onSuccess) => {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (response.status === 200) {
      console.log("Logged In");
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      // history.push("/dashboard"); // Remove this line
      onSuccess(); // Call the callback function for successful login
      swal.fire({
        title: "Login Successful",
        icon: "success",
        toast: true,
        timer: 4001,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      console.log(response.status);
      console.log("there was a server issue");
      swal.fire({
        title: "Error While Logging In",
        html: "Incorrect Username or Password",
        icon: "error",
        toast: true,
        timer: 5001,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const registerUser = async (username, first_name, last_name, email, password, password2, onSuccess) => {
    // let passlength = document.getElementById('passlength')
    // let entirelynumeric = document.getElementById('entirelynumeric')
    // let toocommon = document.getElementById('toocommon')
    // let personalinfo = document.getElementById('personalinfo')

    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username, first_name, last_name, email, password, password2
      }),
    });

    if (response.status === 201) {
      onSuccess(); // Call the callback function for successful registration
      swal.fire({
        title: "Registration Successful, Login Now",
        icon: "success",
        toast: true,
        timer: 4001,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      })
    } else {
      console.log(response.status);
      console.log("There was a server issue");
      swal.fire({
        title: "An Error Occured While Registering",
        html: "Possible Causes:<br>- That username already exists<br>- Server Error",
        icon: "error",
        toast: true,
        timer: 5001,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    
    swal.fire({
      title: "You have been logged out...",
      icon: "success",
      toast: true,
      timer: 4001,
      position: 'top-right',
      timerProgressBar: true,
      showConfirmButton: false,
    });
    // history.push("/login"); // it shows in url but doesn't navigate
    document.location.reload()
  };

  const isAuthenticated = () => {
    return !!authTokens
  }

  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
    isAuthenticated,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
