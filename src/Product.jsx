import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

const Product = () => {
  const params = useParams();

  // Mutations

  const mutation = useMutation({
    mutationFn: (newProduct) => {// newProduct is the object that we are going to update
      return axios.put(`https://dummyjson.com/products/${params.productId}`, newProduct)
    },
  })

  const fetchProduct = async () => {
    const response = await fetch(
      `https://dummyjson.com/products/${params.productId}`
    );
    const data = response.json();
    return data;
  };
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", params.productId],
    queryFn: fetchProduct,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  if (mutation.isLoading) {
    return <h2>Updating...</h2>;
  }
  if (mutation.isError) {
    return <h2>Error while updating: {mutation.error.message}</h2>;
  }
  return (
    <div>
      <div>Product:{product.title}</div>
      <button
            onClick={() => {
              mutation.mutate({ title: 'Updated Product' })
            }}
          >
            Create Product
          </button>
    </div>
  );
};

export default Product;

// useMutation:
// Gives us some methods like:
// 1. mutate 2. isLoading 3. isError 4. isSuccess 5. error

