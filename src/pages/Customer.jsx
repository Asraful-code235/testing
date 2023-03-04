import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

async function getCustomers() {
  const { data } = await axios.get('https://dummyjson.com/users');

  return data;
}

const Customer = () => {
  const { data: customers, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getCustomers(),
  });

  if (isLoading && !customers) return 'Loading...';
  return (
    <div>
      <div className="bg-slate-100 min-h-screen">
        <div className="justify-between flex items-center p-[4vmax]">
          <h1>My Products</h1>
          <div className="p-2 border shadow bg-white">
            <AiOutlinePlus size={25} />
          </div>
        </div>
        <div className="flex flex-col divide-y gap-2 divide-slate-400 px-[4vmax]">
          {customers?.users.map((customer) => {
            return (
              <div
                key={customer.id}
                className="flex items-center justify-between "
              >
                <div className="flex items-center  gap-4">
                  <img
                    src={customer.image}
                    alt="product"
                    className="w-14 h-14 rounded-full"
                  />
                  <div className="flex flex-col ">
                    <h1 className="text-lg capitalize">{customer.firstName}</h1>
                    {/* <p className="text-sm uppercase">{product.description}</p> */}
                  </div>
                </div>
                <div className="border p-2 shadow  px-4">view</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Customer;
