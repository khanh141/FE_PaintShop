import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from '../assets/css/ModalAddProduct.module.scss';

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
                        Thêm sản phẩm
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles['modal-body']}>
                    <label>
                        Loại sản phẩm
                        <input
                            required
                            type="text"
                            name="loai"
                            placeholder="Loại sản phẩm"
                        />
                    </label>
                    <label>
                        Tên sản phẩm
                        <input
                            required
                            type="text"
                            name="ten"
                            placeholder="Tên sản phẩm"
                        />
                    </label>
                    <label>
                        Tính năng
                        <input
                            required
                            type="text"
                            name="tinhNang"
                            placeholder="Tính năng"
                        />
                    </label>
                    <label>
                        Mô tả
                        <input
                            required
                            type="text"
                            name="moTa"
                            placeholder="Mô tả"
                        />
                    </label>
                    <label>
                        Hình ảnh
                        <input
                            required
                            type="text"
                            name="hinhAnh"
                            placeholder="Hình ảnh"
                        />
                    </label>
                    <label>
                        Tên nhà sản xuất
                        <input
                            required
                            type="text"
                            name="tenNhaSanXuat"
                            placeholder="Tên nhà sản xuất"
                        />
                    </label>
                    <label>
                        Loại bao bì
                        <input
                            required
                            type="text"
                            name="loaiBaoBi"
                            placeholder="Loại bao bì"
                        />
                    </label>
                    <label>
                        Màu
                        <input
                            required
                            type="text"
                            name="mau"
                            placeholder="Màu"
                        />
                    </label>
                    <label>
                        Loại định mức lý thuyết
                        <input
                            required
                            type="text"
                            name="loaiDinhMucLyThuyet"
                            placeholder="Loại định mức lý thuyết"
                        />
                    </label>
                    <label>
                        Số thứ tự khu
                        <input
                            required
                            type="text"
                            name="sttKhu"
                            placeholder="Số thứ tự khu"
                        />
                    </label>
                    <label>
                        Giá tiền
                        <input
                            required
                            type="number"
                            name="giaTien"
                            placeholder="Giá tiền"
                        />
                    </label>
                    <label>
                        Số lượng
                        <input
                            required
                            type="number"
                            name="soLuong"
                            placeholder="Số lượng"
                        />
                    </label>
                    {/* <label>
                        Mã nhân viên
                        <input
                            required
                            type="text"
                            name="maNhanVien"
                            placeholder="Mã nhân viên"
                        />
                    </label> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} type="button">
                        Đóng
                    </Button>
                    <Button type="submit">Thêm sản phẩm</Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ModalAddProduct;
