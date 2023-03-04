import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

async function getusersdata(id) {
  const { data } = await axios.get(`https://dummyjson.com/carts/${id}`);
  return data;
}

async function deletePost(postid) {
  const response = await axios.delete(`https://dummyjson.com/carts/${postid}`);

  return response.data;
}

// async function updatePost(postId) {
//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/postId/${postId}`,
//     { method: 'PATCH', data: { title: 'REACT QUERY FOREVER!!!!' } }
//   );
//   return response.json();
// }

export function DetailOrder({ order }) {
  const { id } = useParams();
  const {
    data: productDetails,
    isLoading,
    isError,
    error,
  } = useQuery(['ProductDetails', id], () => getusersdata(id));

  const deleteMutation = useMutation({
    mutationFn: (postid) => deletePost(postid),
  });
  //   const updateMutation = useMutation((postId) => updatePost(postId));

  //   useEffect(() => {
  //     updateMutation.reset();
  //     deleteMutation.reset();

  //   }, [post.id]);

  //   console.log();

  if (isLoading) {
    return <h3>Loading!</h3>;
  }

  if (isError) {
    return (
      <>
        <h3>Error</h3>
        <p>{error.toString()}</p>
      </>
    );
  }

  return (
    <>
      <h3 style={{ color: 'blue' }}>
        Product Id:{productDetails?.products.title}
      </h3>
      {id}
      {/* <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      <button onClick={() => updateMutation.mutate(post.id)}>
        Update title
      </button> */}

      {/* {updateMutation.isError && (
        <p style={{ color: 'red' }}>Error updating the post</p>
      )}
      {updateMutation.isLoading && (
        <p style={{ color: 'purple' }}>Updating the post</p>
      )}
      {updateMutation.isSuccess && (
        <p style={{ color: 'green' }}>Post has (not) been updated</p>
      )} */}

      <ul
        className="flex flex-col gap-2 border shadow w-full divide-y divide-slate-200 
      "
      >
        {productDetails?.products.map((data) => (
          <li className="p-2" key={data.id}>
            <h1>Title: {data.title}</h1>
            <p>Price: {data.price}</p>
            <p>Quantity: {data.quantity}</p>
            <p>total:{data.total}</p>
            <p>discountPercentage:{data.discountPercentage}</p>
            <button
              onClick={() => deleteMutation.mutate(data?.products?.id)}
              className="border px-3 py-1 mt-4 bg-red-400 text-white"
            >
              Delete
            </button>
            {deleteMutation.isError && (
              <p style={{ color: 'red' }}>Error deleting the post</p>
            )}
            {deleteMutation.isLoading && (
              <p style={{ color: 'purple' }}>Deleting the post</p>
            )}
            {deleteMutation.isSuccess && (
              <p style={{ color: 'green' }}>Post has been deleted</p>
            )}
          </li>
        ))}
      </ul>
      <div className="card p-5 border min-w-full ">
        <p>price: {productDetails?.total}</p>
        <h4>Quantity: {productDetails?.Quantity}</h4>
        <h4>userId: {productDetails?.userId}</h4>
        <h4>totalProducts: {productDetails?.totalProducts}</h4>
        <h4>totalQuantity: {productDetails?.totalQuantity}</h4>
      </div>
    </>
  );
}
