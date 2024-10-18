import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ClipLoader } from "react-spinners";
import "./index.css";
import Header from "../Header";
import Footer from "../Footer";
import { FaStar } from "react-icons/fa";

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
};

const ProductItemDetails = () => {
  const { id } = useParams();
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [productItemDetails, setProductItemDetails] = useState({});

  useEffect(() => {
    const getProductDetails = async () => {
      setApiStatus(apiStatusConstants.inProgress);
      const apiUrl = `https://fakestoreapi.com/products/${id}`;
      const response = await fetch(apiUrl);
      if (response.ok) {
        const fetchedData = await response.json();
        const updatedData = {
          id: fetchedData.id,
          title: fetchedData.title,
          price: fetchedData.price,
          category: fetchedData.category,
          description: fetchedData.description,
          image: fetchedData.image,
          rate: fetchedData.rating.rate,
          count: fetchedData.rating.count,
        };
        setProductItemDetails(updatedData);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    };

    getProductDetails();
  }, [id]);

  const renderLoadingView = () => (
    <div className="loader-container">
      <ClipLoader color="#3498db" size={60} />
    </div>
  );

  const onTryAgainProducts = () => {
    setApiStatus(apiStatusConstants.initial);
  };

  const renderFailureView = () => (
    <div className="top-rated-books-failure-container">
      <img
        className="top-rated-books-failure-image"
        src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647250727/Screenshot_30_uavmge.png"
        alt="failure view"
      />
      <p className="top-rated-books-failure-heading">
        Something went wrong. Please try Again.
      </p>
      <button
        className="top-rated-books-failure-btn"
        type="button"
        onClick={onTryAgainProducts}
      >
        Try Again
      </button>
    </div>
  );

  const renderSuccessView = () => {
    const { title, image, category, description, price, rate } = productItemDetails;
    return (
      <div className="product-detail-item">
        <img src={image} alt={title} className="product-detail-item-image" />
        <div className="product-item-each-details">
          <p className="product-detail-item-title">{title}</p>
          <p className='product-detail-item-description'>{description}</p>
          <p className="product-item-category">Category: <span className='product-category-price'>{category}</span></p>
          <p className="product-item-category">Price: <span className='product-category-price'>${price}</span></p>
          <p className='product-item-category'>Ratings: <FaStar size={20} className='rating-star'/>
            <span className='product-category-price'>{rate}</span>
          </p>
        </div>
      </div>
    );
  };

  const renderProduct = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="product-item-details-container">
        <div>
          <h1>Product Details</h1>
        </div>
        <div>{renderProduct()}</div>
      </div>
      <Footer />
    </>
  );
};

export default ProductItemDetails;
