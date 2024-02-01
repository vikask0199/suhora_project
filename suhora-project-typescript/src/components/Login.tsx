import React, { SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../features/authSlice';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitForm = (e: SyntheticEvent) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ email, password }));
      navigate('/dashboard')

    } else {
      toast.info('Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-2 bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className="p-5 border rounded-lg bg-white">
        <div className="mt-1 mb-4 w-full text-center">
          <h1 className="text-3xl font-bold underline">ACCOUNT LOGIN</h1>
        </div>
        <form className="max-w-md mx-auto" onSubmit={submitForm}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email:
              <input
                className="shadow appearance-none border font-normal rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password:
              <input
                className="shadow appearance-none border font-normal rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </label>
          </div>
          <div className="mb-4 mt-4 w-full flex items-center justify-center">
            <button className="border px-3 py-1 border-teal-400 font-bold text-teal-500 hover:bg-teal-400 hover:text-white duration-300">SIGNIN</button>
          </div>
        </form>
        <div className="w-full text-center font-sm text-blue-800">
          <Link to="/signup" className="hover:underline cursor-pointer">
            Create An Account ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
