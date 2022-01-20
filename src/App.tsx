import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from "./components/Nav";
import Menu from "./components/Menu";
import Users from "./pages/Users";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";


function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path={'/'} element={<Dashboard/>}/>
                  <Route path={'/users'} element={<Users/>}/>
                  <Route path={'/register'} element={<Register/>}/>
                  <Route path={'/login'} element={<Login/>}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
