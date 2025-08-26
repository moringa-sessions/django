import React from 'react';
import {  Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import AddTask from './pages/AddTask';
import { UserProvider } from './context/UserContext';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <BrowserRouter>
    
        <UserProvider>
          <TaskProvider>

        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="/addTask" element={<AddTask />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>

          </TaskProvider>
       </UserProvider>
    </BrowserRouter>
  );
}

export default App;
