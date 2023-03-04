import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../app/user/userSlice';
import { clearToken } from '../app/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const { name, email, password, phone } = user;
  const [avatar, setAvatar] = useState('');
  const [previewSource, setPreviewSource] = useState('');

  const loginUser = useMutation({
    mutationFn: async (formData) => {
      const res = await axios.post(
        'https://vercel-server-liart.vercel.app/api/v1/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const data = res.data;

      if (res.status == 201) {
        // console.log(data);
        return data.token;
      } else {
        throw new Error('Internal server error');
      }
    },

    onSuccess: (data) => {
      dispatch(setToken(data));
      Cookies.set('token', data);
      navigate('/dashboard');
    },
  });

  console.log(token);

  const handleChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewSource(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('avatar', avatar);

    loginUser.mutate(formData);
  };

  // const previewFile = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setPreviewSource(reader.result);
  //   };
  // };

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token]);

  if (loginUser.isError) {
    return <div>{loginUser.error.message}</div>;
  }

  return (
    <div className="flex items-center justify-center p-[4vmax] ">
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="w-[26vmax] flex flex-col items-start justify-center p-[2vmax] shadow bg-slate-200"
      >
        <label htmlFor="name" className="w-full font-semibold py-2">
          Name
          <input
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="name"
            className="px-[2vmax] py-[0.5vmax] w-full mt-3 rounded-md focus:ring"
          />
        </label>
        <label htmlFor="email" className="w-full font-semibold py-2">
          Email
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Email"
            className="px-[2vmax] py-[0.5vmax] w-full mt-3 rounded-md focus:ring"
          />
        </label>
        <label htmlFor="phone" className="w-full font-semibold py-2">
          Phone
          <input
            onChange={handleChange}
            type="number"
            name="phone"
            placeholder="Phone number +88"
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
        <input
          id="fileInput"
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleChange}
          className="form-input"
        />
        {previewSource && (
          <img src={previewSource} alt="chosen" style={{ height: '300px' }} />
        )}

        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-black px-[2max] py-[0.5vmax] text-white uppercase
          rounded-md cursor-pointer "
          type="submit"
        >
          {loginUser.isLoading ? 'Loading...' : 'SignIn'}
        </button>
      </form>
    </div>
  );
};

export default Register;
