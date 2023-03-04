import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { DetailOrder } from './DetailOrder';

async function getCart() {
  const { data } = await axios.get('https://dummyjson.com/carts');

  return data;
}

async function addOrder() {
  const { data } = await axios.post(`https://dummyjson.com/carts/add`, {
    userId: 1,
    products: [
      {
        id: 1,
        quantity: 1,
      },
      {
        id: 50,
        quantity: 2,
      },
    ],
  });
  return data;
}

const Order = () => {
  const queryClient = useQueryClient();
  const [Selected, setSelected] = useState(null);

  const { data: cart } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(),
  });

  const usersDetails = useMutation({
    queryKey: ['userDetails'],
    queryFn: (id) => getusersdata(id),
  });

  useEffect(() => {
    if (cart?.user) {
      queryClient.prefetchQuery({
        queryKey: ['cart'],
        queryFn: () => getCart(),
      });
    }
  }, [queryClient]);

  const addMutation = useMutation(() => addOrder());

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="justify-between flex items-center p-[4vmax]">
        <h1>My Orders</h1>
        <div className="p-2 border shadow bg-white">
          <AiOutlinePlus onClick={() => addMutation.mutate()} size={25} />
        </div>
        {addMutation.isError && (
          <p style={{ color: 'red' }}>Error adding Order</p>
        )}
        {addMutation.isLoading && (
          <p style={{ color: 'purple' }}>Adding Order</p>
        )}
        {addMutation.isSuccess && (
          <p style={{ color: 'green' }}>Order has been deleted</p>
        )}
      </div>
      <div className="flex flex-col divide-y divide-slate-400 px-[4vmax]">
        {cart?.carts.map((order) => (
          <>
            <div key={order.id} className="flex items-center justify-between ">
              <div className="flex items-center  gap-4">
                <img
                  src="https://images.pexels.com/photos/9060269/pexels-photo-9060269.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                  alt="user"
                  className="w-14 h-14 rounded-full"
                />
                <div className="flex flex-col ">
                  <h1 className="text-lg capitalize">name</h1>
                  <p className="text-sm uppercase">time</p>
                  <p className="text-sm gap-2">
                    {order.total}BDT
                    <span className="ml-4">{order.totalProducts} ITEMS</span>
                  </p>
                </div>
              </div>
              <Link
                to={`/dashboard/${order.id}`}
                className="border p-2 shadow  px-4"
              >
                view
              </Link>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default Order;
