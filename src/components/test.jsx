import React from 'react';
import Card from './Card';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
// This component is used to load more products based on a specific condition
function MoreProducts({ products }) {
    if (!products || products.length === 0) {
        return <span>Chưa có sản phẩm nào khác cùng loại</span>;
    }
    var settings = {
        infinite: true,
        speed: 1200,
        slidesToScroll: 1,
        initialSlide: 0,
        slidesToShow: 4,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Slider {...settings} className='newsSlider'>
            {products?.map((product, index) => (
                <Link to={`/productDetail/${product.maSanPham}`} key={`productSlide-${index}`} className="text-dark">
                    <div className='new-slide newsItem'>
                        <img src={product.hinhAnh} alt={product.ten} />
                        <span>{product.ten}</span>
                    </div>
                </Link>
            ))}
        </Slider>
    )
}

export default MoreProducts;
