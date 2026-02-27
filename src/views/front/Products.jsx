import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleViewProduct = (id) => {
    navigate(`/product/${id}`);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/${API_PATH}/products`);
        setProducts(response.data.products);
      } catch (error) {
        console.log(error.response);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="container">
      <h2 className="mb-4">商品列表</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-3" key={product.id}>
            <div className="card h-100">
              <img src={product.imageUrl} className="card-img-top" alt={product.title} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text product-description">{product.description}</p>
                <p className="card-text">
                  原價：{product.origin_price} <br />
                  價格：${product.price}
                </p>
                <div className="mt-auto">
                  <p className="card-text">{product.unit}</p>
                  <button
                    className="btn btn-primary "
                    onClick={() => handleViewProduct(product.id)}
                  >
                    查看更多
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
