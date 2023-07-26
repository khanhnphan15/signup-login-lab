import { Route, Routes, Navigate, Link } from "react-router-dom";
import { findDOMNode } from 'react-dom';
import "./App.css";
import { useState } from 'react'
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";
import LogoutPage from "./pages/LogoutPage/LogoutPage"; // Import the LogoutPage component
import userService from "./utils/userService";

// ANY Component rendered by a ROUTE, goes in the pages folder!
// Client side routing, Just for showing or hiding components based on the address
// in the url
function App() {

  // this will the get token from localstorage and decode it when the page loads up 
  // and set it as our initial state
  // if there is a token, user will be the user object, if there is not token user will null
  const [user, setUser] = useState(userService.getUser());

  // Logout function to clear user authentication
  const handleLogout = () => {
    userService.logout();
    setUser(null);
  };
  // update our state everytime someones signs up or logs in, (in handleSubmit of LoginPage and SignupPage)
  // so we want to make sure we get the most recent token being made
  function handleSignUpOrLogin() {
    setUser(userService.getUser())
  }


  if (!user) {
    // if the user is not logged in only render the following routes
    return (
      <Routes>
        <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
        <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
        <Route path="/logout" element={<LogoutPage />} /> {/* Add this route */}
        <Route path="/*" element={<Navigate to='/login' />} />
      </Routes>
    )

  }

  // If the user is logged in render the following routes

  return (
    <div>
      {/* Render logout link if the user is logged in */}
      {user && (
        <Link to="/signup" onClick={handleLogout}>
          Logout
        </Link>
      )}
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
        <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
        <Route path="/logout" element={<LogoutPage />} /> {/* Add this route */}
      </Routes>
    </div>

  );
}

export default App;
