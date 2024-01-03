import React from "react";
import logo from "../assets/images/gz-logo.png";
import ContentWrapper from "./ContentWrapper";
import Categorias from "./Categorias";
import UltimoProducto from "./UltimoProducto";
import Paneles from "./Paneles";
import NotFound from "./NotFound";
import { Link, Route, Switch } from "react-router-dom";
import Listado from "./Listado"

function SideBar() {
  return (
    <React.Fragment>
      {/*<!-- Sidebar -->*/}
      <ul
        className="navbar-nav sidebar sidebar-dark accordion"
        style={{background: "black"}}
        id="accordionSidebar"
      >
        {/*<!-- Sidebar - Brand -->*/}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center bg-dark"
          href="/"
        >
          <div className="sidebar-brand-icon m-2">
            <img
              className="w-100 img-fluid p-5"
              src={logo}
              alt="Digital House"
            />
          </div>
        </a>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider my-0" />

        {/*<!-- Nav Item - Dashboard -->*/}
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard - GamerZone</span>
          </Link>
        </li>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider" />

        {/*<!-- Heading -->*/}
        <div className="sidebar-heading">Secciones</div>

        {/*<!-- Nav Item - Pages -->*/}
        <li className="nav-item">
          <Link className="nav-link" to="/Categorias">
            <i className="fas fa-fw fa-table"></i>
            <span>Productos por categoria</span>
          </Link>
        </li>

        {/*<!-- Nav Item - Listados -->*/}
        <li className="nav-item">
          <Link className="nav-link" to="/UltimoProducto">
            <i className="fas fa-fw fa-folder "></i>
            <span>Último producto agregado</span>
          </Link>
        </li>

        {/*<!-- Nav Item - Tables -->*/}
        <li className="nav-item">
          <Link className="nav-link" to="/Paneles">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Paneles de datos</span>
          </Link>
        </li>

        {/*<!-- Nav Item - Search -->*/}
        <li className="nav-item">
          <Link className="nav-link" to="/Listado">
            <i className="fas fa-fw fa-table"></i>
            <span>Listado de productos</span>
          </Link>
        </li>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
      {/*<!-- End of Sidebar -->*/}

      {/*<!-- End Microdesafio 2 -->*/}
      <Switch>
        <Route exact path="/">
          <ContentWrapper />
        </Route>
        <Route path="/Categorias">
          <Categorias />
        </Route>
        <Route path="/UltimoProducto">
          <UltimoProducto />
        </Route>
        <Route path="/Paneles">
          <Paneles />
        </Route>
        <Route path="/Listado">
          <Listado />
        </Route>
        <Route component={NotFound} />
      </Switch>
      {/*<!-- End Microdesafio 2 -->*/}
    </React.Fragment>
  );
}
export default SideBar;
