import React from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';
import { useState, createContext, useEffect} from 'react';
import axios from 'axios';
import base64 from 'base-64';

export const AuthContext = createContext();

// const testUsers = {
//     Administrator: {
//       password: 'admin',
//       name: 'Administrator',
//       token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
//     },
//     Editor: {
//       password: 'editor',
//       name: 'Editor',
//       token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s'
//     },
//     Writer: {
//       password: 'writer',
//       name: 'Writer',
//       token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68'
//     },
//     User: {
//       password: 'user',
//       name: 'User',
//       token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
//     },
//   };



  const AuthContextProvider = function (props){
    let [loggedIn, setLoggedIn] = useState(false);
    let [capabilities, setCapabilities] = useState([]);
    let [error, setError] = useState(null);
    let [token, setToken] = useState();

    let signUp = async (username, password) => {
try {      let object = JSON.stringify({
        username: username,
        password: password,
        role: 'admin',
      })
      console.log(object)
      let user = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: object,
      })
      let parsedUser = user.json();
      console.log(parsedUser)
      cookie.save('auth', parsedUser);
      setLoggedIn(true)
      setCapabilities(parsedUser.capabilities)}
      catch(e){
        console.log(e)
      }
    }

    let login = async (username, password) => {
      try {
        let encodedCredentials = base64.encode(username + ':' + password)
        console.log(encodedCredentials)
        let config = {
          headers:{
            'Authorization': 'Basic ' + encodedCredentials
          }
        }
      let user = await axios.post('http://localhost:3001/signin',{}, config);
      console.log(user.data)
      cookie.save('auth', user.data.token);
      setLoggedIn(true)
      setCapabilities(user.data.user.capabilities)
      setToken(user.data.token)
      } catch(e){
        console.log(e);
            }


      }
    
      let validateToken = (token) => {
        try{
            let User = jwt_decode(token)
            console.log(User)
            setLoggedIn(true)
            setCapabilities(User.capabilities)
        } catch(e){
            setLoggedIn(false)
            setCapabilities([]);
            console.log('bad token');
        }
      }

      let logout = () => {
        setLoggedIn(false)
        setCapabilities([]);
      }

      useEffect(() => {
        // const cookieToken = cookie.load('auth');
        // validateToken(cookieToken.token);
      }, [])

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, capabilities, setCapabilities, error, setError, login, logout, signUp, token }}>
            {props.children}
        </AuthContext.Provider>
    )
  }

  export default AuthContextProvider;