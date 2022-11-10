import React from 'react';
import './app.css'
import ToDo from './components/todo/todo.js';
import ListContextProvider from './context/listContex.jsx';
import DisplayTasks from './components/todo/DisplayTasks';
import Header from './components/todo/Header'

export default class App extends React.Component {
  render() {
    return (
      <ListContextProvider>
      <Header/>
      <ToDo />
      <DisplayTasks/>
      </ListContextProvider>
    );
  }
}