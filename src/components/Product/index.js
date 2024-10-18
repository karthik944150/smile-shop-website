import { Component } from "react"; 


import Header  from "../Header";
import Footer from "../Footer";

import { ClipLoader } from "react-spinners";
import Cookies from 'js-cookie'

import "./index.css"

import { IoIosSearch } from "react-icons/io";

import ProductItem from "../ProductItem"

const productCategoryList = [
    {
      id: 1,
      value: 'all',
      label: 'All',
    },
    {
      id: 2,
      value: 'jewelery',
      label: 'Jewelery',
    },
    {
        id: 3,
        value: `men's clothing`,
        label: `Mens's Clothing`
      },
      {
        id:4,
        value: `women's clothing`,
        label: `Women's Clothing`
      },
  ]
  
  const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
  }

class Product extends Component {
    state = {
        apiStatus : apiStatusConstants.initial, 
        productList : [], 
        activeCategoryId : productCategoryList[0].value, 
        searchInput : ''
    }
    componentDidMount(){
        this.getProducts()
    }
    getProducts = async () => {
        this.setState({
            apiStatus : apiStatusConstants.inProgress
        })
        const jwtToken = Cookies.get('jwt_token')
        let apiUrl = 'https://fakestoreapi.com/products'
        const {activeCategoryId, searchInput} = this.state
        if (activeCategoryId !== 'all') {
            apiUrl = `https://fakestoreapi.com/products/category/${activeCategoryId}?search=${searchInput}`
        }
        const options = {
            method : "GET", 
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        }
        const response = await fetch(apiUrl, options) 
        if (response.ok === true){
            const fetchedData = await response.json() 
            const filteredData = fetchedData.filter(product => 
                product.title.toLowerCase().includes(searchInput.toLowerCase())
            )
            console.log(fetchedData)
            const updatedData = filteredData.map(eachProduct => ({
                id : eachProduct.id, 
                title : eachProduct.title, 
                price : eachProduct.price, 
                category : eachProduct.category,
                description : eachProduct.description, 
                image : eachProduct.image
            }))
            this.setState({
                productList : updatedData, 
                apiStatus : apiStatusConstants.success
            })
        }else{
            this.setState({
              
                apiStatus : apiStatusConstants.failure
            })
        }
    }
    renderLoadingView = () => (
        <div className="loader-container">
        <ClipLoader color="#3498db" size={60} />
      </div>
    )
    onTryAgainProducts = () => {
        this.getProducts()
    }
    renderFailureView = () => (
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
            onClick={this.onTryAgainProducts}
          >
            Try Again
          </button>
        </div>
    )

    renderNoMatchProducts = () => {
        const {searchInput} = this.state
        return (
          <div className="no-match-found-container">
            <img
              className="no-match-image"
              src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647250727/Screenshot_30_uavmge.png"
              alt="no books"
            />
            <p className="no-match-paragraph">
              Your search for {searchInput} did not find any matches.
            </p>
          </div>
        )
    }
    
    renderTheListOfProducts = () => {
        const {productList} = this.state
        return (
            <ul className="product-list">
                {productList.map(eachProduct => (
                    <ProductItem 
                        key = {eachProduct.id} 
                        productDetails = {eachProduct}
                    />
                ))}
            </ul>
        )
    }
    renderSuccessView = () => {
        const {productList} = this.state 
        const productListLength = productList.length 
        if (productListLength !== 0){
            return this.renderTheListOfProducts()
        }
        return this.renderNoMatchProducts()
        
    }
    
    renderProduct = () => {
        const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
    }
    onChangeCategory = (value) => {
        this.setState({
            activeCategoryId : value
        }, 
        this.getProducts
        )
    }
    onChangeSearchProduct = (event) => {
        this.setState({
            searchInput : event.target.value
        }, 
        this.getProducts
        )
    }
    render(){
        const {activeCategoryId, searchInput} = this.state
        return(
            <>
              <Header />
            <div className="product-container">
                <div className="filter-container">
                    <div className="search-bar-container">
                    <input 
                        type = "search"
                        className="input-element"
                        onChange = {this.onChangeSearchProduct}
                        value={searchInput}
                        placeholder="Search Product"
                    />
                    <IoIosSearch size = {25}/>
                    </div>
                   <ul>
                    {productCategoryList.map(eachCategory => {
                        const activeCategoryButton = `option-button ${activeCategoryId === eachCategory.value ? "active-option-button" : ''}`
                        return (
                            
                            <li key = {eachCategory.id}>
                                <button 
                                 type="button"
                                 onClick = {() => this.onChangeCategory(eachCategory.value)}
                                 className={activeCategoryButton}
                                >
                                    {eachCategory.label}
                                </button>
                                
                            </li>
                        )
                    })}
                   </ul>
                   </div>
                   <div>
                   {this.renderProduct()}
               
                   </div>
                 
                </div>
                <Footer />
            </>
        )
    }
}

export default Product