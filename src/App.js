import React,{useEffect, useState, useContext} from 'react';
import './App.css';
import Login from './components/Login';
import UserList from './components/UserList';
import LoginContext from './context/LoginContext';
import CreateCvPage from './components/CreateCvPage';

function App() {
  const{auth} = useContext(LoginContext);
  return (
    <div className="App">
      
        {auth == 0 ? (
          <Login/>
        ):( 
          auth == 1 ?(
            <UserList />
          ) : (
            <CreateCvPage />
          ))}
        
    </div>
  );
}

export default App;
