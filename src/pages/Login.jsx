import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { setToken } from '../app/user/userSlice';
import { clearToken } from '../app/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });

  const {
    data: loginUser,
    mutate,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      const response = await axios.post('http://localhost:4000/api/v1/login', {
        phone: formData.phone,
        password: formData.password,
      });
      if (response.status !== 200) {
        throw new Error('Server error');
      }
      const data = response.data;

      return data.token;
    },
    // onError: (err) => console.log(err),
    onSuccess: (data) => {
      // console.log(data);
      dispatch(setToken(data));
      Cookies.set('token', data);
    },
  });
  // console.log(token);
  //   get user data

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex items-center justify-center p-[4vmax] ">
      <form
        onSubmit={handleSubmit}
        className="w-[26vmax] flex flex-col items-start justify-center p-[2vmax] shadow bg-slate-200"
      >
        <label htmlFor="phone" className="w-full font-semibold py-2">
          Phone
          <input
            onChange={handleChange}
            type="number"
            name="phone"
            placeholder="Phone Number +88"
            className="px-[2vmax] py-[0.5vmax] w-full mt-3 rounded-md focus:ring"
          />
        </label>
        <label
          htmlFor="password"
          className="w-full font-semibold py-2 focus:ring"
        >
          Password
          <input
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="px-[2vmax] py-[0.5vmax] w-full mt-3 rounded-md"
          />
        </label>
        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-black px-[2max] py-[0.5vmax] text-white uppercase
          rounded-md cursor-pointer "
          type="submit"
        >
          {isLoading ? 'Loading...' : 'LogIn'}
        </button>

        <p className="mt-4  text-gray-600">
          Create a new account ?{' '}
          <Link
            to={'/register'}
            className="underline text-gray-800 font-semibold"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
