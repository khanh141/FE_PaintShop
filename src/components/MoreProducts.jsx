import React from 'react';
import Slider from 'react-slick';
import { Link, useParams } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MoreProducts = ({ products }) => {
    if (!products || products.length === 0) {
        return <span>Chưa có sản phẩm nào khác cùng loại</span>;
    }
    const imageUrl = '/images/product.jpg';

    var settings = {
        infinite: true,
        speed: 1200,
        slidesToScroll: 2,
        initialSlide: 0,
        slidesToShow: 5,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className="news mainContent container">
            {products && products.length > 0 ? (
                products.length === 1 ? (
                    <Link
                        className="navTag singleTag"
                        to={`/productDetail/${products[0].maSanPham}`}
                        key={`link_${products[0].maSanPham}`}
                    >
                        <div className="new-slide newsItem">
                            <img src={imageUrl} alt={products[0].ten} />
                            <span className="sndColorText">
                                {products[0].ten}
                            </span>
                            <span className="priColorText">
                                {products[0].chiTietSanPhamResList[0]?.giaTien}
                            </span>
                        </div>
                    </Link>
                ) : (
                    <Slider {...settings} className="newsSlider">
                        {products.map((product) => (
                            <Link
                                className="navTag"
                                to={`/productDetail/${product.maSanPham}`}
                                key={`link_${product.maSanPham}`}
                            >
                                <div className="new-slide newsItem">
                                    <img src={imageUrl} alt={product.ten} />
                                    <span className="sndColorText">
                                        {product.ten}
                                    </span>
                                    <span className="priColorText">
                                        {product.chiTietSanPhamResList[0]?.giaTien.toLocaleString()}{' '}
                                        VND
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </Slider>
                )
            ) : (
                <span>Chưa có sản phẩm nào khác cùng loại</span>
            )}
        </div>
    );
};

export default MoreProducts;
