import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

async function getProducts() {
  const { data } = await axios.get('https://dummyjson.com/products');

  return data;
}

async function addProduct() {
  const { data } = await axios.post(`https://dummyjson.com/products/add`, {
    title: 'BMW Pencil',
  });
  return data;
}

const Product = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  });

  const addMutation = useMutation(() => addProduct());

  if (isLoading && !products) return 'Loading...';
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="justify-between flex items-center p-[4vmax]">
        <h1>My Products</h1>
        <div className="p-2 border shadow bg-white">
          <AiOutlinePlus onClick={() => addMutation.mutate()} size={25} />
        </div>
        {addMutation.isError && (
          <p style={{ color: 'red' }}>Error adding Order</p>
        )}
        {addMutation.isLoading && (
          <p style={{ color: 'purple' }}>Adding Product</p>
        )}
        {addMutation.isSuccess && (
          <p style={{ color: 'green' }}>Product has been added</p>
        )}
      </div>
      <div className="flex flex-col divide-y gap-2 divide-slate-400 px-[4vmax]">
        {products?.products.map((product) => {
          return (
            <div
              key={product.id}
              className="flex items-center justify-between "
            >
              <div className="flex items-center  gap-4">
                <img
                  src={product.thumbnail}
                  alt="product"
                  className="w-14 h-14 rounded-full"
                />
                <div className="flex flex-col ">
                  <h1 className="text-lg capitalize">{product.title}</h1>
                  <p className="text-sm uppercase">{product.description}</p>
                  <p className="text-sm gap-2">
                    {product.price}BDT
                    {/* <span className="ml-4">{order.totalProducts} ITEMS</span> */}
                  </p>
                </div>
              </div>
              <div className="border p-2 shadow  px-4">view</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Product;
