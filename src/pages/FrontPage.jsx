import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

async function getUser(token) {
  if (token) {
    const res = await axios.get('http://localhost:4000/api/v1/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res.data);
    return res.data;
  } else {
    return null;
  }
}

async function getCart() {
  const { data } = await axios.get('https://dummyjson.com/carts');
  return data;
}

const FrontPage = () => {
  const queryClient = useQueryClient();
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['jwt', token],
    queryFn: () => getUser(token),
    keepPreviousData: true,
  });

  const { data: cart } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(),
  });

  useEffect(() => {
    if (userData?.user) {
      queryClient.prefetchQuery({
        queryKey: ['jwt'],
        queryFn: () => getUser(token),
      });
    }
  }, [queryClient, userData?.user]);
  // console.log(userData);
  useEffect(() => {
    if (userData?.user) {
      queryClient.prefetchQuery({
        queryKey: ['jwt'],
        queryFn: () => getUser(token),
      });
    }
  }, [queryClient, userData?.user]);

  if (isLoading && !userData)
    return (
      <>
        <progress className="progress w-56"></progress>
      </>
    );

  if (isError) {
    return 'Error loading user';
  }

  console.log(cart);

  return (
    <div className="p-[4vmax] bg-slate-100 min-h-screen">
      <div className="flex items-center gap-4">
        <h1 className="text-xl">
          Welcome{' '}
          <span className="text-xl font-bold capitalize">
            {userData.user.name}👋
          </span>
        </h1>
        <select className="select select-bordered w-full w-28 ">
          <option disabled selected>
            Today
          </option>
          <option value={'daty1'}>Day 1</option>
          <option value={'daty2'}>Day 2</option>
          <option value={'daty3'}>Day 3</option>
          <option value={'daty4'}>Day 4</option>
        </select>
      </div>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="card p-5 py-8 bg-white  shadow">
          <p className="text-slate-600 uppercase font-bold">orders</p>
          <p>239</p>
        </div>
        <div className="card p-5 py-8 bg-white  shadow">
          <p className="text-slate-600 uppercase font-bold">total sales</p>
          <p>25791 BDT</p>
        </div>
        <div className="card p-5 py-8 bg-white shadow">
          <p className="text-slate-600 uppercase font-bold">store views</p>
          <p>59213</p>
        </div>
        <div className="card p-5 py-8 bg-white  shadow">
          <p className="text-slate-600 uppercase font-bold">product views</p>
          <p>97581</p>
        </div>
      </div>
      <h1 className="text-xl font-bold mt-8">Recent Orders</h1>
      <div className="min-h-20 bg-white w-full"></div>
    </div>
  );
};

export default FrontPage;
