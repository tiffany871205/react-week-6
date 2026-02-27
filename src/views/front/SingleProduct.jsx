import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState();

  const addCart = async (id, qty) => {
    try {
      const data = {
        product_id: id,
        qty,
      };
      const response = await axios.post(`${API_BASE}/api/${API_PATH}/cart`, { data });
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    const getSingleProduct = async (id) => {
      try {
        const response = await axios.get(`${API_BASE}/api/${API_PATH}/product/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.log(error.response);
      }
    };
    getSingleProduct(id);
  }, [id]);

  if (!product) {
    return (
      <div className="container">
        <h2>查無商品</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="mb-4">商品詳細</h2>
      <div className="row">
        <div className="col-md-6">
          <img src={product.imageUrl} className="img-fluid" alt={product.title} />
        </div>
        <div className="col-md-6 px-3 mt-4">
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>
            原價：{product.origin_price} <br />
            價格：${product.price}
          </p>
          <p className="mt-5 text-secondary px-2" style={{ fontSize: "9pt" }}>
            {product.content}
          </p>
          <button className="btn btn-primary" onClick={() => addCart(product.id, 1)}>
            加入購物車
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
