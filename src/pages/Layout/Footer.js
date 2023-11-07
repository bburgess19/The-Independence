import {Link} from "react-router-dom"
import "../../assets/Footer.css"

const Footer = () => {
    return (
        <>
            <footer>
                <div id="footer-socials" className="footer-div">
                    <h5>Follow Us</h5>
                    <div id="smth">

                        <a className="footer-link" href="https://www.instagram.com/independenceuchicago/">Instagram</a>
                    </div>
                </div>
                <div id="quicklinks" className="footer-div">
                    <h5>Quick Links</h5>
                    <ul>
                        <li><Link className="footer-link" to="/articles">Articles</Link></li>
                        <li><Link className="footer-link" to="/about">About</Link></li>
                    </ul>
                </div>
            </footer>
        </>
    )
}

export default Footer;