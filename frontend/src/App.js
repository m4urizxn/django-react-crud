import React from "react";
import BrandCRUD from "./components/BrandCRUD";
import { Container, Navbar, Nav } from "react-bootstrap";
import "./index.css";

function App() {
  return (
    <>
      {/* Barra de navegación fija */}
      <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#">🛍️ Tienda React + Django</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="#">Inicio</Nav.Link>
            <Nav.Link href="#">Marcas</Nav.Link>
            <Nav.Link href="#">Productos</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Contenido principal */}
      <Container className="main-container mt-5">
        <h2>Gestión de Marcas</h2>
        <p className="text-muted text-center mb-4">
          Administra las marcas de productos. Puedes crear, editar o eliminar marcas fácilmente.
        </p>
        <BrandCRUD />
      </Container>

      {/* Footer */}
      <footer className="text-center mt-5 mb-3 text-muted">
        <small>© {new Date().getFullYear()} Desarrollado por Jairo | Django + React + Bootstrap</small>
      </footer>
    </>
  );
}

export default App;
