import { useState } from "react";
import Table from "react-bootstrap/Table";
import data from "../testData.json";
import ModalAddProduct from "../components/ModalAddProduct";
import { Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';

function AdminProduct() {
  const [products, setProducts] = useState(data);
  const [isShowModalAddProduct, setIsShowModalAddProduct] = useState(false);

  function deleteClick(prod) {
    setProducts((prev) => {
      return prev.filter((p) => p.id !== prod.id);
    });
  }

  const handleAddProduct = (prod) => {
    setIsShowModalAddProduct(false);
    setProducts((prev) => [
      {
        ...prod,
        id: new Date().toDateString(),
        rating: 0,
      },
      ...prev,c
    ]);
  };
  return (
    <Col sm={12} md={12} lg={10} xl={10}>
    <div >
      <Button className="mt-4 rounded" onClick={() => setIsShowModalAddProduct(true)}>
        Add product
      </Button>
      <Table>
        <thead>
          <tr>
            <th>Stt</th>
            <th>Name</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{prod.name}</td>
              <td>{prod.price}</td>
              <td>{prod.rating}</td>
              <td>
                <Button className="rounded" variant="info" onClick={() => deleteClick(prod)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalAddProduct
        show={isShowModalAddProduct}
        onHide={() => setIsShowModalAddProduct(false)}
        onSubmit={handleAddProduct}
      />
    </div>
    </Col>
  );
}

export default AdminProduct;
