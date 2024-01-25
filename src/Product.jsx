import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const Product = () => {
  
   const params = useParams();
   console.log(params);
  
  const fetchProduct = async () => {
    const response = await fetch(`https://dummyjson.com/products/${params.productId}`);
    const data = response.json();
    return data;
  }
  const {data: product, isLoading, error} = useQuery({
    queryKey:["product", params.productId],
    queryFn: fetchProduct,
  })
  if(isLoading){
    return <div>Loading...</div>
  }
  if(error){
    return <div>{error.message}</div>
  }
  return (
    <div>Product:{product.title}</div>
  )
}

export default Product;


// useMutation: 
// Gives us some methods like:
// 1. mutate 2. isLoading 3. isError 4. isSuccess 5. error