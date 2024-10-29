import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div>
      <style>
        {`
          nav {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
          }

          nav a {
            padding: 10px;
            text-decoration: none;
            background-color: #f0f0f0;
            border-radius: 5px;
            color: black;
            font-weight: bold;
          }

          nav a:hover {
            background-color: #ccc;
          }
        `}
      </style>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Outlet />
    </div>
  );
}
