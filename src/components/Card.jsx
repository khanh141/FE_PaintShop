import { Link } from "react-router-dom";
import React from 'react';
export default function Card({ id, image, name, type, giatien, soLuongDaBan }) {
  if (!id) {
    console.error("Product ID is undefined or invalid.");
  }

  return (
    <div className="mt-3 cardContainer">
      <div className="card">
        <Link to={`/productDetail/${id}`} className="text-dark">
          {/* <img src={image || "https://picsum.photos/200/200"} alt={name} /> */}
          <div className="imgContainer">
            <img style={{ width: '200px', height: '200px', objectFit: 'cover', objectPosition: 'center' }} src={`../../public/images/products/${image}.png`} alt={name} />
          </div>
          <div className="card-body p-2">
            <span className="card-title h-30">{name}</span>
            <span className="price my-2">
              {giatien !== undefined ? (
                <>
                  {giatien.toLocaleString()} <small className="vnd">VND</small>
                </>
              ) : (
                "Liên hệ để được báo giá"
              )}
            </span>

            <div className="d-flex justify-content-between">
              <span className="card-text">{type}</span>
              {soLuongDaBan > 0 &&
                <span>Đã bán: {soLuongDaBan}</span>
              }
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
