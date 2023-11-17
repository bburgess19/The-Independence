import {useState} from "react"
import {Link} from "react-router-dom";
import '../../assets/ExpandedMenu.css'

export default function ExpandedMenu() {
    const [closed, setClosed] = useState(false);

    return (
        <>
            <nav id="expanded-nav" className={closed ? "inactive" : "active"}>
                <div id="expanded-menu-wrapper">
                    <p onClick={() => setClosed(!closed)}>Close</p>
                    <ul id="categories">
                        <li><Link className="article-link" to="/Art"><a className="category art" href="/">Art</a></Link></li>
                        <li><Link className="article-link" to="/black-body-and-diaspora"><a className="category diaspora" href="/">Black Body & Diaspora</a></Link></li>
                        <li><Link className="article-link" to="/politics-and-economics"><a className="category politics" href="/">Politics & Economics</a></Link></li>
                        <li><Link className="article-link" to="/science-and-technology"><a className="category science" href="/">Science & Technology</a></Link></li>
                        <li><Link className="article-link" to="/sports"><a className="category sports" href="/">Sports</a></Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}