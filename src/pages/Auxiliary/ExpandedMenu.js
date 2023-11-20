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
                        <li><Link className="article-link category art" to="/Art">Art</Link></li>
                        <li><Link className="article-link category diaspora" to="/black-body-and-diaspora">Black Body & Diaspora</Link></li>
                        <li><Link className="article-link category politics" to="/politics-and-economics">Politics & Economics</Link></li>
                        <li><Link className="article-link category science" to="/science-and-technology">Science & Technology</Link></li>
                        <li><Link className="article-link category sports" to="/sports">Sports</Link></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}