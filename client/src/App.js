import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; 
import axios from "axios";

function App() {
  return (
    <div className="App">
      <h1>Google Login</h1>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const decoded = jwtDecode(credentialResponse.credential); 
          console.log("User:", decoded);

          try {
            const res = await axios.post("http://localhost:5000/api/auth/google", {
              name: decoded.name,
              email: decoded.email,
            });

            console.log("Saved to DB:", res.data);
          } catch (err) {
            console.error("Error saving to DB", err);
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}

export default App;
