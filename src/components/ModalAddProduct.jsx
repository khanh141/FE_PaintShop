import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalAddProduct(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  return (
    <Modal
      {...props}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Them san pham
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          name="name"
          placeholder="Tên Sản Phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="name"
          placeholder="Loại Sản Phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="name"
          placeholder="Tính năng"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="name"
          placeholder="Mô tả"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => handleImageChange(e)}
        />
        <input
          type="number"
          name="price"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button
          onClick={() => {
            props.onSubmit({
              name,
              price,
            });
            setName("");
            setPrice(0);
          }}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAddProduct;
