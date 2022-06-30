import React from 'react'
import { GoogleLogout } from 'react-google-login'
import { useNavigate } from 'react-router-dom';
export const LogoutGoogle = () => {
    let navigate = useNavigate();
    const clientId="664754626894-llp569b8q2er9gq0b11ib1j50529evju.apps.googleusercontent.com"
    const onSuccess = () => {
        console.log("Log out successfully")
        navigate("/login", { replace: true });
    }

  return (
    <div id="signOutButton">
        <GoogleLogout
            clientId={clientId}
            buttonText={"Logout"}
            onLogoutSuccess={onSuccess}
        />
    </div>
  )
}
