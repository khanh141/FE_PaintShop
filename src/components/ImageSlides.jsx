import Carousel from 'react-bootstrap/Carousel';

function ImageSlides({ images = [], height = '100%', width = '100%', interval = 3000, imgStyles = {} }) {
    const styles = {
        imageSlides: {
            height: height,
            width: width,
            overflow: 'hidden',
        },
        imageSlideItem: {
            img: {
                width: '100%',
                ...imgStyles,
            },
        },
    };

    return (
        <Carousel id="imageSlides" style={styles.imageSlides} interval={3000}>
            {images.map((image, index) => (
                <Carousel.Item key={index} className="imageSlideItem">
                    <img
                        src={image.src}
                        alt={image.alt || `slide ${index + 1}`}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default ImageSlides;
