import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from "./components/Nav";
import Menu from "./components/Menu";
import Users from "./pages/Users";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";


function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Routes>
                  <Route path={'/'} element={<Dashboard/>}/>
                  <Route path={'/users'} element={<Users/>}/>
                  <Route path={'/register'} element={<Register/>}/>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
