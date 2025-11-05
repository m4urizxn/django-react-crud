import React, { useEffect, useState } from "react";
import API from "../api";
import { Form, Button, Table, Container, Row, Col, Image } from "react-bootstrap";

export default function BrandCRUD() {
  const [brands, setBrands] = useState([]);
  const [form, setForm] = useState({
    name: "",
    country: "",
    established: "",
    description: "",
    logo: null,
  });
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(null); // 👈 Imagen temporal de previsualización

  // Obtener marcas desde el backend
  const fetchBrands = async () => {
    const res = await API.get("brands/");
    setBrands(res.data);
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in form) if (form[key]) data.append(key, form[key]);

    if (editing) {
      await API.put(`brands/${editing.id}/`, data);
      setEditing(null);
    } else {
      await API.post("brands/", data);
    }

    setForm({ name: "", country: "", established: "", description: "", logo: null });
    setPreview(null);
    fetchBrands();
  };

  // Manejar selección de imagen y generar vista previa
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, logo: file });
    if (file) {
      setPreview(URL.createObjectURL(file)); // 👈 genera previsualización
    } else {
      setPreview(null);
    }
  };

  // Manejar edición
  const handleEdit = (brand) => {
    setEditing(brand);
    setForm({
      name: brand.name,
      country: brand.country,
      established: brand.established,
      description: brand.description,
      logo: null,
    });
    // mostrar logo actual si existe
    setPreview(`http://127.0.0.1:8000${brand.logo}`);
  };

  // Eliminar marca
  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta marca?")) {
      await API.delete(`brands/${id}/`);
      fetchBrands();
    }
  };

  return (
    <Container>
      <Row>
        {/* FORMULARIO */}
        <Col md={5}>
          <h4 className="mb-3">{editing ? "Editar Marca" : "Agregar Marca"}</h4>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>País</Form.Label>
              <Form.Control
                type="text"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Año de creación</Form.Label>
              <Form.Control
                type="number"
                value={form.established}
                onChange={(e) => setForm({ ...form, established: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Logo</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            </Form.Group>

            {/* 👇 Previsualización del logo */}
            {preview && (
              <div className="text-center mb-3">
                <Image
                  src={preview}
                  alt="Vista previa"
                  rounded
                  fluid
                  style={{ maxHeight: "120px", border: "1px solid #ccc", padding: "5px" }}
                />
              </div>
            )}

            <Button type="submit" variant="primary" className="w-100">
              {editing ? "Actualizar" : "Agregar"}
            </Button>
          </Form>
        </Col>

        {/* TABLA DE MARCAS */}
        <Col md={7}>
          <h4 className="mb-3">Lista de Marcas</h4>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Logo</th>
                <th>Nombre</th>
                <th>País</th>
                <th>Año</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>

                  {/* 👇 Miniatura del logo en la tabla */}
                  <td className="text-center">
                    {b.logo ? (
                      <Image
                        src={`http://127.0.0.1:8000${b.logo}`}
                        alt="logo"
                        thumbnail
                        style={{
                          maxWidth: "70px",
                          maxHeight: "70px",
                          objectFit: "contain",
                          backgroundColor: "#f8f9fa",
                        }}
                      />
                    ) : (
                      <span className="text-muted">Sin logo</span>
                    )}
                  </td>

                  <td>{b.name}</td>
                  <td>{b.country}</td>
                  <td>{b.established}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(b)}
                      className="me-2"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(b.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
