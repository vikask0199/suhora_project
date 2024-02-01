import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addUser } from "../features/authSlice"
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isWritting, setIsWritting] = useState(false);
  const dispatch = useDispatch()
  const [passwordValidation, setPasswordValidation] = useState({
    uppercase: false,
    lowercase: false,
    specialChar: false,
    number: false,
    length: false,
  });

  const validatePassword = () => {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /\d/;

    setPasswordValidation({
      uppercase: uppercaseRegex.test(password),
      lowercase: lowercaseRegex.test(password),
      specialChar: specialCharRegex.test(password),
      number: numberRegex.test(password),
      length: password.length >= 8,
    });
  };

  useEffect(() => {
    validatePassword();
    if (password.length >= 8 && confirmPassword.length >= 8) {
      handleConfirmPassword();
    }
  }, [password]);

  const handleConfirmPassword = () => {
    if (password === confirmPassword) {
      if (password.length >= 8) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (name && email && handleConfirmPassword()) {
      dispatch(addUser({ name, email, password }))
    }
    else {
      toast.info('Something went wrong')
    }
  }



  return (
    <div className="flex items-center justify-center min-h-screen  px-2 bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className='p-5 border rounded-lg bg-white'>
        <div className='mt-1 mb-4 w-full text-center'>
          <h1 className='text-3xl font-bold underline'>Registration</h1>
        </div>
        <form className="max-w-md mx-auto" onSubmit={submitForm}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name:
              <input
                className="shadow appearance-none border font-normal rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
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
            <div className="text-xs text-gray-600">
              Password Requirements:
              <ul className="list-disc pl-5">
                <li className={passwordValidation.uppercase ? 'text-green-500' : 'text-red-500'}>
                  At least one uppercase letter
                </li>
                <li className={passwordValidation.lowercase ? 'text-green-500' : 'text-red-500'}>
                  At least one lowercase letter
                </li>
                <li className={passwordValidation.specialChar ? 'text-green-500' : 'text-red-500'}>
                  At least one special character
                </li>
                <li className={passwordValidation.number ? 'text-green-500' : 'text-red-500'}>At least one number</li>
                <li className={passwordValidation.length ? 'text-green-500' : 'text-red-500'}>
                  Minimum length of 8 characters
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password:
              <input
                className="shadow appearance-none border font-normal rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setIsWritting(true) }}
                required
              />
            </label>
            <div>
              {(handleConfirmPassword() === true) ? (
                <p className="text-green-500">Passwords matched</p>
              ) : (
                isWritting && confirmPassword.length > 0 && (
                  <p className="text-red-500">Passwords do not match</p>
                )
              )}
            </div>
          </div>
          <div className='mb-4 mt-4 w-full flex items-center justify-center'>
            <button className='border px-3 py-1 border-teal-400 font-bold text-teal-500 hover:bg-teal-400 hover:text-white duration-300'>SIGNUP</button>
          </div>
        </form>
        <div className='w-full text-center font-sm text-blue-800 '>
            <Link to='/' className='hover:underline cursor-pointer'>
                Already have an account ?
            </Link>
          </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
