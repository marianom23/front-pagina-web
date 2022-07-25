import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../user-redirect/UserContextProvider";

export default function useUser(){
    const {user, setUser} = useContext(userContext)
    let navigate = useNavigate  ();
    let usuario = JSON.parse(user)

    const login = () => {
        setUser(window.sessionStorage.getItem('user'))
        navigate("/redirect", { replace: true });
    }

    const logout = () => {
        setUser(null)
        sessionStorage.clear()
        localStorage.clear()
    }

    return {
        usuario,
        logout,
        login
    }
}