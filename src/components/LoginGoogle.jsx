import React from 'react'
import GoogleLogin from 'react-google-login';

export const LoginGoogle = () => {
const clientId="664754626894-llp569b8q2er9gq0b11ib1j50529evju.apps.googleusercontent.com"
const onSuccess = (res) =>{
    console.log("Logeado correctamente", res);
    }
    const onFailure = (res) =>{
    console.log("No se ha podido logear", res);
    }
  return (
    <div id='signInButton'>
        <GoogleLogin
        clientId={clientId}
        buttonText="Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn
        />
    </div>
  )
}
