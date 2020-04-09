import axios from "axios";

const getCookies = () =>{
    let pairs = document.cookie.split(";");
    let cookies = {};
    for (let i=0; i<pairs.length; i++){
      let pair = pairs[i].split("=");
      cookies[(pair[0]+'').trim()] = unescape(pair.slice(1).join('='));
    }
    return cookies;
  }
  
export const axiosWithAuth = () => {
    const token = getCookies();
  return axios.create({
    // config object
    // baseURL: process.env.FRONTEND_URL,
    headers: {
      Authorization: token.sauti_token
    }
  });
};

