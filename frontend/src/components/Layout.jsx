// src/components/Layout.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const nombre = usuario?.nombre || "";

  return (
    <nav className="bg-blue-700 text-white px-4 py-3 shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-xl font-bold">Rutinas Fit</div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <ul className="hidden md:flex gap-6 items-center">
          <li>Bienvenido, {nombre} 👋</li>
          <li>
            <button
              onClick={() => navigate("/dashboard")}
              className="hover:underline"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>

      {open && (
        <ul className="md:hidden mt-3 space-y-3">
          <li className="px-4">Bienvenido, {nombre} 👋</li>
          <li>
            <button
              onClick={() => navigate("/dashboard")}
              className="block w-full text-left px-4 py-2 hover:bg-blue-600"
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 bg-red-500 hover:bg-red-600"
            >
              Cerrar sesión
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-100 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;