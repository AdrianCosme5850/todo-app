import React from 'react';
import './app.css'
import ToDo from './components/todo/todo.js';
import ListContextProvider from './context/listContex.jsx';
import DisplayTasks from './components/todo/DisplayTasks';
import Header from './components/todo/Header';
import Settings from './components/todo/Settings'
import AuthContextProvider from './context/authContext';
import Login from './components/todo/Login';
import IsAuthorized from './context/isAuthorized';

export default class App extends React.Component {
  render() {
    return (
      <ListContextProvider>
      <AuthContextProvider>
      <Login/>
      <IsAuthorized>
      <Header/>
      <Settings/>
      <ToDo />
      <DisplayTasks/>
      </IsAuthorized>
      </AuthContextProvider>
      </ListContextProvider>
    );
  }
}