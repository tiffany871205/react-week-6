import { Link, Outlet } from "react-router";

function FrontendLayout() {
  return (
    <>
      <header>
        <ul className="nav mt-2 mb-4 ms-2">
          <li className="nav-item">
            <Link className="nav-link nav-item" aria-current="page" to="/">
              首頁
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link nav-item" aria-current="page" to="/products">
              產品列表
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link nav-item" aria-current="page" to="/cart">
              購物車
            </Link>
          </li>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <div className="bg-secondary bg-opacity-10 p-3 text-center mt-5">
          <p className="text-muted m-0">@2026 Tiffany 練習作品</p>
        </div>
      </footer>
    </>
  );
}

export default FrontendLayout;
