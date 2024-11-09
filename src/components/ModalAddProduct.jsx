import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from '../assets/css/ModalAddProduct.module.scss';

function ModalAddProduct(props) {
    const { onSubmit, baoBiOptions, mauOptions, dinhMucOptions, ...rest } =
        props;

    const renderOptions = (options) => {
        return options.map((option, index) => (
            <option key={index} value={option}>
                {option}
            </option>
        ));
    };
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
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            name="imageFile"
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
                        <select name="loaiBaoBi" required>
                            <option value="">Chọn loại bao bì</option>
                            {renderOptions(baoBiOptions)}
                        </select>
                    </label>
                    <label>
                        Màu
                        <select name="mau" required>
                            <option value="">Chọn màu</option>
                            {renderOptions(mauOptions)}
                        </select>
                    </label>
                    <label>
                        Loại định mức lý thuyết
                        <select name="loaiDinhMucLyThuyet" required>
                            <option value="">Chọn loại định mức</option>
                            {renderOptions(dinhMucOptions)}
                        </select>
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
