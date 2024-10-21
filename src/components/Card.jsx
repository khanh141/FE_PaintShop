import { Link } from "react-router-dom";
export default function Card({ id, image, name, type, tinhnang, mota, giatien, soluong }) {
  //  export default function Card({product}){
  if (!id) {
    console.error("Product ID is undefined or invalid.");
  }
  return (
    <div className="mt-3">
      <Link to={`/productDetail/${id}`}>
        <div className="card h-100 d-flex flex-column border-warning ">
          <img src="https://picsum.photos/200/200" className="card-img-top" />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">Loại: {type}</p>
            {/* <p className="card-text">Mô tả: {mota}</p> */}
            <p className="card-text">Tính năng: {tinhnang}</p>
            <p>Giá tiền: {giatien} VND</p>
            <p>Số lượng tồn kho: {soluong}</p>{" "}
            <div className="d-flex justify-content-center w-100">
              <a href="#" className="btn btn-primary w-50">
                Đặt ngay
              </a>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
