import React from 'react'
import { GoogleLogout } from 'react-google-login'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export const LogoutGoogle = () => {
  const cookies = new Cookies();
    let navigate = useNavigate();
    const clientId="664754626894-llp569b8q2er9gq0b11ib1j50529evju.apps.googleusercontent.com"
    const onSuccess = () => {
        console.log("Log out successfully")
        cookies.remove("id", { path: '/' })
        cookies.remove("email", { path: '/' })
        cookies.remove("rol", { path: '/' })
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
