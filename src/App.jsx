import { Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      <h1>The Awesome React query</h1>
      <div>
        <Link to="/">Home</Link> <br />
        <Link to="/products">Products</Link>
      </div>
    </div>
  );
};

export default App;
