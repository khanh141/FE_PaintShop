import React from 'react'
import testDataInFile from "../../testData.json"
import Card from '../components/Card';

function Products() {
    const testData = testDataInFile
    return (
        <div className="productList">
            <div className="row">
                {/* replace index by product id */}
                {testData.map((product, index) => (
                    <div className="col-md-3" key={index}>
                        <Card
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            oldPrice={product.oldPrice}
                            promotion={product.promotion}
                            rating={product.rating}
                            reviews={product.reviews}
                            offer={product.offer}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products