import { Link  } from "react-router-dom"; 
import "./index.css"



const Header = () => {
    return (
        <>
        <div className="header-container">
            <nav className="nav-bar">
             
                <img src = "https://img.freepik.com/free-vector/gradient-instagram-shop-logo-template_23-2149704603.jpg?t=st=1729224523~exp=1729228123~hmac=d521561f94c157c7354d88167247838fd0e39a911c7bbb2e4fa185c26956ee64&w=740 " 
                    alt = "website-logo"
                    className="website-logo"
                />
                <ul> 
            <Link to = "/" className="link-item">
                <li className="link-name">
                    Home
                </li>
            </Link>
            <Link to = "/product" className="link-item">
                <li className="link-name">
                    Products
                </li>
            </Link>
        </ul>
            </nav>
        
        </div>
    </>
    )
} 

export default Header 