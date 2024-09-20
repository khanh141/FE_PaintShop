export default function Card({ image, name, price, oldPrice, promotion, rating, reviews, offer }) {
    return (
      <div className="mt-3">
        <div>
          <div className="card h-100 border-warning ">
            <img src={image} className="card-img-top" alt={name} />
            <div className="card-body w-100">
              <h5 className="card-title">{name}</h5>
              <p className="card-text text-danger">
                {price}{" "}
                <small className="text-muted text-decoration-line-through">
                  {oldPrice}
                </small>
              </p>
              {/* <p className="card-text">Quà {offer}</p> */}
              <p className="card-text">đã bán: 10</p>
              <div className="d-flex justify-content-between w-100">
                <div>
                  <span className="text-warning">{"★".repeat(rating)}</span>
                  <span className="text-muted"> {reviews}</span>
                </div>
                <a href="#" className="btn btn-primary w-50">
                  Đặt ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
