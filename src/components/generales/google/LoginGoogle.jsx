// import React, { useEffect, useState } from 'react'
// import jwt_decode from "jwt-decode"

// export const LoginGoogle = () => {
//     const [user, setUser] = useState({})


//     const handleCallbackResponse = (response) =>{
//         var userObject = jwt_decode(response.credential);
//         console.log(userObject)
//         setUser(userObject)
//         document.getElementById("signInDiv").hidden = true;
//     } 

//     const handleSignOut = (event) => {
//         setUser({});
//         document.getElementById("signInDiv").hidden = false;
//     }

//     useEffect(() => {
//         google.accounts.id.initialize({
//             client_id: "664754626894-llp569b8q2er9gq0b11ib1j50529evju.apps.googleusercontent.com",
//             callback: handleCallbackResponse
//         })
            
//         google.accounts.id.renderButton(
//             document.getElementById("signInDiv"),
//             {theme:"outline", size: "large"}
//         )
//     }, [])



//   return (
//     <div className="container">
//         <div id="signInDiv"></div>

//         { Object.keys(user).length != 0 &&
//            <button onClick={(e) => handleSignOut(e)}> Sign Out </button>
//         }

//         {user && 
//             <div> 
//                 <img src={user.picture}/>
//                 <h3>{user.name}</h3>
//             </div>
//         }
//     </div>
//   )
// }
