import './index.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2>About Us</h2>
                    <p>
                        We bring you the best quality, style, and innovation in every product. Our mission is to deliver excellence, ensuring customer satisfaction every step of the way.
                    </p>
                </div>
                <div className="footer-section links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><a href="/products">Products</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/faq">FAQ</a></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h2>Contact Us</h2>
                    <p>Email: support@example.com</p>
                    <p>Phone: +123 456 7890</p>
                    <p>Address: 123 Innovation Street, Tech City</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 All Rights Reserved. Developed By Karthik</p>
            </div>
        </footer>
    );
}

export default Footer;
