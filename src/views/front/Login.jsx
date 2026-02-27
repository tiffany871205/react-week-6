import { useState } from "react";

import axios from "axios";
import { useForm } from "react-hook-form";
import { emailValidation } from "../../utils/validation";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Login() {
  //   const [formData, setFormData] = useState({
  //     username: "",
  //     password: "",
  //   });
  const [isAuth, setIsAuth] = useState(false);
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   };

  //   const getProducts = async () => {
  //     try {
  //       const response = await axios.get(`${API_BASE}/api/${API_PATH}/admin/products`);
  //       setProducts(response.data.products);
  //     } catch (error) {
  //       console.log(error.response.message);
  //     }
  //   };

  const onSubmit = async (formData) => {
    try {
      //   e.preventDefault();
      const response = await axios.post(`${API_BASE}/admin/signin`, formData);
      console.log(response.data);
      const { token, expired } = response.data;
      document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
      axios.defaults.headers.common["Authorization"] = token;

      //   getProducts();
      //   setIsAuth(true);
    } catch (error) {
      console.log(error.response);
    }
  };

  const checkLogin = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("hexToken="))
        ?.split("=")[1];
      const response = await axios.post(`${API_BASE}/api/user/check`);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="container login">
      <h1>請先登入</h1>
      <form className="form-floating" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            name="username"
            placeholder="name@example.com"
            {...register("username", emailValidation)}
            // value={formData.username}
            // onChange={(e) => handleInputChange(e)}
          />
          <label htmlFor="username">Email address</label>
          {errors.username && <p className="text-danger">{errors.username.message}</p>}
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            {...register("password", {
              required: "請輸入密碼",
              minLength: {
                value: 6,
                message: "密碼長度至少 6 碼",
              },
            })}
            // value={formData.password}
            // onChange={(e) => handleInputChange(e)}
          />
          <label htmlFor="password">Password</label>
          {errors.password && <p className="text-danger">{errors.password.message}</p>}
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-2">
          登入
        </button>
      </form>
    </div>
  );
}

export default Login;
