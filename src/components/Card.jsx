

import { Link } from "react-router-dom";
import React from 'react';
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/CardReducer';

export default function Card({ id, image, name, type, tinhnang, mota, giatien, soluong }) {
  if (!id) {
    console.error("Product ID is undefined or invalid.");
  }
  return (
    <div className="mt-3 cardContainer">
      <div className="card">
        <Link to={`/productDetail/${id}`} className="text-dark">
          <img src="https://picsum.photos/200/200" />
          <div className="card-body p-2">
            <span className="card-title h-30">{name}</span>
            <span className="price my-2">
              {giatien} <small className="vnd">VND</small>
            </span>
            <span className="card-text">{type}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
