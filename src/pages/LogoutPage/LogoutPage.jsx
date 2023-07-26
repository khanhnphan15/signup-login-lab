import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../utils/userService";

export default function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Call the logout function to clear the user's authentication token and data
    userService.logout();

    // Redirect the user to the homepage after logout
    navigate("/");
  }, [navigate]);

  return (
    <div>
      <h1>Logging Out...</h1>
      {/* You can add a loading spinner or other visual cues here if needed */}
    </div>
  );
}
