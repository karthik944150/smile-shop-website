import { useNavigate } from "react-router-dom"; 

import Header  from "../Header";
import Footer from "../Footer";

import './index.css';  

const HomePage = () => {
    const navigate = useNavigate();

    const onClickShopNow = () => {
        navigate("/product");
    };

    return(
        <> 
          <Header />
            <div className="homepage">
              <div className="hero-section">
                    <div>
                    <h1 className="homepage-title">Discover our products</h1>
                    <p className="homepage-subtitle">  Discover premium products designed to elevate your everyday life. 
                    From cutting-edge tech gadgets to stylish home essentials, our curated 
                    selection blends quality with innovation. Shop now to find the perfect 
                    balance of functionality and style for your needs.</p>
                    <button className="shop-button" onClick={onClickShopNow}>Shop Now</button>
                    </div>
                   
                </div>
                
            </div>
            <Footer />

        </>
    );
}

export default HomePage;
