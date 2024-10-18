import Carousel from 'react-bootstrap/Carousel';

function ImageSlides({ height = '100%', width = '100%', interval = 3000, imgStyles = {} }) {
    const styles = {
        imageSlides: {
            height: height,
            overflow: 'hidden',
        },
        imageSlideItem: {
            img: {
                width: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                ...imgStyles,  // Allows additional custom styles to be passed from parent
            },
        },
    };

    return (
        <Carousel id="imageSlides" style={styles.imageSlides} interval={interval}>
            <Carousel.Item className="imageSlideItem">
                <img
                    className="rounded"
                    style={styles.imageSlideItem.img}
                    src="https://picsum.photos/200/200"
                    alt="slide 1"
                />
            </Carousel.Item>
            <Carousel.Item className="imageSlideItem">
                <img
                    style={styles.imageSlideItem.img}
                    src="https://picsum.photos/200/200"
                    alt="slide 2"
                />
            </Carousel.Item>
            <Carousel.Item className="imageSlideItem">
                <img
                    style={styles.imageSlideItem.img}
                    src="https://picsum.photos/200/200"
                    alt="slide 3"
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default ImageSlides;
