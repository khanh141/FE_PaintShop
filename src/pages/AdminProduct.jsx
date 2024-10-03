import { useState } from "react";
import Table from "react-bootstrap/Table";
import data from "../testData.json";
import ModalAddProduct from "../components/ModalAddProduct";

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
      ...prev,
    ]);
  };
  return (
    <div>
      <button onClick={() => setIsShowModalAddProduct(true)}>
        Add product
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
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
                <button onClick={() => deleteClick(prod)}>Delete</button>
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
  );
}

export default AdminProduct;
