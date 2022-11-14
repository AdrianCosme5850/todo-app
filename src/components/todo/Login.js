import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';



const Login = function () {

    const context = useContext(AuthContext)
    const loggedIn = context.loggedIn;
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let login = context.login;
    let signUp = context.signUp;

    let handleSubmit = (e) => {
        e.preventDefault();
        login(e.target.username.value, e.target.password.value)
    }

    let handleSignUp = (e) => {
        e.preventDefault();
        signUp(e.target.username.value, e.target.password.value)
    }

    return(<>
    {loggedIn ?
    <>
     <h1>Welcome</h1>
    </>
    : <>
    <form onSubmit={handleSubmit}>
        <input name="username" type="text"></input>
        <input name="password" type="text"></input>
        <button type="submit">Login</button>
    </form>
    <form onSubmit={handleSignUp}>
        <input name="username" type="text"></input>
        <input name="password" type="text"></input>
        <button type="submit">Sign Up</button>
    </form>
    </>}
    </>)
};

export default Login;