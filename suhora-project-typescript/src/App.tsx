import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import SignUp from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import { ToastContainer } from 'react-toastify';

function App() {
  interface ContextClass {
    success: string;
    error: string;
    info: string;
    warning: string;
    default: string;
    dark: string;
  }

  const contextClass: ContextClass = {
    success: "bg-blue-600",
    error: "bg-red-400 text-white",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>

      <ToastContainer />
      {/* <ToastContainer
        toastClassName={({ type }) => (contextClass[type || "default"] +
          " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
        )}
        bodyClassName={() => "text-sm font-white font-med block p-3"}
        position="bottom-right"
        autoClose={4000}
      /> */}
    </div>
  );
}

export default App;
