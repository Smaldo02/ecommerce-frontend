import "./admin-layout.css";
import { NavLink, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <main>
      <div className="adm-header">
        <h1>Portal Admin</h1>
        <nav className="adm-tabs">
          <NavLink to="/admin/products" className="adm-tab">
            Productos
          </NavLink>
          <NavLink to="/admin/users" className="adm-tab">
            Usuarios
          </NavLink>
        </nav>
      </div>
      <Outlet />
    </main>
  );
}

export default AdminLayout;
