import React from 'react'
import Slider from "react-slick";
import { Link, useNavigate } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MoreProducts = ({ products }) => {
    if (!products || products.length === 0) {
        return <span>Chưa có sản phẩm nào khác cùng loại</span>;
    }
    const imageUrl = "/images/product.jpg"

    const navigate = useNavigate();
    const handleClick = (productId) => {
        navigate(`/productDetail/${productId}`);
    };

    var settings = {
        infinite: true,
        speed: 1200,
        slidesToScroll: 1,
        initialSlide: 0,
        slidesToShow: 5,
        autoplay: true,
        draggable: false,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className='news mainContent container'>
            <Slider {...settings} className='newsSlider'>
                {products?.map((product) => (
                    <div className='navTag' to={`/productDetail/${product.maSanPham}`} key={product.maSanPham} >
                        <div
                            className='new-slide newsItem'
                            onClick={() => handleClick(product.maSanPham)}
                        >
                            {/* <img src={product.hinhAnh} alt={product.ten} /> */}
                            <img src={imageUrl} alt={product.ten} />
                            <span className='sndColorText'>{product.ten}</span>
                            <span className='priColorText'>{product.chiTietSanPhamResList[0]?.giaTien}</span>
                        </div>
                    </div>
                ))}
            </Slider>
        </div >

    )
}

export default MoreProducts;