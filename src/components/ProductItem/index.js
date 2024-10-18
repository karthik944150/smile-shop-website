import {Link} from "react-router-dom"
import "./index.css" 

const ProductItem = props => {
    const { productDetails} = props 
    const {id, title, image, category, price} = productDetails 
    
    return (
        <Link to={`/products/${id}`} className="link-item">
        <li className="product-item">
            
            <img 
                src = {image} 
                alt = {title} 
                className="product-item-image"
            />
            <div className="product-item-details">
                <h1 className="product-item-title">{title}</h1>
                <p className="product-item-category-price">Category: <span className="product-item-values">{category}</span></p>
                <p className="product-item-category-price">Price: <span className="product-item-values">${price}</span></p>
            </div>
            
        </li>
         </Link>
    )
}

export default ProductItem