import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalAddProduct(props) {
    const { onSubmit, ...rest } = props;

    return (
        <Modal
            {...rest}
            backdrop="static"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <form onSubmit={onSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Them san pham
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        required
                        type="text"
                        name="loai"
                        placeholder="Loai san pham"
                    />
                    <input
                        required
                        type="text"
                        name="ten"
                        placeholder="Ten Sản Phẩm"
                    />
                    <input
                        required
                        type="text"
                        name="tinhNang"
                        placeholder="Tính năng"
                    />
                    <input
                        required
                        type="text"
                        name="moTa"
                        placeholder="Mô tả"
                    />
                    <input
                        required
                        type="text"
                        name="hinhAnh"
                        placeholder="Hinh anh"
                    />
                    <input
                        required
                        type="text"
                        name="tenNhaSanXuat"
                        placeholder="Ten nha san xuat"
                    />
                    <input
                        required
                        type="text"
                        name="loaiBaoBi"
                        placeholder="Loai bao bi"
                    />
                    <input required type="color" name="mau" placeholder="Mau" />
                    <input
                        required
                        type="text"
                        name="loaiDinhMucLyThuyet"
                        placeholder="Loai dinh muc ly thuyet"
                    />
                    <input
                        required
                        type="text"
                        name="sttKhu"
                        placeholder="Stt khu"
                    />
                    <input
                        required
                        type="number"
                        name="giaTien"
                        placeholder="Enter price"
                    />
                    <input
                        required
                        type="number"
                        name="soLuong"
                        placeholder="So luong"
                    />
                    <input
                        required
                        type="text"
                        name="maNhanVien"
                        placeholder="Ma nhan vien"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} type="button">
                        Close
                    </Button>
                    <Button type="submit">Submit</Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ModalAddProduct;
