import React from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';
import { useState, createContext, useEffect} from 'react';

export const AuthContext = createContext();

const testUsers = {
    Administrator: {
      password: 'admin',
      name: 'Administrator',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
    },
    Editor: {
      password: 'editor',
      name: 'Editor',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s'
    },
    Writer: {
      password: 'writer',
      name: 'Writer',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68'
    },
    User: {
      password: 'user',
      name: 'User',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
    },
  };



  const AuthContextProvider = function (props){
    let [loggedIn, setLoggedIn] = useState(false);
    let [capabilities, setCapabilities] = useState([]);
    let [error, setError] = useState(null);
    let login = (username, password) => {
        const User = testUsers[username];

        if(User.password === password){
            cookie.save('auth', User);
            setLoggedIn(true)
            setCapabilities(jwt_decode(User.token).capabilities)
        } else {
            setLoggedIn(false)
            setCapabilities([]);
            setError('bad creds');
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
        const cookieToken = cookie.load('auth');
        validateToken(cookieToken.token);
      }, [])

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, capabilities, setCapabilities, error, setError, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
  }

  export default AuthContextProvider;