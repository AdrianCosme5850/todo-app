import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';



const Login = function () {

    const context = useContext(AuthContext)
    const loggedIn = context.loggedIn;
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let login = context.login;

    let handleSubmit = (e) => {
        e.preventDefault();
        setUsername(e.target.username.value);
        setPassword(e.target.password.value);
        login(e.target.username.value, e.target.password.value)
    }

    return(<>
    {loggedIn ?
    <>
     <h1>Welcome</h1>
    </>
    : <>
    <h1>false</h1>
    <form onSubmit={handleSubmit}>
        <input name="username" type="text"></input>
        <input name="password" type="text"></input>
        <button type="submit">Login</button>
    </form>
    </>}
    </>)
};

export default Login;