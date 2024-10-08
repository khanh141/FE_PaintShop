import Carousel from 'react-bootstrap/Carousel';

function ImageSlides() {
    return (
        <Carousel id='imageSlides' interval={null}>
            <Carousel.Item className='imageSlideItem'>
                <img className='rounded' src="images/winx.jpg" alt="" />
            </Carousel.Item>
            <Carousel.Item className='imageSlideItem'>
                <img src="images/winx.jpg" alt="" />
            </Carousel.Item>
            <Carousel.Item className='imageSlideItem'>
                <img src="images/winx.jpg" alt="" />
            </Carousel.Item>
        </Carousel>
    );
}

export default ImageSlides;