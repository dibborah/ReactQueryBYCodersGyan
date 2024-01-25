import { useQuery } from "react-query";
import { Link } from "react-router-dom";

// Stale queries are refetched automatically in the background when:
// 1. New instances of the query mount(Component is re-endered)
// 2. Window is on Focus
// 3. When Network Re-connects
// 4. An re-fetched per interval is set / configured

// Here things are getting complex

// many states are there using useState
// useEffect is extensively used

// staleTime vs cacheTime
// staleTime => time query fresh mana jata hain// Refetch nhi karega 5 min
// cacheTime => cache Query data wo fresh mana jata hain// To usko remove nhi kya jata tan tak// 3min

const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products"); // This wrong ApI since z is added won't be rejected
    const data = await response.json(); // but in json() error will be thrown
    console.log(data.products);
    return data.products;
};

const Product = () => {

  const {  error, data: products, isLoading } = useQuery({
    queryKey: ['products'], // This string array key is used for caching by react-query
    queryFn: fetchProducts,
    staleTime: 5000,
  });

  // This states are not required in order to manage products, loading states and error states

  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // Axios
  // Axios is a Library to FETCH data

  // useEffect is not required in order to fetch data , setLoading state and for 
  // Error Handling

  // useEffect(() => {
    
  //   fetchProducts();
  // }, []);

  if (isLoading) {
    return <div className="text-2xl text-center">Loading...</div>;
  }
  if (error){
    return <div>{error.message}</div>
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/products/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;

// state reduce
// useEffect
// caching
// retry when api fails
