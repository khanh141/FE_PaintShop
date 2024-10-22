

import { Link } from "react-router-dom";
import React from 'react';
import {Button} from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/CardReducer';

export default function Card({ id, image, name, type, tinhnang, mota, giatien, soluong }) {
  const dispatch = useDispatch();

  return (
    <div className="mt-3">
      <div className="card h-100 d-flex flex-column border-warning">
        <Link to={`/productDetail/${id}`}>
          <img
            src={image || "https://picsum.photos/200/200"}
            className="card-img-top"
            alt={name}
          />
        </Link>
        <div className="card-body d-flex flex-column">
          <Link to={`/productDetail/${id}`}>
            <h5 className="card-title">{name}</h5>
            <p>Giá tiền: {giatien} VND</p>
            <p>Số lượng tồn kho: {soluong}</p>
          </Link>
          <div className="d-flex justify-content-center w-100">
          </div>
        </div>
      </div>
    </div>
  );
}
