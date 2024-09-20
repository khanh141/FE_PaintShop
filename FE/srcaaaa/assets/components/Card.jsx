
export default function Card({ image, name, price, oldPrice, promotion, rating, reviews, offer }) {
    return (
        <div className="mt-3">
            <div >
                <div className="card h-100 border-warning ">
                    <div className="card-body w-100">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text text-danger">
                            {price} <small className="text-muted text-decoration-line-through">{oldPrice}</small>
                        </p>
                        <p className="card-text">Quà {offer}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <span className="text-warning">{'★'.repeat(rating)}</span>
                                <span className="text-muted"> {reviews}</span>
                            </div>
                            <a href="#" className="btn btn-primary">Đặt ngay</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Thêm các thẻ khác cũng với className="col-md-3" */}
        </div>

    );
}
