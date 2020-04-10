import React from "react";
import {Route, Redirect} from "react-router-dom";

const getCookies = () =>{
    let pairs = document.cookie.split(";");
    let cookies = {};
    for (let i=0; i<pairs.length; i++){
      let pair = pairs[i].split("=");
      cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
    }
    return cookies;
  }

const PrivateRoute = ({component: Component, ...rest}) => {
    // const token = getCookies();
    return (
        <Route 
            {...rest}
            render={(...rest)=>{
                // if (token.sauti_token){
                if (localStorage.getItem("token")
                ){
                    return <Component {...rest}/>;
                }else {
                    return <Redirect to="/" />
                }
            }}
        />
    )
}
export default PrivateRoute;

