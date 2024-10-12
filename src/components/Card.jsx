import { Link } from "react-router-dom";
export default function Card({ image, name, type,tinhnang,mota,giatien,soluong}) {
//  export default function Card({product}){
return (
  <div className="mt-3">
    {/* <Link to={'/product/${productId}'}> */}
    <Link to={`/productDetail`}>
      <div className="card h-100 border-warning ">
        <img src="https://picsum.photos/200/200" className="card-img-top" />
        <div className="card-body w-100">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Mô tả: {mota}</p>
          <p className="card-text">Tính năng: {tinhnang}</p>
          <p>Giá tiền: {giatien} VND</p> <p>Số lượng tồn kho: {soluong}</p>{" "}
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
